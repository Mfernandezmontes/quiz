var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller')

/* GET home page. */
router.get('/', function(req, res, next) {
    //    vista INDEX
    res.render('index', { title:  'QUIZ' });
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
    res.render('author');
})

// GET quizes/new
router.get('/quizes/new', quizController.new);

//POST quizes/create
router.post('/quizes/create', quizController.create);

module.exports = router;
