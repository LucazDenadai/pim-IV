require('dotenv').config();

//db.js
async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connectionString = 'mysql://aluno.unip:semsenha22@mysql741.umbler.com:41890/db_pim';
    const connection = await mysql.createConnection(connectionString);
    global.connection = connection;
    return connection;
}

async function login(usuario, senha) {
    const conn = await connect();
    const filter = `WHERE usuario='${usuario}' AND senha='${senha}'`;
    const rows = await conn.query('SELECT * FROM tbusuarios ' + filter);
    return rows;
}

async function selectUsuarios(id) {
    const conn = await connect();
    const filter = id != null ? `WHERE IdUsuario=${id};` : ' ;';
    const [rows] = await conn.query('SELECT * FROM tbusuarios ' + filter);
    return rows;
}

async function insertUsuario(usuario) {
    const conn = await connect();
    const sql = 'INSERT INTO tbusuarios (usuario, senha) VALUES (?, ?);';
    const values = [usuario.usuario, usuario.senha];
    return await conn.query(sql, values);
}

async function updateUsuario(id, usuario) {
    const conn = await connect();
    var updateFieldsList = [];

    if (usuario.usuario)
        updateFieldsList.push(`usuario='${usuario.usuario}'`);
    if (usuario.senha)
        updateFieldsList.push(`senha='${usuario.senha}'`);
    if (usuario.nome)
        updateFieldsList.push(`nome='${usuario.nome}'`);

    const updateQuery = updateFieldsList.toString()

    const sql = `UPDATE tbusuarios SET ${updateQuery} WHERE IdUsuario=${id}`;
    return await conn.query(sql);
}

async function deleteUsuario(id) {
    const conn = await connect();
    const sql = 'DELETE FROM tbusuarios where IdUsuario=?;';
    return await conn.query(sql, [id]);
}

//cliente
async function selectCliente(id) {
    const conn = await connect();
    const filter = id != null ? `WHERE IdCliente=${id};` : ' ;';
    const [rows] = await conn.query('SELECT * FROM tbcliente ' + filter);
    return rows;
}

async function insertCliente(cliente) {
    const conn = await connect();
    const sql = `INSERT INTO tbcliente 
    SET nomcli = '${cliente.nome}',
        email  = '${cliente.email}',
        telcli_01 = '${cliente.telcli_01}',
        telcli_02 = '${cliente.telcli_02}',
        datacadastro = NOW(),
        datanascimento = '${cliente.datanascimento}',
        idendereco = '${cliente.idendereco}',
        cpfcnpj = '${cliente.cpfcnpj}',
        cliativo = 'S',
        idUsuario = ${cliente.idUsuario};`;
    return await conn.query(sql);
}

async function updateCliente(id, cliente) {
    const conn = await connect();
    var updateFieldsList = [];

    if (cliente.nome)
        updateFieldsList.push(`nomcli = '${cliente.nome}'`);

    if (cliente.email)
        updateFieldsList.push(`email = '${cliente.email}'`);

    if (cliente.telcli_01)
        updateFieldsList.push(`telcli_01 = '${cliente.telcli_01}'`);

    if (cliente.telcli_02)
        updateFieldsList.push(`telcli_02 = '${cliente.telcli_02}'`);

    if (cliente.datanascimento)
        updateFieldsList.push(`datanascimento = '${cliente.datanascimento}'`);

    if (cliente.idendereco)
        updateFieldsList.push(`idendereco = '${cliente.idendereco}'`);

    if (cliente.cpfcnpj)
        updateFieldsList.push(`cpfcnpj = '${cliente.cpfcnpj}'`);

    if (cliente.idUsuario)
        updateFieldsList.push(`idUsuario = '${cliente.idUsuario}'`);

    if (cliente.cliativo)
        updateFieldsList.push(`cliativo = '${cliente.cliativo}'`);

    const updateFields = updateFieldsList.toString();

    const sql = `UPDATE tbcliente SET ${updateFields} WHERE idCliente=${id};`;
    return await conn.query(sql);
}

async function deleteCliente(id) {
    const conn = await connect();
    const sql = `DELETE FROM tbcliente where IdCliente=${id};`;
    return await conn.query(sql);
}

module.exports = {
    login,
    selectUsuarios,
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectCliente,
    insertCliente,
    updateCliente,
    deleteCliente
}