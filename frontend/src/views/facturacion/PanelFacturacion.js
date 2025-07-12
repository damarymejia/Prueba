import React, { useEffect, useState } from "react";
import {
  Card, CardBody, Container, Row, Col, Table, Input, Button, FormGroup, Label,
} from "reactstrap";

const PanelFacturacion = () => {
  const [filtros, setFiltros] = useState({
    cliente: "", fecha: "", estado: "",
  });

  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    // Lógica para cargar facturas desde el backend
  }, []);

  const handleFiltro = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  return (
    <Container className="mt-4">
      <Card>
        <CardBody>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label>Cliente</Label>
                <Input name="cliente" onChange={handleFiltro} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Fecha</Label>
                <Input type="date" name="fecha" onChange={handleFiltro} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Estado</Label>
                <Input type="select" name="estado" onChange={handleFiltro}>
                  <option value="">Todos</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="pagada">Pagada</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>

          <Table responsive striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((factura, index) => (
                <tr key={factura.id}>
                  <td>{index + 1}</td>
                  <td>{factura.cliente}</td>
                  <td>{factura.fecha}</td>
                  <td>{factura.estado}</td>
                  <td>{factura.total}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Container>
  );
};

export default PanelFacturacion;
