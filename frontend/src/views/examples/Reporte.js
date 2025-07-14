import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  Form,
} from "reactstrap";

import {
  chartOptions,
  parseOptions,
  chartExample2,
} from "variables/charts.js";

const Reportes = () => {
  const navigate = useNavigate();

  const reportes = [
    {
      id: 1,
      modulo: "Inventario",
      detalle: "Cámara Sony X123",
      fecha: "2025-07-01",
      estado: "Activo",
    },
    {
      id: 2,
      modulo: "Publicidad",
      detalle: "Campaña Verano 2025",
      fecha: "2025-06-20",
      estado: "Pendiente",
    },
  ];

  const handleVerDetalle = (id) => {
    navigate(`/admin/detalle/${id}`);
  };

  const [filters, setFilters] = useState({
    fechaDesde: "",
    fechaHasta: "",
    modulo: "",
    tipoReporte: "",
    estado: "",
    tipoGrafica: "",
  });

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleGenerateReport = (e) => {
    e.preventDefault();
    console.log("Generando reporte con filtros:", filters);
  };

  const handleClearFilters = () => {
    setFilters({
      fechaDesde: "",
      fechaHasta: "",
      modulo: "",
      tipoReporte: "",
      estado: "",
      tipoGrafica: "",
    });
  };

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row className="justify-content-center mb-4">
              <Col xl="10" className="text-center">
                <h1 className="display-3 font-weight-bold text-white">
                  Reportes Canal 40
                </h1>
              </Col>
            </Row>
          </div>
        </Container>
      </div>

      <Container className="mt--7" fluid>
        <Row className="mb-4 justify-content-center">
          <Col xl="10">
            <Card className="shadow">
              <CardHeader className="text-center d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Filtros de Reporte</h3>
                <Button
                  color="info"
                  size="sm"
                  onClick={() => navigate("/admin/historico")}
                >
                  Histórico de Reportes
                </Button>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleGenerateReport}>
                  <Row className="justify-content-center">
                    <Col md="4">
                      <FormGroup>
                        <Label for="fechaDesde">Fecha Inicio</Label>
                        <Input
                          type="date"
                          name="fechaDesde"
                          id="fechaDesde"
                          value={filters.fechaDesde}
                          onChange={handleFilterChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="fechaHasta">Fecha Fin</Label>
                        <Input
                          type="date"
                          name="fechaHasta"
                          id="fechaHasta"
                          value={filters.fechaHasta}
                          onChange={handleFilterChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="modulo">Módulo</Label>
                        <Input
                          type="select"
                          name="modulo"
                          id="modulo"
                          value={filters.modulo}
                          onChange={handleFilterChange}
                        >
                          <option value="">Seleccionar</option>
                          <option value="Inventario">Inventario</option>
                          <option value="Producción">Producción</option>
                          <option value="Publicidad">Publicidad</option>
                          <option value="Facturación">Facturación</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col md="4">
                      <FormGroup>
                        <Label for="tipoReporte">Tipo de Reporte</Label>
                        <Input
                          type="select"
                          name="tipoReporte"
                          id="tipoReporte"
                          value={filters.tipoReporte}
                          onChange={handleFilterChange}
                        >
                          <option value="">Seleccionar</option>
                          <option value="Mensual">Mensual</option>
                          <option value="Semanal">Semanal</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="estado">Estado</Label>
                        <Input
                          type="select"
                          name="estado"
                          id="estado"
                          value={filters.estado}
                          onChange={handleFilterChange}
                        >
                          <option value="">Seleccionar</option>
                          <option value="Activo">Activo</option>
                          <option value="Cancelado">Cancelado</option>
                          <option value="Pendiente">Pendiente</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="tipoGrafica">Tipo de Gráfica</Label>
                        <Input
                          type="select"
                          name="tipoGrafica"
                          id="tipoGrafica"
                          value={filters.tipoGrafica}
                          onChange={handleFilterChange}
                        >
                          <option value="">Seleccionar</option>
                          <option value="bar">Barras</option>
                          <option value="line">Líneas</option>
                          <option value="pie">Pastel</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="justify-content-center mt-3">
                    <Col md="auto">
                      <Button color="primary" type="submit">
                        Generar Reporte
                      </Button>{" "}
                      <Button color="secondary" onClick={handleClearFilters}>
                        Limpiar
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent text-center">
                <h6 className="text-uppercase text-muted ls-1 mb-1">
                  Reporte Visual
                </h6>
                <h2 className="mb-0">Resultados en Gráfico</h2>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  {filters.tipoGrafica === "bar" && (
                    <Bar data={chartExample2.data} options={chartExample2.options} />
                  )}
                  {filters.tipoGrafica === "line" && (
                    <Line data={chartExample2.data} options={chartExample2.options} />
                  )}
                  {filters.tipoGrafica === "pie" && (
                    <Pie data={chartExample2.data} options={chartExample2.options} />
                  )}
                  {filters.tipoGrafica === "" && (
                    <div className="text-center text-muted">
                      Seleccione el tipo de gráfica para visualizar el reporte.
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl="8">
            <Card className="shadow">
              <CardHeader className="border-0 text-center">
                <Row className="align-items-center">
                  <Col>
                    <h3 className="mb-0">Resultados del Reporte</h3>
                  </Col>
                  <Col className="text-right">
                    <Button color="success" size="sm">
                      Exportar PDF
                    </Button>{" "}
                    <Button color="info" size="sm">
                      Exportar Excel
                    </Button>{" "}
                    <Button color="secondary" size="sm">
                      Imprimir
                    </Button>
                  </Col>
                </Row>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Módulo</th>
                    <th scope="col">Detalle</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {reportes.map((reporte) => (
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
                          onClick={() => handleVerDetalle(reporte.id)}
                        >
                          Ver Detalle
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Reportes;
