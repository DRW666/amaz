function Login(container){
    this.container = container,
    this.init()

}
Login.template = 
`
<div id="register">
        <div class="logo"><img src="img/logo.png" alt=""></div>
        <form id="form">
            <div class="form-group">
              <label for="exampleInputEmail1">用户名</label>
              <input type="text" class="form-control" id="sign-login-username" placeholder="请输入用户名">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">密码</label>
              <input type="password" class="form-control" id="sign-login-password" placeholder="请输入密码">
            </div>
            <p class="bg-info" id="toggle">登录失败，立即注册</p>
            <button type="submit" class="btn btn-default register_btn">登录</button>
        </form>
    </div>
`
Login.prototype = {
    init : function(){
        this.create();
        this.toggleSign();
        this.loginClick();
    },
    create : function(){
        this.container.html("");
        this.el = $('<div></div>'),
        this.el.append(Login.template);
        this.container.append(this.el);
    },
    toggleSign :function(){
        this.el.find("#toggle").on("click",this.handleToggleSignCb.bind(this))
    },
    handleToggleSignCb(){
        new Page().createContent(false)
    },
    loginClick : function(){
        this.el.find("#form").on("submit",this.handleloginClickCb.bind(this))
    },
    handleloginClickCb(e){
        e.preventDefault();
        var username = this.el.find("#sign-login-username").val();
        var password = this.el.find("#sign-login-password").val();
        $.ajax({
            type:"post",
            url:"users/login",
            data:{
                username,
                password
            },
            success:this.handleLoginSucc.bind(this)
        });

    },
    handleLoginSucc(data){
        // console.log(data)
        if(data.state){
            alert("登录成功");
            location.href="http://localhost:3000/html/home.html";
            
        }else{
            alert("登录失败");
        }
    }

}