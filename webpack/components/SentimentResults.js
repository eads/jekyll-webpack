import React, { Component } from 'react';

class SentimentResults extends Component {
  render() {
    var data = this.props.data;
    var urlParts = this.props.url.split('?');
    var url = urlParts[0] + '/csv' + urlParts[1];

    if (!data.length) {
      return <div></div>
    }
    return (
      <div>
        <div className="download">
          <div><a href="{url}">Download CSV</a> or copy link below:</div>
          <div><input type="text" readonly value={url}/></div>
        </div>
        <div className="tweets">
          {
            data.map((tweet, index) => (
              <div key={"container_" + index} className="tweet">
                <p key={"username_" + index}>
                  @{tweet.user.screen_name}
                </p>
                <p key={"text_" + index}>
                  {tweet.text}
                </p>
                <p key={"afinn_" + index}>
                  AFINN: {tweet.afinn_sentiment}
                </p>
                <p key={"vadercompound_" + index}>
                  VADER compound: {tweet.vader_sentiment.compound}
                </p>
                <p key={"vaderneu_" + index}>
                  VADER neu: {tweet.vader_sentiment.neu}
                </p>
                <p key={"vaderpos_" + index}>
                  VADER pos: {tweet.vader_sentiment.pos}
                </p>
                <p key={"vaderneg_" + index}>
                  VADER neg: {tweet.vader_sentiment.neg}
                </p>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default SentimentResults;

