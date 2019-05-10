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
    return sequelize.define('JobInstance', {
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
        }
    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
                db.JobInstance.belongsTo(db.Job);
                db.JobInstance.hasMany(db.StepInstance);

            },
            save: function(model) {
                return db.JobInstance.findById(model.id).then(function(modelAnt) {
                    if (modelAnt){
                      return modelAnt.update(model);
                    }
                    else{
                      return db.JobInstance.create(model);
                    }
                });
            }
        }
    });
};
