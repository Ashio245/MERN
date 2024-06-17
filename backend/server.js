import http from 'http'

http.createServer((req, res)=>{

res.writeHead(400,  {"Content-Type": "text/html"})

res.write('req.url')


if (req.method = "POST"){
    res.write('post request')
}

res.end()

}).listen(4000, 'localhost')