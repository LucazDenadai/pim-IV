const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão

const db = require("../db/db");

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//definindo as rotas
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//Método de login
router.post('/login', async (req, res) => {
    try {
        const usuario = req.body.usuario.substring(0, 150);
        const senha = req.body.senha.substring(0, 150);

        if (usuario == null || senha == null)
            res.status(400).send({ message: 'E-mail ou senha inválidos' });

        const result = await db.login(usuario, senha);
        if (result.length == 0)
            res.status(401).send({ message: 'E-mail ou senha inválidos' });
        else
            res.status(200).send(true);
    } catch (ex) {
        res.status(400).send({ message: ex.message });
    }
});

//busca de usuarios por id, parametro opcional
router.get('/usuarios/:id?', async (req, res) => {
    try {
        const result = await db.selectUsuarios(req.params.id);
        if (result.length > 0)
            res.status(200).send(result);
        else
            res.status(200).send({ message: 'Não foram encontrados registros' });
    }
    catch (ex) {
        res.status(400).send({ message: ex.message });
    }
});

//Exclusão de usuario
router.delete('/usuarios/:id', async (req, res) => {
    try {
        const result = await db.deleteUsuario(req.params.id);
        if (result[0].affectedRows == 0)
            res.status(200).send({ message: 'Registro não encontrado' });
        else
            res.status(200).send({ message: 'Deletado com sucesso' });
    }
    catch (ex) {
        res.status(400).send({ message: ex.message });
    }
})

//Inclusão de usuario
router.post('/usuarios', async (req, res) => {
    try {
        const usuario = req.body.usuario.substring(0, 150);
        const senha = req.body.senha.substring(0, 11);
        await db.insertUsuario({ usuario: usuario, senha: senha, });
        res.status(201).send({ message: 'Criado com sucesso' });
    }
    catch (ex) {
        res.status(400).send({ message: ex.message });
    }

})

//atualização de usuario
router.put('/usuarios/:id', async (req, res) => {
    try {
        var result = await db.updateUsuario(req.params.id, { senha: req.params.senha, usuario: req.params.usuario });
        if (result[0].affectedRows == 0)
            res.status(200).send({ message: 'Registro não encontrado' });
        else
            res.status(200).send({ message: 'Atualizado com sucesso' });
    }
    catch (ex) {
        res.status(400).send({ message: ex.message });
    }
})

//Lista de clientes
router.get('/cliente/:id?', async (req, res) => {
    try {
        var result = await db.selectCliente(req.params.id);
        if (result[0].affectedRows == 0)
            res.status(200).send({ message: 'Nenhum registro encontrado' });
        else
            res.status(200).send(result);
    }
    catch (ex) {
        res.status(400).send({ message: ex.message });
    }
});

//Inclusão de cliente
router.post('/cliente', async (req, res) => {
    try {
        const nome = req.body.nome.substring(0, 150);
        const email = req.body.email.substring(0, 150);
        const telcli_01 = req.body.telcli_01.substring(0, 150);
        const telcli_02 = req.body.telcli_02.substring(0, 150);
        const datanascimento = req.body.datanascimento.substring(0, 150);
        const idendereco = req.body.idendereco;
        const cpfcnpj = req.body.cpfcnpj.substring(0, 150);
        const idUsuario = req.body.idUsuario;

        await db.insertCliente({
            nome: nome,
            email: email,
            telcli_01: telcli_01,
            telcli_02: telcli_02,
            datanascimento: datanascimento,
            idendereco: idendereco,
            cpfcnpj: cpfcnpj,
            idUsuario: idUsuario,
        });
        res.status(201).send({ message: 'Criado com sucesso' });
    }
    catch (ex) {
        if(ex.message.includes('tbcliente.uk_tbcliente_01'))
            res.status(400).send({ message: 'E-mail já cadastrado' });
        else if(ex.message.includes('tbcliente.uk_tbcliente_02'))
            res.status(400).send({ message: 'CPF/CNPJ já cadastrado' });
        else
            res.status(400).send({ message: ex.message });
    }
});

//atualização de cliente
router.put('/cliente/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const nome = req.body.nome.substring(0, 150);
        const email = req.body.email.substring(0, 150);
        const telcli_01 = req.body.telcli_01.substring(0, 150);
        const telcli_02 = req.body.telcli_02.substring(0, 150);
        const datanascimento = req.body.datanascimento.substring(0, 150);
        const idendereco = req.body.idendereco;
        const cpfcnpj = req.body.cpfcnpj.substring(0, 150);
        const idUsuario = req.body.idUsuario;

        await db.updateCliente(
            id,
            {
                nome: nome,
                email: email,
                telcli_01: telcli_01,
                telcli_02: telcli_02,
                datanascimento: datanascimento,
                idendereco: idendereco,
                cpfcnpj: cpfcnpj,
                idUsuario: idUsuario,
            });
        res.status(201).send({ message: 'Atualizado com sucesso' });
    }
    catch (ex) {
        res.status(400).send({ message: ex.message });
    }
});

//exclusão de cliente
router.delete('/cliente/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await db.deleteCliente(id);
        res.status(201).send({ message: 'Excluído com sucesso' });
    }
    catch (ex) {
        res.status(400).send({ message: ex.message });
    }
})

//inicia o servidor
app.listen(port);
console.log('Api iniciada na porta: ' + port);