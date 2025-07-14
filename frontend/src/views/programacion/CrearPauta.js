import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Button, Card, CardHeader, CardBody, FormGroup, 
  Form, Input, Container, Row, Col, Badge 
} from "reactstrap";
import HeaderResponsive from "components/Headers/HeaderResponsive";

const CrearPauta = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    cliente: "",
    dias: "",
    horario: "",
    duracion: "30",
    repeticiones: "1",
    tipo: "normal"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nueva pauta:", formData);
    alert("Pauta creada exitosamente");
    navigate("/admin/programacion");
  };

  return (
    <>
         <HeaderResponsive />
    <Container className="mt-5" fluid>
      <Row className="justify-content-center">
        <Col lg="8">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Crear Nueva Pauta Publicitaria</h3>
                </Col>
                <Col className="text-right" xs="4">
                  <Button
                    color="secondary"
                    onClick={() => navigate("/admin/programacion")}
                    size="sm"
                  >
                    Cancelar
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <h6 className="heading-small text-muted mb-4">
                  Información de la Pauta
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label">
                          Nombre de la Pauta
                        </label>
                        <Input
                          className="form-control-alternative"
                          name="nombre"
                          placeholder="Ej: Pauta Coca-Cola Verano"
                          type="text"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label">Cliente</label>
                        <Input
                          className="form-control-alternative"
                          name="cliente"
                          type="text"
                          value={formData.cliente}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <hr className="my-4" />
                <h6 className="heading-small text-muted mb-4">
                  Programación
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label className="form-control-label">Días de Emisión</label>
                        <Input
                          type="select"
                          name="dias"
                          className="form-control-alternative"
                          value={formData.dias}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccione...</option>
                          <option value="Lunes a Viernes">Lunes a Viernes</option>
                          <option value="Lunes a Sábado">Lunes a Sábado</option>
                          <option value="Sábados y Domingos">Sábados y Domingos</option>
                          <option value="Todos los días">Todos los días</option>
                          <option value="Personalizado">Personalizado</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label className="form-control-label">Horario</label>
                        <Input
                          className="form-control-alternative"
                          name="horario"
                          placeholder="Ej: 08:00 AM, 12:00 PM y 08:00 PM"
                          type="text"
                          value={formData.horario}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-control-label">Duración (seg)</label>
                        <Input
                          type="select"
                          name="duracion"
                          className="form-control-alternative"
                          value={formData.duracion}
                          onChange={handleChange}
                        >
                          <option value="15">15 segundos</option>
                          <option value="30">30 segundos</option>
                          <option value="45">45 segundos</option>
                          <option value="60">60 segundos</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-control-label">Repeticiones por día</label>
                        <Input
                          type="select"
                          name="repeticiones"
                          className="form-control-alternative"
                          value={formData.repeticiones}
                          onChange={handleChange}
                        >
                          <option value="1">1 vez</option>
                          <option value="2">2 veces</option>
                          <option value="3">3 veces</option>
                          <option value="4">4 veces</option>
                          <option value="5">5+ veces</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-control-label">Tipo de Pauta</label>
                        <Input
                          type="select"
                          name="tipo"
                          className="form-control-alternative"
                          value={formData.tipo}
                          onChange={handleChange}
                        >
                          <option value="normal">Normal</option>
                          <option value="especial">Especial</option>
                          <option value="patrocinio">Patrocinio</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                    <i className="ni ni-check-bold mr-2"></i> Guardar Pauta
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

export default CrearPauta;