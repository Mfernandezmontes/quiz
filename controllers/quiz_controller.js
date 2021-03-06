var models = require('../models/models')

//Busca los datos de quiz por id y los comentarios asociados
exports.load = function(req,res,next,quizId){
    models.Quiz.find({
                       where:{  id: quizId } ,
                      include : [{model : models.Comment }]
        }
    ).then(
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
                console.log(quizes)
                res.render('quizes/index.ejs',{ quizes: quizes, errors: [] })
            }).catch(function(error){ next(error)});

    //si la query lleva algun valor
    }else{
        var querySearch = '%' +  req.query.search + '%'
        models.Quiz.findAll({where: ["pregunta like ?", querySearch], order: "pregunta ASC"}).then(
            function(quizes){
                res.render('quizes/index.ejs',{ quizes: quizes, errors: [] })
                querySearch = ''
            }).catch(function(error){ next(error)});
    }
}

// GET quizes/:id
//busca en bbdd por id y manda a la vista el objeto quiz
exports.show = function(req,res){
        res.render('quizes/show.ejs', { quiz: req.quiz, errors: [] })
    }

// GET quizes/:id/answer
exports.answer = function(req,res) {
        var resultado = 'Incorrecto';
        var color = 'panel panel-red'
        if (req.query.respuesta === req.quiz.respuesta) {
            resultado = 'Correcto';
            color = 'panel panel-green';
        }
        res.render('quizes/answer.ejs', {quiz: req.quiz, respuesta: resultado, color: color , errors: []});
    }


// GET quizes/new
exports.new = function(req,res){
    var quiz = models.Quiz.build(
        {pregunta:'Pregunta', respuesta:'Respuesta', tema: 'Tema' }
    );
    res.render('quizes/new', {quiz:quiz, errors: []})
}

// POST quizes/create
exports.create = function(req,res){
    var quiz = models.Quiz.build(req.body.quiz);
    //guarda en la bd campos pregunta y respuesta del quiz

    quiz.validate().then(
            function(err){
                if(err){
                    res.render('quizes/new', {quiz: quiz, errors: err.errors});
                } else {
                    // Salva en bbdd
                    quiz.save({fields: ["pregunta", "respuesta", "tema"]})
                        .then(function(){res.redirect('/quizes')});
                        //Redireccion de HTTP (url relativo) lista de preguntas
            }
        })
    }

// GET quizes/edit
exports.edit = function(req,res){
    var quiz = req.quiz;
    res.render('quizes/edit', {quiz: quiz, errors: []});
}

// PUT quizes/:quizId/edit
exports.update = function(req,res){
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    req.quiz.tema = req.body.quiz.tema

    req.quiz.validate().then(
        function(err){
            if(err){
                res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
            } else {
                // Salva en bbdd
                req.quiz.save({fields: ["pregunta", "respuesta", "tema"]})
                    .then(function(){res.redirect('/quizes')});
                //Redireccion de HTTP (url relativo) lista de preguntas
            }
        })
}


// DELETE quizes/:id
exports.destroy = function(req, res){
    req.quiz.destroy().then(
        function(){
            res.redirect('/quizes')
        }
    ).catch(function(error){next(error)});
}