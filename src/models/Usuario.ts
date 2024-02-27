import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface UsuarioInstance extends Model {
    cpf: string;
    nome: string;
    senha: string;
}


const Usuario = sequelize.define('Usuario', {
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Usuario;
