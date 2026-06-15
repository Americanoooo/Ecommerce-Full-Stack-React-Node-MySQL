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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nomeMudar,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsuario({
          ...usuario,
          nome: nomeMudar,
        });
        setMessageNome(data.messageNome);
      });
  }
  function AlterarUsuario() {
    fetch(`${process.env.REACT_APP_API_URL}/usuarios/usuario/${usuario.usuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        novoUsuario: usuarioMudar,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessageUsuario(data.messageUsuario);
        setUsuario({
          ...usuario,
          usuario: usuarioMudar,
        });
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        novaSenha: senhaMudar,
      }),
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
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email:emailMudar
        }),
    })
    .then((res)=> res.json())
    .then((data)=>{
        setUsuario({
            ...usuario,
            email:emailMudar,
        });
        setMessageEmail((data.messageEmail));
    })
  }

  if (!logado || !usuario) {
    return <Redirect to="/account" />;
  }
  return (
    <div className="px-10">
      <section className="flex justify-center bg-gray-100  w-full md:w-3/4 m-auto rounded-xl shadow p-5">
        <div className="flex flex-col gap-5 text-lg md:text-xl">
          <div className="flex flex-row-reverse justify-between">
            <Link to="/account">
              <button
                className="self-end bg-red-500 text-white h-8 w-24 rounded shadow"
                onClick={() => {
                  setLogado(false);
                  setUsuario(null);
                  localStorage.removeItem("usuario");
                }}
              >
                SAIR
              </button>
            </Link>
            <h1 className="text-center ">Seja bem vindo: {usuario.nome}</h1>
          </div>
          <h1>Nome: {usuario.nome}</h1>
          <div className="flex gap-2">
            <label>Mudar Nome</label>
            <input
              className="rounded shadow h-8 p-1"
              value={nomeMudar}
              onChange={(e) => setnomeMudar(e.target.value)}
            ></input>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white h-8 w-24 rounded shadow "
              onClick={AlterarNome}
            >
              Mudar
            </button>
            <p>{messageNome}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h1>Usuario: {usuario.usuario}</h1>
            <div className="flex gap-2 ">
              <label>Mudar Usuario</label>
              <input
                className="rounded shadow h-8 p-1"
                value={usuarioMudar}
                onChange={(e) => setUsuarioMudar(e.target.value)}
              ></input>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white h-8 w-24 rounded shadow "
                onClick={AlterarUsuario}
              >
                Mudar
              </button>
              <p>{messageUsuario}</p>
            </div>
            <div className="flex gap-2">
              <h1>Mudar Senha</h1>
              <input
                type="password"
                className="rounded shadow h-8 p-1"
                value={senhaMudar}
                onChange={(e) => setSenhaMudar(e.target.value)}
              ></input>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white h-8 w-24 rounded shadow"
                onClick={() => {AlterarSenha();}}>
                Mudar
              </button>
            </div>
            <p
              className={
                messageSenha === "Senha alterada com sucesso"
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {messageSenha}
            </p>
          </div>
          <h1>Email: {usuario.email}</h1>
          <div className="flex gap-2">
            <h1>
                Mudar Email
            </h1>
            <input
                className="rounded shadow h-8 p-1"
                value={emailMudar}
                onChange={(e) => setEmailMudar(e.target.value)}
              ></input>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white h-8 w-24 rounded shadow"
                onClick={() => {AlterarEmail();}}>
                Mudar
              </button>
          </div>
          {usuario?.admin && (
          <Link to="/admin">
          <button className="bg-blue-700 text-white w-1/3 p-1 rounded mx-auto">
            Painel Admin
          </button>
          </Link>
          )}
        </div>
        
      </section>
    </div>
  );
}
