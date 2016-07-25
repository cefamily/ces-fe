"use strict";
const fs = require('fs');
const util = require('util'); 
const path = require("path");
const config = require('./config');
const mime = require("./lib/mime");
const page = require("./page");
const template = require("./lib/template");

module.exports = function(res,server){
    let rawOutStream='',output = m=>rawOutStream+=m;
    fs.stat(server.realPath, function (err, stats) {
        if(err || server.pathname.search(/^[a-z0-9-_\/\.]+$/i)===-1){
			page[404](res,"the request "+server.pathname+" is not found");return;
        }else{
            if(stats.isDirectory()){
               page[403](res,"the request "+server.pathname+" is directory");return;
			}else{
                let ext = path.extname(server.realPath);
                ext = ext ? ext.slice(1) : false;
                if(config.ACCESS.indexOf(ext)===-1){
					page[403](res,"the request "+server.pathname+" is forbidden");return;
				}
                page.setMine(res,ext);
                if(page.setExpires(stats,server,res,ext))return;
                if(config.COMPILE.indexOf(ext)!==-1){
				    let tempFileName = Date.now()+'_'+Math.random(),tempFilePath = server.dir+'temp/'+tempFileName;
                    let data = fs.readFileSync(server.realPath).toString();
                    let zdata = '';
                    data = template.parse_subtemplate(data,server.fileRealDir);
                    zdata += template.parse(data);
                    //console.log(zdata);
                    try{eval(zdata)}catch(e){
                        console.log(e)
                    }
                    //console.log(tempFilePath);
					fs.writeFile(tempFilePath, rawOutStream, function(err) {
                        if(err){
                            console.log(tempFileName,err);return;
                        }
						let raw = fs.createReadStream(tempFilePath);
						page.oot(server,res,raw);fs.unlink(tempFilePath);
					});
				}else{
					let raw = fs.createReadStream(server.realPath);
					page.oot(server,res,raw);
				}
                
            }
        }

    })
}
