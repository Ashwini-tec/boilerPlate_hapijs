const User = require("../scr/models/User");
const Mongoose = require('mongoose');


/******** authenticate user by jwt token ************/ 
exports.plugin = {
    register:(server , options )=>{
        server.auth.strategy('token' , 'jwt',{
            key: options.key,
            validate: validate,
            verifyOptions: {
                algorithms: options.algorithm
            }
        });
    },
    name: 'jwt-auth'
};


const validate = async(decoded , request)=>{
try {
    if(decoded.id)
    {
        const id = decoded.id;
        const data = await User.findOne({_id : Mongoose.Types.ObjectId(id) });
        if(data)
        {
            return {
                isValid: true,
            }
        }else{
            return {
                isValid: false
            }
        }
    }else{
        return {
            isValid: false
        }
    }
} catch (error) {
    return { err: err.message }
}
}

