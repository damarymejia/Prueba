/*!
=========================================================
* Argon Dashboard React - v1.2.4
=========================================================
* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim
* Licensed under MIT
=========================================================
*/

import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

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

// Programación
import Programacion from "views/programacion/programacion";

const routes = [
  // Dashboard
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
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
  // Ejemplos
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
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
  // Facturación
  {
    path: "/facturacion/panel",
    name: "Panel Facturación",
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
  },
  {
    path: "/facturacion/historial",
    name: "Historial Facturas",
    icon: "ni ni-time-alarm text-orange",
    component: HistorialFactura,
    layout: "/admin",
  },
  // Programación
  {
    path: "/programacion",
    name: "Programación",
    icon: "ni ni-calendar-grid-58 text-primary",
    component: Programacion,
    layout: "/admin",
  },
];

export default routes;


