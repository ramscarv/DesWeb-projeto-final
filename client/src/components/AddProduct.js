import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = ({ socket }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('addProduct', { name, price, owner: localStorage.getItem('userName') });
    navigate('/products');
  };

  return (
    <div>
      <h2>Add Novo Produto</h2>
      <div className="addProduct__container">
        <form className="addProduct__form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nome do Produto</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="price">Preço Inicial</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <button className="addProduct__cta" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;