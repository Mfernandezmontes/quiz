/**
 * Created by adminlocal on 3/07/15.
 */
var models = require('../models/models');

//Autoload comments
exports.load = function(req,res,next,commentId){
    console.log(commentId);
    models.Comment.find({
        where: {
            id: commentId
        }
    }).then(function(comment){
        if(comment){
            req.comment = comment;
            next();
        } else {
            next(new Error('no existe comentario id' + commentId))
        }
    }).catch(function(error){next(error)});
}


/*// GET /quizes/:quizId/comments/new
exports.new = function(req,res){
    res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []})
}*/


// POST quizes/:quizId/comments
exports.create = function(req,res){
    console.log(req.body.comment.texto)
    var comment = models.Comment.build(
        { texto : req.body.comment.texto,
          QuizId : req.params.quizId

        });

    comment.validate().then(
        function(err){
            if(err){
                res.render('quizes/' + req.params.quizId , {comment: comment, quizid: req.params.quizId, errors: err.errors});
            } else {
                // Salva en bbdd
                comment.save()
                       .then(function(){res.redirect('/quizes/' + req.params.quizId)});
                //Redireccion de HTTP (url relativo) lista de preguntas
            }
        }).catch(function(error){next(error)});
}

//publicar
exports.publish = function(req,res){
    req.comment.publicado = true;

    req.comment.save( {fields: ["publicado"]} )
        .then( function(){ res.redirect('/quizes/' + req.params.quizId )})
        .catch(function(error){ next(error)});
}