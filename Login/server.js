// Importando as dependências
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt'); // Importa o bcrypt para criptografar e comparar senhas

const app = express();
const port = 3000;

// Middleware para ler o corpo das requisições
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Caminho do arquivo de usuários
const usuariosJson = path.join(__dirname, 'usuarios.json');

// Rota para servir a página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Rota para fazer a autenticação do usuário (Login)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verificar se o arquivo de usuários existe
    if (!fs.existsSync(usuariosJson)) {
        return res.status(404).send('Usuários não encontrados!');
    }

    // Ler o arquivo JSON
    const usuarios = JSON.parse(fs.readFileSync(usuariosJson, 'utf-8'));

    // Encontrar o usuário
    const usuario = usuarios.find(user => user.username === username);

    if (!usuario) {
        return res.status(400).send('Usuário não encontrado!');
    }

    // Comparar a senha fornecida com a senha armazenada (criptografada)
    bcrypt.compare(password, usuario.password, (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao comparar senhas!');
        }

        if (!result) {
            return res.status(400).send('Senha incorreta!');
        }

        // Se a senha for válida
        res.send('Login bem-sucedido!');
    });
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'cadastro.html'));
});
// Rota para cadastrar o usuário
app.post('/cadastro', (req, res) => {
    const { nome, email, username, password, confirm_password } = req.body;

    // Verificar se as senhas coincidem
    if (password !== confirm_password) {
        return res.status(400).json({ message: 'As senhas não coincidem!' });
    }

    // Criptografar a senha
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao criptografar a senha!' });
        }

        // Criar o novo usuário
        const novoUsuario = {
            nome,
            email,
            username,
            password: hashedPassword // Senha criptografada
        };

        // Caminho do arquivo JSON onde os dados serão salvos
        const arquivoJson = path.join(__dirname, 'usuarios.json');

        // Ler o arquivo JSON existente
        fs.readFile(arquivoJson, (err, data) => {
            let usuarios = [];

            if (!err) {
                usuarios = JSON.parse(data); // Se o arquivo já existe, parse os dados
            }

            // Adicionar o novo usuário
            usuarios.push(novoUsuario);

            // Gravar os dados no arquivo JSON
            fs.writeFile(arquivoJson, JSON.stringify(usuarios, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao salvar os dados!' });
                }
                res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
            });
        fs.writeFile(arquivoJson, JSON.stringify(usuarios, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao salvar os dados!' });
            }
            // Redireciona para a página de login
            res.redirect('/login'); 
            });
        });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
