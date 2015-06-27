var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  //    vista INDEX
  res.render('index', { title:  'QUIZ' });
});

// GET /quizes/question
router.get('/quizes/question', quizController.question);

// GET /quizes/answer
router.get('/quizes/answer', quizController.answer);

// GET /autores
router.get('/author', function(req,res,next){
    //Vista autores
    res.render('author');
})

module.exports = router;
