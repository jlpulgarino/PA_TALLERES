/*jslint node: true */
'use strict';
/**
 * Define el modelo de un Categoriaproceso
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
    //Se definen los campos de un examen
    return sequelize.define('Strategy', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descr: {
            type: DataTypes.STRING(150),
            field: 'descr',
            allowNull: true
        },
        level: {
            type: DataTypes.STRING(2),
            field: 'level',
            allowNull: false
        },
        objective: {
            type: DataTypes.STRING(250),
            field: 'objective',
            allowNull: true
        }
    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
                db.Strategy.belongsTo(db.Application);
                db.Strategy.hasMany(db.TestTask);
            },
            save: function(model) {
                return db.Strategy.findById(model.id).then(function(modelAnt) {
                    if (modelAnt){
                      return modelAnt.update(model);
                    }
                    else{
                      return db.Strategy.create(model);
                    }
                });
            }
        }
    });
};
