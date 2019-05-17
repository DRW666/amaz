function UserInfo(){
    this.username = $("#username");
    this.logout = $("#js_logout");
    this.init();
}
UserInfo.prototype = {
    init: function(){
        this.modifyUsername();
        this.logoutClick();
    },
    modifyUsername:function(){
        if(Cookies.get("user")){
            this.username.html(Cookies.get("user"));
        }
    
    },
    logoutClick:function(){
        this.logout.on("click",this.logoutCb.bind(this))
    },
    logoutCb(){
        if(confirm("您确定要退出吗？")){
            Cookies.remove("user");
            Cookies.remove("token");
            if(!Cookies.get("token")){
                location.href="http://localhost:3000/register.html"
            }
        }
    }
//将后端存入的cookie  username 取出来
//npm 封装了一个cookie的包js-cookie    在bootcdn中找到并在home.html中引入文件

}
new UserInfo();