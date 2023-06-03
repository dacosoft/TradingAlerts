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

    const symbols = [
        'NYSE-ACN',
        'NASDAQ-ADBE',
        'NASDAQ-AMZN',
        'NASDAQ-ASML',
        'NASDAQ-AZN',
        'NYSE-CMG',
        'NASDAQ-CPRX',
        'NYSE-CRM',
        'NASDAQ-CRWD',
        'NASDAQ-CSCO',
        'NYSE-DHR',
        'NYSE-EQT',
        'NASDAQ-FSLR',
        'NASDAQ-GOOGL',
        'NYSE-KOF',
        'NYSE-LIN',
        'NYSE-LLY',
        'NASDAQ-META',
        'NYSE-MRK',
        'NASDAQ-MSFT',
        'NASDAQ-NFLX',
        //        'NASDAQ-NNDM',
        'NYSE-NOW',
        'NASDAQ-NVDA',
        'NYSE-NVO',
        'NASDAQ-PANW',
        'NYSE-PFE',
        'NASDAQ-SDGR',
        'NYSE-SNOW',
        'NASDAQ-TMUS',
        'NASDAQ-TSLA',
        //        'NYSE-TWTR',
        'NYSE-U',
        'NYSE-UNH',
        'NYSE-V',
        'NYSE-WM',
        'NYSE-WMT',
        'NASDAQ-AAPL'
    ];
    const tickers = ['AAPL', 'ACN'];
    const relevance = parseFloat(req.query.relevance || (req.body && req.body.relevance) || "0.5");
    const duration = parseFloat(req.query.duration || (req.body && req.body.duration) || "0");
    // https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=ADBE&apikey=ZUBZVOOY7AA13CYK
    context.log('NEWS_SENTIMENT for tickers:');
    const ApiKey = "ZUBZVOOY7AA13CYK";


    try {
        resp = await Promise.all( tickers.map(async (ticker) => {

            const response = await axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${ApiKey}`)
            context.log(`statusCode: ${response.statusCode}`);
            //context.log(JSON.stringify(response.data));
            if (!response.data.feed) 
                throw new Error(JSON.stringify(response.data));  

            sentiments = response.data.feed.map(current => flattenObject({time_published: current.time_published, sentiment :current.ticker_sentiment.find(element => element.ticker == ticker)}))
            if (duration>0){
                var d = new Date();
                d.setDate(d.getDate() - duration);
                const min_time_published = d.toISOString().split('.')[0].replace(/[^T0-9]/g, "");
                sentiments = sentiments.filter( ({time_published}) => time_published>min_time_published)
            }
            if (relevance>0) sentiments = sentiments.filter( ({relevance_score}) => relevance_score>relevance)
            weighted_average = sentiments.reduce( (accumulator, current) => accumulator + parseFloat(current.ticker_sentiment_score)*parseFloat(current.relevance_score),0)
                                /sentiments.reduce((accumulator, current) => accumulator + parseFloat(current.relevance_score),0)
            res = {
                ticker: ticker,
                sentiment: weighted_average.toFixed(6),
            }
          return res;
           //return ticker;
        })
        );

        context.res = {
            // status: 200, 
            body: resp
        };
    }
    catch (e) {
        context.res = {
            status: 500,
            body: e.message
        };
    }
}