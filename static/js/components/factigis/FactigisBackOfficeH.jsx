import React from 'react';
import ReactDOM from 'react-dom';
import ReactTabs from 'react-tabs';
import Select from 'react-select';
import token from '../../services/token-service';
import cookieHandler from 'cookie-handler';
import Griddle from 'griddle-react';
import FG_GridPerZoneH2 from '../factigis/Factigis_GridPerZoneH2.jsx';
import FG_GridPerZoneH from '../factigis/Factigis_GridPerZoneH.jsx';
import mymap from '../../services/map-service';
import layers from '../../services/layers-service';
import {Navbar, Nav, NavItem, NavDropdown, DropdownButton,FormGroup,FormControl,Button, MenuItem,Breadcrumb, CollapsibleNav} from 'react-bootstrap';
import Modal from 'react-modal';
import {agregarEstadoHistoria} from '../../services/factigis_services/factigis_add-service';
import LayerList from '../../components/LayerList.jsx';
import {loadCurrentHistoryData, loadFactStates} from '../../services/factigis_services/factigis_loadBackOfficeStates.js';
import _ from 'lodash';
import BasemapToggle from "esri/dijit/BasemapToggle";
import {saveGisredLogin, getFormatedDate} from '../../services/login-service';
import {factigis_findSedProperties, factigis_findRotuloProperties } from  '../../services/factigis_services/factigis_dynamicElementQuery';


function createDataObject(){
  return {
    'Folio' : 0 ,
    'Estado Tramite': 0,
    'Nombre': 0,
    'Apellido':0,
    'Tipo Mejora': 0 ,
    'Zona': 0,
    'Origen Factibilidad': 0,
    'Geometry': 0,
    'Alimentador' : 0,
    'Rut' : 0,
    'Telefono':  0,
    'Email': 0,
    'Tipo_cliente ':0,
    'Tipo_contribuyente ':0,
    'Rotulo ':0,
    'Tramo':0,
    'Empalme ':0,
    'Fase ':0,
    'Potencia ':0,
    'Capacidad_empalme ':0,
    'Capacidad_interruptor ':0,
    'Tiempo_empalme ':0,
    'Tipo_empalme ':0,
    'Cantidad_empalme ':0,
    'ID_Direccion ':0,
    'Direccion ':0,
    'Zona_campamentos':0,
    'Zona_concesion ':0,
    'Zona_restringida':0,
    'Zona_transmision ':0,
    'Zona_vialidad ':0,
    'Potencia_calculada ':0,
    'DistRotuloMedidor ':0,
    'DistDireccionMedidor ':0,
    'Comuna ':0,
    'Idnodo ':0,
    'Estado_tramite ':0,
    'Tipo_factibilidad ':0,
    'Sed ':0,
    'PotenciaDispSed ':0
  };
}

function createDataObject2(){
  return {
    'ID Factibilidad' : '' ,
    'Estado Tramite':  '',
    'Fecha Cambio':  '',
    'Usuario': '',
    'Observacion':  ''
  };
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

var tipoEstado = [
	{ value: 'NUEVA', label: 'NUEVA' },
	{ value: 'EN TRAMITE', label: 'EN TRAMITE' },
	{ value: 'CERRADA', label: 'CERRADA' }
];

var tipoMejora = [
  { value: 'POR DEFINIR', label: 'POR DEFINIR' },
	{ value: 'MEJORA PREVIA', label: 'MEJORA PREVIA' },
	{ value: 'MEJORA POST', label: 'MEJORA POST' }
];

class FactigisBackOfficeH extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      facb_observaciones: '',
      open: false,
      modalStatus: '',
      opcionesEstado: tipoEstado,
      opcionesMejora: tipoMejora,
      cbEstadoValue: '',
      cbMejoraValue: '',
      loadData: [{}],
      facB_rut: '',
      facB_folio: '',
      facB_nombre: '',
      facB_apellido: '',
      facB_telefono: '',
      facB_email: '',
      facB_tipoCliente: '',
      facB_tipoContribuyente: '',
      facB_tipoFactibilidad: '',
      facB_tipoMejora: '',
      facB_estadoTramite: '',
      facB_origenFactibilidad: '',
      facB_rotulo: '',
      facB_direccion: '',
      facB_tipoBTMT: '',
      facB_tramo: '',
      facB_sed: '',
      facB_tipoEmpalme: '',
      facB_fase: '',
      facB_potencia: '',
      facB_tiempoEmpalme: '',
      facB_cantidadEmpalme: '',
      facB_potenciaSolicitada: '',
      facB_potenciaDisponible: '',
      facB_potenciaCalculada: '',
      facB_zona: '',
      facB_concesion: '',
      facB_restringida: '',
      facB_vialidad: '',
      facB_campamento: '',
      facB_transmision: '',
      myDataEstados: [{}],
      factB_distanciaRM: '',
      factB_distanciaDM: '',
      facB_tiposFase: '',
      facB_puntoConexion: '',
      //dynamic query
      facB_sedNombre: '',
      facB_sedKVA: '',
      facB_tiposFase: '',
      facB_clasificacion: ''

    }
  }

  onChildChanged(newState){

    this.setState({
      facB_rut: newState[0]['Rut'],
      facB_folio: newState[0]['Folio'],
      facB_nombre: newState[0]['Nombre'],
      facB_apellido: newState[0]['Apellido'],
      facB_telefono: newState[0]['Telefono'],
      facB_email: newState[0]['Email'],
      facB_tipoCliente: newState[0]['Tipo Cliente'],
      facB_tipoContribuyente: newState[0]['Tipo Contribuyente'],
      facB_tipoFactibilidad: newState[0]['Tipo Factibilidad'],
      facB_tipoMejora: newState[0]['Tipo Mejora'],
      facB_estadoTramite: newState[0]['Estado Tramite'],
      facB_origenFactibilidad: newState[0]['Origen Factibilidad'],
      facB_rotulo: newState[0]['Rotulo'],
      facB_direccion: newState[0]['Direccion'],
      facB_tipoBTMT: newState[0]['Tipo Empalme'],
      facB_tramo: newState[0]['Tramo'],
      facB_sed: newState[0]['Sed'],
      facB_tipoEmpalme: newState[0]['Empalme'],
      facB_fase: newState[0]['Fase'],
      facB_potencia: newState[0]['Potencia'],
      facB_tiempoEmpalme: newState[0]['Tiempo Empalme'],
      facB_cantidadEmpalme: newState[0]['Cantidad Empalme'],
      facB_potenciaSolicitada: newState[0]['Potencia'],
      facB_potenciaDisponible: newState[0]['PotenciaDispSed'],
      facB_potenciaCalculada: newState[0]['Potencia Calculada'],
      facB_zona: newState[0]['Zona'],
      facB_concesion: newState[0]['Zona Concesion'],
      facB_restringida: newState[0]['Zona Restringida'],
      facB_vialidad: newState[0]['Zona Vialidad'],
      facB_campamento: newState[0]['Zona Campamentos'],
      facB_transmision: newState[0]['Zona Transmision'],
      factB_distanciaDM: newState[0]['DistDireccionMedidor'],
      factB_distanciaRM: newState[0]['DistRotuloMedidor'],
      facB_clasificacion: newState[0]['Clasificacion'],
      facB_tiposFase:  newState[0]['Tipos Fase'],
      facB_puntoConexion:  newState[0]['Punto Conexion']

    });
      this.setState({
        cbEstadoValue: newState[0]['Estado Tramite'],
        cbMejoraValue: newState[0]['Tipo Mejora']
      });

      //load states for the selected factibilidad.
      loadFactStates(newState[0]['Folio'], (callback)=>{
        if(!callback.length){
            this.setState({myDataEstados: []});
          return;
        }else{

          let loadDataEstados = callback.map(estado=>{
            //console.log(estado.attributes);
            let thestatus = {
              'ID Factibilidad' : estado.attributes["ID_Factibilidad"],
              'Estado Tramite':  estado.attributes["Estado_tramite"],
              'Fecha Cambio':  estado.attributes["Fecha_cambio"],
              'Usuario': estado.attributes["Usuario"],
              'Observacion':  estado.attributes["Observacion"]
            }
            return thestatus;
          });
          this.setState({myDataEstados: loadDataEstados});
        }

      });

      //query for getting the SED name and kva.
       //if 0 = 'NO NAME AVAILABLE' and no kva available
       factigis_findSedProperties(newState[0]['Sed'],(sedprops)=>{

         if(!sedprops.length){
           this.setState({facB_sedNombre: "N/A", facB_sedKVA: 'N/A' });
           return;
         }
          this.setState({facB_sedNombre: sedprops[0].attributes['nombre'] , facB_sedKVA:  sedprops[0].attributes['kva']});
       });

      //query for getting propiedad from POSTE
       factigis_findRotuloProperties(newState[0]['Rotulo'], (rotuloprops)=>{
         if(!rotuloprops.length){
           this.setState({facB_rotuloPropiedad: "N/A"});
           return;
         }
          this.setState({facB_rotuloPropiedad: rotuloprops[0].attributes['propiedad']});
           $("#iframeloadingBO1").hide();
       });


  }

  componentWillMount(){
    this.setState({
        myData: [createDataObject()],
        myDataEstados: [createDataObject2()]
    });


  }
  componentDidMount(){
    var d = cookieHandler.get('wllExp');
      if(d > getFormatedDate()){

        if(!cookieHandler.get('tkn')){
          console.log("no hay, redirect...");
          window.location.href = "index.html";
        }
      }else{
        console.log("Token Expired");
        window.location.href = "index.html";
      }

    //ADD LAYER TO SHOW IN THE MAP
    $("#iframeloadingBO1").show();
      var mapp = mymap.createMap("factigis_bo2_map","topo",-71.2905 ,-33.1009,9);
      var layerFactibilidad = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_factibilidad(),{id:"factigis_factibildades"});
      layerFactibilidad.setImageFormat("png32");
      layerFactibilidad.setVisibleLayers([0]);
      var layerDefs = [];
      layerDefs[0] = "Estado_tramite = 'CERRADA'";
      layerFactibilidad.setLayerDefinitions(layerDefs);
      /*layerFactibilidad.setInfoTemplates({
        0: {infoTemplate: myinfotemplate.getAlimentadorInfoWindow()}
      });
      */
      mapp.addLayer(layerFactibilidad);

      //Add layer for old addresses
      var layerDirecciones = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_direccionesDyn(),{id:"factigis_direcciones"});
      layerDirecciones.setImageFormat("png32");
      layerDirecciones.setVisibleLayers([0]);

      mapp.addLayer(layerDirecciones);

      // add layer for new ones
      var layerDireccionesNew = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_direccionesNuevasMobile(),{id:"factigis_direccionesNew", minScale: 11000});
      layerDireccionesNew.setImageFormat("png32");
      layerDireccionesNew.setVisibleLayers([2]);
      mapp.addLayer(layerDireccionesNew);

      // add layer for pipes
      var layerRotulos = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_rotulos(),{id:"factigis_rotulos"});
      layerRotulos.setImageFormat("png32");
      layerRotulos.setVisibleLayers([0]);
      var layerDefs = [];
      layerDefs[0] = "tipo_nodo ='ele!poste' or tipo_nodo='ele!camara'";
      layerRotulos.setLayerDefinitions(layerDefs);
      mapp.addLayer(layerRotulos);

      //LOAD FACTIBILIDAD FOR CURRENT USER : RULES: PER HIS/HER ZONE and <> of FACTIBILIDAD DIRECTA
      loadCurrentHistoryData(data=>{
        let loadData = data.map(result=>{

          let theData = {
            'Folio' : result.attributes['OBJECTID'],
            'Estado Tramite': result.attributes['Estado_tramite'],
            'Nombre': result.attributes['Nombre'],
            'Apellido':result.attributes['Apellido'],
            'Tipo Mejora': result.attributes['Tipo_mejora'] ,
            'Zona': result.attributes['Zona'],
            'Origen Factibilidad': result.attributes['Origen_factibilidad'],
            'Geometry': result.geometry,
            'Alimentador' : result.attributes['Alimentador'],
            'Rut' : result.attributes['Rut'],
            'Telefono': result.attributes['Telefono'],
            'Email': result.attributes['Email'],
            'Tipo Cliente': result.attributes['Tipo_cliente'],
            'Tipo Contribuyente': result.attributes['Tipo_contribuyente'],
            'Rotulo': result.attributes['Rotulo'],
            'Tramo': result.attributes['Tramo'],
            'Empalme': result.attributes['Empalme'],
            'Fase': result.attributes['Fase'],
            'Potencia': result.attributes['Potencia'],
            'Capacidad Empalme': result.attributes['Capacidad_empalme'],
            'Capacidad Interruptor': result.attributes['Capacidad_interruptor'],
            'Tiempo Empalme': result.attributes['Tiempo_empalme'],
            'Tipo Empalme': result.attributes['Tipo_empalme'],
            'Cantidad Empalme': result.attributes['Cantidad_empalme'],
            'IDDireccion': result.attributes['ID_Direccion'],
            'Direccion': result.attributes['Direccion'],
            'Zona Campamentos': result.attributes['Zona_campamentos'],
            'Zona Concesion': result.attributes['Zona_concesion'],
            'Zona Restringida': result.attributes['Zona_restringida'],
            'Zona Transmision': result.attributes['Zona_transmision'],
            'Zona Vialidad': result.attributes['Zona_vialidad'],
            'Potencia Calculada': result.attributes['Potencia_calculada'],
            'DistRotuloMedidor': result.attributes['DistRotuloMedidor'],
            'DistDireccionMedidor': result.attributes['DistDireccionMedidor'],
            'Comuna': result.attributes['Comuna'],
            'Idnodo': result.attributes['Idnodo'],
            'Estado Tramite': result.attributes['Estado_tramite'],
            'Tipo Factibilidad': result.attributes['Tipo_factibilidad'],
            'Sed': result.attributes['Sed'],
            'PotenciaDispSed': result.attributes['PotenciaDispSed'],
            'Zona': result.attributes['Zona'],
            'Creador': result.attributes['created_user'],
            'Clasificacion': result.attributes['Clasificacion'],
            'Tipos Fase':  result.attributes['Tipo_fase'],
            'Punto Conexion':  result.attributes['Poste_cnx_final']

          }

          return theData;
        });
          this.setState({myData: loadData});
          var prof = cookieHandler.get('usrprfl');
          $("#iframeloadingBO1").hide();
      });

      var toggle = new BasemapToggle({
        map: mapp,
        basemap: "hybrid"
      }, "BMToggle2");
      toggle.startup();

      const page = "REACT_FACTIGIS_DESA";
      const module = "FACTIGIS_REVISAR_HISTORIAL_FACTIBILIDAD";
      const date = getFormatedDate();
      const user = cookieHandler.get('usrprfl')
      const myToken = cookieHandler.get('tkn');

      //console.log(user['USUARIO']);
    saveGisredLogin(user['USUARIO'],date,page,module,myToken);


  }

  onChange(e){this.setState({cbEstadoValue: e});}

  onChange2(e){this.setState({cbMejoraValue: e});}

  onChangeObs(e){ this.setState({facb_observaciones: e.currentTarget.value });}

  openModal () { this.setState({open: true}); }

  closeModal () { this.setState({open: false}); }

  onLoggOff(){
      cookieHandler.remove('myLetter');
      cookieHandler.remove('usrprfl');
      cookieHandler.remove('usrprmssns');
      cookieHandler.remove('wllExp');
      localStorage.removeItem('token');
      window.location.href = "index.html";
  }

  render(){
    if(!cookieHandler.get('usrprmssns') || (!cookieHandler.get('usrprfl'))){
      window.location.href = "index.html";
      return;
    }

    let prof = cookieHandler.get('usrprfl');
    prof = prof.NOMBRE_COMPLETO.split(" ");

    let permissions = cookieHandler.get('usrprmssns');

    var p = _.filter(permissions, function(o) {
      return o.module=='REVISAR_HISTORIAL_FACTIBILIDAD';
    });
    if(!p.length){
      window.location.href = "index.html";
      return;
    }


    return (
      <div className="wrapper_factigis_bo2">
        <div className="factigisBO2_wrapper_top">
          <Breadcrumb className="dashboard_breadcrum">
            <Breadcrumb.Item href="index.html">
              Inicio
            </Breadcrumb.Item>
            <Breadcrumb.Item href="factigisDashboard.html">
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              Revisión Historial Factibilidades
              <img className="factigisBO1_imgLoader" src="dist/css/images/ajax-loader.gif" alt="loading" id="iframeloadingBO1"/>

            </Breadcrumb.Item>
            <div className="factigis_top-right">
               <Breadcrumb.Item active className="factigis_whologged">
                  Bienvenido/a: {prof[0]}
               </Breadcrumb.Item>
               <Breadcrumb.Item active >
                 <button onClick={this.onLoggOff.bind(this)}  className="btnLogoff btn btn-info" title="Cerrar Sesión " type="button" >
                   <span><i className="fa fa-sign-out" aria-hidden="true"></i> Log Off</span>
                 </button>
               </Breadcrumb.Item>
             </div>

          </Breadcrumb>
        </div>
        <div className="bo2_table">
          <FG_GridPerZoneH2 title={"Factibildades"} data={this.state.myData}  callbackParent={this.onChildChanged.bind(this)}/>
          <div>
            <h1 className="factigisBO2_h1">Historial de Estados: <b className="factigis_bo2-b"></b></h1>
          </div>
          <FG_GridPerZoneH title={"Factibildades Estados"} data={this.state.myDataEstados} />
        </div>
        <div className="wrapper_mid">
          <div className="wrapper_mid-left">


            <div>
              <h1 className="factigisBO2_h1">Datos Factibilidad > Folio: <b className="factigis_bo2-b">{this.state.facB_folio}</b></h1>
            </div>
            <div className="wrapper_mid-split">
              <div className="wrapper_mid-split-1">
                <h6 className="factigis_bo2-h6"><b>Datos de Cliente</b></h6>
                <h8 className="">Rut: {this.state.facB_rut}</h8>
                <h8 className="">Nombre Cliente: {this.state.facB_nombre}  </h8>
                <h8 className="">Apellido: {this.state.facB_apellido}</h8>
                <h8 className="">Dirección: {this.state.facB_direccion}</h8>
                <h8 className="">Telefono: {this.state.facB_telefono}</h8>
                <h8 className="">Email: {this.state.facB_email}</h8>
                <h8 className="">Tipo Cliente: {this.state.facB_tipoCliente}</h8>
                <h8 className="">Tipo Contribuyente: {this.state.facB_tipoContribuyente}</h8>
                <h6 className="factigis_bo2-h6"><b>Factibilidad: </b></h6>
                <h8 className="">Tipo Factibilidad: {this.state.facB_tipoFactibilidad}</h8>
                <h8 className="">Tipo Mejora: {this.state.facB_tipoMejora}</h8>
                <h8 className="">Estado Tramite: {this.state.facB_estadoTramite}</h8>
                <h8 className="">Origen Factibilidad: {this.state.facB_origenFactibilidad}</h8>
                <h6 className="factigis_bo1-h6"><b>Extras: </b></h6>
                <h8 className="">Clasificación: {this.state.facB_clasificacion}</h8>
                <h8 className="">Fases Conexión: {this.state.facB_tiposFase}</h8>
                <h8 className="">Punto Conexión: {this.state.facB_puntoConexion}</h8>

              </div>
                <div className="wrapper_mid-split-1">
                <h6 className="factigis_bo2-h6"><b>Datos de Red</b></h6>
                <h8 className="">Rótulo: {this.state.facB_rotulo}</h8>
                <h8 className="">Propiedad: {this.state.facB_rotuloPropiedad}</h8>
                <h8 className="">Tipo: {this.state.facB_tipoBTMT}</h8>
                <h8 className="">Tramo Conexion: {this.state.facB_tramo}</h8>
                <h8 className="">SED: {this.state.facB_sed}</h8>
                <h8 className="">SED Nombre: {this.state.facB_sedNombre}</h8>
                <h8 className="">SED KVA (Potencia Nominal): {this.state.facB_sedKVA}</h8>
                <h8 className="">Tipo (Empalme): {this.state.facB_tipoEmpalme}</h8>
                <h8 className="">Fase: {this.state.facB_fase}</h8>
                <h8 className="">Potencia:{this.state.facB_potencia}</h8>
                <h8 className="">Empalme (Prov-Defi): {this.state.facB_tiempoEmpalme}</h8>
                <h8 className="">Cantidad: {this.state.facB_cantidadEmpalme}</h8>
                <h8 className="">Potencia Solicitada: {this.state.facB_potenciaSolicitada}</h8>
                <h8 className="">Potencia Disponible: {this.state.facB_potenciaDisponible}</h8>
                <h8 className="">Potencia Calculada: {this.state.facB_potenciaCalculada}</h8>
                <h8 className="">Zona: {this.state.facB_zona}</h8>
                <h8 className="">Distancia Rotulo - Medidor (m): {this.state.factB_distanciaRM}</h8>
                <h8 className="">Distancia Dirección - Medidor (m): {this.state.factB_distanciaDM}</h8>

              </div>
            </div>
            <div className="wrapper_mid_splitbot">
              <div>
                <h1 className="factigisBO2_h1">Zonas Factibilidad</h1>
              </div>
              <div className="factigis_bo2_wrapper-zonas">
                <div><h8 className="factigis_bo2_zonas">Concesión: <b>{this.state.facB_concesion}</b></h8></div>
                <div><h8 className="factigis_bo2_zonas">Restringida: <b>{this.state.facB_restringida}</b></h8></div>
                <div><h8 className="factigis_bo2_zonas">Vialidad: <b>{this.state.facB_vialidad}</b></h8></div>
                <div><h8 className="factigis_bo2_zonas">Campamentos: <b>{this.state.facB_campamento}</b></h8></div>
                <div><h8 className="factigis_bo2_zonas">Transmisión: <b>{this.state.facB_transmision}</b></h8></div>
              </div>
            </div>
          </div>
          <div className="factigisBO2_wrapper_mid-right">
            <div>
              <h1 className="factigisBO2_h1">Mapa - Ubicación</h1>
            </div>

            <LayerList show={["check_factigis_transmision", "check_factigis_distribucion", "check_factigis_vialidad", "check_campamentos", "check_chqbasemap",
            "check_subestaciones","check_MT","check_BT"]} />
            <div id="factigis_bo2_map" className="factigis_bo2_map">
              <div id="BMToggle2"></div>
              </div>

          </div>
        </div>
        <div className="wrapper_bot">
          <div className="wrapper_bot_title">
            {/*<h1 className="factigisBO2_h1 factigis_h1_edited">Historial de Estados</h1>*/}
          </div>
          <div className="wrapper_bot_content"></div>
        </div>
        <Modal isOpen={this.state.open} style={customStyles}>
          <h2 className="factigis_h2">Revisión Factibilidades</h2>
          <p>{this.state.modalStatus}</p>
          <br />
          <button className="factigis_submitButton btn btn-info" onClick={this.closeModal.bind(this)}>Close</button>
        </Modal>
      </div>
    );
  }
}

export default FactigisBackOfficeH;
