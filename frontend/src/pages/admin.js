import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

function FormEditar({ editProduto, setEditProduto, SalvarEdit }) {
  if (!editProduto) return null;
  const [confirmar, setConfirmar] = useState(null);

  return (
    <div>
      <main className="flex justify-center w-full mx-auto gap-8">
        <div>
          <img
            src={editProduto.imagem}
            className="border shadow rounded-xl w-80 h-80 object-cover"
          />
        </div>

        <div className="flex flex-col gap-2 w-80">
          <label className="font-semibold text-xl">Nome</label>
          <input
            className="border p-2 rounded"
            value={editProduto.nome}
            onChange={(e) =>
              setEditProduto({ ...editProduto, nome: e.target.value })
            }
          />
          <label className="font-semibold text-xl">Marca</label>
          <input
            className="border p-2 rounded"
            value={editProduto.marca}
            onChange={(e) =>
              setEditProduto({ ...editProduto, marca: e.target.value })
            }
          />
          <label className="font-semibold text-xl">Categoria</label>
          <input
            className="border p-2 rounded"
            value={editProduto.categoria}
            onChange={(e) =>
              setEditProduto({ ...editProduto, categoria: e.target.value })
            }
          />
          <label className="font-semibold text-xl">Preço à vista</label>
          <input
            className="border p-2 rounded"
            value={editProduto.preco}
            type="number"
            onChange={(e) =>
              setEditProduto({ ...editProduto, preco: e.target.value })
            }
          />
          <label className="font-semibold text-xl">Preço crédito</label>
          <input
            className="border p-2 rounded"
            value={editProduto.precoAntigo}
            type="number"
            onChange={(e) =>
              setEditProduto({ ...editProduto, precoAntigo: e.target.value })
            }
          />
        </div>
      </main>
      {!confirmar ? (
        <div className="flex justify-center mt-5 gap-10">
          <button
            className="bg-blue-700 text-white p-1 rounded w-32"
            onClick={() => setConfirmar(true)}
          >
            Salvar
          </button>
          <button
            className="bg-red-700 text-white p-1 rounded w-32"
            onClick={() => setEditProduto(null)}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div className="mt-5">
          <h1 className="text-center">Deseja salvar as alterações?</h1>
          <div className="flex justify-center mt-2 gap-10">
            <button
              className="bg-green-700 text-white p-1 rounded w-32"
              onClick={SalvarEdit}
            >
              Confirmar
            </button>
            <button
              className="bg-red-700 text-white p-1 rounded w-32"
              onClick={() => setConfirmar(false)}
            >
              Voltar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

  function FormAdicionar({setAdicionarProduto, adicionarProduto, SalvarProduto, mensagemAdicionar, setMenu, setMensagemAdicionar}) {
    return (
      <div>
        <main className="flex justify-center w-full mx-auto gap-8">
          <div className="flex flex-col gap-2 w-1/3">
            <label className="font-semibold text-xl">Imagem</label>
            <input className="border p-2 rounded"
            value={adicionarProduto.imagem}
            onChange={(e)=>setAdicionarProduto({
              ...adicionarProduto,
              imagem: e.target.value
            })}/>
            <label className="font-semibold text-xl">Nome</label>
            <input className="border p-2 rounded" 
            value={adicionarProduto.nome}
            onChange={(e)=>setAdicionarProduto({
              ...adicionarProduto,
              nome: e.target.value
            })}/>
            <label className="font-semibold text-xl">Marca</label>
            <input className="border p-2 rounded" 
            value={adicionarProduto.marca}
            onChange={(e)=>setAdicionarProduto({
              ...adicionarProduto,
              marca: e.target.value
            })}/>
            <label className="font-semibold text-xl">Categoria</label>
            <input className="border p-2 rounded" 
            value={adicionarProduto.categoria}
            onChange={(e)=>setAdicionarProduto({
              ...adicionarProduto,
              categoria: e.target.value
            })}/>
            <label className="font-semibold text-xl">Preço à vista</label>
            <input className="border p-2 rounded" type="number" 
            value={adicionarProduto.preco}
            onChange={(e)=>setAdicionarProduto({
              ...adicionarProduto,
              preco: e.target.value
            })}/>
            <label className="font-semibold text-xl">Preço crédito</label>
            <input className="border p-2 rounded" type="number"
            value={adicionarProduto.precoAntigo}
            onChange={(e)=>setAdicionarProduto({
              ...adicionarProduto,
              precoAntigo: e.target.value
            })} />
            <h1 className="text-xl text-red-700 font-semibold">
              {mensagemAdicionar}
            </h1>
              <div className="flex gap-5 justify-center mt-2">
            <button className="bg-blue-700 text-white p-1 rounded w-32"
            onClick={SalvarProduto}>
              Salvar 
            </button>
            <button className="bg-red-700 text-white p-1 rounded w-32"
            onClick={()=> {setMenu("painel"); setMensagemAdicionar("")}}>
              Cancelar
            </button>
          </div>
          </div>
        
        </main>
      </div>
    );
  }

export default function Admin({
  produtos,
  setProdutos,
  usuario,
  setUsuario,
  logado,
}) {
  const [messageRemover, setMessageRemover] = useState("");
  const [menu, setMenu] = useState("painel");
  const [editProduto, setEditProduto] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [mensagemAdicionar, setMensagemAdicionar]=useState("")
  const [confirmarRemover, setConfirmarRemover] = useState(false);
  const [adicionarProduto, setAdicionarProduto] = useState({
    imagem:"",
    nome:"",
    marca:"",
    categoria:"",
    preco:"",
    precoAntigo:""
  });

  function formatarPreco(preco) {
    return Number(preco).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  function SalvarEdit() {
    fetch(`${process.env.REACT_APP_API_URL}/produtos/${editProduto.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editProduto),
    })
      .then((res) => res.json())
      .then((data) => {
        setProdutos((prev) =>
          prev.map((p) => (p.id === editProduto.id ? editProduto : p)),
        );
        setEditProduto(null);
        setMensagem(data.message);

        setTimeout(() => {
          setMensagem("");
        }, 3000);
      });
  }
  function SalvarProduto(){
    fetch(`${process.env.REACT_APP_API_URL}/produtos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(adicionarProduto)
    })
    .then(async (res)=>{
        const data = await res.json();

        if(!res.ok){
          throw new Error(data.message);
        }
        return data;
    })
    .then(data=>{
      setProdutos(prev =>[
        ...prev,
        {
          ...adicionarProduto,
          id: data.id
        }
      ]);
      setAdicionarProduto({
        imagem:"",
        nome:"",
        marca:"",
        categoria:"",
        preco:"",
        precoAntigo:""
      });
      setMenu("painel")
      setMensagem(data.message);
        setTimeout(() => {
          setMensagem("");
        }, 3000);
        setMensagemAdicionar("")
    })
    .catch((err)=> {
      setMensagemAdicionar(err.message);
  
    })
  }


  function PainelProdutos() {
    return (
      <div>
        {mensagem && (
          <div className="fixed top-5 right-5 bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg">
            {mensagem}
          </div>
        )}
        <div className=" text-2xl text-center ">
          <h1>Painel administrativo</h1>
        </div>
        <section>
          <div className="flex justify-center gap-10">
            <button
              className="bg-blue-700 text-white w-64 rounded h-8 "
              onClick={() => setMenu("adicionar")}
            >
              Adicionar Produtos
            </button>
          </div>
          <div className="flex justify-center">         
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 items-stretch max-w-7xl  gap-10 px-5 mt-5">
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="flex gap-6 md:h-64 items-stretch w-full"
              >
                <img
                  src={produto.imagem}
                  className="w-1/4 md:w-2/6 rounded-xl shadow object-cover"
                ></img>
                <div className="flex flex-col justify-between flex-1 w-full">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-xl">{produto.nome}</h1>
                    <p>Categoria: {produto.categoria}</p>
                    <p>{formatarPreco(produto.preco)} à vista</p>
                    <p>{formatarPreco(produto.precoAntigo)} no crédito</p>
                  </div>
                  <div className="flex gap-10 ">
                    <button
                      className="bg-blue-700 text-white w-32 rounded h-8 "
                      onClick={() => setEditProduto(produto)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-700 text-white w-32 rounded h-8 "
                      onClick={() => {
                        if (confirmarRemover === produto.id) {
                          RemoverProduto(produto.id);
                        } else {
                          setConfirmarRemover(produto.id);

                          setTimeout(() => {
                            setConfirmarRemover(null);
                          }, 3000);
                        }
                      }}
                      className="bg-red-700 text-white w-32 rounded h-8"
                    >
                      {confirmarRemover === produto.id
                        ? "Tem certeza?"
                        : "Remover"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
           </div>
        </section>
      </div>
    );
  }

  function editarProduto() {
    fetch(``);
  }

  function RemoverProduto(id) {
    fetch(`${process.env.REACT_APP_API_URL}/produtos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setProdutos((prev) => prev.filter((p) => p.id !== id));
        setMensagem(data.message);

        setTimeout(() => {
          setMensagem("");
        }, 3000);
      });
  }
    if(!usuario || !usuario.admin){
      return <Redirect to="/"/>
    }

  return (
    <div>
      {editProduto ? (
        <FormEditar
          editProduto={editProduto}
          setEditProduto={setEditProduto}
          SalvarEdit={SalvarEdit}
        />
      ) : menu === "adicionar" ? (
        <FormAdicionar 
        setAdicionarProduto={setAdicionarProduto}
        adicionarProduto={adicionarProduto}
        SalvarProduto={SalvarProduto}
        mensagemAdicionar={mensagemAdicionar}
        setMenu={setMenu}
        setMensagemAdicionar={setMensagemAdicionar}/>
      ) : (
        <PainelProdutos />
      )}
    </div>
  );
}
