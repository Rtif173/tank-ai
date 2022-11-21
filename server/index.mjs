import http from "http";
import fs from "fs";

const PREFIX = '/api/';
const PORT = 8000;
const HOST = 'localhost';

/**
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 * @returns {Promise<Buffer>}
 */
function getBody(req, res) {
    return new Promise((resolve, reject) => {
        /** @type {Buffer[]} */
        const chunks = [];
        let totalBytes = 0;
        req.on('data', (chunk) => {
            chunks.push(chunk);
            totalBytes += chunk.length;
        });
        req.on('end', () => {
            resolve(Buffer.concat(chunks, totalBytes));
        });
        req.on('error', reject);
    });
}

/**
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 * @returns {Promise<Buffer>}
 */
async function onRequest(req, res) {
    // http://localhost:8000/api/filename.json?delimiter=\n
    if (req.method === 'POST' && req.url?.startsWith(PREFIX)) {
        const url = new URL(req.url, `http://${HOST}:${PORT}`);
        const outputRelativePath = url.pathname.slice(PREFIX.length);
        const delimiter = url.searchParams.get('delimiter') || '\n';
        const data = await getBody(req, res);
        await fs.promises.appendFile(outputRelativePath, Buffer.concat([data, Buffer.from(delimiter)]));
        res.statusCode = 200;
        res.end();
    }
    res.statusCode = 400;
    res.end();
}

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        const r = onRequest(req, res);
        if (r instanceof Promise) {
            r.catch((e) => {
                console.error(e);
                res.statusCode = 500;
                res.end(e.name);
            });
        }
    } catch(e) {
        console.error(e);
        res.statusCode = 500;
        res.end(e.name);
    }
});
server.listen(PORT, HOST, () => {
    console.log(`server listening on ${PORT}`);
});