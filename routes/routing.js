let fs,pdf;
let ejs = require("ejs");

function dependencyInjections(_fs = null,_pdf = null) {
    fs = _fs;
    pdf = _pdf;
}


function index_page(req,res){
    res.render("index.ejs");
}

function open(req,res){
    fs.readFile("files/text.txt","utf8",(err, text)=> {
        if(err)
            res.send("Error")
        res.send(text);
    })
}

function save(req,res){
    fs.writeFile("files/text.txt",req.body.text,(err) =>{
        if(err)
            res.send("Error")
        res.send("true");
    })
}

function print(req,res){
    let text = req.body.text;
    let html;
    ejs.renderFile('./views/print.ejs',{text:text}, function(err, result) {
        // render on success
        if (result) {
            html = result;
            pdf.create(html, {format:"A4"}).toFile('./public/prints/print.pdf', function(err, done) {
                if (err) return console.log(err);
                console.log(done);
                res.send("print.pdf");
            });
        }}
    )
}

module.exports = {
    dependencyInjections:dependencyInjections,
    index_page:index_page,
    open:open,
    save:save,
    print:print
}