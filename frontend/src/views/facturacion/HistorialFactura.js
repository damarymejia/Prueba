import React, { useState, useEffect } from "react";
import {
  Card, CardBody, Container, Row, Col, Table, FormGroup, Label, Input,
} from "reactstrap";

const HistorialPagos = () => {
  const [filtros, setFiltros] = useState({ cliente: "", desde: "", hasta: "" });
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    // lógica para cargar pagos desde backend
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
                <Label>Desde</Label>
                <Input type="date" name="desde" onChange={handleFiltro} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Hasta</Label>
                <Input type="date" name="hasta" onChange={handleFiltro} />
              </FormGroup>
            </Col>
          </Row>

          <Table responsive striped>
            <thead>
              <tr>
                <th>Factura</th>
                <th>Cliente</th>
                <th>Fecha de Pago</th>
                <th>Forma de Pago</th>
                <th>Comprobante</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map((pago, idx) => (
                <tr key={idx}>
                  <td>{pago.factura}</td>
                  <td>{pago.cliente}</td>
                  <td>{pago.fecha}</td>
                  <td>{pago.formaPago}</td>
                  <td>{pago.comprobante}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Container>
  );
};

export default HistorialPagos;
