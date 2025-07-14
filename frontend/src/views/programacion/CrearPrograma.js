import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Button, Card, CardHeader, CardBody, FormGroup, 
  Form, Input, Container, Row, Col 
} from "reactstrap";
import HeaderResponsive from "components/Headers/HeaderResponsive";

const CrearPrograma = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "noticia",
    diaEmision: "",
    horarioInicio: "",
    horarioFin: "",
    productor: "",
    camarografo: "",
    editor: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nuevo programa:", formData);
    alert("Programa creado exitosamente");
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
                  <h3 className="mb-0">Crear Nuevo Programa</h3>
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
                  Información del Programa
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label">
                          Nombre del Programa
                        </label>
                        <Input
                          className="form-control-alternative"
                          name="nombre"
                          placeholder="Ej: Noticiero Matutino"
                          type="text"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label">Tipo de Programa</label>
                        <Input
                          type="select"
                          name="tipo"
                          className="form-control-alternative"
                          value={formData.tipo}
                          onChange={handleChange}
                        >
                          <option value="noticia">Noticia</option>
                          <option value="entretenimiento">Entretenimiento</option>
                          <option value="documental">Documental</option>
                          <option value="deportes">Deportes</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label">Días de Emisión</label>
                        <Input
                          className="form-control-alternative"
                          name="diaEmision"
                          placeholder="Ej: Lunes a Viernes, Martes y Jueves"
                          type="text"
                          value={formData.diaEmision}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <hr className="my-4" />
                <h6 className="heading-small text-muted mb-4">
                  Horario
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label className="form-control-label">Hora de Inicio</label>
                        <Input
                          type="time"
                          name="horarioInicio"
                          className="form-control-alternative"
                          value={formData.horarioInicio}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label className="form-control-label">Hora de Fin</label>
                        <Input
                          type="time"
                          name="horarioFin"
                          className="form-control-alternative"
                          value={formData.horarioFin}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <hr className="my-4" />
                <h6 className="heading-small text-muted mb-4">
                  Equipo Asignado
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-control-label">Productor</label>
                        <Input
                          className="form-control-alternative"
                          name="productor"
                          type="text"
                          value={formData.productor}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-control-label">Camarógrafo</label>
                        <Input
                          className="form-control-alternative"
                          name="camarografo"
                          type="text"
                          value={formData.camarografo}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-control-label">Editor</label>
                        <Input
                          className="form-control-alternative"
                          name="editor"
                          type="text"
                          value={formData.editor}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                    Guardar Programa
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

export default CrearPrograma;