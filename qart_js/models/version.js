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
    return sequelize.define('Version', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        version: {
            type: DataTypes.STRING(50),
            field: 'version',
            allowNull: false
        },
        descr: {
            type: DataTypes.STRING(150),
            field: 'descr',
            allowNull: true
        },
        uri: {
            type: DataTypes.STRING(150),
            field: 'uri',
            allowNull: true
        },
        architecture: {
            type: DataTypes.STRING(250),
            field: 'architecture',
            allowNull: true
        }
    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
                db.Version.belongsTo(db.Application);
            },
            save: function(model) {
                return db.Version.findById(model.id).then(function(modelAnt) {
                    if (modelAnt){
                      return modelAnt.update(model);
                    }
                    else{
                      return db.Version.create(model);
                    }
                });
            }
        }
    });
};
