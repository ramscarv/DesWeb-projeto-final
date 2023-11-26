import React, { useEffect, useState } from 'react';
import EditButton from './EditButton';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarProducts = () => {
      fetch('http://localhost:4000/api')
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
          setCarregando(false);
        })
        .catch((err) => console.error('Erro ao buscar produtos:', err));
    };

    buscarProducts();
  }, []);

  return (
    <div className="">
      <h2 className="products__list">LISTA DE PRODUTOS</h2>
      <div className="products__container">
        {carregando ? (
          <div>Carregando...</div>
        ) : (
          products.map((product) => (
            <div key={`${product.name}${product.price}`} className="products__cta">
              <div className="text-lg mb-2">
                <strong>Título</strong>: {product.name}
              </div>
              <div className="text-lg mb-2">
                <strong>Preço</strong>: {product.price}
              </div>
              <div className="text-lg mb-2">
                <strong>Último Licitante</strong>: {product.last_bidder || "Nenhum"}
              </div>
              <div className="text-lg mb-2">
                <strong>Criador</strong>: {product.owner}
              </div>
              <div className="text-lg">
                <strong>Dar Lance</strong>: <EditButton product={product} />
              </div>
            </div>
          ))
        )}
      </div>
      <div className='products__cta-button-container'>
        <Link to="/products/add" className="products__cta-button">
          ADD Produtos
        </Link>
      </div>
    </div>
  );
};

export default Products;