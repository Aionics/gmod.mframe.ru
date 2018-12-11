const express = require('express');
const nunjucks = require('nunjucks')
const app = express();
const server = require('http').createServer(app);
const bodyParser = require("body-parser");
const path = require("path");

nunjucks.configure('./www/views', {
    autoescape: true,
    express: app
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const chat = require('./chat').socket(app, server)
app.use('/api', require('./api'));
app.use('/', express.static('./www'));
let pages = [
    {
        id: "main",
        name: "Статистика",
        file: "index.html",
        url: "/"
    },
    {
        id: "rules",
        name: "Правила",
        file: "rules.html",
        url: "/rules"
    }
]

Object.keys(pages).forEach((page_index) => {
    let page = pages[page_index]
    console.log(page);
    app.get(page.url, (req, res) => {
        return res.render(page.file, {pages: pages, current_page: page})
    })
})
app.use((req, res, next) => {
    return res.status(404).send('Sorry cant find that!');
});

const PORT = 8083
server.listen(PORT, function () {
    console.log('listening on ' + PORT);
});
