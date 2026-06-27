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
      fetch(`${process.env.REACT_APP_API_URL}/usuarios`,{
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
    if(!email.trim() || !senha.trim()){
      setMensagem("Preencha email e senha");
      return;
    }
  fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  })
  .then((res) => {
    if(!res.ok){ throw new Error("Email ou senha incorretos"); }
    return res.json();
  })
  .then((data) => {
    setMensagem("Login efetuado com sucesso");
    setUsuario(data)
    localStorage.setItem("usuario", JSON.stringify(data))
    setLogado(true);
    history.push("/perfil");
  })
  .catch((err) => { setMensagem(err.message); });
}

  if(logado) return <Redirect to="/perfil"/>;

  const inputClass = "border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 rounded-lg h-12 px-4 w-full focus:border-blue-600 focus:outline-none placeholder-gray-400 transition-colors text-sm";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-12">
      {modo === 'login' ? (

        <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-5">

          <section className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Acesse sua conta</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Informe seus dados para continuar</p>
            </div>

            <form className="flex flex-col gap-4">
              <input placeholder="E-mail" type="email" className={inputClass}
                value={email} onChange={(e) => setEmail(e.target.value)} />
              <input placeholder="Senha" type="password" className={inputClass}
                value={senha} onChange={(e) => setSenha(e.target.value)} />
            </form>

            <div className="flex items-center gap-2 mt-4">
              <input type="checkbox" id="lembrar" className="w-4 h-4 accent-blue-600" />
              <label htmlFor="lembrar" className="text-sm text-gray-600 dark:text-gray-400">Lembrar meus dados</label>
            </div>

            {mensagem && (
              <p className={`text-sm mt-4 font-medium ${mensagem === "Login efetuado com sucesso" ? "text-green-600" : "text-red-600"}`}>
                {mensagem}
              </p>
            )}

            <button onClick={login}
              className="mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full h-12 rounded-lg transition-colors duration-150">
              Acessar conta
            </button>
          </section>

          <div className="flex-1 bg-blue-50 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-xl p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Novo por aqui?</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                Crie sua conta e aproveite todos os benefícios de ser um cliente TechStore.
              </p>
            </div>
            <button
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full h-12 rounded-lg transition-colors duration-150"
              onClick={() => { setModo('register'); setMensagem(""); }}
            >
              Criar conta
            </button>
          </div>

        </div>

      ) : (

        <div className="max-w-md mx-auto">
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Criar minha conta</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Informe seus dados abaixo</p>
            </div>

            <form className="flex flex-col gap-4">
              <input placeholder="Usuário" className={inputClass}
                value={criarUsuario} onChange={(e) => { setCriarUsuario(e.target.value); }} />
              <input placeholder="Nome" className={inputClass}
                value={criarNome} onChange={(e) => { setCriarNome(e.target.value); }} />
              <input placeholder="Email" type="email" className={inputClass}
                value={criarEmail} onChange={(e) => setCriarEmail(e.target.value)} />
              <input placeholder="Senha" type="password" className={inputClass}
                value={criarSenha} onChange={(e) => setCriarSenha(e.target.value)} />
            </form>

            {mensagem && (
              <p className={`text-sm mt-4 font-medium ${mensagem === "Cadastro efetuado com sucesso" ? "text-green-600" : "text-red-600"}`}>
                {mensagem}
              </p>
            )}

            <div className="flex flex-col gap-3 mt-5">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full h-12 rounded-lg transition-colors duration-150"
                onClick={cadastrar}>
                Criar conta
              </button>
              <button onClick={() => { setModo("login"); setMensagem(""); }}
                className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold w-full h-12 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors duration-150">
                Voltar para o login
              </button>
            </div>
          </section>
        </div>

      )}
    </div>
  );
}
