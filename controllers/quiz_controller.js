var models = require('../models/models')

// GET quizes/:id
//busca en bbdd por id y manda a la vista el objeto quiz

exports.show = function(req,res){
    models.Quiz.find(req.params.quizId).then(function(quiz){
        res.render('quizes/show', { quiz: quiz })
    })
};

// GET quizes/:id/answer
exports.answer = function(req,res) {
    models.Quiz.find(req.params.quizId).then(function (quiz) {
        if (req.query.respuesta === quiz.respuesta) {
            res.render('quizes/answer', {quiz: quiz, respuesta: 'Correcto', color: 'panel panel-green'});
        } else {
            res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecto', color: 'panel panel-red'});
        }
    })
}


// GET quizes
exports.index = function(req,res){
    models.Quiz.findAll().then(function(quizes){
        res.render('quizes/indes')
    })
}