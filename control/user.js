const userModel = require("../model/uesr")
//引入加密模块
const crypto = require('crypto');
//引入封装好的token
const utils = require("../utils/token")

const register = (req,res)=>{
    const {username,password} = req.body;

// 查找用户名是否存在
// 
    userModel.findUser({username},(result)=>{
        if(result){
            res.json({
                state:false,
                info:"用户名已存在"
            })
        }else{

            //创建sha256算法
            const hash = crypto.createHash('sha256');
            //需要加密的文件
            hash.update(password);
            //得到加密的文件
            // console.log(hash.digest('hex'));

         
            userModel.saveUser({username,password:hash.digest('hex')},()=>{


                res.json({
                    state:true,
                    info:"注册成功"
                    
                })
            })
        }
    })
}

const login = (req,res)=>{
    const {username,password} = req.body;
    userModel.findUser({username},(result)=>{
        console.log(111)
        if(result){
            //创建sha256算法
            const hash = crypto.createHash('sha256');
            //需要加密的文件
            hash.update(password);
            //得到加密的文件
            // console.log(hash.digest('hex'));
            if(result.password==hash.digest('hex')){

            //  jwt.sign(信息，秘钥，过期时间)  创建一个token  返回值一般当做cookie存到客户端
             const token = utils.createToken({user:username},"1901")
             res.cookie("token",token);
             res.cookie("user",username);

                res.json({
                    state:true,
                    info:"登陆成功"

                })
            }else{
                res.json({
                    state:false,
                    info:"密码错误"
                })
            }
        }else{
            res.json({
                state:false,
                info:"用户名不存在"
            })

            

            
        }
    })
}
module.exports ={
    register,
    login
}
/*
MD5加密

sha256加密   没有解密


123
算法(23 + new Date().getTime() + 秘钥)

*/