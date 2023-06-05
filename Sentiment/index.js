const axios = require('axios');
const flattenObject = (obj) => {
    const flattened = {}
  
    Object.keys(obj).forEach((key) => {
      const value = obj[key]
  
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(flattened, flattenObject(value))
      } else {
        flattened[key] = value
      }
    })
  
    return flattened
}
  
module.exports = async function (context, req) {
    const ticker = (req.query.ticker || (req.body && req.body.ticker) || "AAPL");
    const relevance = parseFloat(req.query.relevance || (req.body && req.body.relevance) || "0");
    const duration = parseFloat(req.query.duration || (req.body && req.body.duration) || "0");
    // https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=ADBE&apikey=ZUBZVOOY7AA13CYK
    context.log('NEWS_SENTIMENT for ticker:' + ticker);
    const ApiKey = "ZUBZVOOY7AA13CYK";


    try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&limit=200&tickers=${ticker}&apikey=${ApiKey}`)
        context.log(`statusCode: ${response.statusCode}`);
        //context.log(JSON.stringify(response.data));
        if (!response.data.feed) 
            throw new Error(JSON.stringify(response.data));  
        sentiments = response.data.feed.map(current => flattenObject({time_published: current.time_published, sentiment :current.ticker_sentiment.find(element => element.ticker == ticker)}))
        //        se = sentiments.map( el => ({score: el.ticker_sentiment_score, relevance: el.relevance_score}))
        //sentiments = sentiments1.map( ({ticker_sentiment_score,relevance_score}) => ({score: ticker_sentiment_score, weight: relevance_score}))
        //sentiments = sentiments1.filter( ({time_published, ticker_sentiment_score,relevance_score}) => ({score: ticker_sentiment_score, weight: relevance_score}))
        if (duration>0){
            var d = new Date();
            d.setDate(d.getDate() - duration);
            const min_time_published = d.toISOString().split('.')[0].replace(/[^T0-9]/g, "");
            sentiments = sentiments.filter( ({time_published}) => time_published>min_time_published)
        }
        if (relevance>0) sentiments = sentiments.filter( ({relevance_score}) => relevance_score>relevance)
        //sentiment_average = sentiments.reduce( (accumulator, current) => accumulator + parseFloat(current.ticker_sentiment_score)*parseFloat(current.weight),0)
        //                /  sentiments.reduce((accumulator, current) => accumulator + parseFloat(current.weight),0)
        sentiment_average = sentiments.reduce( (accumulator, current) => accumulator + parseFloat(current.ticker_sentiment_score)*parseFloat(current.relevance_score),0)
                            /sentiments.reduce((accumulator, current) => accumulator + parseFloat(current.relevance_score),0);
        relevance_average = sentiments.reduce((accumulator, current) => accumulator + parseFloat(current.relevance_score),0) / sentiments.length;
        res = {
            ticker: ticker,
            sentiment_count: sentiments.length,
            sentiment_average: sentiment_average.toFixed(6),
            relevance_average: relevance_average.toFixed(6),
//            sentiment_relevant: sentiment_average50.toFixed(6),
            sentiment_score_definition: "x <= -0.35: Bearish; -0.35 < x <= -0.15: Somewhat-Bearish; -0.15 < x < 0.15: Neutral; 0.15 <= x < 0.35: Somewhat_Bullish; x >= 0.35: Bullish",
            relevance_weight_definition: "0 < x <= 1, a higher value indicating higher relevance.",
        }
        context.res = {
            // status: 200, 
            body: res
        };
    }
    catch (e) {
        context.res = {
            status: 500,
            body: e.message
        };
    }

}