var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
    //    vista INDEX
    res.render('index', { title:  'QUIZ', errors: [] });
});

//Autoload , si existe quizId ese parametro en la ruta
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);

//Rutas de sesion
router.get('/login',                                 sessionController.new);
router.post('/login',                                sessionController.create);
router.get('/logout',                                sessionController.destroy);


// GET quizes = busca todos
router.get('/quizes',                               quizController.index)
// GET quizes id = busca por id
router.get('/quizes/:quizId(\\d+)',                 quizController.show);
// GET quizes id answer
router.get('/quizes/:quizId(\\d+)/answer',          quizController.answer);
// GET /autores
router.get('/author', function(req,res,next){
    //Vista autores
    res.render('author', { errors: [] });
})
// GET quizes/new
router.get('/quizes/new',                  sessionController.loginRequired,  quizController.new);
//POST quizes/create = nos envia a la vista crear
router.post('/quizes/create',              sessionController.loginRequired,  quizController.create);
// GET quizes/edit = nos envia a la vista actualizar
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.loginRequired,  quizController.edit);
// PUT quizes/:quizId
router.put('/quizes/:quizId(\\d+)',        sessionController.loginRequired,  quizController.update);
// DELETE quizes/:quizId
router.delete('/quizes/:quizId(\\d+)',     sessionController.loginRequired,  quizController.destroy)


//
//router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',      commentController.create)
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish)

module.exports = router;
