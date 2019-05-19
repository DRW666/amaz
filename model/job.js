const mongoose = require("../db/database").mongoose;

//创建数据库
const Job = mongoose.model("job",{
    jobName : String,
    jobPrice : String,
    jobAsk : String,
    companyName : String,
    companyLogo : String

});

const job_save = (jobInfo,cb)=>{
    const job = new Job(jobInfo);
    job.save().then(()=>{
        cb();
    });
};
const job_find = (cb)=>{
    Job.find().then((result)=>{
        cb(result);
    })
};
const job_delete =(jobInfo,cb)=>{
    Job.remove(jobInfo).then((result)=>{
        //result 返回数据库成功删除后的回调{ ok: 1, n: 0, deletedCount: 0 }
        cb(result);
    })
};
//参数1：要修改的那一组数据的id，参数2：修改后的内容，参数3：回调
const job_modify = (jobId,jobInfo,cb)=>{

    Job.update(jobId,{$set:jobInfo}).then((result)=>{
        cb(result);
    })
     
    
}
module.exports = {
    job_save,
    job_find,
    job_delete,
    job_modify
}