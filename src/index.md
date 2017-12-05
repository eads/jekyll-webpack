---
layout: default
---

# What is this?

Enter a search and get back tweets with VADER and AFINN sentiment analysis applied.

**Twitter Sentiment Search** is a tool created to help journalists to understand the emotional inclinations around certain topics on Twitter. This tool uses two different systems: [AFINN](http://www2.imm.dtu.dk/pubdb/views/edoc_download.php/6006/pdf/imm6006.pdf) and [VADER](http://comp.social.gatech.edu/papers/icwsm14.vader.hutto.pdf) to analyze up to 1,000 of the latests more relevant tweets, according to the Twitter API.

In this first stage of **Twitter Sentiment Search** users can see the graphic results of their search in both systems. We have also included the option to download the results in a CSV file to allow journalists to run their own analysis.

## Warning: Not for production use

_**Warning:** This is beta-quality software. Do not use it in a production or publication environment._

All results are currently filtered by relevance by Twitter before sentiment analysis, meaning all aggregate sentiment scores reflect the sentiment of tweets considered relevant by Twitter's API, not the universe of possible tweets matching your search term.

If you want to use this software to analyze Tweets for publication, you will need at least a [premium Twitter API key](https://developer.twitter.com/en/pricing).

If you'd like to know more about installing, using this tool in a production environment, or just get in touch, please [create an issue](https://github.com/eads/sentiment-search/issues).

If you'd like to modify this software for production use, we'd be delighted. See the [Github repository](https://github.com/eads/sentiment-search) for more information.

## Credits

Created by:

* Barbara Maseda
* Mago Torres
* Amy Shen
* [David Eads](https://twitter.com/eads)

## Code

The client builds on Alli Zadronzy's wonderful tutorial, [Using Webpack and React with Jekyll](https://medium.com/@allizadrozny/using-webpack-and-react-with-jekyll-cfe137f8a2cc) with [Skeleton](https://github.com/whatsnewsaes/Skeleton-Sass) and [Recharts](http://recharts.org/).

The backend uses C.J. Hutto's [Vader Sentiment](https://github.com/cjhutto/vaderSentiment) library, Finn Nielsen's [AFINN](https://github.com/fnielsen/afinn) library, and [Serverless](https://serverless.com/) to apply sentiment analysis to Twitter search results.

