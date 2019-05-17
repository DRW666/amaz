function AddJob(container){
    this.container = container;
}

AddJob.template =
`
<div class="add_job">
          <form id="job_form">
              <div class="form-group">
                <label for="job_name">职位名称</label>
                <input type="text" class="form-control" id="job_name" placeholder="请输入职位名称">
              </div>
              <div class="form-group">
                <label for="job_price">薪资</label>
                <input type="text" class="form-control" id="job_price" placeholder="请输入薪资">
              </div>
              <div class="form-group">
                <label for="job_ask">职位要求</label>
                <input type="text" class="form-control" id="job_ask"" placeholder="请输入职位要求">
              </div>
              <div class="form-group">
                  <label for="company_name">公司名称</label>
                  <input type="text" class="form-control" id="company_name" placeholder="请输入公司名称">
              </div>
              <div class="form-group">
                <label for="company_logo">上传公司LOGO</label>
                <input type="file" id="company_logo">
              </div>
              <button type="submit" class="btn btn-primary" id="submit_btn">添加职位</button>
            </form>              
        </div>
`;
AddJob.prototype = {
    init: function(){
        this.create_page();
        this.add_job_sub();
    },
    //动态创建添加职位的表单
    create_page: function(){
        this.el=$("<div></div>");
        this.el.append(AddJob.template);
        this.container.append(this.el)
    },
    //表单提交，把表单数据提交到后端
    add_job_sub: function(){
        this.job_form=$("#job_form");
        this.job_form.on("submit",this.handleAddjobCb.bind(this))
    },
    handleAddjobCb: function(e){
        e.preventDefault();
        //找对象
        var job_name = this.el.find("#job_name");
        var job_price = this.el.find("#job_price");
        var job_ask = this.el.find("#job_ask");
        var company_name = this.el.find("#company_name");
        var company_logo = this.el.find("#company_logo");
            
        // console.log(company_logo) 是一个对象


        //ajax模拟form表单

        //生成一个formdata对象
        var formData = new FormData();
        //将获取到的值传给formdata对象  把这个对象整体传给ajax中的data
        formData.append("job_name",job_name.val());
        formData.append("job_price",job_price.val());
        formData.append("job_ask",job_ask.val());
        formData.append("company_name",company_name.val());
        //获取id为Logo的文件，company_logo[0].files是一个对象，第0个元素是图片的所有信息
        // console.log(company_logo[0].files)
        formData.append("company_logo",company_logo[0].files[0]);

        //ajax请求
        $.ajax({
            type:post,
            url:"job/addjob",
            data:formData,
            cache:false,
            contentType:false, 
            processData:false,
            // 这三个一定设置为false
            success: handleAddSuccCb.bind(this),

        })
    },
    handleAddSuccCb(data){
        console.log(data);
    }
};
// 缓存
// 在 jquery 的 ajax 中， contentType 收到服务器数据的格式都是默认的值：application/x-www-form-urlencoded，
// 这种格式的特点就是，name/value 成为一组，每组之间用 & 联接，而 name与value 则是使用 = 连接。
// 如： wwwh.baidu.com/q?key=fdsa&lang=zh 这是get ,
//  而 post 请求则是使用请求体，参数不在 url 中，在请求体中的参数表现形式也是: key=fdsa&lang=zh的形式。

// processData： 要求为Boolean类型的参数，默认为true。默认情况下，发送的数据将被转换为对象，配合默认的contentType使用