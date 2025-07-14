import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const HistoricoReportes = () => {
  const navigate = useNavigate();

  const reportesHistoricos = [
    {
      id: 1,
      modulo: "Inventario",
      detalle: "Cámara Sony X123",
      fecha: "2025-06-10",
      estado: "Activo",
    },
    {
      id: 2,
      modulo: "Publicidad",
      detalle: "Campaña Primavera",
      fecha: "2025-05-15",
      estado: "Cancelado",
    },
  ];

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <Row className="justify-content-center mb-4">
            <Col xl="10" className="text-center">
              <h1 className="display-3 font-weight-bold text-white">
                Histórico de Reportes
              </h1>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mt--7" fluid>
        <Row className="justify-content-center">
          <Col xl="10">
            <Card className="shadow">
              <CardHeader className="text-center">
                <h3 className="mb-0">Reportes Anteriores</h3>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Módulo</th>
                      <th>Detalle</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportesHistoricos.map((reporte) => (
                      <tr key={reporte.id}>
                        <td>{reporte.modulo}</td>
                        <td>{reporte.detalle}</td>
                        <td>{reporte.fecha}</td>
                        <td>
                          <span
                            className={
                              reporte.estado === "Activo"
                                ? "text-success"
                                : reporte.estado === "Pendiente"
                                ? "text-warning"
                                : "text-danger"
                            }
                          >
                            {reporte.estado}
                          </span>
                        </td>
                        <td>
                          <Button
                            color="primary"
                            size="sm"
                            onClick={() => navigate(`/admin/detalle/${reporte.id}`)}
                          >
                            Ver Detalle
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Row className="mt-4 justify-content-center">
                  <Col md="auto">
                    <Button color="primary" onClick={() => navigate(-1)}>
                      Volver
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HistoricoReportes;