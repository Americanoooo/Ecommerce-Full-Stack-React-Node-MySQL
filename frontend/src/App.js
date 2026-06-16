import './styles/tailwind.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";



function App({ produtos, carrinho, setCarrinho, busca, setBusca, setProdutos }) {
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading]=useState(true);
   const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pesquisa = queryParams.get("search");


  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/produtos`)
    .then((res)=>res.json())
    .then((data)=>{
      setProdutos(data);
      setLoading(false);
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false);
    })
  }, []);

  const buscaProduto = produtos.filter((produto)=>
  produto.nome.toLowerCase().includes(
    pesquisa?.toLowerCase() || ""
  ))
  .filter((produto)=>
  !filtro || produto.categoria === filtro);
  

  function formatarPreco(preco) {
    return Number(preco).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function adicionarCarrinho(produto) {
    setCarrinho((carrinhoAtual) => {
      const existe = carrinhoAtual.find((p) => p.id === produto.id);
      if (existe) {
        return carrinhoAtual.map((p) =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      } else {
        return [...carrinhoAtual, { ...produto, quantidade: 1 }];
      }
    });
  }

  function ListaProduto({ produtos}) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch justify-items-center gap-6">
        {produtos.map((p) => (
          <div key={p.id} className="flex flex-col gap-2 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl p-4 w-3/4 h-full mx-auto font-semibold">
            <img
              src={p.imagem}
              alt=""
              className="w-full h-40 object-cover rounded-lg"
            />
            <h1 className="text-lg font-semibold text-gray-800">{p.nome}</h1>
            <div className="flex flex-col text-md text-gray-800">
              <p>
                {formatarPreco(p.preco * 1.05)} ou em até 10x de
              </p>
              <p>
                {formatarPreco((p.preco * 1.1) / 10)} sem juros ou
              </p>
              <p className="text-lg font-bold text-blue-700">{formatarPreco(p.preco)}</p>
              <p className="text-md font-medium text-blue-700">No Pix</p>
            </div>
            <Link to={`/produto/${p.id}`} className="mt-auto block">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white h-10 w-full rounded-lg font-medium"
              >
                Comprar
              </button>
            </Link>
          </div>
        ))}
      </div>
    );
  }

  function BotaoFiltro() {
    const produtosFiltro = [...new Set(produtos.map((p) => p.categoria))];
    return (
      <div className="flex gap-8 justify-center my-8">
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border-blue-700 rounded-xl px-4 py-2 text-blue-700 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-700 shadow-sm transition cursor-pointer text-base"
        >
          <option value="">Todas as categorias</option>
          {produtosFiltro.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
    );
  }

  

  return (
    <div>
      <div className="bg-blue-600 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="m-3xl">
            <h1 className="text-5xl font-bold text-white ">
              Os Melhores Eletrônicos Por Preços Incríveis
            </h1>
            <p className="text-white text-2xl py-7">
              Smartphones, notebooks, fones e muito mais com entrega rápida e
              segura
            </p>
          </div>
        </div>
      </div>
      <section className="px-5 md:px-20 bg-gray-50 py-4">
        <BotaoFiltro />
        <ListaProduto produtos={buscaProduto} busca={busca} filtro={filtro} />
      </section>
    </div>
  );
}

export default App;
