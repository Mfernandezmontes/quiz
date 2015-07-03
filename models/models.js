/**
 * Created by adminlocal on 28/06/15.
 */
var path = require('path');

var DDBB = DATABASE_URL='postgres://oeehhjcwwqziiy:s5JcJVUi5aRcPT5LdTljTtxLiX@ec2-54-204-13-220.compute-1.amazonaws.com:5432/dbt2u0amlq0m8s'


var url = DDBB.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/)
var DB_name   = (url[6]||null);
var user      = (url[2]||null);
var pwd       = (url[3]||null);
var protocol =  (url[1]||null);
var dialect   = (url[1]||null);
var port      = (url[5]||null);
var host      = (url[4]||null);
//var storage   = process.env.DATABASE_STORAGE; //solo para sqlite


//Carga el modelo ORM
var Sequelize = require('sequelize');

var sequelize = new Sequelize(DB_name, user,pwd,
    {   dialect : dialect,
        protocol : protocol,
        port : port,
        host : host,
        //storage : storage,
        omitNull : true
    })

//Importar la defincion de la tabla
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz; //Exporta la definicion

//sequelize.sync() crea e inicializa la table de preguntas en DB
sequelize.sync().then(function(){
    // sucess() ejecuta el manejador una vez creada la tabla
    Quiz.count().then(function(count){
        if(count === 0){ // la tabla se inicializa solo si esta vacia
            Quiz.create({ pregunta: 'Capital de Italia',
                          respuesta: 'Roma',
                          tema: "humanidades"
            });
            Quiz.create({ pregunta: 'Capital de Portugal',
                          respuesta: 'Roma',
                          tema: "humanidades"
            })
            .then(function(){console.log('Base de datos inicializada')})
        }
    })
})