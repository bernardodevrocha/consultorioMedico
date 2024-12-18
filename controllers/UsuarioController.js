const bcrypt = require('bcrypt');
const usuario = require('../models/Usuario');

const loginController = {
    exibirLogin: (req, res) => {
        res.render('login', {error: null})
    },

    processarLogin: async (req, res) => {
        const { email, senha } = req.body;
        
        try{
            const [results] = await sequelize.query(
                'SELECT * FROM Usuarios WHERE username = :username AND senha = :senha',
                {
                    replacements: { username },
                    type: sequelize.QueryTypes.SELECT,
                }
            );

            const usuario = results[0]; // Resultado do SELECT

            // Verifica se o usuário existe e compara a senha
            if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
                return res.render('login', { error: 'Usuário ou senha inválidos!' });
            }

            // Salva os dados do usuário na sessão
            req.session.user = {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
            };

            // Redireciona para a página inicial
            res.redirect('/');
        } catch(error) {
            console.error("Erro ao processar login: ", error);
            res.status(500).send('Erro no servidor ao processar o login');
        }
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if(err){
                console.log('Erro ao encerrar a sessão ', error);
                return res.status(500).send({message: "Erro ao encerrar a sessão"})
            }

            res.redirect('/login');
        })
    }
}

module.exports = loginController;