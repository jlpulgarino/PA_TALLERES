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
    return sequelize.define('StepInstance', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: DataTypes.STRING(4),
            field: 'status',
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATE,
            field: 'startDate',
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            field: 'endDate',
            allowNull: false
        },
        urlResult: {
            type: DataTypes.DATE,
            field: 'urlResult',
            allowNull: false
        }
    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
                db.StepInstance.belongsTo(db.JobInstance);
                db.StepInstance.belongsTo(db.Step);
            },
            save: function(model) {
                return db.StepInstance.findById(model.id).then(function(modelAnt) {
                    if (modelAnt){
                      return modelAnt.update(model);
                    }
                    else{
                      return db.StepInstance.create(model);
                    }
                });
            }
        }
    });
};
