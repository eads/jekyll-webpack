import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import * as d3 from 'd3';


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
    if (!data.length) {
      return <div></div>
    }

    var urlParts = this.props.url.split('?');
    var url = urlParts[0] + '/csv?' + urlParts[1];

    var vaderScale = d3.scaleLinear().domain([-1,1]);

    var vaderHistogram = d3.histogram()
        .value(function(d) { return d.vader_sentiment.compound; })
        .domain(vaderScale.domain())
        .thresholds(vaderScale.ticks(10));

    var vaderBins = vaderHistogram(data);

    var vaderHist = vaderBins.map( bin => {
      var count = bin.length;
      return {
        'count': count,
        'min': bin.x0,
        'max': bin.x1
      }
    });

    var afinnScale = d3.scaleLinear().domain([-5,5]);

    var afinnHistogram = d3.histogram()
        .value(function(d) { return d.afinn_sentiment; })
        .domain(afinnScale.domain())
        .thresholds(afinnScale.ticks(10));

    var afinnBins = afinnHistogram(data);

    var afinnHist = afinnBins.map( bin => {
      var count = bin.length;
      return {
        'count': count,
        'min': bin.x0,
        'max': bin.x1
      }
    });


    return (
      <div>
        <div className="download">
          <div><a href={url}>Download CSV</a> or copy link below:</div>
          <div><input type="text" readOnly={true} value={url}/></div>
        </div>
        <div className="row">
          <div className="chartContainer six columns">
            <h2>VADER Compound Distribution</h2>
            <ResponsiveContainer aspect={2}>
              <BarChart data={vaderHist}>
                <XAxis dataKey="min"/>
                <YAxis domain={[0, 100]}/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Bar dataKey="count" fill="#1eaedb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chartContainer six columns">
            <h2>AFINN Distribution</h2>
            <ResponsiveContainer aspect={2}>
              <BarChart data={afinnHist}>
                <XAxis dataKey="min"/>
                <YAxis domain={[0, 100]} />
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Bar dataKey="count" fill="#1eaedb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
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

