/**
 * Created by adminlocal on 5/07/15.
 */

var users = { admin: { id:1, username:"admin", password:'admin'},
              user:  { id:2, username:"user", password:'user'}
            }

//Comprueba si el usuario esta registrado en users
// Si la autenticacion fall o hay errores se ejecuta el callback(error)
exports.autenticar = function(login,password,callback){
    if(users[login]){
        if(password === users[login].password){
            callback(null, users[login]);
        } else {
            callback(new Error('Password erroneo'))
        }
    } else {
        callback(new Error('No existe usuario'))
    }

}