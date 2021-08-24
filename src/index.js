const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({
    path: './config/config.env'
})

app.get('/', (req, res) => {
    res.send('Hello World');

})

app.use(express.json());

// Logger middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
const PORT = process.env.PORT || 5000;

app.get("/video", (req, res) => {

    //
    // Original video from here:
    // https://sample-videos.com
    //
    const path = "../videos/SampleVideo_1280x720_1mb.mp4";
    fs.stat(path, (err, stats) => {
        if (err) {
            console.error("An error occurred ");
            res.sendStatus(500);
            return;
        }

        res.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": "video/mp4",
        });
        fs.createReadStream(path).pipe(res);
    });
});

app.listen(PORT, () => {
    console.log(`App listening on ${port}`)
})