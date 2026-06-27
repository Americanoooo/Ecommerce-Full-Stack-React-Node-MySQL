import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Navbar({ busca, setBusca, usuario, logado, setPesquisaProduto, pesquisaProduto}) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">

          <Link to="/" className="text-blue-600 text-xl font-bold tracking-tight flex-shrink-0">
            TechStore
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-150">
              Início
            </Link>
            <Link to="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-150">
              Produtos
            </Link>
            <Link to="/carrinho" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-150">
              Carrinho
            </Link>
          </nav>

          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <input
              placeholder="Buscar produtos..."
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 rounded-lg h-10 px-3 w-full focus:border-blue-600 focus:outline-none placeholder-gray-400 transition-colors text-sm"
              type="text"
              value={busca}
              onChange={(e) => { setBusca(e.target.value); setPesquisaProduto(e.target.value); }}
            />
            <Link to={`/?search=${pesquisaProduto}`} className="flex-shrink-0">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 h-10 rounded-lg transition-colors duration-150 text-sm">
                Buscar
              </button>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {logado
              ? <Link to="/perfil" className="hidden md:block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-150">
                  Olá, {usuario.nome}
                </Link>
              : <Link to="/account" className="hidden md:block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-150">
                  Minha conta
                </Link>
            }

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
              title={darkMode ? 'Modo claro' : 'Modo escuro'}
            >
              {darkMode ? (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707m12.728 0-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>
                </svg>
              ) : (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              )}
            </button>

            <button
              className="md:hidden p-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors duration-150"
              onClick={() => setMenuAberto(!menuAberto)}
            >
              {menuAberto ? (
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6"/>
                </svg>
              ) : (
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {menuAberto && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2">
          <nav className="flex flex-col">
            <Link to="/" onClick={() => setMenuAberto(false)} className="py-3 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium border-b border-gray-100 dark:border-gray-800 transition-colors duration-150">
              Início
            </Link>
            <Link to="/" onClick={() => setMenuAberto(false)} className="py-3 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium border-b border-gray-100 dark:border-gray-800 transition-colors duration-150">
              Produtos
            </Link>
            <Link to="/carrinho" onClick={() => setMenuAberto(false)} className="py-3 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium border-b border-gray-100 dark:border-gray-800 transition-colors duration-150">
              Carrinho
            </Link>
            <Link to="/account" onClick={() => setMenuAberto(false)} className="py-3 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium transition-colors duration-150">
              Minha Conta
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
