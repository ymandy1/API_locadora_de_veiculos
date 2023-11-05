const db = require("./models/index");
const express = require("express");
const { v4: uuidv4 } = require('uuid');

const routes = express.Router();


routes.get('/', (req, res) => {
    const resp = {}

    try {
        db.Veiculo.findAll()
        .then(e => {
            res.json(e)
        })
        
    } catch (error) {
        resp.status = 'fail'

        res.json(resp)
    }
})

routes.get('/:id', (req, res) => {
    const resp = {}

    try {
        db.Veiculo.findAll({
            where:{
                id:req.params.id
            }
        })
        .then(e => {
            res.json(e)
        })
        
    } catch (error) {
        console.log(error)
        resp.status = 'fail'

        res.json(resp)
    }
})

routes.post("/", async (req, res) => {
    const resp = {};
    const vehicle = {id: uuidv4(), ...req.body}
    
    try {
        const newVeiculo = db.Veiculo.build(vehicle);
        await newVeiculo.save();
        return res.json({ status: "ok", user: newVeiculo });
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({ status: "fail", message: "Falha ao salvar. Campos obrigatórios estão ausentes ou nulos." });
        }
        return res.status(500).json({ status: "fail", message: "Ocorreu um erro ao salvar os dados." });
    }
});

routes.put('/:id', async (req, res) => {
    try {
        const veiculo = await db.Veiculo.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!veiculo) {
            return res.status(404).json({ status: "fail", message: "Veículo não encontrado." });
        }

        await veiculo.update(req.body);

        return res.json({ status: "ok", veiculo });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "fail", message: "Ocorreu um erro ao atualizar os dados." });
    }
});


routes.delete('/:id', (req, res) => {
    let resp = {}

    try {
        db.Veiculo.destroy({
            where:{
                id:req.params.id
            }
        })
  
        resp = {
            status:'ok'
        }
    } catch (error) {
        resp.status = 'fail'

        res.json(resp)
    }

    res.json(resp)
})

module.exports = routes;

