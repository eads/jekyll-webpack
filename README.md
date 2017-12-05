# Twitter Sentiment

Apply sentiment analysis to Twitter search results.

[See the demo](https://eads.github.io/sentiment-search/).

## Warning! This software is not production-ready

**This code is not ready for production use.**

If you want to use this software to analyze Tweets for publication, you will need at least a [premium Twitter API key](https://developer.twitter.com/en/pricing).

If you'd like to know more about installing or using this tool in a production environment, [create an issue](https://github.com/eads/sentiment-search/issues).

## Requirements

* Ruby (`brew install ruby`)
* Jekyll (`gem install jekyll`)
* Node (`brew install node`)
* Webpack (`npm install -g webpack`)

## Install

```
git clone git@github.com:eads/sentiment-search.git
cd sentiment search
git submodule update --init
npm install
```

## Run

```
jekyll serve &; webpack -w &
```

NOTE: This isn't ideal. To exist, run `fg` and ctrl-c once to kill webpack, and again to kill jekyll.

## Edit

`src/index.md` contains the "what is this?" content.

`webpack/components/SentimentSearch.js` is the root search UI component.

## Build and deploy

```
jekyll build
git add public
git commit -m "built site"
git subtree push --prefix public origin gh-pages
```

## Credits

Created by:

* Barbara Maseda
* Mago Torres
* Amy Shen
* [David Eads](https://twitter.com/eads)

## Code

The client builds on Alli Zadronzy's wonderful tutorial, [Using Webpack and React with Jekyll](https://medium.com/@allizadrozny/using-webpack-and-react-with-jekyll-cfe137f8a2cc) with [Skeleton](https://github.com/whatsnewsaes/Skeleton-Sass) and [Recharts](http://recharts.org/).

The backend uses C.J. Hutto's [Vader Sentiment](https://github.com/cjhutto/vaderSentiment) library, Finn Nielsen's [AFINN](https://github.com/fnielsen/afinn) library, and [Serverless](https://serverless.com/) to apply sentiment analysis to Twitter search results.
