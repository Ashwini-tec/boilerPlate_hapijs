const User = require("../models/User");
const bcrypt = require('bcrypt');

exports.createUser = async (data)=>{
    const password = data.password;
    const salt = 10;
    const hash = await bcrypt.hash(String(password), salt).then((hash)=> { return hash }).catch((err)=>{console.log(err.message)});

    const userData = {
        name: data.name,
        password: hash,
        gender: data.gender,
        age: data.age,
        image: data.image
    };

    return User.create(userData).then((data) => {
    data.password=undefined;
    return { message: "User created successfully", user: data };
    }).catch((err) => {
    return { err: err.message };
    });
};


/********** get the user ************/
exports.getTheUser = async ()=>{
    return await User.find({},{password: 0}).then((data) => {
        data.password=undefined;
        return { message: "successfully get the data" ,user: data };
      }).catch((err) => {
        return { err: err };
      });
};


/**************** update user  **************/
exports.updateUser = async(user)=>{
    const id = user._id;
    if(user.password){
        const password = user.password;
        const salt = 10;
        const hash = await bcrypt.hash(String(password), salt).then((hash)=> { return hash }).catch((err)=>{console.log(err.message)});
        user.password = hash;
    }

    return await User.findByIdAndUpdate({_id : id}, user , { new : true }).then((data) => {
        data.password=undefined;
        return { message: "successfully update the detail" ,user: data };
      }).catch((err) => {
        return { err: err };
      });
}


/************* delete user ***************/
exports.deleteUser = async(id)=>{
    return await User.findByIdAndDelete({_id : id}).then((data) => {
        return { message: "successfully deleted" ,user: data };
      }).catch((err) => {
        return { err: err.message };
      });
}

/*********login user ****************/
exports.loginUser = async(user)=>{
    const name= user.name;
    return await User.findOne({ name : name }).then(async(data) => {
        const password = user.password;
        const hash = await bcrypt.compare(password,data.password);
        if(!hash){ return { message: "logined failed" ,user: null }}
        data.password = undefined;
        return { message: "successfully logined" ,user: data };
      }).catch((err) => {
        return { err: err.message };
      });
}