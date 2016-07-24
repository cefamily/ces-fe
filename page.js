"use strict";
const zlib = require("zlib");
const config = require('./config');
const mime = require("./lib/mime");
module.exports =  {
    404:(res,message)=>{
        res.writeHead(404,"not found",{'Content-Type':'text/plain'});
        if(message)res.write(message);
        res.end();
    },
    403:(res,message)=>{
        res.writeHead(403,"Forbidden",{'Content-Type':'text/plain'});
        if(message)res.write(message);
        res.end();
    },
    304:(res)=>{
        res.writeHead(304, "Not Modified");
        res.end();
    },
    setMine(res,ext){
        res.setHeader("Content-Type", mime[ext]? mime[ext]:'text/plain');
    },
    setExpires(stats,server,res,ext){
        if (config.EXPIRES.indexOf(ext)!==-1) {
		    let lastModified = stats.mtime.toUTCString();
			let ifModifiedSince = "If-Modified-Since".toLowerCase();
			res.setHeader("Last-Modified", lastModified);
			let expires = new Date();
			expires.setTime(expires.getTime() + config.EXPIRES_MAXAGE * 1000);
			res.setHeader("Expires", expires.toUTCString());
			res.setHeader("Cache-Control", "max-age=" + config.EXPIRES_MAXAGE);
            if (server.headers[ifModifiedSince] && lastModified == server.headers[ifModifiedSince]){
                this[304](res);return true
            }
        }
        return false;
    },
    oot(server,res,raw){
		var acceptEncoding = server.headers['accept-encoding'] || "";
		if (acceptEncoding.match(/\bgzip\b/)) {
			res.writeHead(200, "Ok", {'Content-Encoding': 'gzip'});
			raw.pipe(zlib.createGzip()).pipe(res);
		} else if (acceptEncoding.match(/\bdeflate\b/)) {
			res.writeHead(200, "Ok", {'Content-Encoding': 'deflate'});
			raw.pipe(zlib.createDeflate()).pipe(res);
		} else {
			res.writeHead(200, "Ok");
			raw.pipe(res);
		}
	}
}
