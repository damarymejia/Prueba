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
// reactstrap components
import React, { useState, useEffect } from "react";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  FormGroup,
  Input,
  Label,
  Col
} from "reactstrap";
// core components
import HeaderBlanco from "components/Headers/HeaderBlanco.js";


const ListaActivos = ({ inventoryData }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // <-- NUEVO: Estado para el término de búsqueda

  // Extraer categorías únicas de inventoryData
  useEffect(() => {
    if (inventoryData && inventoryData.length > 0) {
      const categories = [...new Set(inventoryData.map(asset => asset.categoria))];
      setUniqueCategories(["all", ...categories]);
    } else {
      setUniqueCategories(["all"]);
    }
  }, [inventoryData]);

  // Filtrar activos basados en la categoría seleccionada y el término de búsqueda
  const filteredAssets = inventoryData.filter(asset => {
    const matchesCategory = selectedCategory === "all" || asset.categoria === selectedCategory;
    const matchesSearch = asset.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.codigo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <HeaderBlanco />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Filtros de Categorías y Búsqueda */}
        <Row className="mb-4">
          <Col md="4">
            <FormGroup>
              <Label htmlFor="category-filter">Filtrar por Categoría:</Label>
              <Input
                type="select"
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-control-alternative"
              >
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "Todas las Categorías" : category}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md="5"> {/* Ajustamos el tamaño de la columna para dejar espacio */}
            <FormGroup>
              <Label htmlFor="search-input">Buscar por Nombre o Código:</Label>
              <Input
                type="text"
                id="search-input"
                placeholder="Ej. Laptop, ACT001"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control-alternative"
              />
            </FormGroup>
          </Col>
        </Row>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Inventario de Activos</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Ubicación</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Fecha Adquisición</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {filteredAssets.length > 0 ? (
                    filteredAssets.map((asset) => (
                      <tr key={asset.id}>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">
                                {asset.codigo}
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td>{asset.nombre}</td>
                        <td>{asset.categoria}</td>
                        <td>{asset.cantidad}</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className={asset.estado === "Disponible" ? "bg-success" : asset.estado === "Mantenimiento" ? "bg-warning" : "bg-danger"} />
                            {asset.estado}
                          </Badge>
                        </td>
                        <td>{asset.ubicacion}</td>
                        <td>${asset.valor.toLocaleString()}</td>
                        <td>{asset.fechaAdquisicion}</td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Acción
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Otra acción
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Algo más aquí
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">No hay activos registrados o que coincidan con los filtros.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              {/* Puedes añadir paginación aquí si es necesario */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ListaActivos;