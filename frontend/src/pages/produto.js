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
         p.id ===produto.id
       ? {...p, quantidade: p.quantidade+ 1}
       :p
       ) 

      }else{
         novoCarrinho = [...carrinho,{...produto, quantidade: 1}]
      }

      setCarrinho(novoCarrinho)
  }

  if (!produto) return <p>Produto não encontrado</p>;

  return (
    <div className="px-5 md:px-20 py-4 flex justify-center " > 
      <main className="flex flex-col md:flex-row gap-5 md:gap-40 md:justify-center w-2/3  p-10 rounded " > 
        <img className="rounded w-full  " src={produto.imagem} />

        <div className="flex flex-col gap-4 w-full">
          <h1 className="md:text-xl font-bold">
            {produto.nome.toUpperCase()}
          </h1>

          <p className="md:text-md">Marca: {produto.marca}</p>

          <div className="flex gap-4 md:gap-8 justify-start items-center">
            <div>
              <p className="text-sm ">à vista</p>

              <p className=" text-xl  md:text-2xl text-green-600 font-bold">
                {formatarPreco(produto.preco)}
              </p>

              <p className="text-sm ">no PIX com 15% de desconto</p>
            </div>

            <div className="flex flex-col">
              <p className="text-red-600 md:text-2xl  font-bold">
                {formatarPreco(produto.precoAntigo)}
              </p>

              <p className="w-64 ">
                em até 6x de{" "}
                <span className="text-red-600 font-bold">
                  {formatarPreco(produto.precoAntigo / 6)}
                </span>
              </p>
            </div>
          </div>
          <div className="w-full md:1/3">
            <Link to="/carrinho">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white h-16 rounded w-full  text-xl"
                onClick={() => adicionarProduto(produto)}
              >
                Comprar
              </button>
            </Link>
          </div>

          <div>
            <h1 className="text-red-600 font-bold">CARACTERÍSTICAS:</h1>

            <p>Garantia: 12 Meses</p>
          </div>
          <div className="w-full">
            <h1 className="text-xl text-red-600 font-bold">
              Parcelamento
              </h1>
              <div className="w-full shadow-lg bg-gray-100 p-4 md:p-3">
                <div className="flex flex-col md:flex-row gap-10">
                  <div className="flex flex-col">           
                    {[...Array(5)].map((_, i) => (
                      <h2 key={i}>
                        {i + 1}x de {formatarPreco(produto.precoAntigo / (i + 1))}
                      </h2>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    {[...Array(5)].map((_, i) => (
                      <h2 key={i + 5} className="min-w-[110px]">
                        {i + 6}x de {formatarPreco(produto.precoAntigo / (i + 6))}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
          </div>
        </div>
      </main>
    </div>
  );
}
