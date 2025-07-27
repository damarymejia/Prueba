const { DataTypes } = require('sequelize');
const db = require('../../configuraciones/db');
const Cliente = require("../../modelos/gestion_cliente/Cliente")
const Empleado = require("../../modelos/gestion_cliente/Empleado")
const FormaPago = require('../../modelos/facturacion/FormaPago');

const Factura = db.define('Factura', {
  idFactura: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: true
  },
  Fecha: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Total_Facturado: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  Tipo_documento: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
// Nuevos campos específicos para TV  
 
  productoCliente: {  
    type: DataTypes.STRING(100),  
    allowNull: true  
  },  
  mencion: {  
    type: DataTypes.STRING(100),  
    allowNull: true  
  },  
  periodoInicio: {  
    type: DataTypes.DATE,  
    allowNull: true  
  },  
  periodoFin: {  
    type: DataTypes.DATE,  
    allowNull: true  
  },  
  tipoServicio: {  
    type: DataTypes.ENUM('spot', 'programa', 'contrato'),  
    allowNull: true  
  },  
  agencia: {  
    type: DataTypes.STRING(100),  
    allowNull: true  
  },
  ordenNo: {  
    type: DataTypes.INTEGER, 
    allowNull: true
  },
  ordenCompraExenta: {  
    type: DataTypes.STRING(50),  
    allowNull: true  
  },  
  numeroRegistroSAG: {  
    type: DataTypes.STRING(50),  
    allowNull: true  
  },  
  constanciaExonerado: {  
    type: DataTypes.STRING(50),  
    allowNull: true  
  }, 

  idCliente: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idFormaPago: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idEmpleado: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  archivo_pdf: { // Nuevo campo para el PDF
    type: DataTypes.STRING,
    allowNull: true
  },
  estadoFactura: {  
    type: DataTypes.ENUM('activa', 'anulada', 'cobrada', 'pendiente'),  
    defaultValue: 'activa'  

},
}, {
  tableName: 'factura',
  timestamps: false
});

// Relaciones
Factura.belongsTo(Cliente, { foreignKey: 'idCliente' });
Factura.belongsTo(FormaPago, { foreignKey: 'idFormaPago' });
Factura.belongsTo(Empleado, { foreignKey: 'idEmpleado' });


Cliente.hasMany(Factura, { foreignKey: 'idCliente', sourceKey: 'idCliente'});
FormaPago.hasMany(Factura, { foreignKey: 'idFormaPago', sourceKey: 'idFormaPago'  });
Empleado.hasMany(Factura, { foreignKey: 'idEmpleado', sourceKey: 'idEmpleado'  });

module.exports = Factura;
