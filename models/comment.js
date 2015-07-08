/**
 * Created by adminlocal on 3/07/15.
 */

//Generamos la tabla Comment
module.exports = function(sequelize, DataTypes){
    return sequelize.define(
        'Comment', {
            texto :{
                type: DataTypes.STRING,
                validate:{ notEmpty: { msg: '-> Fata texto'}}
            },
            publicado :{
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }
    )
}