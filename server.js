import config, { nodeEnv, logStars } from './config';
import mongoose from './database/mongo/connection';
import sonic from './api/services/sonic';
import userRouter from "./api/routers/user";
import sonicRouter from "./api/routers/sonic";
import passport from "passport";
import express from "express";
// import { SonicChannelIngest } from 'sonic-channel/lib/channel/ingest';

const server = express();
server.use('/api/v1/', userRouter);
server.use('/api/v1/', sonicRouter);

// console.log(sonic);

// Start server
server.listen(config.port, () => {
    console.info('Quick server is started on', config.hostname + ':' + config.port);
});