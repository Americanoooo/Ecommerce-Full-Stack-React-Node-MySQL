const express = require('express')
const cors = require('cors')
const mysql = require("mysql2")
const bcrypt = require("bcrypt");

const app = express()
app.use(cors())
app.use(cors())
app.use(express.json());


const db= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0710",
    database:"ecommerce"
})

db.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("MySQl conectado")
    }
})

app.get("/produtos",(req, res)=>{
    db.query("SELECT * FROM produtos", (err, result)=>{
        if(err){
            res.send(err)
        }else{
            res.json(result)
        }
    })
})

app.post("/usuarios", async(req, res)=>{
    const {nome, usuario, email,senha} = req.body;

    const senhaHash = await bcrypt.hash(senha, 10)

    db.query(
        "SELECT * FROM usuarios WHERE email = ? or usuario = ?",
        [email, usuario], 
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (result.length > 0) {
                if (result.some(u => u.email === email)) {
                    return res.status(400).json({
                        message: "Email já cadastrado"
                    });
                }
                if (result.some(u => u.usuario === usuario)) {
                    return res.status(400).json({
                        message: "Usuário já cadastrado"
                    });
                }
            }
            db.query(
                "INSERT INTO usuarios(usuario, nome, email, senha) VALUES(?, ?, ?, ?)",
                [usuario, nome, email, senhaHash],
                (err, result) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    res.status(201).json({
                        message: "Cadastro efetuado com sucesso"
                    });
                }
            );
        }
    );
})

app.post("/login", async(req, res)=>{
    const {email, senha}= req.body;
   
    db.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [email],
        async (err, result)=>{
             if(err){
                return res.status(500).json(err);
            }   

            if(result.length ===0){
                return res.status(401).json({
                    message: "Email ou senha incorretos"
                });
            }
            const usuario = result[0]

            const senhaCorreta = await bcrypt.compare(
                    senha,
                    usuario.senha
    )
        if(!senhaCorreta){
            return res.status(401).json({
                message: "Email ou senha incorretos"
            })
        }
            res.json({
                id: usuario.ID,
                nome: usuario.nome,
                usuario: usuario.usuario,
                email: usuario.email,
                admin:usuario.admin});           
        }

    )
})

app.put("/usuarios/nome/:id", (req, res)=>{
    const {id} = req.params;
    const {nome} = req.body;

    db.query(
        "UPDATE usuarios SET nome = ? WHERE ID = ?",
        [nome, id],
        (err, result)=>{
            if(err){
                return res.status(500).json(err);
                        }
            res.json({
            messageNome:"Nome alterado com sucesso"
        });
        }
    )
    
})

app.put("/usuarios/usuario/:usuario", (req, res)=>{
    const {usuario} = req.params;
    const {novoUsuario} = req.body;

    db.query(
        "UPDATE usuarios SET usuario = ? WHERE usuario=?",
        [novoUsuario, usuario],
        (err, result)=>{
            if(err){
                return res.status(500).json(err);
            }
             res.json({
            messageUsuario:"Usuario alterado com sucesso"
        });

        }
        
    )
    
})

app.put("/usuarios/senha/:id", async(req, res)=>{
    const {id} = req.params;
    const {novaSenha} = req.body;

    const senhaHash = await bcrypt.hash(novaSenha, 10)

    db.query(
        "UPDATE usuarios SET senha = ? WHERE id=?",
        [senhaHash, id],
        (err, result)=>{
            if(err){
                return res.status(500).json(err);
            }
            res.json({
                messageSenha:"Senha alterada com sucesso"
            })
        }
    )
})

app.put("/usuarios/email/:id", (req, res)=>{
    const {id} = req.params;
    const {email} = req.body;

    db.query(
        "UPDATE usuarios SET email = ? WHERE id=?",
        [email, id],
        (err, result)=>{
            if(err){
                return res.status(500).json(err);
            }
            res.json({
                messageEmail:"Email alterado com sucesso"
            })
        }
    )
})

    app.delete("/produtos/:id", (req, res)=>{
        const {id} = req.params;

        db.query(
            "DELETE FROM produtos WHERE id = ?",
            [id],
            (err, result)=>{
                if(err) return res.status(500).json(err);
                
                res.json({message: "Produto removido com sucesso"})
            }
        )
    })

    app.put("/produtos/:id", (req, res)=>{
        const{id} = req.params;
        const {nome, marca, categoria, preco, precoAntigo, imagem} = req.body;
        db.query(
            `UPDATE produtos SET nome=?, marca=?, categoria=?, preco=?, precoAntigo=?, imagem=?
            WHERE id=?`,
            [nome, marca, categoria, preco, precoAntigo, imagem, id],
            (err, result)=>{
                if(err){
                    return res.status(500).json(err);
                }
                res.json({
                    message: "Produto atualizado com sucesso"
                })
            }
        )
    })
    app.post("/produtos", (req,res)=> {
        const{
            imagem,
            nome,
            marca,
            categoria,
            preco,
            precoAntigo
        }= req.body;

        if(!imagem?.trim()||
            !nome?.trim()||
            !marca?.trim()||
            !categoria?.trim()||
            !preco?.trim()||
            !precoAntigo?.trim()
        ){
            return res.status(400).json({
                message: "Preencha todos os campos"
            })
        }
        const precoNum= Number(preco);
        const precoNumAntigo = Number(precoAntigo)
        if(isNaN(precoNum) || isNaN(precoNumAntigo)){
            return res.status(400).json({
            message: "Preço inválido"
            })
        }
        if(precoNum <= 0 || precoNumAntigo <= 0){
            return res.status(400).json({
            message: "Preço inválido"
            })
        }
        if(nome.length < 3){
            return res.status(400).json({
                message: "Nome inválido"
            })
        }
          if(!marca || marca.length < 1){
            return res.status(400).json({
                message: "Marca inválido"
            })
        }
          if(!categoria || categoria.length < 1){
            return res.status(400).json({
                message: "Categoria inválido"
            })
        }
        db.query(
            `INSERT INTO produtos
            (imagem, nome, marca, categoria, preco, precoAntigo)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [ imagem, nome, marca, categoria, preco, precoAntigo],
            (err, result)=>{
                if(err){
                    return res.status(500).json(err);
                }

                res.json({
                    message:"Produto adicionado com sucesso",
                    id:result.insertId
                })
            }
        )
    })
app.listen(3001, () =>{
    console.log("servidor rodando na porta 3001 vai tomando")
})