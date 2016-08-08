"use strict";
(()=>{
    $.ajaxSettings.xhrFields={withCredentials: true};
    window.host="http://api.oniicyann.baka/CES/";
    //window.host="http://233hd.com/ces/index.php/";

    let z = location.search.split('-');
    window.get = {};
    if(z.length>1){
        z[0] = z[0].slice(1);
        let g = window.get;
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
})();
