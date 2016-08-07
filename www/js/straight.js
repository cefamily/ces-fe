"use strict";
!function(){
    let z = window.straight,w = class{
        constructor(x){
            this.list = [];this.state = 0;
            if(typeof x == 'function')this.add(x);
        }
        add(x){
            this.list.push(x);return this;
        }
        run(y){
            if(this.list.length==0)this.run = 0;else{
                this.state = 1;
                let z = this.list.shift();
                z(this,y);
            }
            return this
        }
        get noConflict(){
            window.straight = z;
            return w;
        }
    };
    window.straight = w;
}();