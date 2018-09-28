module.exports =  (sequelize, Sequelize)=> {
    const schema = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        message: {
            type: Sequelize.STRING,
            notEmpty: true
        },
    }
    let Messages = sequelize.define('Messages', schema, {
        timestamps: true
    });

    return Messages;
}
