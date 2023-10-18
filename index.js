const express = require('express');
const app = express();
const fsPromises = require("fs/promises");

const hostname = 'localhost';
const port = 3000;
const statusCode = 200;

app.use((_, res, next) => {
    res.append("Cross-Origin-Opener-Policy", "same-origin");
    res.append("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});

app.use(express.static(__dirname + '/public'));
app.post("/fluent/blob", async (req, res, next) => {
    // リクエストボディを出力
    console.log(req.body);
    // パラメータ名、nameを出力
    // console.log(req.body.name);
    try {
        const rawBody = await new Promise((resolve, reject) => {
            const chunks = [];

            req.on("data", (chunk) => chunks.push(chunk));
            req.on("end", () => resolve(Buffer.concat(chunks)));
            req.on("error", (err) => reject(err));
        });

        const outputDirectory = path.join(__dirname, "tmp");
        const outputFilename = Date.now() + req.query.extname;
        const outputPath = path.join(outputDirectory, outputFilename);

        await fsPromises.mkdir(outputDirectory, {recursive: true});
        await fsPromises.writeFile(outputPath, rawBody);

        res.status(201).end();
    } catch (err) {
        next(err);
    }
});

function convert_webm(blob) {
    ffmpeg()
}

// app.get("/", () => (req, res) => {
//     res.sendFile(__dirname + path)
// })
const server = app.listen(port, function () {
    console.log(server.address().port + " start");
})


