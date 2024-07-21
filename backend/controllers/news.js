const googleTrends = require("google-trends-api");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWSAPIKEY);

const SavedNews = require("../models/Savednews");

class News {
    constructor(title,url,image,snippet,source,lastUpdated){
        this.title = title;
        this.url = url;
        this.image = image;
        this.snippet = snippet;
        this.source = source;
        this.lastUpdated = lastUpdated;
    }
}

exports.newsHome = (req,res) => {

    //responses
    var trendsdaily = [];

    //requests from frontend
    var location = req.body.location;
    googleTrends.dailyTrends(
        { 
            geo: location
        },
        function(err, results) {
            if (err) {
                console.log(err);
            }else{
                try{
                    results = results.toString()
                    results = JSON.parse(results)
                    results = results.default.trendingSearchesDays;
                    results = results[0].trendingSearches;
                    //res.send(output);
                    for(var i = 0; i<results.length; i++){
                        trendsdaily[i] = new News(
                            results[i].articles[0].title,
                            results[i].articles[0].url,
                            results[i].image.imageUrl,
                            results[i].articles[0].snippet,
                            results[i].articles[0].source,
                            results[i].articles[0].timeAgo)
                        /*trendsdaily[i] = {
                            title :output[i].articles[0].title,
                            url :output[i].articles[0].url,
                            image: output[i].image.imageUrl, 
                            snippet: output[i].articles[0].snippet , 
                            source: output[i].articles[0].source , 
                            lastUpdated: output[i].articles[0].timeAgo 
                        };*/
                    }
                    res.send(trendsdaily);
                }
                catch(error){
                    console.log(error);;
                }
            }
        });
    }

exports.newsSearch = (req,res) => {

    var keywordSearch = [];

    var keyword = req.body.keyword;

    newsapi.v2.everything({
        q: keyword,
        language: "en",
        searchIn: "title",
        sortBy: "popularity",
        }).then(response => {
        var results = response.articles;
        for(var i=0;i<results.length;i++){
            keywordSearch[i] = new News(
                results[i].title,                
                results[i].url,                
                results[i].urlToImage,                
                results[i].description,                
                results[i].source.name,                
                results[i].publishedAt,                
            )
        }
        res.json(keywordSearch);
        }).catch(error => console.log(error));
}

exports.newsSearchByCategory = async(req,res) => {

    var searchByCategory = [];

    var category = req.body.category;
    var location = req.body.location;

    location = location.toLowerCase();

    newsapi.v2.topHeadlines({
        category: category,
        country: location,
        }).then(response => {
        var results = response.articles;
        for(var i=0;i<results.length;i++){
            searchByCategory[i] = new News(
                results[i].title,                
                results[i].url,                
                results[i].urlToImage,                
                results[i].description,                
                results[i].source.name,                
                results[i].publishedAt,                
            )
        }
        res.json(searchByCategory);
        });
};

exports.saveNews = (req,res) => {

    try {
        SavedNews.findOneAndUpdate(
            { user: req.body.userId },
            {
                $push: {
                    news: req.body.news
                }
            },
            {
                new: true,
                upsert: true
            },
            (err, doc) => {
                if (err) {
                    res.json(err);
                    console.log(err);
                }
                res.json(doc)
            }
        );
    }
    catch (error) {
        console.log(error);
    }
}

exports.findNewsByName = (req,res) => {
    try{
        SavedNews.findOne(
            { 
                user: req.body.userId,
                "news.title" : req.body.news.title 
            },
            (err,doc) => {
                if(err){
                    res.json(err)
                }
                res.json(doc)
            }
        )
    }
    catch (error) {
        console.log(error);
    }
}

exports.findNewsByUser = (req, res) => {
    //const newsTitle = req.body.news.title;
    try {
        SavedNews.findOne(
            {
                user: req.body.userId
            },
            (err, doc) => {
                if (err) {
                    res.json(err)
                }
                res.json(doc)
            }
        )
    }
    catch (error) {
        console.log(error);
    }
}
