function Page(){
    this.jobHome = $("#jobHome"),
    this.jobList = $("#jobList"),
    this.jobManage = $("#jobManage"),
    this.jobContent = $("#content"),
    this.asideList = $("#aside_list>ul>li")
}
Page.prototype = {
    init: function(){
        this.asideListToggle()
    },
    asideListToggle: function(){
        this.asideList.on("click",this.handleasideListCb.bind(this))

    },
    handleasideListCb: function(e){
        $(e.target).addClass("active").siblings().removeClass("active");
        var index = $(e.target).index();
        this.contentSwitch(index);
    },
    contentSwitch: function(index){
        switch(index){
            case 0:
                this.jobHomeSwitch();
                break;
            case 1:
                this.jobListSwitch();
                break;
            case 2:
                this.jobManageSwitch();
                break;

        }

    },
    jobHomeSwitch :function(){
        this.jobList.html("");
        this.jobManage.html("");
        this.jobHome.html("<h2>我是首页</h2>");
    },
    jobListSwitch :function(){
        this.jobHome.html("");
        this.jobManage.html("");
        this.jobList.html("jobList");
    },
    jobManageSwitch :function(){
        this.jobHome.html("");
        this.jobList.html("");
        new AddJob(this.jobManage).init()
    }


}
new Page().init()