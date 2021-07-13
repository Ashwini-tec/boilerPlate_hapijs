const usercontroller = require("../controller/user");

exports.plugin = { 
  pkg : require("../../package.json"),
  name : "user Router",
  register : async(server , options)=>{
    server.route(
      [
       /************ create user ************/
        {
          method: 'POST',
          path: '/user',
          config: usercontroller.createUser
        },
        /************ get user ************/ 
        {
          method: 'GET',
          path: '/user',
          config :usercontroller.getAllUser 
        },
        /************   update user ************/ 
        {
          method: 'PUT',
          path: '/user',
          config: usercontroller.updateUser
        },
        /********** delete user **********/
        {
          method: 'DELETE',
          path: '/user',
          config: usercontroller.removeUser
        },
        /************ login ************/ 
        {
          method: "POST",
          path: "/login",
          config:usercontroller.login
        },
    
      ]
    )
  }
};
