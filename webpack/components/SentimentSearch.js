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
      searching: false
    }
  }

  submitHandler(e) {
    e.preventDefault();

    this.setState({
      searching: true
    });

    axios.get(baseurl, {
      params: {
        'q': this.state.searchString + ' AND -filter:retweets AND -filter:replies',
        'count': 1000
      }
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

  render() {
    return (
      <div className="sentiment-search">
        <form onSubmit={this.submitHandler.bind(this)} className={'searching-' + this.state.searching}>
          <input type="text" name="searchString" value={this.state.searchString} onChange={this.changeHandler.bind(this)} placeholder="Search terms, @names, #hashtags, and places" />
          <button type="submit">Search</button>
        </form>
        <SentimentResults data={this.state.results} summary={this.state.summary} url={this.state.searchURL} searching={this.state.searching}/>
      </div>
    )
  }
}
export default SentimentSearch;
