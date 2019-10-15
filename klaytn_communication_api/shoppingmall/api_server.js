const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require("./route/router");
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//false일 경우 String Object로만 받고
//true일 경우엔 어떤 타입이든지 다 받을 수 있다.

app.use(router);

app.listen(port, err => {
    if(err) console.log(err);
    else console.log("서버가 가동되었습니다.")
});