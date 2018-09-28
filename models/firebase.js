module.exports =  (sequelize, Sequelize)=> {
    const schema = {
        Subid: {
            primaryKey: true,
            type: Sequelize.STRING
        }
    }
    let Subscriptions = sequelize.define('Subscriptions', schema, {
        timestamps: true
    });

    return Subscriptions;
}
