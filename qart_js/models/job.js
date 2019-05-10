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
    return sequelize.define('Job', {
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
        chronFlag: {
            type: DataTypes.STRING(1),
            field: 'chronFlag',
            allowNull: false
        },
        chronExpr: {
            type: DataTypes.STRING(50),
            field: 'chronExpr',
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(1),
            field: 'status',
            allowNull: false
        }
    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
                db.Job.belongsTo(db.Strategy);
                db.Job.hasMany(db.Step);
                db.Job.hasMany(db.JobInstance);
          },
            save: function(model) {
                return db.Job.findById(model.id).then(function(modelAnt) {
                    if (modelAnt){
                      return modelAnt.update(model);
                    }
                    else{
                      return db.Job.create(model);
                    }
                });
            }
        }
    });
};
