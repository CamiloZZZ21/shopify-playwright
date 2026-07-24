const express = require("express");
const { sendOrder } = require("./services/shopify");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Shopify Bot funcionando 🚀"
    });
});

app.post("/send-order", async (req, res) => {

    try {

        const { order } = req.body;

        if (!order) {
            return res.status(400).json({
                success:false,
                message:"Falta el número del pedido"
            });
        }

        await sendOrder(order);

        res.json({
            success:true
        });

    } catch(err){

        console.error(err);

        res.status(500).json({
            success:false,
            error:err.message
        });

    }

});

app.listen(3001,()=>{
    console.log("Servidor iniciado en puerto 3001");
});