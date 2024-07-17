import {errorHandler} from '../middleware/generic-error-handler.middleware';

export default (app) => {
    app.use(errorHandler);
}
