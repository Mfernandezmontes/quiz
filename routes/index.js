var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller')

/* GET home page. */
router.get('/', function(req, res, next) {
    //    vista INDEX
    res.render('index', { title:  'QUIZ', errors: [] });
});

//Autoload , si existe quizId ese parametro en la ruta
router.param('quizId', quizController.load)

// GET quizes = busca todos
router.get('/quizes', quizController.index)
// GET quizes id = busca por id
router.get('/quizes/:quizId(\\d+)', quizController.show);
// GET quizes id answer
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
// GET /autores
router.get('/author', function(req,res,next){
    //Vista autores
    res.render('author', { errors: [] });
})
// GET quizes/new
router.get('/quizes/new', quizController.new);
//POST quizes/create = nos envia a la vista crear
router.post('/quizes/create', quizController.create);
// GET quizes/edit = nos envia a la vista actualizar
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
// PUT quizes/:quizId
router.put('/quizes/:quizId(\\d+)', quizController.update);
// DELETE quizes/:quizId
router.delete('/quizes/:quizId(\\d+)', quizController.destroy)


//
//router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',     commentController.create)

module.exports = router;
