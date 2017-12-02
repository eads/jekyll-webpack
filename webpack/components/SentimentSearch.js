import axios from 'axios';
import SentimentResults from './SentimentResults';
import React, { Component } from 'react';

const baseurl = "https://ffkouyywjc.execute-api.us-east-1.amazonaws.com/dev/search/simple"

class SentimentSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      searchURL: '',
      results: [],
      summary: {},
      searching: false,
      includeRetweets: false,
      includeReplies: true,
      error: false
    }
  }

  submitHandler(e) {
    e.preventDefault();

    this.setState({
      searching: true
    });

    var search = this.state.searchString;

    if (!this.state.includeRetweets) {
      search = search + ' AND -filter:retweets';
    }
    if (!this.state.includeReplies) {
      search = search + ' AND -filter:replies';
    }

    axios.get(baseurl, {
      params: {
        'q': search,
        'count': 1000
      }
    })
      .catch(error => {
        this.setState({
          searching: false,
          error: true
        })
      })
      .then(res => {
        this.setState({
          searchURL: res.request.responseURL,
          results: res.data.results,
          summary: res.data.summary,
          searching: false
        });
      });
  }

  changeHandler(e) {
    this.setState({
      searchString: e.target.value
    });
  }

  toggleReplies() {
    this.setState({
      includeReplies: !this.state.includeReplies
    });
  }

  toggleRetweets() {
    this.setState({
      includeRetweets: !this.state.includeRetweets
    });
  }

  render() {
    var toggleReplies = this.toggleReplies.bind(this)
    var toggleRetweets = this.toggleRetweets.bind(this)
    return (
      <div className="sentiment-search">
        <form onSubmit={this.submitHandler.bind(this)} className={'searching-' + this.state.searching}>
          <div className="search-box">
            <input type="text" name="searchString" value={this.state.searchString} onChange={this.changeHandler.bind(this)} placeholder="Search terms, @names, #hashtags, and places" />
            <button type="submit">Search</button>
          </div>
          <div className="search-options row">
            <div className="three columns">
              <input name="includeReplies" id="includeReplies" type="checkbox" checked={this.state.includeReplies} onChange={toggleReplies} />
              <label>Include Replies</label>
            </div>
            <div className="three columns">
              <input name="includeRetweets" id="includeRetweets" type="checkbox" checked={this.state.includeRetweets} onChange={toggleRetweets} />
              <label>Include Retweets</label>
            </div>
          </div>
        </form>
        <SentimentResults error={this.state.error} data={this.state.results} summary={this.state.summary} url={this.state.searchURL} searching={this.state.searching}/>
      </div>
    )
  }
}
export default SentimentSearch;
