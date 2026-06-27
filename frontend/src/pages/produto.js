import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Produto({ carrinho, produtos, setCarrinho }) {
  const { id } = useParams();
  const produto = produtos.find((p) => p.id === Number(id));

  function formatarPreco(preco) {
    return Number(preco).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function adicionarProduto(produto) {
      const existe = carrinho.find((p)=> p.id ===produto.id)
      let novoCarrinho
      if(existe){
        novoCarrinho =carrinho.map((p)=>
         p.id ===produto.id ? {...p, quantidade: p.quantidade+ 1} : p
       )
      }else{
         novoCarrinho = [...carrinho,{...produto, quantidade: 1}]
      }
      setCarrinho(novoCarrinho)
  }

  if (!produto) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center gap-3">
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">Produto não encontrado</p>
      <Link to="/">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors duration-150 text-sm">
          Voltar à loja
        </button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 mb-6">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          Voltar
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">

            <div className="w-full md:w-2/5 flex-shrink-0">
              <img
                className="w-full h-64 md:h-96 object-cover rounded-xl bg-gray-50 dark:bg-gray-700"
                src={produto.imagem}
                alt={produto.nome}
              />
            </div>

            <div className="flex flex-col gap-5 flex-1">
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mb-1">{produto.marca}</p>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{produto.nome}</h1>
              </div>

              <div className="flex flex-col gap-3 border-t border-gray-100 dark:border-gray-700 pt-5">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4">
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wider mb-1">Melhor preço — à vista no PIX</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatarPreco(produto.preco)}</p>
                  <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">com 15% de desconto</p>
                </div>

                <div className="px-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">No crédito em até 6x</p>
                  <p className="text-xl font-bold text-gray-700 dark:text-gray-200">{formatarPreco(produto.precoAntigo)}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ou em até 6x de{" "}
                    <span className="font-semibold text-gray-700 dark:text-gray-200">{formatarPreco(produto.precoAntigo / 6)}</span>{" "}
                    sem juros
                  </p>
                </div>
              </div>

              <Link to="/carrinho">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full h-12 rounded-lg transition-colors duration-150 text-base"
                  onClick={() => adicionarProduto(produto)}>
                  Comprar agora
                </button>
              </Link>

              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex flex-col gap-1">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Características</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">Garantia: 12 meses</p>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Parcelamento no crédito</p>
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    {[...Array(5)].map((_, i) => (
                      <p key={i} className="text-sm text-gray-700 dark:text-gray-300 py-1 border-b border-gray-100 dark:border-gray-700">
                        <span className="font-semibold">{i + 1}x</span> de {formatarPreco(produto.precoAntigo / (i + 1))}
                      </p>
                    ))}
                    {[...Array(5)].map((_, i) => (
                      <p key={i + 5} className="text-sm text-gray-700 dark:text-gray-300 py-1 border-b border-gray-100 dark:border-gray-700">
                        <span className="font-semibold">{i + 6}x</span> de {formatarPreco(produto.precoAntigo / (i + 6))}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
