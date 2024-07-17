import logger from "../config/logger";

export const errorHandler = (err, req, res, next) => {
    logger.error(`*** error: ${err.message}`, err);

    res.status(err.status || 500);
    res.json({
        status: err.status,
        message: err.message,
    });
};
