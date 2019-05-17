 //引入jsonwebtoken

var jwt = require('jsonwebtoken');

 // token的创建
const createToken = (tokenInfo,secret)=>{
     return jwt.sign(tokenInfo, secret, { expiresIn: 60 * 60 });
}
//token的验证

const tokenVerify = (token,secret,cb)=>{ 
    jwt.verify(token, secret, function(err, decoded) {
        cb(err)
    });
}


module.exports = {
    createToken,
    tokenVerify
}