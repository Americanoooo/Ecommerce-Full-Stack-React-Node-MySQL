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
      p.id ===id
      ?{...p, quantidade: p.quantidade + 1}
      :p
    )
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho))
    setCarrinho(novoCarrinho)
  }

  function remover1Carrinho(id) {
   const carrinhoAtual = carrinho.map((p)=>
        p.id===id
   ?{...p, quantidade: p.quantidade -1}
   :p
  )
  const novoCarrinho = carrinhoAtual.filter((p)=> p.quantidade >0)
  localStorage.setItem("carrinho", JSON.stringify(novoCarrinho))
  setCarrinho(novoCarrinho)
  }
  const totalCarrinhoCredito = formatarPreco(
    carrinho.reduce(
      (acc, atual) => acc + atual.preco * atual.quantidade * 1.05,
      0
    )
  );
  const totalCarrinhoPix = formatarPreco(
    carrinho.reduce((acc, atual) => acc + atual.preco * atual.quantidade, 0)
  );
  const totalCarrinhoDividido = formatarPreco(
    carrinho.reduce(
      (acc, atual) => acc + (atual.preco * atual.quantidade) / 12,
      0
    )
  );

  return (
    <div className="flex flex-col min-h-screen">
      {carrinho.length === 0 && (
        <div className="flex flex-col items-center p-3 mb-4">
          <h1 className="text-xl w-80">
            🛒 Parece que você não adicionou nenhum produto ao carrinho, volte à
            página inicial
          </h1>
          <Link
            to="/"
            className="text-2xl bg-blue-700 hover:bg-blue-800 transition shadow text-white rounded-md p-2"
          >
            Página Inicial
          </Link>
        </div>
      )}
      {carrinho.length > 0 && (
        <main className="flex flex-col md:flex-row-reverse md:gap-4 md:justify-around h-screen shadow ">
          <div className="flex flex-col w-full md:w-1/3 gap-2">
            <h1 className="text-xl ">Carrinho de compras</h1>
            <h1 className="text-xl">Resumo</h1>

            <div className="flex flex-row items-center gap-6 text-xl ">
              <h1>Total</h1>
              <h1>{totalCarrinhoCredito}</h1>
            </div>

            <div className="flex flex-col gap-3 justify-center py-3 mx-auto w-full">
              <h1 className="text-xl text-blue-700">{totalCarrinhoPix}</h1>
              <p>No PIX com 15% de desconto</p>
              <p>Ou</p>
              <h1 className="text-red-700 text-xl">{totalCarrinhoCredito}</h1>
              <p className="text-sm">Em até 12x de {totalCarrinhoDividido}</p>
              <button className="w-full bg-blue-900  hover:bg-blue-800 text-white transition h-10  rounded">
                FINALIZAR PEDIDO
              </button>
              <Link to="/">
                <button className="w-full bg-blue-500 hover:bg-gray-700 text-white transition h-10  rounded">
                  CONTINUAR COMPRANDO
                </button>
              </Link>
            </div>
            
            <div className="p-4  text-xl">
              
              <button className="cursor-pointer focus:outline-none " onClick={()=>setMostrarCep(!mostrarCep)}>Fretes e Prazos</button>
              {mostrarCep&&(
                 <div className="flex gap-2">
                <input className="border border-gray-400 rounded px-3 py-2 h-12 focus:border-blue-700 focus:outline-none"
                placeholder='CEP*'
                value={cep}
                onChange={(e)=>setCep(e.target.value)}
                >
                </input>
                <button className="bg-blue-500 hover:bg-blue-700 text-white rounded h-auto w-1/3 "onClick={buscarCep}>
                  Calcular
                </button>
              </div>
                )}
               {endereco && mostrarCep&&(
                <div className="px-3 py-2">
                <p>{endereco.logradouro}</p>
                <p>{endereco.bairro}</p>
                <p>{endereco.localidade}</p>
                <p>{endereco.uf}</p>
                </div>
              )}
             
            </div>
          </div>

          <div className="overflow-x-auto overflow-y-auto flex min-h-0 ">
            <section className="min-w-[700px] w-full">
              <div className="flex flex-row  items-center p-3 text-xl mt-3 p-8 gap-6 w-full">
                <h2 className="w-56">Produto</h2>
                <h2 className="w-32">Quantidade</h2>
                <h2 className="w-56">Preço à vista no PIX</h2>
              </div>

              {carrinho.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-row flex-nowrap items-center mt-3 bg-white shadow rounded-lg p-3 gap-6 w-full h-auto "
                >
                  <div className="flex flex-col gap-1 w-80">
                    <h1 className="text-md">{p.nome}</h1>
                    <img
                      src={p.imagem}
                      alt=""
                      className="  w-32 h-32 md:w-48 md:h-40 lg:w-64 lg:h-56 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-32 flex flex-row gap-1">
                    <button
                      onClick={() => remover1Carrinho(p.id)}
                      className="bg-gray-500 hover:bg-gray-300 w-6 rounded text-white text-lg"
                    >
                      -
                    </button>
                    {p.quantidade}
                    <button
                      onClick={() => adicionar1Carrinho(p.id)}
                      className="bg-gray-500 hover:bg-gray-300 w-6 rounded text-white text-lg"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-col sm text-gray-700 gap-2 w-64">
                    <p className="sm w-30">
                      {formatarPreco(p.preco * 1.05)} ou em até 10x de
                    </p>
                    <p className="sm">
                      {formatarPreco((p.preco * 1.1) / 10)} sem juros ou
                    </p>
                    <p className="text-lg text-blue-700">
                      {formatarPreco(p.preco)}
                    </p>
                    <p className="text-sm text-blue-700">No Pix</p>
                    <button
                      onClick={() => remover(p.id)}
                      className="bg-blue-700 hover:bg-blue-800 transition text-white rounded"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </section>
            
          </div>
        </main>
      )}
    </div>
  );
}
