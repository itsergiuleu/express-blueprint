const Sequelize = require('sequelize');
const cls = require('cls-hooked');

module.exports = function({ sequelize }) {
    if (!sequelize || !(sequelize instanceof Sequelize)) {
        throw new Error('must be passed an instance of Sequelize');
    }

    let namespace;
    if (!Sequelize.cls) {
        namespace = cls.createNamespace('blueprint-trx-namespace');
        Sequelize.cls = namespace;
    }

    return function(req, res, next) {
        sequelize.transaction(async function(t) {
            next();
            await new Promise(() => res.on('finish', () => {
                if (res.statusCode && res.statusCode >= 400) {
                    return t.rollback();
                }

                return t.commit();
            }));
        })
            .catch(next);
    };
};
