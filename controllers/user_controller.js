var users = {admin:{id:1, username:"admin", password:"1234"},
             miguel: {id:2, username:"miguel",  password:"5678"}
	    };

exports.autenticar = function(login, password, callback) {
   if(users[login]) {
     if(password === users[login].password){
       callback(null, users[login]);
      } else {
	callback(new Error('Password erróneo'));
      }
   } else {
	callback(new Error('No existe el usuario'));
   }
};
