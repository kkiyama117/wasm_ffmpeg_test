const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;
const statusCode = 200;

app.use((_, res, next) => {
    res.append("Cross-Origin-Opener-Policy", "same-origin");
    res.append("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});

app.use(express.static(__dirname + '/public'));

// app.get("/", () => (req, res) => {
//     res.sendFile(__dirname + path)
// })
const server = app.listen(port, function () {
    console.log(server.address().port + " start");
})


