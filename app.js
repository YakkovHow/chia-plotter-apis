import config from 'config';
import express from 'express';
import pem from 'pem';
import fs from 'fs';
import https from 'https';
import spingRouter from './src/api/sping.js';
import queryRouter from './src/api/query.js';
import * as pipe from './src/services/orderPipeManager.js';

const app = express();
const serverConfig = config.get('server');
const p12 = fs.readFileSync(serverConfig.p12KeyStorePath);

app.use(spingRouter);
app.use(queryRouter);
pipe.init();

pem.readPkcs12(p12, { p12Password: process.env.MSS_KEYSTORE_PASSWORD }, (err, res) => {
    if (err !== null) {
        console.log(err);
    }
    https.createServer({
        ...res,
        ...serverConfig,
        ca: res.ca[0]
    }, app).listen(serverConfig.port, () => {
        console.log(`Plotter listening ${serverConfig.port}`);
    });
});