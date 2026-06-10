import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {useHistory} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

export default function Account({setNome, logado, setLogado, usuario, setUsuario}) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [modo, setModo]= useState("login")
  const [criarEmail, setCriarEmail]=useState("")
  const[criarSenha, setCriarSenha]=useState("")
  const[criarNome, setCriarNome]=useState("")
  const[criarUsuario, setCriarUsuario]=useState("")
  const history = useHistory();

 function cadastrar(){
      if(criarSenha.length < 6){
        setMensagem("A senha deve ter pelo menos 6 caracteres");
        return;
      }else if(!/\d/.test(criarSenha)){
        setMensagem("A senha deve conter pelo menos um número")
        return;
      }else if(!/[a-z]/.test(criarSenha)){
        setMensagem("A senha deve conter letra minúscula")
        return
      }else if(!/[A-Z]/.test(criarSenha)){
        setMensagem("A senha deve conter pelo menos uma letra maiúscula")
        return
      }
      fetch("http://localhost:3001/usuarios",{
        method:"POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({usuario: criarUsuario, nome: criarNome, email: criarEmail, senha: criarSenha})
      })
    .then((res)=> res.json())
    .then((data)=>{
      setMensagem(data.message);
    })

    .catch((err)=>{
      console.log(err);
      setMensagem("Email já cadastrado")
    })
    }

  function login() {

  fetch("http://localhost:3001/login", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      email,
      senha
    })

  })

  .then((res) => {

    if(!res.ok){
      throw new Error("Email ou senha incorretos");
    }

    return res.json();

  })

  .then((data) => {

    setMensagem("Login efetuado com sucesso");
    setUsuario(data)

    localStorage.setItem(
      "usuario",
      JSON.stringify(data)
    )
    setLogado(true);

    history.push("/perfil");

  })

  .catch((err) => {

    setMensagem(err.message);

  });
}
    if(logado) return <Redirect to="/perfil"/>;
  return (
    <div>
      {modo ==='login' ?(

      
      <div className="flex flex-col gap-10 md:flex-row md:w-1/2 md:m-auto  items-center">
        <section className="flex flex-col bg-gray-100 w-3/4 m-auto rounded-xl p-2 gap-10 shadow mt-10">
          <div className="text-center">
            <h1 className="text-xl">Acesse sua conta</h1>
            <p> informe seus dados para continuar</p>
          </div>
          <div className="flex flex-col gap-5">
            <form className="flex flex-col gap-5">

            
            <input
              placeholder="E-mail"
              type="email"
              className="h-12 rounded p-2 border focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder-gray-400 transition text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              placeholder="Senha"
              type="password"
              className="h-12 rounded p-2 border focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder-gray-400 transition text-lg"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            >

            </input>
            </form>
            <div className="flex gap-3">
              <input type="checkbox" />
              <label>Lembrar meus dados</label>
            </div>
            <h1 className={
                mensagem==="Login efetuado com sucesso"
                ?"text-blue-700"
                :"text-red-500"
            }>
                {mensagem}
                </h1>
            <button
              onClick={login}
              className="bg-blue-600 text-white rounded h-12 hover:bg-blue-800 border"
            >
              ACESSAR CONTA
            </button>
          </div>
        </section>

        <div className="flex flex-col bg-gray-100 w-3/4 m-auto rounded-xl p-2 gap-10 shadow ">
          <h1 className="text-center text-xl">Novo por aqui ?</h1>
          <p>
            Crie sua conta e aproveite todos os benefícios de ser um cliente
            TechStore.
          </p>
          <button 
          className="bg-green-500 hover:bg-green-700 text-white h-12 rounded p-2 border"
          onClick={()=> {setModo('register'); setMensagem("")}}>
            CRIAR CONTA
          </button>
        </div>
      </div>
      ): (
        <div>
          <section className="flex flex-col bg-gray-100 w-1/2 md:w-1/3 m-auto rounded-xl p-2 gap-5 shadow mt-10">
          <div className="text-center">

          
          <h1 className="text-xl ">Criar minha conta</h1>
          <p>Informe os seus dados abaixo para criar sua conta.</p>
            </div>
            <div className="flex flex-col gap-5">
              <form className="flex flex-col gap-5">
                
                 <input placeholder="Usuário" className="h-12 rounded p-2 border focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder-gray-400 transition text-lg"
              value={criarUsuario}
              onChange={(e)=>{
                setCriarUsuario(e.target.value);
                }}></input>
                


              <input placeholder="Nome" className="h-12 rounded p-2 border focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder-gray-400 transition text-lg"
              value={criarNome}
              onChange={(e)=>{
                setCriarNome(e.target.value);
              }}>

              </input>

              <input placeholder="Email" type="email" className="h-12 rounded p-2 border focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder-gray-400 transition text-lg"
              value={criarEmail}
              onChange={(e)=>setCriarEmail(e.target.value)}>
              
              </input>

              <input placeholder="Senha" type="password" className="h-12 rounded p-2 border focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder-gray-400 transition text-lg"
              value={criarSenha}
              onChange={(e)=>setCriarSenha(e.target.value)}>
              
              </input>
              </form>
              {mensagem === "Cadastro efetuado com sucesso"
              ?(<p className="text-xl text-blue-700">{mensagem}</p>)
              :(<p className="text-xl text-red-500">{mensagem}</p>)}
            </div>

            <div className="flex flex-col gap-3">
            <button className="bg-blue-600 text-white rounded h-12 hover:bg-blue-800 border p-2"
            onClick={cadastrar}>
              CRIAR CONTA
            </button>
            <button onClick={() => { setModo("login"); setMensagem(""); }}  className=" rounded bg-gray-300 h-12 hover:bg-gray-400">
              Voltar para o login
            </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
