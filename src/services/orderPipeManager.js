import config from 'config';
import cron from 'node-cron';
import RedisSMQ from 'rsmq';
import * as checker from './capacityChecker.js'
import * as engine from './plottingEngine.js'

const checkerConfig = config.get('capacityCheck');
const redisConfig = config.get('redisPipe');
const rsmq = new RedisSMQ({
    ...redisConfig,
    password: process.env.REDIS_DEFAULT_PASSWORD
});

const popMessageFromPipe = async (callback) => {
    return new Promise((resolve, reject) => {
        rsmq.popMessage({ qname: redisConfig.qname }, (err, resp) => {
            if (err === null) {
                if (resp.id) {
                    console.log(`Successfully received message with id: ${resp.id} from pipe`);
                } else {
                    console.log(`Pipe is empty`);
                }
                resolve(resp);
            } else {
                reject(err);
            }
            callback(err);
        });
    }).catch((rej) => {
        console.error(`Failed to receive message from pipe, details: ${rej}`);
    });
};

const checkCapacityAndPullFromPipe = async () => {
    var capacity = checker.checkCurrentCapacity();
    for (let i = 0; i < capacity; i++) {
        var nextMsg = await popMessageFromPipe((err) => {
            if (err !== null) console.log('Unexpected error when receiving message from pipe.');
        });
        if (!nextMsg.id) {
            console.log('No more messages in pipe. Skip pulling messages.');
            break;
        }
        var msgContent = JSON.parse(nextMsg.message);
        console.log(`Message content: ${JSON.stringify(msgContent)}`);
        engine.startPlotting(msgContent.publicKey);
    }
}

export const init = () => {
    // Check pipe per 5 minutes
    cron.schedule(checkerConfig.cronPattern, () => {
        checkCapacityAndPullFromPipe();
    });
};