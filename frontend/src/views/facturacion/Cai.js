import React, { useState, useEffect } from "react";  
import {  
  Button,  
  Card,  
  CardBody,  
  CardHeader,  
  Container,  
  Row,  
  Col,  
  FormGroup,  
  Label,  
  Input,  
  Alert,  
} from "reactstrap";  
import HeaderResponsive from "components/Headers/HeaderResponsive";  
  
const CAI = () => {  
  const [caiData, setCaiData] = useState({  
    codigoCAI: "",  
    numeroFacturaInicio: "",  
    numeroFacturaFin: "",  
    fechaEmision: "",  
    fechaVencimiento: "",  
    resolucionSAR: "SAR No. 45145",  
    nombreEmpresa: "Televisión Comayagua Canal 40",  
    rtnEmpresa: "12171961001526",  
    activo: true,  
    facturasEmitidas: 0  
  });  
  
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });  
  const [loading, setLoading] = useState(false);  
  
  // Cargar CAI activo al montar el componente  
  useEffect(() => {  
    cargarCAIActivo();  
  }, []);  
  
  const cargarCAIActivo = async () => {  
    try {  
      const token = localStorage.getItem('token');  
      const response = await fetch('/api/optica/cai/activo', {  
        method: 'GET',  
        headers: {  
          'Content-Type': 'application/json',  
          'Authorization': `Bearer ${token}`  
        }  
      });  
        
      if (response.ok) {  
        const data = await response.json();  
        if (data.cai) {  
          setCaiData({  
            ...data.cai,  
            fechaEmision: data.cai.fechaEmision ? data.cai.fechaEmision.split('T')[0] : '',  
            fechaVencimiento: data.cai.fechaVencimiento ? data.cai.fechaVencimiento.split('T')[0] : ''  
          });  
        }  
      }  
    } catch (error) {  
      console.log('No hay CAI activo configurado o error al cargar:', error.message);  
      // Mantener valores por defecto si no hay CAI activo  
    }  
  };  
  
  const handleChange = (e) => {  
    const { name, value, type, checked } = e.target;  
    setCaiData({   
      ...caiData,   
      [name]: type === 'checkbox' ? checked : value   
    });  
  };  
  
  const generarRangoFacturas = () => {  
    if (caiData.numeroFacturaInicio && caiData.numeroFacturaFin) {  
      return `Del ${caiData.numeroFacturaInicio} al ${caiData.numeroFacturaFin}`;  
    }  
    return 'N/A';  
  };  
  
  const validarFormulario = () => {  
    if (!caiData.codigoCAI || !caiData.numeroFacturaInicio || !caiData.numeroFacturaFin ||   
        !caiData.fechaEmision || !caiData.fechaVencimiento || !caiData.resolucionSAR) {  
      throw new Error('Todos los campos obligatorios deben ser completados');  
    }  
  
    if (new Date(caiData.fechaVencimiento) <= new Date(caiData.fechaEmision)) {  
      throw new Error('La fecha de vencimiento debe ser posterior a la fecha de emisión');  
    }  
  };  
  
  const guardarDatos = async () => {  
    setLoading(true);  
    setMensaje({ tipo: '', texto: '' });  
  
    try {  
      validarFormulario();  
  
      const datosParaEnviar = {  
        codigoCAI: caiData.codigoCAI,  
        numeroFacturaInicio: caiData.numeroFacturaInicio,  
        numeroFacturaFin: caiData.numeroFacturaFin,  
        fechaEmision: caiData.fechaEmision,  
        fechaVencimiento: caiData.fechaVencimiento,  
        resolucionSAR: caiData.resolucionSAR,  
        nombreEmpresa: caiData.nombreEmpresa,  
        rtnEmpresa: caiData.rtnEmpresa,  
        activo: caiData.activo,  
        facturasEmitidas: parseInt(caiData.facturasEmitidas) || 0  
      };  
  
      const token = localStorage.getItem('token');  
      const response = await fetch('/api/optica/cai', {  
        method: 'POST',  
        headers: {  
          'Content-Type': 'application/json',  
          'Authorization': `Bearer ${token}`  
        },  
        body: JSON.stringify(datosParaEnviar)  
      });  
  
      if (response.ok) {  
        const result = await response.json();  
        setMensaje({  
          tipo: 'success',  
          texto: 'Datos del CAI guardados correctamente en la base de datos.'  
        });  
        // Recargar datos actualizados  
        await cargarCAIActivo();  
      } else {  
        throw new Error('Error al guardar CAI en el servidor');  
      }  
  
    } catch (error) {  
      console.error('Error:', error);  
      setMensaje({  
        tipo: 'danger',  
        texto: error.message || 'Error al guardar los datos del CAI'  
      });  
    } finally {  
      setLoading(false);  
    }  
  };  
  
  return (  
    <>  
      <HeaderResponsive />  
      <Container className="mt-4" fluid>  
        <Card className="shadow">  
          <CardHeader>  
            <h3 className="mb-0">Configuración de Datos CAI - SAR Honduras</h3>  
            <p className="text-muted mb-0">Gestión del Código de Autorización de Impresión</p>  
          </CardHeader>  
          <CardBody>  
            {mensaje.texto && (  
              <Alert color={mensaje.tipo} className="mb-4">  
                {mensaje.texto}  
              </Alert>  
            )}  
  
            {/* Información de la Empresa */}  
            <h5 className="text-muted mb-3">Información de la Empresa</h5>  
            <Row form>  
              <Col md={8}>  
                <FormGroup>  
                  <Label>Nombre de la Empresa *</Label>  
                  <Input   
                    name="nombreEmpresa"   
                    value={caiData.nombreEmpresa}   
                    onChange={handleChange}  
                    required  
                  />  
                </FormGroup>  
              </Col>  
              <Col md={4}>  
                <FormGroup>  
                  <Label>RTN de la Empresa *</Label>  
                  <Input   
                    name="rtnEmpresa"   
                    value={caiData.rtnEmpresa}   
                    onChange={handleChange}  
                    required  
                  />  
                </FormGroup>  
              </Col>  
            </Row>  
  
            <hr />  
  
            {/* Datos del CAI */}  
            <h5 className="text-muted mb-3">Configuración del CAI</h5>  
            <Row form>  
              <Col md={6}>  
                <FormGroup>  
                  <Label>Código CAI *</Label>  
                  <Input   
                    name="codigoCAI"   
                    value={caiData.codigoCAI}   
                    onChange={handleChange}  
                    placeholder="254F8-612F1-8A0E0-6E8B3-0099B876"  
                    required  
                  />  
                </FormGroup>  
              </Col>  
              <Col md={6}>  
                <FormGroup>  
                  <Label>Resolución SAR *</Label>  
                  <Input   
                    name="resolucionSAR"   
                    value={caiData.resolucionSAR}   
                    onChange={handleChange}  
                    required  
                  />  
                </FormGroup>  
              </Col>  
            </Row>  
  
            <Row form>  
              <Col md={6}>  
                <FormGroup>  
                  <Label>Número de Factura Inicio *</Label>  
                  <Input   
                    name="numeroFacturaInicio"   
                    value={caiData.numeroFacturaInicio}   
                    onChange={handleChange}  
                    placeholder="000-001-01-00000001"  
                    required  
                  />  
                </FormGroup>  
              </Col>  
              <Col md={6}>  
                <FormGroup>  
                  <Label>Número de Factura Fin *</Label>  
                  <Input   
                    name="numeroFacturaFin"   
                    value={caiData.numeroFacturaFin}   
                    onChange={handleChange}  
                    placeholder="000-001-01-99999999"  
                    required  
                  />  
                </FormGroup>  
              </Col>  
            </Row>  
  
            <Row form>  
              <Col md={4}>  
                <FormGroup>  
                  <Label>Fecha de Emisión *</Label>  
                  <Input   
                    type="date"  
                    name="fechaEmision"   
                    value={caiData.fechaEmision}   
                    onChange={handleChange}  
                    required  
                  />  
                </FormGroup>  
              </Col>  
              <Col md={4}>  
                <FormGroup>  
                  <Label>Fecha de Vencimiento *</Label>  
                  <Input   
                    type="date"  
                    name="fechaVencimiento"   
                    value={caiData.fechaVencimiento}   
                    onChange={handleChange}  
                    required  
                  />  
                </FormGroup>  
              </Col>  
              <Col md={4}>  
                <FormGroup>  
                  <Label>Facturas Emitidas</Label>  
                  <Input   
                    type="number"  
                    name="facturasEmitidas"   
                    value={caiData.facturasEmitidas}   
                    onChange={handleChange}  
                    min="0"  
                  />  
                </FormGroup>  
              </Col>  
            </Row>  
  
            <Row form>  
              <Col md={12}>  
                <FormGroup check>  
                  <Label check>  
                    <Input   
                      type="checkbox"  
                      name="activo"   
                      checked={caiData.activo}   
                      onChange={handleChange}  
                    />  
                    CAI Activo  
                  </Label>  
                </FormGroup>  
              </Col>  
            </Row>  
  
            {/* Información de resumen */}  
            {caiData.numeroFacturaInicio && caiData.numeroFacturaFin && (  
              <Alert color="info" className="mt-3">  
                <strong>Rango Autorizado:</strong> {generarRangoFacturas()}  
              </Alert>  
            )}  
  
            <div className="mt-4">  
              <Button   
                color="primary"   
                onClick={guardarDatos}  
                disabled={loading}  
                size="lg"  
              >  
                {loading ? 'Guardando...' : 'Guardar Configuración CAI'}  
              </Button>  
                
              <Button   
                color="secondary"   
                onClick={cargarCAIActivo}  
                disabled={loading}  
                className="ml-2"  
              >  
                Recargar Datos  
              </Button>  
            </div>  
          </CardBody>  
        </Card>  
      </Container>  
    </>  
  );  
};  
  
export default CAI;