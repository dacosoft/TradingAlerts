const axios = require('axios');

module.exports = async function (context, req) {
    //    context.log('JavaScript HTTP trigger function processed a request.');
    const totalAmount = (req.query.amount || (req.body && req.body.amount));
    const price = (req.query.price || (req.body && req.body.price));
    if (price && totalAmount) {
        const payload = {
            "instrument_code": "BTC_EUR",
            "type": "LIMIT",
            "side": "BUY",
            "amount": "0.1",
            "price": "22000.0",
            "time_in_force": "GOOD_TILL_CANCELLED",
            "is_post_only": true
        }
        const price1 = price - 891
        const price2 = price - 792
        const price3 = price - 693
        const unit1 = Math.round(totalAmount / 3 / price1 * 1000) / 1000
        const unit2 = Math.round(totalAmount / 3 / price2 * 1000) / 1000
        const unit3 = Math.round(totalAmount / 3 / price3 * 1000) / 1000
        const token2 = "eyJvcmciOiJiaXRwYW5kYS1nZSIsImFsZyI6IlJTMjU2Iiwia2lkIjoiZXhjaGFuZ2UtbGl2ZSJ9.eyJhdWQiOlsiaHR0cHM6Ly9hcGkuZXhjaGFuZ2UuYml0cGFuZGEuY29tIiwid3NzOi8vc3RyZWFtcy5leGNoYW5nZS5iaXRwYW5kYS5jb20iXSwic3ViIjoiYWNjOjZlZmQwNzI5LTRjODMtNDUyYi1iZWI1LTk4NDA1MGQzZjRkZSIsInNjcCI6WyJXSVRIRFJBVyIsIlJFQURfT05MWSIsIlRSQURFIl0sIm5iZiI6MTY4NDEzNjA5NiwiYWNoIjoiYnBjOjZlZmQwNzI5LTRjODMtNDUyYi1iZWI1LTk4NDA1MGQzZjRkZSIsImlzcyI6Imh0dHBzOi8vYXBpLmV4Y2hhbmdlLmJpdHBhbmRhLmNvbS9vYXV0aDIiLCJpcHMiOlsiNzcuMTc0LjIxNS4xMCIsIjg2Ljk1LjI0Ny4yMDUiXSwiaWF0IjoxNjg0MTM2MDk2LCJqdGkiOiI3NDQxMThlZi1iZmM2LTQ2YjUtYmU1Ny01ZjMwNWIyNDQyMjIifQ.G1ttnu49ZZ9ySPMJNFTIVTBpRgImYUB6n1j_P0_gH6hwm16NEgnwtuYkDkSe5wsHskep_tfP9zp1jswc24pBeXk9zo_pNwpgyWkOPCTZNPu3kTj_q8PpuaNboboQqiqfEHrIgyYRalJQP8DC2rFRAmjZz1xHhmlIrLYXdtzJIjJDbWkafYDN9g-nIkekJgSqEUKcqwT2ProMt5TQx1SVqPIgO9-Cy0tUb2AR9jWWMU089mY0Gkh8hU-VrZMLeGdX_pskMhwFK-kRRpA6WXbTVWPNuXdvy232-VBP27IlJ7f2RZEMFj1LoRJWWoIamWgO4ZFNwlwb5KLS0A6DKhbv5mIdeJg02nsCYLHRW4M0fFMgf_nYtNeYJpCis4is4V4_dH-1JINnS1rVU7_T3gbFKeUeqkJPDXv7JDMjm3MOHy8KfPnL783HHdD352ybU5YXQ_W8iLwvNn3gDBIJKlnzWHjNJm7Kf19kHFL4gf0zHScHeuZ9qh_btQde1lvzyWtsM4rQmtTMT9xLwz4LGW4T8Y3Re9q-uA9o9qAlINulcduzepzxaQP_JHadK7OLMIM-CFklHKoBctOP8XlUgncHFVXljkyPbaM3dGrJm_hw4j-ddm4w8eas3M-buqbequkMVspaTJ0asGBpK8TQ3lhLXtxvzxXAI1EJCOa53xGUpt4";
        const token = 'eyJvcmciOiJiaXRwYW5kYS1nZSIsImFsZyI6IlJTMjU2Iiwia2lkIjoiZXhjaGFuZ2UtbGl2ZSJ9.eyJhdWQiOlsiaHR0cHM6Ly9hcGkuZXhjaGFuZ2UuYml0cGFuZGEuY29tIiwid3NzOi8vc3RyZWFtcy5leGNoYW5nZS5iaXRwYW5kYS5jb20iXSwic3ViIjoiYWNjOjZlZmQwNzI5LTRjODMtNDUyYi1iZWI1LTk4NDA1MGQzZjRkZSIsInNjcCI6WyJXSVRIRFJBVyIsIlJFQURfT05MWSIsIlRSQURFIl0sIm5iZiI6MTY4NDI1NjE4NSwiYWNoIjoiYnBjOjZlZmQwNzI5LTRjODMtNDUyYi1iZWI1LTk4NDA1MGQzZjRkZSIsImlzcyI6Imh0dHBzOi8vYXBpLmV4Y2hhbmdlLmJpdHBhbmRhLmNvbS9vYXV0aDIiLCJpcHMiOlsiNzcuMTc0LjIxNS4xMCIsIjg2Ljk1LjI0Ny4yMDUiLCIyMC41Mi4yMDkuMzUiLCIyMC41Mi4yMDkuMzgiLCIyMC41Mi4yMDkuNjkiXSwiaWF0IjoxNjg0MjU2MTg1LCJqdGkiOiI3NzNlNWYwNC1iMDg1LTQ0MzQtOGIzZC1iNmI1MzYyMmY5NGUifQ.Ew6Ae-jZK4d3EUvl_6Mx3b4qG8pWeOhYvLjPm4TjIBCyxRY4q9rNiBVYSvUT9qqVviDka3zlnRiC0LmQCqP-jr8dfmFAMWZA4zgV52JBshfITvOylywdby2anF9wHaeOJkz0EzNG2Yyp7FlolTrsGdMpRXaLa9gEt-BUUKw6wDri0U6pT4RUbmNkoOkgEVUEYe7EupzyYMog-ozym-KfjjHJ6lOn6xIDxQ_7XgWajzALOfSj6kNPpSTgtkGALALStP6dZ2t-vsMzb_CMrgqSeAVEmYymp-Npe3iKKuhEUXk1AbSoSBMHeYb7ZluVMBPEh432KZnEjMUQdYJPtPNX471xNj7Ca34Y_BLxzj6w74tOr3BBryE2KHu-fIUpPsDbFbAlgBDLErP721dlNDN8fgnZvLX4idCilgXQnG74MXmx8JidUaqBRNnSjPIxCI0ZXSms-sF5by2XdxuWqo8se73nZb_F_kf30KZxsVYToCWpsfM6LUdFxfSCghl9cw3Ye9THberBgv9JaQzS-cwrOH4qRIfijmYmwTgz8mZbd_EIIqgEPIDGREVGvhY88hGn9_rsWRym5_Rc0ftbo4G3R82kQyV_-Qv57IHxnccHxXv5gVZyncJxtwXhIxgc6rS4ARAekO1lI7fRlzMHld5tqjbNaaosfgAfhM9558Lyyms';
        const tokenFree = "eyJvcmciOiJiaXRwYW5kYS1nZSIsImFsZyI6IlJTMjU2Iiwia2lkIjoiZXhjaGFuZ2UtbGl2ZSJ9.eyJhdWQiOlsiaHR0cHM6Ly9hcGkuZXhjaGFuZ2UuYml0cGFuZGEuY29tIiwid3NzOi8vc3RyZWFtcy5leGNoYW5nZS5iaXRwYW5kYS5jb20iXSwic3ViIjoiYWNjOjZlZmQwNzI5LTRjODMtNDUyYi1iZWI1LTk4NDA1MGQzZjRkZSIsInNjcCI6WyJXSVRIRFJBVyIsIlJFQURfT05MWSIsIlRSQURFIl0sIm5iZiI6MTY4NDI1NzcxMCwiYWNoIjoiYnBjOjZlZmQwNzI5LTRjODMtNDUyYi1iZWI1LTk4NDA1MGQzZjRkZSIsImlzcyI6Imh0dHBzOi8vYXBpLmV4Y2hhbmdlLmJpdHBhbmRhLmNvbS9vYXV0aDIiLCJpcHMiOltdLCJpYXQiOjE2ODQyNTc3MTAsImp0aSI6IjcxNDY0NWU3LWZlNDEtNGRmMy1hNzVkLTA3NDIzMjQ3NjI0YSJ9.hYcWmah4UWrXH5UWPOr6KHBfp_ZatIe99x9OBJnRh_3KcE3a9lTtLKQgcgiDx7-b6wSXpveQIC9am3nMQkRyWtprRWGJe0nipYuNbQ7waQjXKLIaa7orTsnHpHs9mfw6qAVjQK8U-7KOq0AAe5vldkStX55XZLCrIXq8gMQJlGT0hCmcZHZXMBYusKlV9gUWrljpvXh8Pbf9OUp73r56_L56LJzDJqkWoiSl96qOEO_zONVW0HPlQ9oOfQpgz6w9P-fT-J4M6ggQoJbtCa1puwaGG4LK-DDVbpgc3aOm3WgWS7_1xL2H1omax0lx4OlduxdzJuWl757IO6dNyYPF-_UwACWEITiYPrrGzeW3NzQv_LqL6Tjx0KOUtsykWPRdvjRcBsT9O0BwP4Y9TunkyjJoDiA-6Oohywt7rdT-Y-3i23EMFerIwrC7TAddCG4x2Jp4Tc2VdyMLA4Z-93zbHXrILtjNRp9BbCmdFLU0pkW-97FcG9vKxOOsth6QHSekkJKPPx6E62HjB2yH91BKBeMfvPh70v6IsgaG1J7ANHZx0Ii6oeqTkCSYuljysGf5spnHPVVhxeKjAad4UEiLrwfARAKxgMm9mNF8cCiTegSMVBVqCFzsiIb6vLbqy_D8LsOF9CvrkZm9iC-acn2x2gXZiiFF9-qIAw1ExlIdIqQ";
        //const config = {
        //    headers: { Authorization: `Bearer ${tokenFree}` }
        //};

        axios.defaults.headers.common = { 'Authorization': `Bearer ${tokenFree}`, 'Accept': 'application/json' }


        try {
            //const response2  = await axios.get('https://api.exchange.bitpanda.com/public/v1/account/orders')
            const response0 = await axios.delete('https://api.exchange.bitpanda.com/public/v1/account/orders')
            //            if (response1.status == 200) {
            payload.amount = units1
            payload.price = price1
            const response1 = await axios.post('https://api.exchange.bitpanda.com/public/v1/account/orders', payload)
            payload.amount = units2
            payload.price = price2
            const response2 = await axios.post('https://api.exchange.bitpanda.com/public/v1/account/orders', payload)
            payload.amount = units3
            payload.price = price3
            const response3 = await axios.post('https://api.exchange.bitpanda.com/public/v1/account/orders', payload)
            context.log(JSON.stringify(response3.data));
            context.log(`statusCode: ${response3.statusCode}`);
            context.log(JSON.stringify(response3.data));
            //            }
            context.res = {
                // status: 200, 
                body: response3.data
            };
        }
        catch (e) {
            context.res = {
                // status: 200, 
                body: e.message
            };
        }
    }
}

/*
    const payload = {
            "instrument_code": "BTC_EUR",
            "type": "LIMIT",
            "side": "BUY",
            "amount": "0.1",
            "price": "22000.0",
            "time_in_force": "GOOD_TILL_CANCELLED",
            "is_post_only": true
          }
    payload.amount =

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name)) ?? "janbodnar" ;
    const response  = await axios.get(`https://api.github.com/users/${name}`)
    context.log(`statusCode: ${response.statusCode}`);
    context.log(response);

    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, 
        body: response.data
    };
} 


*/