const feedparser = require('feedparser-promised');
const AWS_FEED = 'https://aws.amazon.com/en/new/feed/';
const entities = require('html-entities').AllHtmlEntities;
const striptags = require('striptags');


const read = () => {

    return feedparser.parse(AWS_FEED)
        .then(items => {
            const feedItems = items.map(item => {
                const feedItem ={};
                if (item['title'] && item['date'] && item['description'] ) {
                    feedItem['title'] = item['title'];
                    feedItem['title'] = entities.decode(striptags(feedItem['title']));
                    feedItem['title'] = feedItem['title'].trim();
                    feedItem['title'] = feedItem['title'].replace(/[&]/g,'and').replace(/[<>]/g,'');

                    feedItem['date'] = new Date(item['date']).toUTCString();

                    if (item['description']) {
                        feedItem['description'] = item['description'];
                        feedItem['description'] = entities.decode(striptags(feedItem['description']));
                        feedItem['description'] = feedItem['description'].trim();
                        feedItem['description'] = feedItem['description'].replace(/[&]/g,'and').replace(/[<>]/g,'');
                    }

                    if (item['link']) {
                        feedItem['link'] = item['link'];
                    }

                    if (item['image'] && item['image'].url) {
                        feedItem['imageUrl'] = item['image'].url;
                    }
                    return feedItem;
                }
            });
            return feedItems;
        })
        .catch(e => console.log('err',e))
};
exports.read = read;

