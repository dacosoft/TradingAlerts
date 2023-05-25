const axios = require('axios');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const body = typeof req.body === "object" ? JSON.stringify(req.body) : req.body;
    const responseMessage = body
        ? "Body: " + body + "."
        : "No body.";

    context.log(responseMessage);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

    const token0 = 'eyJvcmciOiJiaXRwYW5kYS1nZSIsImFsZyI6IlJTMjU2Iiwia2lkIjoiZXhjaGFuZ2UtbGl2ZSJ9.eyJhdWQiOlsiaHR0cHM6Ly9hcGkuZXhjaGFuZ2UuYml0cGFuZGEuY29tIiwid3NzOi8vc3RyZWFtcy5leGNoYW5nZS5iaXRwYW5kYS5jb20iXSwic3ViIjoiYWNjOjZlZmQwNzI5LTRjODMtNDUyYi1iZWI1LTk4NDA1MGQzZjRkZSIsInNjcCI6WyJXSVRIRFJBVyIsIlJFQURfT05MWSIsIlRSQURFIl0sIm5iZiI6MTY4NDI1NjE4NSwiYWNoIjoiYnBjOjZlZmQwNzI5LTRjODMtNDUyYi1iZWI1LTk4NDA1MGQzZjRkZSIsImlzcyI6Imh0dHBzOi8vYXBpLmV4Y2hhbmdlLmJpdHBhbmRhLmNvbS9vYXV0aDIiLCJpcHMiOlsiNzcuMTc0LjIxNS4xMCIsIjg2Ljk1LjI0Ny4yMDUiLCIyMC41Mi4yMDkuMzUiLCIyMC41Mi4yMDkuMzgiLCIyMC41Mi4yMDkuNjkiXSwiaWF0IjoxNjg0MjU2MTg1LCJqdGkiOiI3NzNlNWYwNC1iMDg1LTQ0MzQtOGIzZC1iNmI1MzYyMmY5NGUifQ.Ew6Ae-jZK4d3EUvl_6Mx3b4qG8pWeOhYvLjPm4TjIBCyxRY4q9rNiBVYSvUT9qqVviDka3zlnRiC0LmQCqP-jr8dfmFAMWZA4zgV52JBshfITvOylywdby2anF9wHaeOJkz0EzNG2Yyp7FlolTrsGdMpRXaLa9gEt-BUUKw6wDri0U6pT4RUbmNkoOkgEVUEYe7EupzyYMog-ozym-KfjjHJ6lOn6xIDxQ_7XgWajzALOfSj6kNPpSTgtkGALALStP6dZ2t-vsMzb_CMrgqSeAVEmYymp-Npe3iKKuhEUXk1AbSoSBMHeYb7ZluVMBPEh432KZnEjMUQdYJPtPNX471xNj7Ca34Y_BLxzj6w74tOr3BBryE2KHu-fIUpPsDbFbAlgBDLErP721dlNDN8fgnZvLX4idCilgXQnG74MXmx8JidUaqBRNnSjPIxCI0ZXSms-sF5by2XdxuWqo8se73nZb_F_kf30KZxsVYToCWpsfM6LUdFxfSCghl9cw3Ye9THberBgv9JaQzS-cwrOH4qRIfijmYmwTgz8mZbd_EIIqgEPIDGREVGvhY88hGn9_rsWRym5_Rc0ftbo4G3R82kQyV_-Qv57IHxnccHxXv5gVZyncJxtwXhIxgc6rS4ARAekO1lI7fRlzMHld5tqjbNaaosfgAfhM9558Lyyms'
    
    const token = "eyJvcmciOiJiaXRwYW5kYS1nZSIsImFsZyI6IlJTMjU2Iiwia2lkIjoiZXhjaGFuZ2UtbGl2ZSJ9.eyJhdWQiOlsiaHR0cHM6Ly9hcGkuZXhjaGFuZ2UuYml0cGFuZGEuY29tIiwid3NzOi8vc3RyZWFtcy5leGNoYW5nZS5iaXRwYW5kYS5jb20iXSwic3ViIjoiYWNjOjZlZmQwNzI5LTRjODMtNDUyYi1iZWI1LTk4NDA1MGQzZjRkZSIsInNjcCI6WyJSRUFEX09OTFkiXSwibmJmIjoxNjg0MjU3MTU2LCJhY2giOiJicGM6NmVmZDA3MjktNGM4My00NTJiLWJlYjUtOTg0MDUwZDNmNGRlIiwiaXNzIjoiaHR0cHM6Ly9hcGkuZXhjaGFuZ2UuYml0cGFuZGEuY29tL29hdXRoMiIsImlwcyI6W10sImlhdCI6MTY4NDI1NzE1NiwianRpIjoiYmFjY2VkYzItMzkyZi00YjhhLTllNjgtMzRiNzllZTZhNWU5In0.bb3QlPdB9ttBp2cdfIUVJ70BqdXWFH9iXoWm4O_kQftcaHVPW74X6UZkfJ8gAUltIIrbCMGJpCX_bKJojwGHoepWM_2F2doIFsRMxiNlrRsUo54hc8AMthh9PBj79XO-wKkeTJMzMeK0KLvDRSYXYfgDQ_LkSquUCfy2WwuXNBVkJijSLACC6imhwKh9eZUoVNfprJL2e4Gghnu-hc2phFyT5mhDX9feV5diISRTAR7ZlNwIdJZYYHtpJDI-V0YVRQF8BD8DxFgzNqN0pxcsZGJOlx1aIYJh3zBO0yaHP7xKYulOjYOZMfhBKRxuMiLK1SHDNSOBUdQjtLHqht9kidPwHeWAg0lgmVFuvpud7ZFqRJa70hvJy1LnO69JimdFjvRoh2Vx_-dssxZkO92xqxdfHFamvMCDLhlqvRYHUXABGdjLFx2I2Rw8C1JhFLp-mcvGxt8-ycBD-6JIQQMapOvxaqaQkdUb-EUZqDoOfzenKO06n1rPo5uG5hbO6RnDkaidjJNVmjaXWs49ssk-efqMi691m7_Zgvo8I60vgf_Xde3588gpC3A08zXxjaq8sYRl7pkgJdj7jSQDpt0EBar_kKdTkd5Hb55hj-hzAb48rDXJU6RGHRwga26W6IQsD1f2DNdOepjNivCEOcYRgog8ZUhu8EgkOh7UDSOv9mc";
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }


    try {
        const response = await axios.get('https://api.exchange.bitpanda.com/public/v1/account/orders')


        context.res = {
            // status: 200, 
            body: response.data
        };
    }
    catch (e) {
        context.res = {
            // status: 200, 
            body: e.message
        };
    }


}