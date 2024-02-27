import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Usuario from './Usuario';

const Conta = sequelize.define('Conta', {
    numero: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cpfUsuario: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'cpf'
        }
    },
    saldo: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    }
});

export default Conta;
