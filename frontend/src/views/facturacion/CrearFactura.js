import React, { useState } from "react";
import {
  Card, CardBody, Container, Row, Col, FormGroup, Label, Input, Button, Table,
} from "reactstrap";

const CrearFactura = () => {
  const [factura, setFactura] = useState({
    cliente: "", productos: [], subtotal: 0, impuestos: 0, total: 0
  });

  const [producto, setProducto] = useState({ nombre: "", precio: 0 });

  const agregarProducto = () => {
    const nuevosProductos = [...factura.productos, producto];
    const subtotal = nuevosProductos.reduce((s, p) => s + parseFloat(p.precio), 0);
    const impuestos = subtotal * 0.15;
    const total = subtotal + impuestos;

    setFactura({ ...factura, productos: nuevosProductos, subtotal, impuestos, total });
    setProducto({ nombre: "", precio: 0 });
  };

  const generarPDF = () => {
    // lógica para generar y descargar el PDF
  };

  return (
    <Container className="mt-4">
      <Card>
        <CardBody>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Cliente</Label>
                <Input
                  value={factura.cliente}
                  onChange={(e) => setFactura({ ...factura, cliente: e.target.value })}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={5}>
              <Input
                placeholder="Nombre del producto"
                value={producto.nombre}
                onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
              />
            </Col>
            <Col md={3}>
              <Input
                type="number"
                placeholder="Precio"
                value={producto.precio}
                onChange={(e) => setProducto({ ...producto, precio: e.target.value })}
              />
            </Col>
            <Col md={2}>
              <Button color="primary" onClick={agregarProducto}>Agregar</Button>
            </Col>
          </Row>

          <Table className="mt-4" responsive striped>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {factura.productos.map((prod, idx) => (
                <tr key={idx}>
                  <td>{prod.nombre}</td>
                  <td>L {prod.precio}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <hr />
          <p>Subtotal: L {factura.subtotal.toFixed(2)}</p>
          <p>Impuestos (15%): L {factura.impuestos.toFixed(2)}</p>
          <p><strong>Total: L {factura.total.toFixed(2)}</strong></p>

          <Button color="success" onClick={generarPDF}>Generar PDF</Button>
        </CardBody>
      </Card>
    </Container>
  );
};

export default CrearFactura;
