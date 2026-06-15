import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import App from "./App";
import Carrinho from "./pages/carrinho";
import Navbar from "./components/Navbar";
import Produto from "./pages/produto";
import Account from "./pages/account";
import Perfil from "./pages/perfil";
import Admin from "./pages/admin";

export default function Routes() {
  const [carrinho, setCarrinho] = useState(()=>{
    return JSON.parse(localStorage.getItem("carrinho"))|| [];
  });
  const [busca, setBusca] = useState("");
  const [pesquisaProduto, setPesquisaProduto]=useState("");
  const [produtos, setProdutos] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/produtos`)
      .then((res) => res.json())
      .then((data) => {
        const produtoCorrigidos = data.map((p) => ({
          ...p,
          preco: Number(p.preco),
          precoAntigo: Number(p.precoAntigo),
        }));
        setProdutos(produtoCorrigidos);
      })
      .catch((err) => console.log(err));
  }, []);
  
    useEffect(()=>{
      const usuarioSalvo = localStorage.getItem("usuario");

      if(usuarioSalvo){
        setUsuario(JSON.parse(usuarioSalvo));
        setLogado(true);
      }
    }, []);
    
      useEffect(() => {
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }, [carrinho]);

  return (
    <BrowserRouter>
      <Navbar
        busca={busca}
        setBusca={setBusca}
        usuario={usuario}
        logado={logado}
        setLogado={setLogado}
        pesquisaProduto={pesquisaProduto}
        setPesquisaProduto={setPesquisaProduto}
      />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <App
              {...props}
              produtos={produtos}
              carrinho={carrinho}
              setCarrinho={setCarrinho}
              busca={busca}
              setBusca={setBusca}
              pesquisaProduto={pesquisaProduto}
              setProdutos={setProdutos}
            />
          )}
        />
        <Route
          exact
          path="/carrinho"
          render={(props) => (
            <Carrinho
              {...props}
              carrinho={carrinho}
              setCarrinho={setCarrinho}
            />
          )}
        />
        <Route
          path="/produto/:id"
          render={(props) => (
            <Produto
              {...props}
              produtos={produtos}
              carrinho={carrinho}
              setCarrinho={setCarrinho}
            />
          )}
        />
        <Route
          path="/account"
          render={(props) => (
            <Account {...props} 
            logado={logado} 
            setLogado={setLogado} 
            usuario={usuario}
            setUsuario={setUsuario}
            />
          )}
        />
        <Route
          path="/perfil"
          render={(props) => (
            <Perfil
              {...props}
              setUsuario={setUsuario}
              usuario={usuario}
              setLogado={setLogado}
              logado={logado}
            />
          )}
        />
           <Route
          path="/admin"
          render={(props) => (
            <Admin
              {...props}
              setUsuario={setUsuario}
              usuario={usuario}
              logado={logado}
              produtos={produtos}
              setProdutos={setProdutos}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}
