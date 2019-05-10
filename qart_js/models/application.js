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
    return sequelize.define('Application', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(50),
            field: 'name',
            allowNull: false
        },
        descr: {
            type: DataTypes.STRING(250),
            field: 'descr',
            allowNull: true
        },
        appType: {
            type: DataTypes.STRING(150),
            field: 'appType',
            allowNull: true
        }
    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
                db.Application.hasMany(db.Version);
                db.Application.hasMany(db.Strategy);
            },
            save: function(model) {
                return db.Application.findById(model.id).then(function(modelAnt) {
                    if (modelAnt){
                      return modelAnt.update(model);
                    }
                    else{
                      return db.Application.create(model);
                    }
                });
            }
        }
    });
};
