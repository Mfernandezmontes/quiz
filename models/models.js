/**
 * Created by adminlocal on 28/06/15.
 */
var path = require('path');

//Carga el modelo ORM
var Sequelize = require('sequelize');

// Usa la bbdd de SQLite
var sequelize = new Sequelize(null,null,null, {dialect: "sqlite", storage: "quiz.sqlite"} );

// Importa la definicion de la tabla Quiz en el quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; //Exporta la definicion

//sequelize.sync() crea e inicializa la table de preguntas en DB
sequelize.sync().success(function(){
    // sucess() ejecuta el manejador una vez creada la tabla
    Quiz.count.success(function(count){
        if(count === 0){ // la tabla se inicializa solo si esta vacia
            Quiz.create({ pregunta: 'Capital de Italia',
                          respuesta: 'Roma'
            })
            .success(function(){console.log('Base de datos inicializada')})
        }
    })
})