---
layout: default
---

# What is this?

Enter a search and get back tweets with VADER and AFINN sentiment analysis applied.

_**Warning:** This is beta-quality software. Do not use it in a production environment. At the very least, you'll need an enhanced Twitter API key to access archival material. All results are currently filtered by relevance by Twitter before sentiment analysis, meaning all aggregate sentiment scores reflect the sentiment of tweets considered relevant by Twitter's API, not the universe of possible tweets matching your search term. See the [Github repository](https://github.com/eads/sentiment-search) for more information._

**Twitter search sentiment** is a tool created to help journalists to understand the emotional inclinations around certain topics on Twitter. This tool uses two different systems: [AFINN](http://www2.imm.dtu.dk/pubdb/views/edoc_download.php/6006/pdf/imm6006.pdf) and [VADER](http://comp.social.gatech.edu/papers/icwsm14.vader.hutto.pdf) to analyze the 100 more relevant tweets, according to the Twitter API.

In this first stage of **Twitter search sentiment** users can see the graphic results of their search in both systems. We have also included the option to download the results in a CSV file, a resource that will allow journalists to run their own analysis.

Want to get in touch? [Leave an issue on Github](https://github.com/eads/sentiment-search/issues).
