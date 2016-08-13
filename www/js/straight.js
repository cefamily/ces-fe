"use strict";
!function(){
    let z = window.SYNC,w = class{
        constructor(x){this.list = [];if(typeof x == 'function')this.add(x)}
        add(x){if(this.list)this.list.push(x);return this}
        run(y){if(this.list && this.list.length!=0)this.list.shift()(this,y);return this}
        clean(){this.list=[];return this}
        get noConflict(){window.SYNC = z;return w}
    };
    window.SYNC = w;
    window.loadPic = function(src,callback,inner){
        if(typeof src != 'object'){
            if(typeof src != 'string'){console.error('参数错误');return}
            src=[{src:src,callback:callback}];callback=null;
        }
        let k = new SYNC,n=0,error=e=>{
            console.error('图片加载失败');;if(!inner)k.run()
        }
        for(let d in src){
            let s = src[d];
            if(typeof s!='object' || !s.src){console.warn('IMG OBJECT , TYPE ERROR');continue;}n++;
            k.add(()=>{
                let img=new Image();img.addEventListener('error',error);img.addEventListener('load',e=>{
                    if(s.callback && typeof s.callback == 'function')s.callback(img,k);if(!inner)k.run()
                });img.src = s.src
            });
        }if(callback)k.add(callback);k.run();return n
    }
}()

