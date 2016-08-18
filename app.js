"use strict";
const util = require('util'); 
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const web = require('./web');
const config = require('./config');
const rewrite = require('./lib/rewrite');
const server = http.createServer((req, res) => {
    //验证域名
    if(config.host && req.headers.host!==config.host)return;
    let trueUrl = req.url;
    //console.log(req.url);
    for(let d in rewrite){
        let trueUrl2 = trueUrl.replace(rewrite[d].in,rewrite[d].out);
        if((trueUrl2 != trueUrl) && rewrite[d].plus){
            let plus = rewrite[d].plus.split(',');
            if(plus.indexOf('R')!=-1){
                res.setHeader('Location',rewrite[d].out);
                res.writeHead(301,"Moved Permanently");
                res.end();return;
            }
            if(plus.indexOf('L')!=-1){
                break;
            }
        }
        trueUrl = trueUrl2;
        
    }
    let p = url.parse(trueUrl,true),server={};
    
    server.pathname = p.pathname;
    server.dir = __dirname+'/';
    server.root = server.dir+'www/';
    server.fileDir = server.pathname.slice(0,server.pathname.search(/\/[^\/]*$/)+1);
    server.fileRealDir = __dirname+'/www'+server.fileDir;
    server.realPath = __dirname+'/www'+server.pathname;
    server.get = p.query;
    server.headers = req.headers;
    req.on('data',c=>server.post+=c);
    req.on('end',s=>{
        server.post = querystring.parse(server.post);
        web(res,server);
    });


});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);
