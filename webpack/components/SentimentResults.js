import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import * as d3 from 'd3';
import * as _ from 'lodash';
import NumberFormat from 'react-number-format';
import matchSorter from 'match-sorter';

import ReactTable from "react-table";
import "react-table/react-table.css";

const csvbaseurl = "https://ffkouyywjc.execute-api.us-east-1.amazonaws.com/dev/search/csv"

class SentimentResults extends Component {
  render() {
    var data = this.props.data;
    var summary = this.props.summary;
    var error = this.props.error;

    if (error) {
      return (<div className="error">Error getting results. This usually means we have overheated the Twitter API. Try again in a few minutes.</div>)
    }

    if (!data.length) {
      return <div></div>
    }

    var urlParts = this.props.url.split('?');
    var url =  csvbaseurl + '?' + urlParts[1];

    var vaderScale = d3.scaleLinear().domain([-1,1]);

    var vaderHistogram = d3.histogram()
        .value(function(d) { return d.vader_sentiment_compound; })
        .domain(vaderScale.domain())
        .thresholds(vaderScale.ticks(20));

    var vaderBins = vaderHistogram(data);

    var vaderSum = vaderBins.reduce((accumulator, d) => accumulator + d.length, 0)

    var vaderHist = vaderBins.map( bin => {
      var count = bin.length;
      return {
        'count': count,
        'pct': count / vaderSum * 100,
        'min': bin.x0,
        'max': bin.x1
      }
    });

    var afinnScale = d3.scaleLinear().domain([-10,10]);

    var afinnHistogram = d3.histogram()
        .value(function(d) { return d.afinn_sentiment; })
        .domain(afinnScale.domain())
        .thresholds(afinnScale.ticks(20));

    var afinnBins = afinnHistogram(data);

    var afinnSum = afinnBins.reduce((accumulator, d) => accumulator + d.length, 0)

    var afinnHist = afinnBins.map( bin => {
      var count = bin.length;
      return {
        'count': count,
        'pct': count / afinnSum * 100,
        'min': bin.x0,
        'max': bin.x1
      }
    });

    var maxpct = _.maxBy(
          [
            _.maxBy(vaderHist, (d) => d.pct),
            _.maxBy(afinnHist, (d) => d.pct)
          ], (d) => d.pct).pct + 5;

    var keywords = summary.keywords.map(word => {
      return word[0] + ' (' + word[1] + ')';
    }).join(', ');

    return (
      <div className={'searching-' + this.props.searching}>
        <div className="download">
          <div><a href={url}>Download CSV</a> or copy link <input type="text" readOnly={true} value={url}/></div>
        </div>
        <div className="row">
          <div className="chartContainer six columns">
            <h2>VADER Compound Distribution</h2>
            <p>
              Median: <NumberFormat value={summary.vader.median} displayType={'text'} fixedDecimalScale={true} decimalScale={3} /> | Avg: <NumberFormat value={summary.vader.mean} displayType={'text'} fixedDecimalScale={true} decimalScale={3.5} />
            </p>
            <ResponsiveContainer aspect={3.5}>
              <BarChart data={vaderHist}>
                <XAxis dataKey="min"/>
                <YAxis 
                  domain={[0, maxpct]}
                  tickFormatter={(t) => t.toFixed(0) + '%'}
                />
                <CartesianGrid strokeDasharray="3 3"/>
                <Bar dataKey="pct" fill="#1eaedb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chartContainer six columns">
            <h2>AFINN Distribution</h2>
            <p>
              Median: <NumberFormat value={summary.afinn.median} displayType={'text'} fixedDecimalScale={true} decimalScale={3} /> | Avg: <NumberFormat value={summary.afinn.mean} displayType={'text'} fixedDecimalScale={true} decimalScale={3.5} />
            </p>
            <ResponsiveContainer aspect={3.5}>
              <BarChart data={afinnHist}>
                <XAxis dataKey="min"/>
                <YAxis
                  domain={[0, maxpct]}
                  tickFormatter={(t) => t.toFixed(0) + '%'}
                />
                <CartesianGrid strokeDasharray="3 3"/>
                <Bar dataKey="pct" fill="#1eaedb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <p className="total"><strong>Total tweets:</strong> {data.length}</p>
        <p className="total"><strong>Keywords:</strong> {keywords}</p>

        <ReactTable
          data={data}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
              {
                Header: "ID",
                accessor: "id_str",
                sortable: false,
                width: 70,
                Cell: row => (
                  <a target="_blank" href={"https://twitter.com/statuses/" + row.value}>{row.value}</a>
                )
              },
              {
                Header: "VADER",
                accessor: "vader_sentiment_compound",
                width: 100
              },
              {
                Header: "AFINN",
                accessor: "afinn_sentiment",
                width: 100
              },
              {
                Header: "Tweet text",
                sortable: false,
                accessor: "text",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["text"] }),
                filterAll: true
              },
              {
                Header: "@name",
                accessor: "user_screen_name",
                width: 140,
                Cell: row => (
                  <a target="_blank" href={"https://twitter.com/" + row.value}>{row.value}</a>
                ),
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["user_screen_name"] }),
                filterAll: true
              },
              {
                Header: "Verified",
                accessor: "user_verified",
                width: 80,
                Cell: row => (
                  row.value === true ? "true" : "false"
                ),
                filterMethod: (filter, row) => {
                  if (filter.value === "all") {
                    return true;
                  }
                  if (filter.value === "true") {
                    return row.user_verified;
                  }
                  return !row.user_verified;
                },
                Filter: ({ filter, onChange }) =>
                  <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : "all"}
                  >
                    <option value="all">Show all</option>
                    <option value="true">Verified</option>
                    <option value="false">Not verified</option>
                  </select>
              },
              {
                Header: "Is media",
                accessor: "is_media",
                width: 80,
                Cell: row => (
                  row.value === true ? "true" : "false"
                ),
                filterMethod: (filter, row) => {
                  if (filter.value === "all") {
                    return true;
                  }
                  if (filter.value === "true") {
                    return row.is_media;
                  }
                  return !row.is_media;
                },
                Filter: ({ filter, onChange }) =>
                  <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : "all"}
                  >
                    <option value="all">Show all</option>
                    <option value="true">Media</option>
                    <option value="false">Not media/not known</option>
                  </select>
              },
              {
                Header: "Created at",
                accessor: "created_at",
                width: 200
              }
          ]}
          defaultPageSize={10}
          className="-highlight"
        />
      </div>
    )
  }
}

export default SentimentResults;

