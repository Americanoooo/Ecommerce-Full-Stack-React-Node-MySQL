import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

const inputClass = "border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 rounded-lg h-10 px-3 w-full focus:border-blue-600 focus:outline-none placeholder-gray-400 transition-colors text-sm";
const labelClass = "text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider";

function FormEditar({ editProduto, setEditProduto, SalvarEdit }) {
  if (!editProduto) return null;
  const [confirmar, setConfirmar] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Editar produto</h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-56 flex-shrink-0">
              <img src={editProduto.imagem}
                className="w-full h-48 object-cover rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
                alt={editProduto.nome} />
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Nome</label>
                <input className={inputClass} value={editProduto.nome}
                  onChange={(e) => setEditProduto({ ...editProduto, nome: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Marca</label>
                <input className={inputClass} value={editProduto.marca}
                  onChange={(e) => setEditProduto({ ...editProduto, marca: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Categoria</label>
                <input className={inputClass} value={editProduto.categoria}
                  onChange={(e) => setEditProduto({ ...editProduto, categoria: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Preço à vista (PIX)</label>
                  <input className={inputClass} type="number" value={editProduto.preco}
                    onChange={(e) => setEditProduto({ ...editProduto, preco: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Preço crédito</label>
                  <input className={inputClass} type="number" value={editProduto.precoAntigo}
                    onChange={(e) => setEditProduto({ ...editProduto, precoAntigo: e.target.value })} />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-700 mt-6 pt-5">
            {!confirmar ? (
              <div className="flex gap-3 justify-end">
                <button
                  className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors duration-150 text-sm"
                  onClick={() => setEditProduto(null)}>
                  Cancelar
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors duration-150 text-sm"
                  onClick={() => setConfirmar(true)}>
                  Salvar alterações
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-end gap-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Confirmar alterações?</p>
                <div className="flex gap-3">
                  <button
                    className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors duration-150 text-sm"
                    onClick={() => setConfirmar(false)}>
                    Voltar
                  </button>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors duration-150 text-sm"
                    onClick={SalvarEdit}>
                    Confirmar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FormAdicionar({setAdicionarProduto, adicionarProduto, SalvarProduto, mensagemAdicionar, setMenu, setMensagemAdicionar}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Adicionar produto</h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className={labelClass}>URL da imagem</label>
            <input className={inputClass} value={adicionarProduto.imagem}
              onChange={(e) => setAdicionarProduto({ ...adicionarProduto, imagem: e.target.value })} />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Nome</label>
            <input className={inputClass} value={adicionarProduto.nome}
              onChange={(e) => setAdicionarProduto({ ...adicionarProduto, nome: e.target.value })} />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Marca</label>
            <input className={inputClass} value={adicionarProduto.marca}
              onChange={(e) => setAdicionarProduto({ ...adicionarProduto, marca: e.target.value })} />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Categoria</label>
            <input className={inputClass} value={adicionarProduto.categoria}
              onChange={(e) => setAdicionarProduto({ ...adicionarProduto, categoria: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Preço à vista (PIX)</label>
              <input className={inputClass} type="number" value={adicionarProduto.preco}
                onChange={(e) => setAdicionarProduto({ ...adicionarProduto, preco: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Preço crédito</label>
              <input className={inputClass} type="number" value={adicionarProduto.precoAntigo}
                onChange={(e) => setAdicionarProduto({ ...adicionarProduto, precoAntigo: e.target.value })} />
            </div>
          </div>

          {mensagemAdicionar && (
            <p className="text-sm text-red-600 font-medium">{mensagemAdicionar}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors duration-150 text-sm"
              onClick={() => { setMenu("painel"); setMensagemAdicionar(""); }}>
              Cancelar
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex-1 py-2 rounded-lg transition-colors duration-150 text-sm"
              onClick={SalvarProduto}>
              Salvar produto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Admin({ produtos, setProdutos, usuario, setUsuario, logado }) {
  const [messageRemover, setMessageRemover] = useState("");
  const [menu, setMenu] = useState("painel");
  const [editProduto, setEditProduto] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [mensagemAdicionar, setMensagemAdicionar]=useState("")
  const [confirmarRemover, setConfirmarRemover] = useState(false);
  const [adicionarProduto, setAdicionarProduto] = useState({
    imagem:"", nome:"", marca:"", categoria:"", preco:"", precoAntigo:""
  });

  function formatarPreco(preco) {
    return Number(preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
  function SalvarEdit() {
    fetch(`${process.env.REACT_APP_API_URL}/produtos/${editProduto.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editProduto),
    })
      .then((res) => res.json())
      .then((data) => {
        setProdutos((prev) => prev.map((p) => (p.id === editProduto.id ? editProduto : p)));
        setEditProduto(null);
        setMensagem(data.message);
        setTimeout(() => { setMensagem(""); }, 3000);
      });
  }
  function SalvarProduto(){
    fetch(`${process.env.REACT_APP_API_URL}/produtos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adicionarProduto)
    })
    .then(async (res)=>{
        const data = await res.json();
        if(!res.ok){ throw new Error(data.message); }
        return data;
    })
    .then(data=>{
      setProdutos(prev =>[...prev, { ...adicionarProduto, id: data.id }]);
      setAdicionarProduto({ imagem:"", nome:"", marca:"", categoria:"", preco:"", precoAntigo:"" });
      setMenu("painel");
      setMensagem(data.message);
      setTimeout(() => { setMensagem(""); }, 3000);
      setMensagemAdicionar("")
    })
    .catch((err)=> { setMensagemAdicionar(err.message); })
  }

  function PainelProdutos() {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
        {mensagem && (
          <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium z-50">
            {mensagem}
          </div>
        )}

        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Painel administrativo</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{produtos.length} produtos cadastrados</p>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors duration-150 text-sm"
              onClick={() => setMenu("adicionar")}>
              + Adicionar produto
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {produtos.map((produto) => (
              <div key={produto.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex flex-col gap-4">
                <img src={produto.imagem}
                  className="w-full h-40 object-cover rounded-lg bg-gray-50 dark:bg-gray-700"
                  alt={produto.nome} />
                <div className="flex flex-col gap-1 flex-1">
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">{produto.categoria}</p>
                  <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug">{produto.nome}</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatarPreco(produto.preco)} à vista</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{formatarPreco(produto.precoAntigo)} no crédito</p>
                </div>
                <div className="flex gap-2 border-t border-gray-100 dark:border-gray-700 pt-3">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex-1 py-2 rounded-lg transition-colors duration-150 text-xs"
                    onClick={() => setEditProduto(produto)}>
                    Editar
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold flex-1 py-2 rounded-lg transition-colors duration-150 text-xs"
                    onClick={() => {
                      if (confirmarRemover === produto.id) {
                        RemoverProduto(produto.id);
                      } else {
                        setConfirmarRemover(produto.id);
                        setTimeout(() => { setConfirmarRemover(null); }, 3000);
                      }
                    }}>
                    {confirmarRemover === produto.id ? "Confirmar?" : "Remover"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function editarProduto() {
    fetch(``);
  }

  function RemoverProduto(id) {
    fetch(`${process.env.REACT_APP_API_URL}/produtos/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        setProdutos((prev) => prev.filter((p) => p.id !== id));
        setMensagem(data.message);
        setTimeout(() => { setMensagem(""); }, 3000);
      });
  }

  if(!usuario || !usuario.admin){ return <Redirect to="/"/> }

  return (
    <div>
      {editProduto ? (
        <FormEditar editProduto={editProduto} setEditProduto={setEditProduto} SalvarEdit={SalvarEdit} />
      ) : menu === "adicionar" ? (
        <FormAdicionar
          setAdicionarProduto={setAdicionarProduto}
          adicionarProduto={adicionarProduto}
          SalvarProduto={SalvarProduto}
          mensagemAdicionar={mensagemAdicionar}
          setMenu={setMenu}
          setMensagemAdicionar={setMensagemAdicionar}
        />
      ) : (
        <PainelProdutos />
      )}
    </div>
  );
}
