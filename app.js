const express = require('express');
const pem = require("pem");
const fs = require('fs');
const https = require('https');
const spingRouter = require('./src/api/sping');
const queryRouter = require('./src/api/query');
const app = express()

const p12 = fs.readFileSync("/home/plotter/tls/mss_keystore.p12");

app.use(spingRouter);
app.use(queryRouter);

pem.readPkcs12(p12, { p12Password: "msskeystore" }, (err, res) => {
    if (err !== null) {
        console.log(err);
    }
    https.createServer({
        ...res,
        ca: res.ca[0],
        requestCert: true,
        rejectUnauthorized: false
    }, app).listen(8443, () => {
        console.log('Plotter listening 8443')
    });
});