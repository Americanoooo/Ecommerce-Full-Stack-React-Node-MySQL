import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function Navbar({ busca, setBusca, usuario, logado, setPesquisaProduto, pesquisaProduto}) {
  const [menuAberto, setMenuAberto] = useState(false);
   

  return (
    <header className="flex flex-col md:flex-row gap-2 mb-3 justify-around text-lg h-20 items-center shadow">
      <div className="flex flex-row gap-10 items-center">
        <Link to="/" className="text-blue-600 text-2xl">
          TechStore
        </Link>

        <nav className="hidden md:flex flex-row  gap-5">
          <Link to="/" className="hover:text-blue-700">
            Inicio
          </Link>
          <Link to="/" className="hover:text-blue-700">
            Produtos
          </Link>
          <Link to="/carrinho" className="hover:text-blue-700">
            Carrinho
          </Link>
        </nav>
      </div>
      <div className="flex flex-row gap-3">
        <div className="flex gap-8">
          <div className="flex flex-row-reverse gap-1">
          <Link to={`/?search=${pesquisaProduto}`}>
          <button className="bg-blue-600 p-1 rounded shadow text-white h-9">Buscar</button>
          </Link>
          <input
            placeholder="Buscar Produtos..."
            className="border rounded-lg h-10 px-4 pr-10 w-80 border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder-gray-400 transition text-lg"
            type="text"
            value={busca}
            onChange={(e) => {setBusca(e.target.value); setPesquisaProduto(e.target.value)}}
            >
          </input>

          
          </div>
          {logado
          ?<Link to="/perfil" className="py-2 hidden md:flex hover:text-blue-700 "><p>Olá, {usuario.nome}</p></Link>
          :<Link to="/account" className="py-2 hidden md:flex hover:text-blue-700 ">Minha conta</Link>
              }
        </div>
        <button
          className="md:hidden text-blue-700 focus:outline-none"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {menuAberto && (
          <div className="absolute top-20 left-0 w-full bg-white shadow md:hidden z-50 flex justify-between items-start py-3 px-4">
            <nav className="flex flex-col ">
              <Link to="/" className="py-2  hover:text-blue-700">
                Inicio
              </Link>
              <Link to="/" className="py-2  hover:text-blue-700">
                Produtos
              </Link>

              <Link to="/carrinho" className=" py-2 hover:text-blue-700">
                Carrinho
              </Link>
               <Link to="/account" className="py-2 hover:text-blue-700 ">
            Minha Conta
          </Link>
            </nav>
            <button
              className="text-xl bg-red-700 text-white w-8 h-auto"
              onClick={() => setMenuAberto(!menuAberto)}
            >
              X
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
