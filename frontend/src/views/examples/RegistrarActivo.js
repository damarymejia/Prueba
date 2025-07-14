/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import HeaderBlanco from "components/Headers/HeaderBlanco.js";

import { useNavigate } from "react-router-dom";

// CAMBIO CLAVE: Definimos el componente como una constante
const RegistrarActivoComponent = ({ addActivo }) => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [asignado, setAsignado] = useState("");
  const [valor, setValor] = useState("");
  const [observacion, setObservacion] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newActivo = {
      // Generar un ID simple basado en la hora actual
      id: `INV${Date.now()}`,
      codigo,
      nombre,
      descripcion,
      cantidad: parseInt(cantidad), // Convertir a número
      ubicacion,
      asignado,
      valor,
      observacion,
    };

    addActivo(newActivo); // Llama a la función pasada por props
    alert("Activo registrado con éxito!"); // Opcional: mostrar una alerta
    navigate("/admin/lista-activos"); // Redirige a la lista de activos
  };

  return (
    <>
      <HeaderBlanco />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Registrar Nuevo Activo</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">
                    Información del Activo
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-codigo"
                          >
                            Código
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-codigo"
                            placeholder="Ej: INV001"
                            type="text"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-nombre"
                          >
                            Nombre
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-nombre"
                            placeholder="Ej: Computadora"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-descripcion"
                          >
                            Descripción
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-descripcion"
                            placeholder="Ej: PC de escritorio, Core i7, 16GB RAM"
                            type="textarea"
                            rows="3"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-cantidad"
                          >
                            Cantidad
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-cantidad"
                            placeholder="Ej: 1"
                            type="number"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            required
                            min="1"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-ubicacion"
                          >
                            Ubicación
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-ubicacion"
                            placeholder="Ej: Oficina 101"
                            type="text"
                            value={ubicacion}
                            onChange={(e) => setUbicacion(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-asignado"
                          >
                            Asignado a
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-asignado"
                            placeholder="Ej: Juan Pérez"
                            type="text"
                            value={asignado}
                            onChange={(e) => setAsignado(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-valor"
                          >
                            Valor (L)
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-valor"
                            placeholder="Ej: L 15000"
                            type="text"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-observacion"
                          >
                            Observación
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-observacion"
                            placeholder="Ej: Requiere mantenimiento en 3 meses"
                            type="textarea"
                            rows="2"
                            value={observacion}
                            onChange={(e) => setObservacion(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <div className="text-center">
                    <Button
                      color="primary"
                      type="submit"
                    >
                      Registrar Activo
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

// CAMBIO CLAVE: Exportamos la constante como el default export
export default RegistrarActivoComponent;