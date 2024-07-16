import {errorHandler} from '../exceptions/GenericErrorHandler';

export default (app) => {
    app.use(errorHandler);
}
