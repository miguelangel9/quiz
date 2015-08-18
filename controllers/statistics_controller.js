var models = require('../models/models.js');
var Sequelize = require('sequelize');

var ArregloDatos = [];

// GET /statistics
exports.index = function(req, res) {

Sequelize.Promise.all([
 models.Quiz.count(),
 models.Comment.count(),
 models.Quiz.count({distinct: true, 
     include: [{ model: models.Comment, required: true}]})
  ]).then(function(conteo) {
ArregloDatos[0] = {texto: "No. de preguntas", valor: conteo[0]};
ArregloDatos[1] = {texto: "No. de comentarios", valor: conteo[1]};
ArregloDatos[2] = {texto: "No. medio de comentarios por pregunta", valor: conteo[0]?(conteo[1] / conteo[0]).toFixed(1):0 };
ArregloDatos[3] = {texto: "No. de preguntas sin comentarios", valor: conteo[0]-conteo[2]};
ArregloDatos[4] = {texto: "No. de preguntas con comentarios", valor: conteo[2]};
      res.render('statistics/index.ejs', {datos: ArregloDatos, errors: []});
    }
).catch(function(error) { next(error); });
};


