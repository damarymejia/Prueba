import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Label, // Added Label for form clarity
  Container,
  Row,
  Col,
} from "reactstrap";
import HeaderBlanco from "components/Headers/HeaderBlanco.js";

import { useNavigate } from "react-router-dom";

const GestionarStock = ({ inventoryData, updateStock }) => {
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [movementType, setMovementType] = useState("entrada"); // 'entrada' or 'salida'

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedAssetId || quantity <= 0) {
      alert("Por favor, selecciona un activo y una cantidad válida.");
      return;
    }

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      alert("La cantidad debe ser un número positivo.");
      return;
    }

    const currentAsset = inventoryData.find(asset => asset.id === selectedAssetId);
    if (!currentAsset) {
      alert("Activo no encontrado.");
      return;
    }

    let newQuantity = currentAsset.cantidad;

    if (movementType === "entrada") {
      newQuantity += qty;
    } else if (movementType === "salida") {
      if (currentAsset.cantidad < qty) {
        alert("No hay suficiente stock para la salida.");
        return;
      }
      newQuantity -= qty;
    }

    // Call the prop function to update stock in Admin.js
    updateStock(selectedAssetId, newQuantity);

    alert(`Stock de ${currentAsset.nombre} actualizado a ${newQuantity}`);
    // Optionally, clear the form or navigate back to inventory list
    setSelectedAssetId("");
    setQuantity("");
    setMovementType("entrada");
    navigate("/admin/lista-activos"); // Redirige de vuelta a la lista de inventario después de la actualización
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
                    <h3 className="mb-0">Gestionar Stock de Activos</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">
                    Movimiento de Stock
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
                                {asset.codigo} - {asset.nombre} (Stock actual: {asset.cantidad})
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <Label htmlFor="input-quantity">Cantidad</Label>
                          <Input
                            className="form-control-alternative"
                            id="input-quantity"
                            placeholder="Cantidad"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                            min="1"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <Label htmlFor="input-movement-type">Tipo de Movimiento</Label>
                          <Input
                            type="select"
                            id="input-movement-type"
                            className="form-control-alternative"
                            value={movementType}
                            onChange={(e) => setMovementType(e.target.value)}
                            required
                          >
                            <option value="entrada">Entrada</option>
                            <option value="salida">Salida</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <div className="text-center">
                    <Button color="primary" type="submit">
                      Aplicar Movimiento
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

export default GestionarStock;