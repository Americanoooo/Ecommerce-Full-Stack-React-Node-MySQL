import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

export default function Perfil({ usuario, setUsuario, setLogado, logado }) {
  const [nomeMudar, setnomeMudar] = useState("");
  const [usuarioMudar, setUsuarioMudar] = useState("");
  const [messageUsuario, setMessageUsuario] = useState("");
  const [messageNome, setMessageNome] = useState("");
  const [senhaMudar, setSenhaMudar] = useState("");
  const [messageSenha, setMessageSenha] = useState("");
  const [emailMudar, setEmailMudar]=useState("")
  const [messageEmail, setMessageEmail]=useState("")

  function AlterarNome() {
    fetch(`${process.env.REACT_APP_API_URL}/usuarios/nome/${usuario.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nomeMudar }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsuario({ ...usuario, nome: nomeMudar });
        setMessageNome(data.messageNome);
      });
  }
  function AlterarUsuario() {
    fetch(`${process.env.REACT_APP_API_URL}/usuarios/usuario/${usuario.usuario}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ novoUsuario: usuarioMudar }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessageUsuario(data.messageUsuario);
        setUsuario({ ...usuario, usuario: usuarioMudar });
      });
  }
  function AlterarSenha() {
    if (senhaMudar.length < 6) {
      setMessageSenha("A senha deve ter pelo menos 6 caracteres");
      return;
    } else if (!/\d/.test(senhaMudar)) {
      setMessageSenha("A senha deve conter pelo menos um número");
      return;
    } else if (!/[a-z]/.test(senhaMudar)) {
      setMessageSenha("A senha deve conter letra minúscula");
      return;
    } else if (!/[A-Z]/.test(senhaMudar)) {
      setMessageSenha("A senha deve conter pelo menos uma letra maiúscula");
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL}/usuarios/senha/${usuario.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ novaSenha: senhaMudar }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSenhaMudar("");
        setMessageSenha(data.messageSenha);
      });
  }

  function AlterarEmail(){
    fetch(`${process.env.REACT_APP_API_URL}/usuarios/email/${usuario.id}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailMudar }),
    })
    .then((res)=> res.json())
    .then((data)=>{
        setUsuario({ ...usuario, email: emailMudar });
        setMessageEmail((data.messageEmail));
    })
  }

  if (!logado || !usuario) return <Redirect to="/account" />;

  const inputClass = "border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 rounded-lg h-10 px-3 flex-1 focus:border-blue-600 focus:outline-none placeholder-gray-400 transition-colors text-sm";
  const btnClass = "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 h-10 rounded-lg transition-colors duration-150 text-sm flex-shrink-0";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-5">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Meu Perfil</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Olá, {usuario.nome}</p>
          </div>
          <Link to="/account">
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors duration-150 text-sm"
              onClick={() => { setLogado(false); setUsuario(null); localStorage.removeItem("usuario"); }}
            >
              Sair
            </button>
          </Link>
        </div>

        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col gap-6">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Informações da conta</h2>

          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Nome atual</p>
            <p className="text-base font-semibold text-gray-800 dark:text-gray-100">{usuario.nome}</p>
            <div className="flex gap-2 mt-2">
              <input placeholder="Novo nome" className={inputClass}
                value={nomeMudar} onChange={(e) => setnomeMudar(e.target.value)} />
              <button className={btnClass} onClick={AlterarNome}>Salvar</button>
            </div>
            {messageNome && <p className="text-xs text-green-600 font-medium mt-1">{messageNome}</p>}
          </div>

          <div className="border-t border-gray-100 dark:border-gray-700" />

          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Usuário atual</p>
            <p className="text-base font-semibold text-gray-800 dark:text-gray-100">@{usuario.usuario}</p>
            <div className="flex gap-2 mt-2">
              <input placeholder="Novo usuário" className={inputClass}
                value={usuarioMudar} onChange={(e) => setUsuarioMudar(e.target.value)} />
              <button className={btnClass} onClick={AlterarUsuario}>Salvar</button>
            </div>
            {messageUsuario && <p className="text-xs text-green-600 font-medium mt-1">{messageUsuario}</p>}
          </div>

          <div className="border-t border-gray-100 dark:border-gray-700" />

          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Email atual</p>
            <p className="text-base font-semibold text-gray-800 dark:text-gray-100">{usuario.email}</p>
            <div className="flex gap-2 mt-2">
              <input placeholder="Novo email" className={inputClass}
                value={emailMudar} onChange={(e) => setEmailMudar(e.target.value)} />
              <button className={btnClass} onClick={AlterarEmail}>Salvar</button>
            </div>
            {messageEmail && <p className="text-xs text-green-600 font-medium mt-1">{messageEmail}</p>}
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col gap-4">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Segurança</h2>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Nova senha</p>
            <div className="flex gap-2 mt-2">
              <input type="password" placeholder="Digite a nova senha" className={inputClass}
                value={senhaMudar} onChange={(e) => setSenhaMudar(e.target.value)} />
              <button className={btnClass} onClick={() => { AlterarSenha(); }}>Salvar</button>
            </div>
            {messageSenha && (
              <p className={`text-xs font-medium mt-1 ${messageSenha === "Senha alterada com sucesso" ? "text-green-600" : "text-red-600"}`}>
                {messageSenha}
              </p>
            )}
          </div>
        </section>

        {usuario?.admin && (
          <Link to="/admin">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full h-12 rounded-lg transition-colors duration-150">
              Painel Administrativo
            </button>
          </Link>
        )}

      </div>
    </div>
  );
}
