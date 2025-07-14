import React, { useState } from "react";
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
} from "reactstrap";
import HeaderBlanco from "components/Headers/HeaderBlanco.js";

import { useNavigate } from "react-router-dom";

const GestionarMantenimiento = ({ inventoryData, addMantenimientoRecord }) => {
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [maintenanceDate, setMaintenanceDate] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [nextMaintenanceDate, setNextMaintenanceDate] = useState(""); // Campo para la próxima fecha de mantenimiento

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedAssetId || !maintenanceDate || !description) {
      alert("Por favor, completa los campos obligatorios: Activo, Fecha y Descripción.");
      return;
    }

    const maintenanceCost = parseFloat(cost) || 0; // Convertir a número, 0 si no es válido

    const newRecord = {
      fecha: maintenanceDate,
      descripcion: description,
      costo: maintenanceCost,
      // Solo añadir proximoMantenimiento si se ha ingresado un valor
      ...(nextMaintenanceDate && { proximoMantenimiento: nextMaintenanceDate })
    };

    addMantenimientoRecord(selectedAssetId, newRecord);

    alert(`Registro de mantenimiento para el activo ${inventoryData.find(a => a.id === selectedAssetId)?.nombre || selectedAssetId} añadido.`);

    // Limpiar el formulario
    setSelectedAssetId("");
    setMaintenanceDate("");
    setDescription("");
    setCost("");
    setNextMaintenanceDate("");
    // Opcional: redirigir a la lista de activos o a una vista de historial de mantenimiento
    navigate("/admin/lista-activos");
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
                    <h3 className="mb-0">Registrar Mantenimiento de Activos</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">
                    Detalles del Mantenimiento
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <Label htmlFor="input-asset">Seleccionar Activo</Label>
                          <Input
                            type="select"
                            id="input-asset"
                            className="form-control-alternative"
                            value={selectedAssetId}
                            onChange={(e) => setSelectedAssetId(e.target.value)}
                            required
                          >
                            <option value="">Selecciona un activo...</option>
                            {/* Asegúrate de que inventoryData tenga datos para poblar este select */}
                            {inventoryData.map((asset) => (
                              <option key={asset.id} value={asset.id}>
                                {asset.codigo} - {asset.nombre}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <Label htmlFor="input-maintenance-date">Fecha de Mantenimiento</Label>
                          <Input
                            className="form-control-alternative"
                            id="input-maintenance-date"
                            type="date"
                            value={maintenanceDate}
                            onChange={(e) => setMaintenanceDate(e.target.value)}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <Label htmlFor="input-description">Descripción del Mantenimiento</Label>
                          <Input
                            className="form-control-alternative"
                            id="input-description"
                            type="textarea"
                            rows="3"
                            placeholder="Ej. Cambio de batería, revisión de software, limpieza general..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <Label htmlFor="input-cost">Costo (opcional)</Label>
                          <Input
                            className="form-control-alternative"
                            id="input-cost"
                            type="number"
                            placeholder="Costo del mantenimiento"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            min="0"
                            step="0.01"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <Label htmlFor="input-next-maintenance-date">Próximo Mantenimiento (opcional)</Label>
                          <Input
                            className="form-control-alternative"
                            id="input-next-maintenance-date"
                            type="date"
                            value={nextMaintenanceDate}
                            onChange={(e) => setNextMaintenanceDate(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <div className="text-center">
                    <Button color="primary" type="submit">
                      Registrar Mantenimiento
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

export default GestionarMantenimiento;