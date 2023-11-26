import React, { useState, useEffect } from 'react';

const Nav = ({ header, socket }) => {
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const handleAddProductResponse = (data) => {
      setNotification(`@${data.owner} adicionou ${data.name} no valor de $${Number(data.price).toLocaleString()}`);
    };

    const handleBidProductResponse = (data) => {
      setNotification(`@${data.last_bidder} deu um lance de $${Number(data.amount).toLocaleString()} em ${data.name}`);
    };

    socket.on('addProductResponse', handleAddProductResponse);
    socket.on('bidProductResponse', handleBidProductResponse);

    // Cleanup function
    return () => {
      socket.off('addProductResponse', handleAddProductResponse);
      socket.off('bidProductResponse', handleBidProductResponse);
    };
  }, [socket]);

  useEffect(() => {
    // Limpar notificações antigas após 5 segundos
    const timeoutId = setTimeout(() => {
      setNotification('');
    }, 5000);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, [notification]);

  return (
    <nav className='navbar'>
      <div className='header'>
        <h1>{header}</h1>
      </div>

      <div>
        <p style={{ color: 'red' }}>{notification}</p>
      </div>
    </nav>
  );
};

export default Nav;