import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Table,
} from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";

const VerDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const detalleReporte = {
    id: id,
    modulo: "Inventario",
    detalle: "Cámara Sony X123",
    fecha: "2025-07-01",
    estado: "Activo",
    cantidad: "10 unidades",
    precioUnitario: "$450",
    ubicacion: "Bodega Central",
    descripcion:
      "Cámara Sony X123 para grabaciones en estudio. Última actualización en inventario el 2025-07-01.",
  };

  const historialMovimientos = [
    {
      fecha: "2025-06-30",
      accion: "Ingreso",
      responsable: "Juan Pérez",
      observaciones: "Compra inicial",
    },
    {
      fecha: "2025-07-02",
      accion: "Asignación",
      responsable: "Ana López",
      observaciones: "Prestada a estudio",
    },
  ];

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <Row className="justify-content-center mb-4">
            <Col xl="10" className="text-center">
              <h1 className="display-3 font-weight-bold text-white">
                Detalle del Reporte
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
                <h3 className="mb-0">Información General</h3>
              </CardHeader>
              <CardBody>
                <Row className="mb-3">
                  <Col md="6">
                    <p><strong>ID:</strong> {detalleReporte.id}</p>
                    <p><strong>Módulo:</strong> {detalleReporte.modulo}</p>
                    <p><strong>Detalle:</strong> {detalleReporte.detalle}</p>
                    <p><strong>Fecha:</strong> {detalleReporte.fecha}</p>
                  </Col>
                  <Col md="6">
                    <p><strong>Estado:</strong> {detalleReporte.estado}</p>
                    <p><strong>Cantidad:</strong> {detalleReporte.cantidad}</p>
                    <p><strong>Precio Unitario:</strong> {detalleReporte.precioUnitario}</p>
                    <p><strong>Ubicación:</strong> {detalleReporte.ubicacion}</p>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <p><strong>Descripción:</strong></p>
                    <p>{detalleReporte.descripcion}</p>
                  </Col>
                </Row>

                <Row className="mt-4 justify-content-center">
                  <Col md="auto">
                    <Button
                      color="primary"
                      onClick={() => navigate(-1)}
                      className="mr-2"
                    >
                      Volver
                    </Button>
                    <Button color="success" size="sm" className="mr-2">
                      Exportar PDF
                    </Button>
                    <Button color="info" size="sm" className="mr-2">
                      Exportar Excel
                    </Button>
                    <Button color="secondary" size="sm">
                      Imprimir
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5 justify-content-center">
          <Col xl="10">
            <Card className="shadow">
              <CardHeader className="text-center">
                <h3 className="mb-0">Historial de Movimientos</h3>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Fecha</th>
                      <th scope="col">Acción</th>
                      <th scope="col">Responsable</th>
                      <th scope="col">Observaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historialMovimientos.map((mov, index) => (
                      <tr key={index}>
                        <td>{mov.fecha}</td>
                        <td>{mov.accion}</td>
                        <td>{mov.responsable}</td>
                        <td>{mov.observaciones}</td>
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

export default VerDetalle;

