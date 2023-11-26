const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 4000;
const fs = require("fs");
const socketIO = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000",
    },
});

const dataFilePath = "data.json";

app.use(cors());

function encontrarProduto(nomeChave, meuArray, ultimoArrematante, valor) {
    const produtoIndex = meuArray.findIndex((item) => item.name === nomeChave);

    if (produtoIndex !== -1) {
        meuArray[produtoIndex].last_bidder = ultimoArrematante;
        meuArray[produtoIndex].price = valor;

        const dadosString = JSON.stringify({ products: meuArray }, null, 2);

        try {
            fs.writeFileSync(dataFilePath, dadosString);
        } catch (error) {
            console.error("Erro ao escrever no arquivo:", error);
        }
    }
}

socketIO.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} usuário acabou de se conectar!`);

    socket.on("disconnect", () => {
        console.log("🔥: Um usuário desconectou");
    });

    socket.on("addProduct", (data) => {
        try {
            const dadosSalvos = fs.readFileSync(dataFilePath);
            const dadosObjeto = JSON.parse(dadosSalvos);

            dadosObjeto.products.push(data);

            const dadosString = JSON.stringify(dadosObjeto, null, 2);
            fs.writeFileSync(dataFilePath, dadosString);

            socket.broadcast.emit("addProductResponse", data);
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
        }
    });

    socket.on("bidProduct", (data) => {
        try {
            const dadosSalvos = fs.readFileSync(dataFilePath);
            const dadosObjeto = JSON.parse(dadosSalvos);

            encontrarProduto(
                data.name,
                dadosObjeto.products,
                data.last_bidder,
                data.amount
            );

            socket.broadcast.emit("bidProductResponse", data);
        } catch (error) {
            console.error("Erro ao dar lance no produto:", error);
        }
    });
});

app.get("/api", (req, res) => {
    try {
        const dadosSalvos = fs.readFileSync(dataFilePath);
        const produtos = JSON.parse(dadosSalvos);
        res.json(produtos);
    } catch (error) {
        console.error("Erro ao obter dados:", error);
        res.status(500).json({ error: "Erro ao obter dados" });
    }
});

http.listen(PORT, () => {
    console.log(`Servidor ouvindo na porta ${PORT}`);
});