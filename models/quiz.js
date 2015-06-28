/**
 * Created by adminlocal on 28/06/15.
 */

//Generamos la tabla
module.exports = function(sequelize, DataTypes){
    return sequelize.define('Quiz',{
        pregunta : DataTypes.STRING,
        respuesta: DataTypes.STRING
    })
}