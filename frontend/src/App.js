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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch justify-items-center gap-x-0 gap-y-6">
        {produtos.map((p) => (
          <div key={p.id} className="flex flex-col gap-2 shadow p-4 w-3/4 h-full mx-auto font-medium"> 
            <img
              src={p.imagem}
              alt=""
              className="w-full h-40 object-cover rounded-lg"
            />
            <h1 className="text-md max-w-30">{p.nome}</h1>
            <div className="flex flex-col sm text-gray-700">
              <p className="sm w-30">
                {formatarPreco(p.preco * 1.05)} ou em até 10x de
              </p>
              <p className="sm">
                {formatarPreco((p.preco * 1.1) / 10)} sem juros ou
              </p>
              <p className="text-lg text-blue-700">{formatarPreco(p.preco)}</p>
              <p className="text-sm text-blue-700">No Pix</p>
            </div>
            <Link to={`/produto/${p.id}`}>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white h-10 w-full rounded-lg mt-auto font-medium"
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
          className="border-blue-700 roundedsddsd-xl px-4 py-2 text-blue-700 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-700 shadow-sm transition cursor-pointer text-base"
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

  function MostrarCarrinho({ carrinho, setCarrinho }) {
    function RemoverCarrinho(id) {
      setCarrinho((carrinhoAtual) => carrinhoAtual.filter((p) => p.id !== id));
    }
    const total = carrinho.reduce(
      (soma, p) => soma + p.preco * p.quantidade,
      0
    );
    if(loading) return <p>Carregando...</p>

    if(produtos.length ===0) return <p>Nenhum produto encontrado</p>   
    
    return (
      <div>
        <h1>Carrinho</h1>
        <div>
          {carrinho.length === 0 ? (
            <p>carrinho vazio</p>
          ) : (
            carrinho.map((p) => (
              <div key={p.id}>
                <h1>{p.nome}</h1>
                <p>{formatarPreco(p.preco)}</p>
                <p>{p.quantidade}</p>
                <button onClick={() => RemoverCarrinho(p.id)}>Remover</button>
              </div>
            ))
          )}
          <p>Total: {formatarPreco(total)}</p>
        </div>
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
      <section className="px-5 md:px-20"> {/* padding lateral de 20px (5 no mobile, 20 no md+) */}
        <BotaoFiltro />
        <ListaProduto produtos={buscaProduto} busca={busca} filtro={filtro} />
      </section>
    </div>
  );
}

export default App;
