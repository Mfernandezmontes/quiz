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
// GET quizes?search=search
exports.index = function(req,res){

    //Si no se ha ralizado buscqueda muestra todos
    if(req.query.search === undefined){
        models.Quiz.findAll().then(
            function(quizes){
                res.render('quizes/index.ejs',{ quizes: quizes })
            }).catch(function(error){ next(error)});

    //si la query lleva algun valor
    }else{
        var querySearch = '%' +  req.query.search + '%'
        models.Quiz.findAll({where: ["pregunta like ?", querySearch]}).then(
            function(quizes){
                res.render('quizes/index.ejs',{ quizes: quizes })
                querySearch = ''
            }).catch(function(error){ next(error)});
    }
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


// GET quizes/new
exports.new = function(req,res){
    var quiz = models.Quiz.build(
        {pregunta:'Pregunta', respuesta:'Respuesta' }
    );
    res.render('quizes/new', {quiz:quiz}) //TODO: crear la vista ejs
}

// POST quizes/create
exports.create = function(req,res){
    var quiz = models.Quiz.build(req.body.quiz);
    //guarda en la bd campos pregunta y respuesta del quiz
    quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
        res.redirect('/quizes');
        //Redireccion de HTTP (url relativo) lista de preguntas
    })

}