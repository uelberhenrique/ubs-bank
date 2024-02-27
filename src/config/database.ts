import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('app_bank', 'uelberdba', 'Leticia2023!',{
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize;