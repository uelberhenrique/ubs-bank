import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validarCPF } from '../utils/cpfUtils';
import Usuario from '../models/Usuario';

const router = express.Router();

// Rota para registro de usuário
router.post('/register', async (req, res) => {
    try {
        const { cpf, nome, senha } = req.body;

        // Validação do CPF
        if (!validarCPF(cpf)) {
            return res.status(400).json({ error: 'CPF inválido.' });
        }

        // Verifica se o usuário já existe
        const usuarioExistente = await Usuario.findOne({ where: { cpf } });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'Usuário já registrado.' });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Criação do usuário
        await Usuario.create({ cpf, nome, senha: hashedPassword });

        res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
});

// Rota para login de usuário
router.post('/login', async (req, res) => {
    try {
        const { cpf, senha } = req.body;

        // Busca o usuário pelo CPF
        const usuario = await Usuario.findOne({ where: { cpf } });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Verifica a senha
        //FALTA TESTA ESSE GETDATAVALUE, NÃO SEI SE ESTÁ FUNCIONADO.
        const storedSenha = usuario.getDataValue(senha)
        const isValidPassword = await bcrypt.compare(senha, storedSenha);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        // Gera o token de autenticação
        const uniqueId = usuario.getDataValue(cpf)
        const token = jwt.sign({ cpf: uniqueId }, 'secreto', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
});

export default router;



