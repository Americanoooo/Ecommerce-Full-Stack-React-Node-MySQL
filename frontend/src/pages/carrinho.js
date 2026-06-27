import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Carrinho({carrinho, setCarrinho, produtos }) {
  const [mostrarCep, setMostrarCep]=useState(false)
  const [cep, setCep]=useState("");
  const [endereco, setEndereco]=useState(null);

  function buscarCep(){
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res)=>res.json())
    .then((data)=>setEndereco(data))
    .catch((err)=>console.log(err));
  }

  function remover(id) {
    const novoCarrinho = carrinho.filter((p)=>p.id !=id)
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho))
    setCarrinho(novoCarrinho)
  }
  function formatarPreco(preco) {
    return Number(preco).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function adicionar1Carrinho(id) {
    const novoCarrinho = carrinho.map((p)=>
      p.id ===id ? {...p, quantidade: p.quantidade + 1} : p
    )
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho))
    setCarrinho(novoCarrinho)
  }

  function remover1Carrinho(id) {
   const carrinhoAtual = carrinho.map((p)=>
        p.id===id ? {...p, quantidade: p.quantidade -1} : p
  )
  const novoCarrinho = carrinhoAtual.filter((p)=> p.quantidade >0)
  localStorage.setItem("carrinho", JSON.stringify(novoCarrinho))
  setCarrinho(novoCarrinho)
  }
  function removerCarrinhoInteiro(){
    localStorage.setItem("carrinho", JSON.stringify([]))
    setCarrinho([])
  }

  const totalCarrinhoCredito = formatarPreco(
    carrinho.reduce((acc, atual) => acc + atual.preco * atual.quantidade * 1.05, 0)
  );
  const totalCarrinhoPix = formatarPreco(
    carrinho.reduce((acc, atual) => acc + atual.preco * atual.quantidade, 0)
  );
  const totalCarrinhoDividido = formatarPreco(
    carrinho.reduce((acc, atual) => acc + (atual.preco * atual.quantidade) / 12, 0)
  );

  if (carrinho.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-gray-300 dark:text-gray-600">
          <svg width="64" height="64" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-700 dark:text-gray-200">Seu carrinho está vazio</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Você ainda não adicionou nenhum produto.</p>
        <Link to="/">
          <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-150">
            Ver produtos
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Carrinho de compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">{carrinho.length} {carrinho.length === 1 ? 'item' : 'itens'}</p>
              <button onClick={removerCarrinhoInteiro}
                className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors duration-150">
                Remover todos
              </button>
            </div>

            {carrinho.map((p) => (
              <div key={p.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex gap-4 items-center">
                <img src={p.imagem} alt={p.nome}
                  className="w-20 h-20 object-cover rounded-lg bg-gray-50 dark:bg-gray-700 flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug truncate">{p.nome}</h2>
                  <div className="flex items-center gap-2 mt-3">
                    <button onClick={() => remover1Carrinho(p.id)}
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 w-8 h-8 rounded-lg font-bold transition-colors duration-150 flex items-center justify-center flex-shrink-0">
                      −
                    </button>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 w-6 text-center">{p.quantidade}</span>
                    <button onClick={() => adicionar1Carrinho(p.id)}
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 w-8 h-8 rounded-lg font-bold transition-colors duration-150 flex items-center justify-center flex-shrink-0">
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{formatarPreco(p.preco * 1.05)} no crédito</p>
                    <p className="text-base font-bold text-blue-600 dark:text-blue-400">{formatarPreco(p.preco)}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">no PIX</p>
                  </div>
                  <button onClick={() => remover(p.id)}
                    className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors duration-150">
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 flex flex-col gap-4">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Resumo do pedido</h2>

              <div className="flex flex-col gap-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">No crédito (5% juros)</span>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{totalCarrinhoCredito}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Em 12x de</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{totalCarrinhoDividido}</span>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3 flex flex-col gap-1">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wider">Melhor preço</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalCarrinhoPix}</p>
                <p className="text-xs text-blue-500 dark:text-blue-400">no PIX com 15% de desconto</p>
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full h-12 rounded-lg transition-colors duration-150">
                Finalizar pedido
              </button>
              <Link to="/">
                <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold w-full h-12 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors duration-150 text-sm">
                  Continuar comprando
                </button>
              </Link>

              <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
                <button
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-150 flex items-center gap-1"
                  onClick={() => setMostrarCep(!mostrarCep)}>
                  Calcular frete e prazo
                  <span className="text-gray-400 dark:text-gray-500">{mostrarCep ? '▲' : '▼'}</span>
                </button>

                {mostrarCep && (
                  <div className="mt-3 flex gap-2">
                    <input
                      className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg px-3 h-10 flex-1 focus:border-blue-600 focus:outline-none text-sm placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                      placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 h-10 rounded-lg text-sm transition-colors duration-150 flex-shrink-0"
                      onClick={buscarCep}>
                      OK
                    </button>
                  </div>
                )}

                {endereco && mostrarCep && (
                  <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    <p>{endereco.logradouro}</p>
                    <p>{endereco.bairro}</p>
                    <p>{endereco.localidade} — {endereco.uf}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
