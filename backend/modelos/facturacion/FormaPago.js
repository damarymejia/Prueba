const { DataTypes } = require('sequelize');  
const db = require('../../configuraciones/db');  
  
const FormaPago = db.define('FormaPago', {  
  idFormaPago: {  
    type: DataTypes.INTEGER,  
    primaryKey: true  
  },  
  Formapago: {  
    type: DataTypes.STRING(45),  
    allowNull: true  
  },  
  Estado: {  
    type: DataTypes.STRING(1),  
    allowNull: true  
  },  
  validacionRequerida: {  
    type: DataTypes.BOOLEAN,  
    allowNull: true,  
    defaultValue: false  
  },  
  cuentaBancaria: {  
    type: DataTypes.STRING(50),  
    allowNull: true  
  },  
  nombreBeneficiario: {  
    type: DataTypes.STRING(100),  
    allowNull: true,  
    defaultValue: 'Televisión Comayagua Canal 40'  
  }  
}, {  
  tableName: 'formapago',  
  timestamps: false  
});  
  
module.exports = FormaPago;