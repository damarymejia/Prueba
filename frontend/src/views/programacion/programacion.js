import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, CardHeader, CardBody, Container, Row, Col, Button, 
  Table, Badge, DropdownMenu, DropdownItem, UncontrolledDropdown, 
  DropdownToggle 
} from "reactstrap";
import HeaderResponsive from "components/Headers/HeaderResponsive";

const Programacion = () => {
  const navigate = useNavigate();
  const [programas, setProgramas] = useState([
    {
      id: 1,
      nombre: "Noticiero Canal 40",
      tipo: "noticia",
      dia: "Lunes - Viernes",
      hora: "07:00 AM",
      duracion: "60 min",
      estado: "activo",
      productor: "Juan Pérez",
      camarografo: "María Gómez",
      editor: "Carlos Ruiz"
    },
    {
      id: 2,
      nombre: "Documental",
      tipo: "documental",
      dia: "Domingo",
      hora: "06:00 PM",
      duracion: "120 min",
      estado: "activo",
      productor: "Ana López",
      camarografo: "Pedro Martínez",
      editor: "Laura Díaz"
    }
  ]);

  const toggleEstado = (id) => {
    setProgramas(programas.map(programa => 
      programa.id === id ? {
        ...programa,
        estado: programa.estado === "activo" ? "pausado" : "activo"
      } : programa
    ));
  };

  return (
    
     <>
     <HeaderResponsive />
    <Container className="mt-5" fluid>
      
      <Row>
        <Col>
          <Card className="shadow">
            <CardHeader className="border-0 d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Gestión de Calendario de Programación</h3>
              <div>
                  <Button 
                    color="primary" 
                    className="me-2"
                    onClick={() => navigate("/admin/crear-programa")} 
                  >
                    <i className="ni ni-fat-add mr-2"></i> Nuevo Programa
                  </Button>

                  <Button 
                    color="success"
                    onClick={() => navigate("/admin/crear-pauta")}
                  >
                    <i className="ni ni-fat-add mr-2"></i> Nueva Pauta
                  </Button>
              </div>
            </CardHeader>
            <CardBody>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th>Programa</th>
                    <th>Tipo</th>
                    <th>Día</th>
                    <th>Hora</th>
                    <th>Duración</th>
                    <th>Estado</th>
                    <th>Equipo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {programas.map(programa => (
                    <tr key={programa.id}>
                      <td>{programa.nombre}</td>
                      <td>{programa.tipo}</td>
                      <td>{programa.dia}</td>
                      <td>{programa.hora}</td>
                      <td>{programa.duracion}</td>
                      <td>
                        <Badge color={programa.estado === "activo" ? "success" : "warning"}>
                          {programa.estado}
                        </Badge>
                      </td>
                      <td>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-sm"
                            color="default"
                            size="sm"
                          >
                            Ver equipo
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem>
                              <strong>Productor:</strong> {programa.productor}
                            </DropdownItem>
                            <DropdownItem>
                              <strong>Camarógrafo:</strong> {programa.camarografo}
                            </DropdownItem>
                            <DropdownItem>
                              <strong>Editor:</strong> {programa.editor}
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                      <td>
                        <Button
                          color={programa.estado === "activo" ? "warning" : "success"}
                          size="sm"
                          onClick={() => toggleEstado(programa.id)}
                        >
                          {programa.estado === "activo" ? "Pausar" : "Activar"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Programacion;