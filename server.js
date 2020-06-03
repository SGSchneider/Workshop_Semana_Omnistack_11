//cfg express
const express = require("express")
const server = express()

const db = require("./db")

//cfg arquivos estáticos
server.use(express.static("public"))

//habilitar req.body

server.use(express.urlencoded({extended:true}))

//config nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views",{
    express: server,
    noCache: true,

})

//capturar pedido
server.get("/",function(req, res){

    db.all(`SELECT * from ideas`, function(err,rows){
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }

        const revertIdeias = [...rows].reverse()
        let lastIdeas = []
        for (let idea of revertIdeias) {
            if(lastIdeas.length <2){
                lastIdeas.push(idea)
            }
        }

    

    return res.render("index.html", {ideias: lastIdeas})
    })
})

server.get("/ideias",function(req, res){
    db.all(`SELECT * from ideas`, function(err,rows){
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }
        const ideias = [...rows].reverse()
    return res.render("ideias.html", {ideias})
    })
})


server.get("/admin",function(req, res){
    db.all(`SELECT * from ideas`, function(err,rows){
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }
        const ideias = [...rows].reverse()
    return res.render("admin.html", {ideias})
    })
})

server.post("/", function(req,res){
    const query =`
            INSERT INTO ideas(
                image,
                title,
                category,
                description,
                link
            )VALUES (?,?,?,?,?)
    `
    const values = [
        req.body.imageurl,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.linkideia   
    ]
    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }

        return res.redirect("/ideias")
    })
})

server.delete("/", function(req,res){
    const query = `
            DELETE FROM ideas WHERE id = ?
    `
    db.run(query,req.query.idIdea)
    console.log("id = ",req.query.idIdea, "DELETED")
})

//ligar na porta x
server.listen(3000)