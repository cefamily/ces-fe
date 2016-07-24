"use strict";
const fs = require('fs');
module.exports = {
    parse_subtemplate(data,dir){
        let data2 = '';
        while(data2!=data){
            data2 = data;
            data = data2.replace(/<!--subtemplate +([\$\da-z]+) *-->/ig,(a,b)=>{
                let file = dir+b+'.shtml';
                try{
                    return fs.readFileSync(file).toString();
                }catch(e){
                    console.error(e.message);return '';
                }
            });
        }
        return data;
    },
    parse(z){
        let zd = '';
        z.replace(/([\s\S]*?)(?:<!--node>([\s\S]+?)<node-->|$)/ig,(a,b,c)=>{
            if(!b.match(/^[\n\r]*$/))zd +='output(`'+b.replace(/(^[\n\r ]*)|([\n\r ]*$)/g, "")+'`);';
            if(c)zd += c;
            return '';
        });
        return zd;
    }



}