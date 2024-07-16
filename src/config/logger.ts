import {getReqAndUserIdFromContext} from "./request-trace";
import winston from "winston";
import moment from 'moment';

const consoleFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
        logData => `[ ${moment().format('YYYY-MM-DD hh:mm:ss')} - ${logData.level} - ${getReqAndUserIdFromContext()}] : ${getLogMessage(logData)}`,
    )
);

const getLogMessage = (logData) => {
    if (logData.stack) {
        return `message=${logData.message},\nStacktrace: ${logData.stack}`;
    }

    return `message=${logData.message}`;
};


const logger = winston.createLogger({
    level: 'debug',
    transports: [
        new winston.transports.Console({format: consoleFormat}),
    ]
});

export default logger;