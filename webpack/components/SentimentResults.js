import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import * as jStat from 'jStat';


const sampleData = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

class SentimentResults extends Component {
  render() {
    var data = this.props.data;
    var urlParts = this.props.url.split('?');
    var url = urlParts[0] + '/csv?' + urlParts[1];

    if (!data.length) {
      return <div></div>
    }
    return (
      <div>
        <div className="download">
          <div><a href={url}>Download CSV</a> or copy link below:</div>
          <div><input type="text" readOnly={true} value={url}/></div>
        </div>
        <div className="chartContainer">
          <ResponsiveContainer aspect={3}>
            <BarChart width={600} height={300} data={sampleData}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
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

