import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Label,
  Container,
  Row,
  Col,
  Table, // Necesario para mostrar tablas en los reportes
} from "reactstrap";
import HeaderBlanco from "components/Headers/HeaderBlanco.js";


const GenerarReportes = ({ inventoryData }) => {
  const [reportType, setReportType] = useState(""); // Estado para el tipo de reporte seleccionado
  const [generatedReport, setGeneratedReport] = useState(null); // Estado para el contenido del reporte generado
  const [selectedCategory, setSelectedCategory] = useState("all"); // Estado para filtro por categoría en reportes
  const [uniqueCategories, setUniqueCategories] = useState([]); // Categorías únicas para el filtro
  const [selectedAssetForMaintenance, setSelectedAssetForMaintenance] = useState(""); // Activo seleccionado para historial de mantenimiento

  // Efecto para extraer categorías únicas del inventario
  useEffect(() => {
    if (inventoryData && inventoryData.length > 0) {
      const categories = [...new Set(inventoryData.map(asset => asset.categoria))];
      setUniqueCategories(["all", ...categories]); // "all" para la opción de todas las categorías
    } else {
      setUniqueCategories(["all"]);
    }
  }, [inventoryData]);

  // Función para generar el contenido del reporte basado en el tipo seleccionado
  const generateReport = () => {
    let reportContent = null;
    switch (reportType) {
      case "all_assets": // Reporte de todos los activos
        reportContent = (
          <>
            <h4>Reporte de Inventario General de Activos</h4>
            <Table className="align-items-center table-flush" responsive borderless size="sm">
              <thead className="thead-light">
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Cantidad</th>
                  <th>Estado</th>
                  <th>Ubicación</th>
                  <th>Valor</th>
                  <th>Fecha Adquisición</th>
                  <th>Próx. Mant.</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((asset) => (
                  <tr key={asset.id}>
                    <td>{asset.codigo}</td>
                    <td>{asset.nombre}</td>
                    <td>{asset.categoria}</td>
                    <td>{asset.cantidad}</td>
                    <td>{asset.estado}</td>
                    <td>{asset.ubicacion}</td>
                    <td>${asset.valor.toLocaleString()}</td>
                    <td>{asset.fechaAdquisicion}</td>
                    <td>{asset.proximoMantenimiento || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        );
        break;
      case "by_category": // Reporte de activos por categoría
        const assetsByCategory = selectedCategory === "all"
          ? inventoryData
          : inventoryData.filter(asset => asset.categoria === selectedCategory);
        reportContent = (
          <>
            <h4>Reporte de Activos por Categoría: {selectedCategory === "all" ? "Todas" : selectedCategory}</h4>
            {assetsByCategory.length > 0 ? (
              <Table className="align-items-center table-flush" responsive borderless size="sm">
                <thead className="thead-light">
                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Estado</th>
                    <th>Ubicación</th>
                  </tr>
                </thead>
                <tbody>
                  {assetsByCategory.map((asset) => (
                    <tr key={asset.id}>
                      <td>{asset.codigo}</td>
                      <td>{asset.nombre}</td>
                      <td>{asset.cantidad}</td>
                      <td>{asset.estado}</td>
                      <td>{asset.ubicacion}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No hay activos en esta categoría.</p>
            )}
          </>
        );
        break;
      case "maintenance_due": // Reporte de activos con mantenimiento pendiente/vencido
        const today = new Date();
        const assetsNeedingMaintenance = inventoryData.filter(asset =>
            asset.proximoMantenimiento && asset.proximoMantenimiento !== "N/A" &&
            new Date(asset.proximoMantenimiento) <= today // Activos cuya fecha de prox. mant. es hoy o en el pasado
        );
        reportContent = (
          <>
            <h4>Reporte de Activos con Mantenimiento Pendiente/Vencido</h4>
            {assetsNeedingMaintenance.length > 0 ? (
              <Table className="align-items-center table-flush" responsive borderless size="sm">
                <thead className="thead-light">
                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Últ. Mant.</th>
                    <th>Próx. Mant.</th>
                    <th>Estado</th>
                    <th>Ubicación</th>
                  </tr>
                </thead>
                <tbody>
                  {assetsNeedingMaintenance.map((asset) => (
                    <tr key={asset.id}>
                      <td>{asset.codigo}</td>
                      <td>{asset.nombre}</td>
                      {/* Mostrar la fecha del último registro de mantenimiento */}
                      <td>{asset.mantenimientoHistory.length > 0 ? asset.mantenimientoHistory[asset.mantenimientoHistory.length - 1].fecha : 'N/A'}</td>
                      <td>{asset.proximoMantenimiento}</td>
                      <td>{asset.estado}</td>
                      <td>{asset.ubicacion}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No hay activos con mantenimiento pendiente o vencido.</p>
            )}
          </>
        );
        break;
      case "asset_maintenance_history": // Reporte de historial de mantenimiento de un activo específico
        const selectedAssetHistory = inventoryData.find(asset => asset.id === selectedAssetForMaintenance);
        reportContent = (
          <>
            <h4>Historial de Mantenimiento para: {selectedAssetHistory ? `${selectedAssetHistory.codigo} - ${selectedAssetHistory.nombre}` : 'N/A'}</h4>
            {selectedAssetHistory && selectedAssetHistory.mantenimientoHistory && selectedAssetHistory.mantenimientoHistory.length > 0 ? (
              <Table className="align-items-center table-flush" responsive borderless size="sm">
                <thead className="thead-light">
                  <tr>
                    <th>Fecha</th>
                    <th>Descripción</th>
                    <th>Costo</th>
                    <th>Próx. Mant. Registrado</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAssetHistory.mantenimientoHistory.map((record, index) => (
                    <tr key={index}>
                      <td>{record.fecha}</td>
                      <td>{record.descripcion}</td>
                      <td>${record.costo ? record.costo.toLocaleString() : '0'}</td>
                      <td>{record.proximoMantenimiento || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>Seleccione un activo o no hay historial de mantenimiento para este activo.</p>
            )}
          </>
        );
        break;
      default:
        reportContent = <p>Selecciona un tipo de reporte para generar.</p>;
        break;
    }
    setGeneratedReport(reportContent);
  };

  // Función para imprimir el reporte mostrado en pantalla
const printReport = () => {
   const reportOutput = document.getElementById("report-output");
   if (reportOutput) {
     const printWindow = window.open('', '_blank');
     printWindow.document.write('<html><head><title>Reporte de Inventario Canal 40</title><style>@media print { body * { visibility: hidden; } #report-output, #report-output * { visibility: visible; } }</style></head><body>');
     printWindow.document.write(reportOutput.innerHTML);
     printWindow.document.write('</body></html>');
     printWindow.document.close();
     printWindow.print();
   } else {
     alert('No hay reporte generado para imprimir.');
   }
 };

  return (
    <>
      <HeaderBlanco />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Generar Reportes</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Opciones de Reporte
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <Label htmlFor="report-type">Tipo de Reporte</Label>
                          <Input
                            type="select"
                            id="report-type"
                            className="form-control-alternative"
                            value={reportType}
                            onChange={(e) => {
                              setReportType(e.target.value);
                              setGeneratedReport(null); // Limpiar el reporte anterior al cambiar el tipo
                              setSelectedCategory("all"); // Resetear categoría
                              setSelectedAssetForMaintenance(""); // Resetear activo
                            }}
                          >
                            <option value="">Selecciona un tipo de reporte...</option>
                            <option value="all_assets">Inventario General de Activos</option>
                            <option value="by_category">Activos por Categoría</option>
                            <option value="maintenance_due">Activos con Mantenimiento Pendiente/Vencido</option>
                            <option value="asset_maintenance_history">Historial de Mantenimiento por Activo</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* Campos condicionales para filtros específicos del reporte */}
                    {reportType === "by_category" && (
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <Label htmlFor="report-category-filter">Seleccionar Categoría</Label>
                            <Input
                              type="select"
                              id="report-category-filter"
                              className="form-control-alternative"
                              value={selectedCategory}
                              onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                              {uniqueCategories.map(category => (
                                <option key={category} value={category}>
                                  {category === "all" ? "Todas las Categorías" : category}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    )}
                    {reportType === "asset_maintenance_history" && (
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <Label htmlFor="report-asset-for-maintenance">Seleccionar Activo</Label>
                            <Input
                              type="select"
                              id="report-asset-for-maintenance"
                              className="form-control-alternative"
                              value={selectedAssetForMaintenance}
                              onChange={(e) => setSelectedAssetForMaintenance(e.target.value)}
                            >
                              <option value="">Selecciona un activo...</option>
                              {inventoryData.map((asset) => (
                                <option key={asset.id} value={asset.id}>
                                  {asset.codigo} - {asset.nombre}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    )}
                  </div>
                  <hr className="my-4" />
                  <div className="text-center">
                    <Button color="primary" onClick={generateReport} disabled={!reportType}>
                      Generar Reporte
                    </Button>
                    {/* Botón de imprimir solo visible si ya hay un reporte generado */}
                    {generatedReport && (
                        <Button color="info" className="ml-2" onClick={printReport}>
                            Imprimir Reporte
                        </Button>
                    )}
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Output del Reporte - Se mostrará aquí después de generar */}
        {generatedReport && (
          <Row className="mt-5">
            <Col xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Vista Previa del Reporte</h3>
                </CardHeader>
                {/* ID para la función de impresión */}
                <CardBody id="report-output">
                  {generatedReport}
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default GenerarReportes;