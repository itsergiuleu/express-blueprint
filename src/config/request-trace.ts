import httpContext from "express-http-context";
import { v4 } from 'uuid';

const REQ_ID_CONTEXT_PROPERTY_KEY = 'reqId';
const USER_ID_CONTEXT_PROPERTY_KEY = 'userId';

export const attachReqIdMiddleware = (req, res, next) => {
    try {
        httpContext.set(REQ_ID_CONTEXT_PROPERTY_KEY, v4());
    } catch (e) {
        // avoid terminating the process
    }
    next();
};

// to be called when logging in a user
export const attachUserIdToContextSync = (userId) => {
    try {
        httpContext.set(USER_ID_CONTEXT_PROPERTY_KEY, userId);
    } catch (e) {
        // avoid terminating the process
    }
};

export const getReqAndUserIdFromContext = () => {
    try {
        const reqId = httpContext.get(REQ_ID_CONTEXT_PROPERTY_KEY);
        const userId = httpContext.get(USER_ID_CONTEXT_PROPERTY_KEY);

        return `${reqId || 'NotAvailable'}:${userId || 'NotAvailable'}`
    } catch (e) {
        // avoid terminating the process
        return 'NotAvailable:NotAvailable';
    }
};
