// views/Facturas/ListaFacturas.js  
import React, { useState, useEffect } from 'react';  
import {  
  Card,    
  CardHeader,    
  CardBody,    
  Table,    
  Container,    
  Row,    
  Col,    
  Button,    
  Badge,    
  Input,    
  InputGroup,    
  InputGroupAddon,    
  InputGroupText,  
  Alert,  
  Modal,  
  ModalHeader,  
  ModalBody,  
  ModalFooter   
} from 'reactstrap';  
import HeaderBlanco from 'components/Headers/HeaderBlanco.js';  
import { facturaService } from 'services/facturacion/facturaService.js';  

 
const ListaFacturas = () => {    
  const [facturas, setFacturas] = useState([]);    
  const [loading, setLoading] = useState(true);    
  const [filtro, setFiltro] = useState(''); // Búsqueda general  
  const [filtroId, setFiltroId] = useState(''); // Búsqueda por ID específico     
  const [error, setError] = useState(null);  
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });  
  const [modalAnular, setModalAnular] = useState(false);  
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);  
  const [procesandoAnulacion, setProcesandoAnulacion] = useState(false);  
   
  useEffect(() => {    
    cargarFacturas();    
  }, []);    
    
  const cargarFacturas = async () => {    
    try {    
      setLoading(true);    
      const response = await facturaService.obtenerFacturas();    
      setFacturas(response.facturas || []);    
      setError(null);    
    } catch (error) {    
      console.error('Error al cargar facturas:', error);    
      setError('Error al cargar las facturas');    
    } finally {    
      setLoading(false);    
    }    
  };    
    
  const handleDescargarPDF = async (idFactura) => {  
    try {  
      setMensaje({ tipo: '', texto: '' });  
      await facturaService.descargarPDF(idFactura);  
    } catch (error) {  
      console.error('Error al descargar PDF:', error);  
      setMensaje({  
        tipo: 'danger',  
        texto: 'Error al descargar el PDF de la factura'  
      });  
    }  
  };  
  
  // Función para confirmar anulación  
const confirmarAnulacion = (factura) => {  
  setFacturaSeleccionada(factura);  
  setModalAnular(true);  
};  
  
// Función para ejecutar la anulación  
const handleAnularFactura = async () => {  
  if (!facturaSeleccionada) return;  
  
  try {  
    setProcesandoAnulacion(true);  
    await facturaService.anularFactura(facturaSeleccionada.idFactura);  
      
    // Mostrar mensaje de éxito y recargar lista  
    await cargarFacturas();  
    setModalAnular(false);  
    setFacturaSeleccionada(null);  
  } catch (error) {  
    console.error('Error al anular factura:', error);  
    // Mostrar mensaje de error  
  } finally {  
    setProcesandoAnulacion(false);  
  }  
};  
  
  const cancelarAnulacion = () => {  
    setModalAnular(false);  
    setFacturaSeleccionada(null);  
  };  
    
  const facturasFiltradas = facturas.filter(factura => {  
  const filtroLower = filtro.toLowerCase();  
    
  // Construir nombre completo del cliente desde persona  
  const nombreCompleto = factura.Cliente?.persona ?   
    `${factura.Cliente.persona.Pnombre} ${factura.Cliente.persona.Snombre || ''} ${factura.Cliente.persona.Papellido} ${factura.Cliente.persona.Sapellido || ''}`.trim()   
    : '';  
    
  // Filtro por ID específico (tiene prioridad si está presente)  
  const cumpleFiltroId = filtroId === '' || factura.idFactura.toString().includes(filtroId);  
    
  // Filtro general (solo se aplica si no hay filtro por ID)  
  const cumpleFiltroGeneral = filtro === '' || (  
    // Búsqueda por nombre completo del cliente  
    nombreCompleto.toLowerCase().includes(filtroLower) ||  
      
    // Búsqueda por DNI/RTN del cliente  
    (factura.Cliente?.persona?.DNI || '').toLowerCase().includes(filtroLower) ||  
      
    // Búsqueda por estado de factura  
    factura.estadoFactura.toLowerCase().includes(filtroLower) ||  
      
    // Búsqueda por tipo de documento  
    (factura.Tipo_documento || '').toLowerCase().includes(filtroLower) ||  
      
    // Búsqueda por campos específicos de TV (si existen)  
    (factura.productoCliente || '').toLowerCase().includes(filtroLower) ||  
    (factura.agencia || '').toLowerCase().includes(filtroLower) ||  
    (factura.mencion || '').toLowerCase().includes(filtroLower) ||  
      
    // Búsqueda por monto (convertir a string)  
    factura.Total_Facturado.toString().includes(filtro) ||  
      
    // Búsqueda por fecha (formato legible)  
    new Date(factura.Fecha).toLocaleDateString('es-HN').includes(filtro)  
  );  
    
  return cumpleFiltroId && cumpleFiltroGeneral;  
  }); 
    
  const formatearFecha = (fecha) => {    
    return new Date(fecha).toLocaleDateString('es-HN');    
  };    
    
  const formatearMoneda = (monto) => {    
    return `L. ${parseFloat(monto).toFixed(2)}`;    
  };    
    
  const getBadgeColor = (estado) => {    
    return estado === 'activa' ? 'success' : 'danger';    
  };   
  
  
      
  
  return (  
    <>  
      <HeaderBlanco />  
      <Container className="mt--7" fluid>  
        <Row>  
          <Col>  
            <Card className="shadow">  
              <CardHeader className="border-0">  
                <Row className="align-items-center">  
                  <Col xs="8">  
                    <h3 className="mb-0">Lista de Facturas</h3>  
                  </Col>  
                  <Col xs="4" className="text-right">  
                    <Button  
                      color="primary"  
                      href="/admin/crear-factura-nueva"  
                      size="sm"  
                    >  
                      Nueva Factura  
                    </Button>  
                  </Col>  
                </Row>  
                <Row className="mt-3">    
                  <Col md="4">    
                    <InputGroup>    
                      <InputGroupAddon addonType="prepend">    
                        <InputGroupText>    
                          <i className="fas fa-hashtag" />    
                        </InputGroupText>    
                      </InputGroupAddon>    
                      <Input    
                        placeholder="Buscar por ID de factura..."    
                        type="number"    
                        value={filtroId}    
                        onChange={(e) => setFiltroId(e.target.value)}    
                      />    
                    </InputGroup>    
                  </Col>  
                  <Col md="6">    
                    <InputGroup>    
                      <InputGroupAddon addonType="prepend">    
                        <InputGroupText>    
                          <i className="fas fa-search" />    
                        </InputGroupText>    
                      </InputGroupAddon>    
                      <Input    
                        placeholder="Buscar por cliente, DNI, estado, monto, fecha..."    
                        type="text"    
                        value={filtro}    
                        onChange={(e) => setFiltro(e.target.value)}    
                      />    
                    </InputGroup>    
                  </Col>  
                  <Col md="2" className="text-right">    
                    <Button    
                      color="secondary"    
                      size="sm"    
                      onClick={cargarFacturas}    
                    >    
                      <i className="fas fa-sync" /> Actualizar    
                    </Button>    
                  </Col>    
                </Row> 
              </CardHeader>  
              <CardBody>  
                {loading ? (  
                  <div className="text-center py-4">  
                    <i className="fas fa-spinner fa-spin fa-2x text-primary" />  
                    <p className="mt-2">Cargando facturas...</p>  
                  </div>  
                ) : error ? (  
                  <div className="text-center py-4">  
                    <i className="fas fa-exclamation-triangle fa-2x text-warning" />  
                    <p className="mt-2 text-warning">{error}</p>  
                    <Button color="primary" size="sm" onClick={cargarFacturas}>  
                      Reintentar  
                    </Button>  
                  </div>  
                ) : facturasFiltradas.length === 0 ? (  
                  <div className="text-center py-4">  
                    <i className="fas fa-file-invoice fa-2x text-muted" />  
                    <p className="mt-2 text-muted">  
                      {filtro ? 'No se encontraron facturas con ese criterio' : 'No hay facturas registradas'}  
                    </p>  
                  </div>  
                ) : (  
                  <Table className="align-items-center table-flush" responsive>  
                    <thead className="thead-light">  
                      <tr>  
                        <th scope="col">No. Factura</th>  
                        <th scope="col">Fecha</th>  
                        <th scope="col">Cliente</th>  
                        <th scope="col">Total</th>  
                        <th scope="col">Estado</th>  
                        <th scope="col">Acciones</th>  
                      </tr>  
                    </thead>  
                    <tbody>  
                      {facturasFiltradas.map((factura) => (  
                        <tr key={factura.idFactura}>  
                          <td>  
                            <span className="mb-0 text-sm font-weight-bold">  
                              {factura.idFactura.toString().padStart(8, '0')}  
                            </span>  
                          </td>  
                          <td>  
                            <span className="mb-0 text-sm">  
                              {formatearFecha(factura.Fecha)}  
                            </span>  
                          </td>  
                          <td>  
                            <span className="mb-0 text-sm">  
                                                      

                            {factura.Cliente?.persona ?   
                            `${factura.Cliente.persona.Pnombre} ${factura.Cliente.persona.Snombre || ''} ${factura.Cliente.persona.Papellido} ${factura.Cliente.persona.Sapellido || ''}`.trim() :   
                            'Cliente no disponible'  
                           }
                          </span> 
                          </td>  
                          <td>  
                            <span className="mb-0 text-sm font-weight-bold">  
                              {formatearMoneda(factura.Total_Facturado)}  
                            </span>  
                          </td>  
                          <td>  
                            <Badge  
                              color={getBadgeColor(factura.estadoFactura)}  
                              pill  
                            >  
                              {factura.estadoFactura}  
                            </Badge>  
                          </td>  
                          <td>  
                            <Button  
                              color="info"  
                              size="sm"  
                              onClick={() => handleDescargarPDF(factura.idFactura)}  
                              disabled={!factura.archivo_pdf}  
                            >  
                              <i className="fas fa-download" /> PDF  
                            </Button>  
                            {factura.estadoFactura === 'activa' && (    
                              <Button    
                                color="warning"    
                                size="sm"    
                                className="ml-2"    
                                onClick={() => confirmarAnulacion(factura)}  
                                title="Anular factura"  
                              >    
                                <i className="fas fa-ban" /> Anular    
                              </Button>    
                            )}   
                          </td>  
                        </tr>  
                      ))}  
                    </tbody>  
                  </Table>  
                )}  
              </CardBody>  
            </Card>  
          </Col>  
        </Row>  
          
        {/* Modal de confirmación para anular factura */}  
          <Modal isOpen={modalAnular} toggle={cancelarAnulacion}>  
            <ModalHeader toggle={cancelarAnulacion}>  
              Confirmar Anulación de Factura  
            </ModalHeader>  
            <ModalBody>  
              {facturaSeleccionada && (  
                <div>  
                  <p>¿Está seguro que desea anular la siguiente factura?</p>  
                  <div className="bg-light p-3 rounded">  
                    
                    <strong>Factura No:</strong> {facturaSeleccionada.idFactura.toString().padStart(8, '0')}<br/>  
                    <strong>Cliente:</strong> {facturaSeleccionada.Cliente?.persona ?   
  `${facturaSeleccionada.Cliente.persona.Pnombre} ${facturaSeleccionada.Cliente.persona.Snombre || ''} ${facturaSeleccionada.Cliente.persona.Papellido} ${facturaSeleccionada.Cliente.persona.Sapellido || ''}`.trim()   
  : 'N/A'}<br/>  
                    <strong>Total:</strong> {formatearMoneda(facturaSeleccionada.Total_Facturado)}<br/>  
                    <strong>Fecha:</strong> {formatearFecha(facturaSeleccionada.Fecha)}  
                  </div>  
                  <div className="mt-3">  
                    <small className="text-warning">  
                      <i className="fas fa-exclamation-triangle" />   
                       - Esta acción no se puede deshacer. La factura quedará marcada como anulada permanentemente.  
                    </small>  
                  </div>  
                </div>  
              )}  
            </ModalBody>  
            <ModalFooter>  
              <Button   
                color="secondary"   
                onClick={cancelarAnulacion}  
                disabled={procesandoAnulacion}  
              >  
                Cancelar  
              </Button>  
              <Button   
                color="danger"   
                onClick={handleAnularFactura}  
                disabled={procesandoAnulacion}  
              >  
                {procesandoAnulacion ? (  
                  <>  
                    <i className="fas fa-spinner fa-spin" /> Anulando...  
                  </>  
                ) : (  
                  <>  
                    <i className="fas fa-ban" /> Confirmar Anulación  
                  </>  
                )}  
              </Button>  
            </ModalFooter>  
          </Modal>  
      </Container>    
    </>     
  );  
};  
  
export default ListaFacturas;