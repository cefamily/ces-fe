"use strict";
const util = require('util'); 
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const web = require('./web');
const config = require('./config');
const server = http.createServer((req, res) => {
    //验证域名
    if(config.host && req.headers.host!==config.host)return;
    let p = url.parse(req.url,true),server={};
    server.pathname = p.pathname;
    server.dir = __dirname+'/';
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
