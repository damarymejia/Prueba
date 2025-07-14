
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";

// Reportes
import Reporte from "views/examples/Reporte.js";
import VerDetalle from "views/examples/VerDetalle.js";
import HistoricoReportes from "views/examples/HistoricoReportes.js";

// Inventario
import ListaActivos from "views/examples/ListaActivos.js";
import RegistrarActivo from "views/examples/RegistrarActivo.js";
import GestionarStock from "views/examples/GestionarStock.js";
import GestionarMantenimiento from "views/examples/GestionarMantenimiento.js";
import GenerarReportes from "views/examples/GenerarReportes.js";
import InventarioHub from "views/examples/InventarioHub.js";

// Facturación
import PanelFacturacion from "views/facturacion/PanelFacturacion";
import CrearFactura from "views/facturacion/CrearFactura";
import HistorialFactura from "views/facturacion/HistorialFactura";
import Factura from "views/facturacion/Factura";
import RegistrarPago from "views/facturacion/RegistrarPago";
import CAI from "views/facturacion/Cai";
import Contratos from "views/facturacion/Contratos";
import Canjes from "views/facturacion/Canjes";

// Programación
import Programacion from "views/programacion/programacion";
import CrearPrograma from "views/programacion/CrearPrograma.js";
import CrearPauta from "views/programacion/CrearPauta.js";

// Clientes
import Clientes from "views/examples/Clientes.js";

const routes = [
  // Dashboard
  {
    path: "/index",
    name: "Panel de Control",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },

// Clientes
  {
  path: "/clientes",
  name: "Clientes",
  icon: "ni ni-single-02 text-primary",
  component: Clientes,
  layout: "/admin"
  },


  // Inventario
  {
    path: "/panel-inventario",
    name: "Inventario",
    icon: "ni ni-archive-2 text-blue",
    component: InventarioHub,
    layout: "/admin",
  },
  {
    path: "/lista-activos",
    name: "Inventario General",
    icon: "ni ni-box-2 text-primary",
    component: ListaActivos,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/registrar-activo",
    name: "Registrar Activo",
    icon: "ni ni-fat-add text-success",
    component: RegistrarActivo,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/gestionar-stock",
    name: "Gestionar Stock",
    icon: "ni ni-chart-bar-32 text-info",
    component: GestionarStock,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/gestionar-mantenimiento",
    name: "Controlar Mantenimiento",
    icon: "ni ni-settings-gear-65 text-primary",
    component: GestionarMantenimiento,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/generar-reportes",
    name: "Generar Reportes",
    icon: "ni ni-book-bookmark text-green",
    component: GenerarReportes,
    layout: "/admin",
    hidden: true,
  },
  
  // Facturación
  {
    path: "/facturacion/panel",
    name: "Facturación",
    icon: "ni ni-collection text-blue",
    component: PanelFacturacion,
    layout: "/admin",
  },
  {
    path: "/facturacion/crear",
    name: "Crear Factura",
    icon: "ni ni-fat-add text-green",
    component: CrearFactura,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/facturacion/historial",
    name: "Historial Facturas",
    icon: "ni ni-time-alarm text-orange",
    component: HistorialFactura,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/facturacion/factura/:id",
    name: "Historial Facturas",
    icon: "ni ni-time-alarm text-orange",
    component: Factura,
    layout: "/admin",
    hidden: true,
  },  
    {
    path: "/facturacion/pagos",
    name: "Registrar Pago",
    icon: "ni ni-money-coins text-success",
    component: RegistrarPago,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/facturacion/cai",
    name: "Control CAI",
    icon: "ni ni-key-25 text-warning",
    component: CAI,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/facturacion/contratos",
    name: "Contratos",
    icon: "ni ni-briefcase-24 text-info",
    component: Contratos,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/facturacion/canjes",
    name: "Canjes",
    icon: "ni ni-basket text-danger",
    component: Canjes,
    layout: "/admin",
    hidden: true,
  },
  // Programación
  {
    path: "/programacion",
    name: "Programación",
    icon: "ni ni-calendar-grid-58 text-primary",
    component: Programacion,
    layout: "/admin",
  },
  {
    path: "/crear-programa",
    name: "Crear Programa",
    icon: "ni ni-fat-add text-primary",
    component: CrearPrograma,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/crear-pauta",
    name: "Crear Pauta Publicitaria",
    icon: "ni ni-bullet-list-67 text-green",
    component: CrearPauta,
    layout: "/admin",
    hidden: true,
  },

// Reportes
 {
    path: "/reporte",
    name: "Reportes",
    icon: "ni ni-archive-2 text-primary",
    component: Reporte,
    layout: "/admin",
  },
  {
    path: "/detalle/:id",
    name: "Detalle de Reporte",
    icon: "ni ni-bullet-list-67 text-info",
    component: VerDetalle ,
    layout: "/admin",
    hidden: true, // Oculto del sidebar
  },
  {
    path: "/historico",
    name: "Histórico de Reportes",
    icon: "ni ni-archive-2 text-warning",
    component: HistoricoReportes ,
    layout: "/admin",
    hidden: true,
  },
  // Perfil de Usuario
    {
    path: "/user-profile",
    name: "Perfil de Usuario",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    hidden: true,
  },
// Mapa
    {
    path: "/mapas",
    name: "Mapa",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },

  // Authentication Login/Register
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];

export default routes;


