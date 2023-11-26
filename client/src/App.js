import Home from "./components/Home"
import AddProduct from "./components/AddProduct"
import BidProduct from "./components/BidProduct"
import Products from "./components/Products"
import {Route, Routes} from "react-router-dom"
import socketIO from "socket.io-client"
import Nav from "./components/Nav"

const socket = socketIO.connect('http://localhost:4000');

// Componente do Rodapé
const Footer = () => {
  return (
    <div className="footer">
      Leilão. © 2023
    </div>
  );
};

// Componente App
function App() {
  return (
    <div>
      <Nav header="Leilão" socket={socket} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<AddProduct socket={socket} />} />
        <Route path="/products/bid/:name/:price" element={<BidProduct socket={socket} />} />
      </Routes>
      <Footer /> {/* Adicionando o componente de rodapé */}
    </div>
  );
}

export default App;