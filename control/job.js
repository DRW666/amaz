const jobModel = require("../model/job");
const path = require("path");
const Cookie = require("../utils/getCookie");
const JwtToken = require("../utils/token")

const addjob = (req,res)=>{
    // console.log(req.body)
    // console.log(req.files)
    const {job_name,job_price,job_ask,company_name} = req.body;
    // console.log(job_name,job_price,job_ask,company_name)
    //文件格式单独获取  只支持原生js，所以后面加[0],获得一个对象
    const company_logo = req.files.company_logo[0].path;
    //path.parse()将路径的字符串转为对象  .base是文件名加后缀
    // console.log(path.parse(company_logo).base)
    const url = "http://127.0.0.1:3000/img/"+ path.parse(company_logo).base;
    // console.log(url)

    //获取token
    const token = Cookie.getCookie(req,"token");

    //token的校验
   JwtToken.tokenVerify(token,"1901",function(err){
        if(err){
            //没有登录
            res.json({
                state:false,
                info:"token过期,请重新登录"
            })
        }else{
            jobModel.job_save({jobName:job_name,jobPrice:job_price,jobAsk:job_ask,companyName:company_name,companyLogo:url},()=>{
                res.json({
                    state:true,
                    info:"添加成功"
                })
            })
        }
    })


};

const joblist = (req,res)=>{
    //获取token
    const token = Cookie.getCookie(req,"token");

    //token的校验
   JwtToken.tokenVerify(token,"1901",function(err){
        if(!err){
            jobModel.job_find((data)=>{
                res.json({
                    state:true,
                    data,
                    info:"OK"
                })
            })
        }
    })

};
const jobdelete = (req,res)=>{
    const {id} = req.query;
    // console.log(req.query)
    //获取token
    const token = Cookie.getCookie(req,"token");

    //token的校验
   JwtToken.tokenVerify(token,"1901",function(err){
        if(!err){
            jobModel.job_delete({_id:id},()=>{
                res.json({
                    state:true,
                    info:"删除成功"
                })
            })
        }
    })
};
const jobmodify = (req,res)=>{
    // console.log(req.body)
    const {job_name,job_price,job_ask,company_name,_id} = req.body;
    // console.log(job_name,job_price,job_ask,company_name,_id)
    //文件格式单独获取  只支持原生js，所以后面加[0],获得一个对象
    const company_logo = req.files.company_logo[0].path;
    //path.parse()将路径的字符串转为对象  .base是文件名加后缀
    // console.log(path.parse(company_logo).base)
    const url = "http://127.0.0.1:3000/img/"+ path.parse(company_logo).base;
    // console.log(url)

    //获取token
    const token = Cookie.getCookie(req,"token");

    //token的校验
   JwtToken.tokenVerify(token,"1901",function(err){
        if(err){
            //没有登录
            res.json({
                state:false,
                info:"token过期,请重新登录"
            })
        }else{
            jobModel.job_modify({_id:_id},{jobName:job_name,jobPrice:job_price,jobAsk:job_ask,companyName:company_name,companyLogo:url},(result)=>{
                res.json({
                    state:true,
                    info:"修改成功"
                })
            })
        }
    })
}

module.exports={
    addjob,
    joblist,
    jobdelete,
    jobmodify
}