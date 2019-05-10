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
    return sequelize.define('TestTask', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        sequence: {
            type: DataTypes.INTEGER,
            field: 'sequence',
            allowNull: false
        },
        descr: {
            type: DataTypes.STRING(150),
            field: 'descr',
            allowNull: false
        },
        testType: {
            type: DataTypes.STRING(4),
            field: 'testType',
            allowNull: false
        },
        objective: {
            type: DataTypes.STRING(250),
            field: 'objective',
            allowNull: true
        },
        withVRT: {
            type: DataTypes.STRING(1),
            field: 'withVRT',
            allowNull: true
        }
    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
                db.TestTask.belongsTo(db.Strategy);
                db.TestTask.belongsTo(db.Version);
            },
            save: function(model) {
                return db.TestTask.findById(model.id).then(function(modelAnt) {
                    if (modelAnt){
                      return modelAnt.update(model);
                    }
                    else{
                      return db.TestTask.create(model);
                    }
                });
            }
        }
    });
};
