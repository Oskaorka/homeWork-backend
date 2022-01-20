import http from "http";
import fs from "fs/promises";
import path from "path";
import {addNote} from "./note.controller";
import chalk from "chalk";

const server = http.createServer(async (req,res) => {
    if(req.method === 'GET'){
        const content = await fs.readFile(path.join(basePath, 'index.ejs'))
        res.writeHead(200, {'Contetnt-Type': 'text/html'})
        res.end(content)
    } else if (req.method === 'POST') {
        const body = []
        res.writeHead(200,{'Content-Type': 'text/plain; charset=utf-8'})
        req.on('data', data=>{
            body.push(Buffer.from(data))
        })
        req.on('end', ()=> {
            const title =  body.toString().split('=')[1].replaceAll('+', ' ')
            addNote(title)
            res.end(`Title = ${title}`)
        })


    }
})
server.listen(port, () => {
    console.log(chalk.green(`server has been started on port ${port}...`))
})