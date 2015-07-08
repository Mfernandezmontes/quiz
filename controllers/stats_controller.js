/**
 * Created by adminlocal on 6/07/15.
 */

var models = require('../models/models');


var stats = {
          cntQuizes: 0,
          cntComments: 0,
          cntCommentsAvgQuiz: 0,
          cntQuizesUnCommented:0,
          cntQuizesCommented:0
    };

var errors = [];

// GET quizes/status
//busca en bbdd por id y manda a la vista el objeto quiz
exports.getdata = function(req,res, next){

      models.Quiz.count() // número de preguntas
      .then(function (cntQuizes) {
            stats.cntQuizes = cntQuizes;

            return models.Comment.count(); // número de comentarios
          })
      .then(function (cntComments) {
            stats.cntComments = cntComments;
              return models.sequelize.query('SELECT count(*) AS "n" FROM "Quizzes" WHERE "id" NOT IN (SELECT DISTINCT "QuizId" FROM "Comments")', { type: models.sequelize.QueryTypes.SELECT} ); // El número de preguntas SIN comentarios
          })
      .then(function (cntQuizesUnCommented) {
            stats.cntQuizesUnCommented = cntQuizesUnCommented[0].n;

            return models.sequelize.query('SELECT count(DISTINCT "QuizId") AS "n" FROM "Comments"', { type: models.sequelize.QueryTypes.SELECT} ); // El número de preguntas CON  comentarios
          })
      .then(function(cntQuizesCommented){
              stats.cntQuizesCommented = cntQuizesCommented[0].n;
          })

      .catch(function (err) { errors.push(err); })
      .finally(function () {

              stats.cntCommentsAvgQuiz   = stats.cntQuizes / stats.cntComments

            next();
                            });
}

exports.show = function(req,res){
    res.render('stats/stats.ejs', {stats: stats, errors: [] })
    console.log(stats);
}