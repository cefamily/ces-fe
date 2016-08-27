"use strict";
Number.prototype.t2=function(){if(this.toString().length===1)return '0'+this;else return this.toString()};
String.prototype.timeChange=function(){
	var g = new Date();
	g.setTime(this*1000);
	return g.getFullYear()+'-'+(g.getMonth()+1).t2()+'-'+g.getDate().t2()+' '+g.getHours().t2()+":"+g.getMinutes().t2()
}
Number.prototype.timeChange=function(){
    return String(this).timeChange()
};
String.prototype.dateChange=function(){
	var g = new Date();g.setTime(this*1000);return g.getFullYear()+'-'+(g.getMonth()+1).t2()+'-'+g.getDate().t2()
};
Number.prototype.dateChange=function(){
    return String(this).dateChange()
};
(()=>{
    $.ajaxSettings.xhrFields={withCredentials: true};
    //window.host="http://api.oniicyann.baka/CES/";
    //window.host="http://233hd.com/ces/";
    window.host="http://c.baka/index.php/";
    
    let z = location.search.split('-');
    window.GET = {};
    if(z.length>1){
        z[0] = z[0].slice(1);
        let g = window.GET;
        for(let d in z){
            if(d%2)continue;
            if(z[d]){
                if(typeof z[parseInt(d)+1] =='undefined')z[parseInt(d)+1] = '';
                if(typeof g[z[d]] != 'undefined'){
                    if(typeof g[z[d]]!='object')g[z[d]] = [g[z[d]]];
                    g[z[d]].push(z[parseInt(d)+1])
                }else g[z[d]] = z[parseInt(d)+1]
            }
        }
    }
    if(!document.cookie || !localStorage.login){
        $.getJSON(window.host+'Home/User/getMyInfo',function(d){
            if(d.status){
                localStorage.login=1;
                localStorage.userinfo=JSON.stringify(d.info[0]);
                window.document.cookie = "userinfo="+localStorage.userinfo+';Path=/';
                location="/CE/index.shtml"
            }
        });
    }
    eval('window.userinfo = '+localStorage.userinfo);
    $(()=>{
        $('.logout').click(s=>$.post(window.host+'Home/User/userLogout',d=>{
            let exp = new Date();
            exp.setTime(exp.getTime() - 1000);
            document.cookie= "userinfo=0;Path=/;expires="+exp.toGMTString();
            delete localStorage.login;location.reload(true);
        },'json'))
    })
    
    

})();
