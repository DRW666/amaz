function JobList(container){
    this.container = container;
}
JobList.prototype = {
    init:function(){
        this.creat_page();
        this.modify_sub();
    },
    creat_page:function(){
        $.ajax({
            type:"get",
            url:"/job/jobList",
            success:this.handleCreatePageCb.bind(this)
        })
    },
    //返回一个对象，对象有两个属性  data和state
    handleCreatePageCb(data){
        var str = "";
        for(var i=0;i<data.data.length;i++){
            str+=
            `
            <div class="list">
          <div class=" thumbnail job_list">
              <div class="job_des">
                <div class="job_name">${data.data[i].jobName}</div>
                <div class="job_price">${data.data[i].jobPrice}</div>
                <div class="job_ex">${data.data[i].jobAsk}</div>
              </div>
              <div class="company_intro">
                  <div class="company_logo">
                      <img src="${data.data[i].companyLogo}" alt="...">
                  </div>
                  <div class="company_name">${data.data[i].companyName}</div>
              </div>
              <p class="operation_btn" data-id="${data.data[i]._id}">
                <button class="btn btn-danger job_delete">删除</button>
                <button class="btn btn-info job_modify" data-toggle="modal" data-target="#myModal">修改</button>
              </p>  
          </div>
        </div>
            `
        }
        this.container.html(str);
        //异步
        this.job_delete();
        this.job_modify();
    },
    job_delete:function(){
        $(".job_delete").on("click",this.deleteCb.bind(this));  
    },
    deleteCb(e){
        //获取当前元素的data-id
        var id = $(e.target).parent().attr("data-id");
        // console.log(id)
        $.ajax({
            type:"get",
            url:"/job/jobDelete",
            data:{
                id
            },
            success:this.handleJobDeleteCb.bind(this)
        })
    },
    handleJobDeleteCb(data){
        // console.log(data)
        if(data.state){
            alert("删除成功");
            this.creat_page();
        }
    },
    job_modify:function(){
        $(".job_modify").on("click",this.modifyCb.bind(this));
    },
    modifyCb(e){
        var id = $(e.target).parent().attr("data-id");
        var parentNode = $(e.target).parent().parent();
        var jobName = parentNode.find(".job_name").text();
        var jobPrice = parentNode.find(".job_price").text();
        var jobAsk = parentNode.find(".job_ex").text();
        var companyName = parentNode.find(".company_name").text();
        // console.log(id,jobName,jobPrice,jobAsk,companyName)

        $("#modify_job_name").val(jobName);
        $("#modify_job_price").val(jobPrice);
        $("#modify_job_ask").val(jobAsk);
        $("#modify_company_name").val(companyName);
        $("#modify_job_form").prop("data-id",id);

        
    },
    modify_sub:function(){
        $(".modify_btn").on("click",this.handleModifyCb.bind(this))
       
    },
    handleModifyCb:function(e){
        e.preventDefault();
        //找对象
        var job_name =  $("#modify_job_name");
        var job_price = $("#modify_job_price");
        var job_ask = $("#modify_job_ask");
        var company_name =  $("#modify_company_name");
        var company_logo = $("#modify_company_logo");
        var modifyForm = $("#modify_job_form");


        //ajax模拟form表单

        //生成一个formdata对象
        var formData = new FormData();
        //将获取到的值传给formdata对象  把这个对象整体传给ajax中的data
        formData.append("job_name",job_name.val());
        formData.append("job_price",job_price.val());
        formData.append("job_ask",job_ask.val());
        formData.append("company_name",company_name.val());
        formData.append("_id",modifyForm.prop("data-id"));

        //获取id为Logo的文件，company_logo[0].files是一个对象，第0个元素是图片的所有信息
        formData.append("company_logo",company_logo[0].files[0]);
        // console.log(company_logo[0].files[0]);
        //ajax请求
        $.ajax({
            type:"post",
            url:"/job/jobModify",
            data:formData,
            cache:false,
            contentType:false, 
            processData:false,
            // 这三个一定设置为false
            success: this.handleModifySuccCb.bind(this),

        })
    },
    handleModifySuccCb(data){
        if(data.state){
            alert("添加成功");
            this.creat_page();

        }else{
            alert("添加失败");
        }
    }
}