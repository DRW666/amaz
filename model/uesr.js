const mongoose = require("../db/database").mongoose;

const User = mongoose.model("user",{
    username:String,
    password:String
})

const findUser = (userInfo,cb)=>{
    User.findOne(userInfo).then((result)=>{
        cb(result)
        
    })
}
const saveUser = (userInfo,cb)=>{
    const user = new User(userInfo);
    user.save().then(()=>{
        cb()
    })
}

module.exports ={
    findUser,
    saveUser
}