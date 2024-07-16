import {Sequelize} from "sequelize";
import {ENV_CONST} from "../constants";

const createNamespace = require("cls-hooked").createNamespace;
const namespace = createNamespace("blueprint-trx-namespace");
Sequelize.useCLS(namespace);

const logging = ENV_CONST.DB_LOGGING != 'false'

const db = new Sequelize(ENV_CONST.DB_CONNECTION, {logging});


db.authenticate()
    .then(() => {
        console.log("Database connected...");
        return db;
    })
    .then(() => console.log("Models synced..."))
    .catch((err) =>
        console.log(
            `Database connection couldn't be established: ${err.message}`,
            err
        )
    );

export default db;
