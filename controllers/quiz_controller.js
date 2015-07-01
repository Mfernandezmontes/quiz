var models = require('../models/models')

exports.load = function(req,res,next,quizId){
    models.Quiz.find(quizId).then(
        function(quiz){
            if(quiz) {
                req.quiz = quiz;
                next();
            } else { next(new Error('No existe quizId=' + quizId ))}
        }
    ).catch(function(error){ next(error)});
}



// GET quizes
exports.index = function(req,res){
    models.Quiz.findAll().then(
        function(quizes){
            res.render('quizes/index.ejs',{ quizes: quizes})
        }).catch(function(error){ next(error)});
}

// GET quizes/:id
//busca en bbdd por id y manda a la vista el objeto quiz
exports.show = function(req,res){
        res.render('quizes/show.ejs', { quiz: req.quiz })
    }

// GET quizes/:id/answer
exports.answer = function(req,res) {
        var resultado = 'Incorrecto';
        var color = 'panel panel-red'
        if (req.query.respuesta === req.quiz.respuesta) {
            resultado = 'Correcto';
            color = 'panel panel-green';
        }
        res.render('quizes/answer.ejs', {quiz: req.quiz, respuesta: resultado, color: color});
    }

// GET quizes/:search
exports.search = function(res,req) {
    search = '%' + req.query.search + '%'
    models.Quiz.findAll({where: ["pregunta like ?", search]}).then(
        function(quizes){
            res.render('quizes/index.ejs',{ quizes: quizes})
        }
    ).catch(function(error){ next(error)});
}