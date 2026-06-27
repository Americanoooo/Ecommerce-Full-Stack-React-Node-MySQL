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
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-400 dark:text-gray-500 text-sm">Carregando produtos...</p>
        </div>
      );
    }

    if (produtos.length === 0) {
      return (
        <div className="flex flex-col items-center py-16 gap-3">
          <p className="text-gray-500 dark:text-gray-400 font-medium">Nenhum produto encontrado.</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">Tente buscar por outro termo ou categoria.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {produtos.map((p) => (
          <div key={p.id} className="flex flex-col bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl p-4">
            <img
              src={p.imagem}
              alt={p.nome}
              className="w-full h-44 object-cover rounded-lg bg-gray-50 dark:bg-gray-700"
            />
            <div className="flex flex-col flex-1 mt-3 gap-1">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug">{p.nome}</h2>
              <div className="mt-auto pt-3">
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{formatarPreco(p.preco * 1.05)} no crédito</p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatarPreco(p.preco)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">no PIX com 15% off</p>
              </div>
            </div>
            <Link to={`/produto/${p.id}`} className="mt-3 block">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 w-full rounded-lg transition-colors duration-150 text-sm">
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
      <select
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 font-medium bg-white focus:outline-none focus:border-blue-600 shadow-sm transition-colors cursor-pointer"
      >
        <option value="">Todas as categorias</option>
        {produtosFiltro.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-br from-blue-700 to-blue-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-3">
            Bem-vindo à TechStore
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Os Melhores Eletrônicos<br className="hidden md:block" /> Por Preços Incríveis
          </h1>
          <p className="text-blue-100 text-base md:text-lg mt-4 max-w-xl">
            Smartphones, notebooks, fones e muito mais com entrega rápida e segura
          </p>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Produtos</h2>
          <BotaoFiltro />
        </div>
        <ListaProduto produtos={buscaProduto} busca={busca} filtro={filtro} />
      </section>
    </div>
  );
}

export default App;
