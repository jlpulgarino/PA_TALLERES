var allow = require('../services/allow');
var utils = require('../services/utils');
var db = require('../models');
//var Promise = require('bluebird');
var express = require('express');
var router = express.Router();

/**
 * Define el comportamiento de un Get enviado a la ruta 'proyecto/:id' para obtener un proyecto particular
 */
router.get('/:id', function(req, res, next) {
    db.Job.findById(req.params.id).then(function(resp) {
        return res.send(resp);
    }).catch(next);
});
/**
 * Define el comportamiento de un Get enviado a la ruta 'proyecto/ para obtener Todos los proyectos
 */
router.get('/', function(req, res, next) {
    db.Job.findAll().then(function(resp) {
        return res.send(resp);
    }).catch(next);
});

/**
 * Define el comportamiento de un Get enviado a la ruta 'proyecto/:id' para obtener Todos los proyectos
 * filtrados por nombre o descripcion.
 */
router.get('/filtro/:parm', function(req, res, next) {
    db.Job.findAll({
        where: {
            $or: [{
                name: {
                    $like: '%' + req.params.parm + '%'
                }
            }, {
                descr: {
                    $like: '%' + req.params.parm + '%'
                }
            }]
        }
    }).then(function(resp) {
        return res.send(resp);
    }).catch(next);
});

/**
 * Define el comportamiento de un Get enviado a la ruta 'proyecto/:id' para obtener Todos los proyectos
 */
router.delete('/:id', function(req, res, next) {
    console.log('Delete('+req.params.id+')');
    db.Job.findById(req.params.id).then(function(departamentoEliminado) {
        if (departamentoEliminado) {
            return departamentoEliminado.destroy().then(function() {
                return res.send('OK');
            });
        } else {
            return res.send('OK');
        }
    }).catch(next);
});


router.post('/', function(req, res, next) {

    var data = utils.getterFromPost(req);
    var departamentoEmulado = {
        id: data.get('id'),
        chronFlag: data.get('chronFlag', 'chronFlag field is required'),
        descr: data.get('descr', 'descr field is required'),
        chronExpr: data.get('chronExpr'),
        status: data.get('status', 'descr field is required'),
        StrategyId: data.get('StrategyId', 'StrategyId field is required')
    };

    db.Job.save(departamentoEmulado).then(function(departamentoActualizado) {
        res.send(departamentoActualizado);
    }).catch(next);

});

/**
 * MANEJO DE SUBPROYECTOS
 */

router.get('/:id/steps/', function(req, res, next) {
    var jobId = req.params.id;
    var jobEmulado = db.Job.build({
        id: jobId
    });
    return jobEmulado.getSteps().then(function(steps) {
        steps.sort(function(a, b) {
            return a.id - b.id;
        });
        res.send(steps);
    });
});
/*
router.post('/:id/versions/', function(req, res, next) {
    var applicationId = req.params.id;
    var data = utils.getterFromPost(req);
    var version = {
        id: data.get('id'),
        version: data.get('version', 'version is required.'),
        descr: data.get('descr'),
        uri: data.get('uri'),
        architecture: data.get('architecture'),
        StrategyId: data.get('StrategyId', 'application is required.')
    };


    var applicationEmulado = db.Strategy.build({
        id: applicationId
    });
    var versionCreado;
    return db.Version.save(version).then(function(versionCreatedP) {
        versionCreado = versionCreatedP;
        return versionCreado;
    }).then(function() {
        console.log('application[' + applicationEmulado.id + '], versionCreado.id=' + versionCreado.id);
        return applicationEmulado.addVersion(versionCreado.id, versionCreado);
    }).then(function() {
        res.send(versionCreado);
    }).catch(next);
});


router.delete('/:applicationId/versions/:id', function(req, res, next) {
    var applicationId = req.params.applicationId;
    var versionId = req.params.id;
    var version = db.Version.build({
        id: versionId
    });

    version.destroy().then(function() {
        return res.send('OK');
    }).catch(next);

});
*/

module.exports = router;
