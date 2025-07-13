// src/views/Programacion.js

import React from "react";
// Argon components
import { Card, CardHeader, CardBody, Container, Row, Col, Button, Table } from "reactstrap";

const Programacion = () => {
  return (
    <Container className="mt-5" fluid>
      <Row>
        <Col>
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">Gestión de Calendario de Programación</h3>
            </CardHeader>
            <CardBody>
              {/* Lista de Programas y Pautas */}
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th>Programa</th>
                    <th>Día</th>
                    <th>Hora</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Noticiero Canal 40</td>
                    <td>Lunes - Viernes</td>
                    <td>07:00 AM</td>
                  </tr>
                  <tr>
                    <td>Documental</td>
                    <td>Domingo</td>
                    <td>06:00 PM</td>
                  </tr>
                </tbody>
              </Table>

              {/* Botones de gestión */}
              <div className="mt-4 d-flex justify-content-between">
                <Button color="primary">Gestionar Pauta Lunes a Sábados</Button>
                <Button color="info">Gestionar Pauta Domingos</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Programacion;
