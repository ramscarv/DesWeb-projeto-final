import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BidProduct = ({ socket }) => {
  const { name, price } = useParams();
  const [amount, setAmount] = useState(price);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount > Number(price)) {
      socket.emit('bidProduct', { amount, last_bidder: localStorage.getItem('userName'), name });
      navigate('/products');
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <div className="bidProduct__container">
        <h2>Faça um Lance</h2>
        <form className="bidProduct__form" onSubmit={handleSubmit}>
          <h3 className="bidProduct__name">{name}</h3>

          <label htmlFor="amount">Lance</label>
          {error && <p style={{ color: 'red' }}>O valor do lance deve ser maior que {price}</p>}
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <button className="bidProduct__cta" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default BidProduct;