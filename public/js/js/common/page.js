function Page(){
    this.container = $("#sign");
    // this.init()
}
Page.prototype = {
    init:function(){
        this.createContent();
    },
    createContent:function(flag){
        if(!flag){
            this.register = new Register(this.container);
        }else{
            this.login = new Login(this.container);
        } 
    }
}
new Page().init()