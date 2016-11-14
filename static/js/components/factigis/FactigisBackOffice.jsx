import React from 'react';
import ReactDOM from 'react-dom';
import ReactTabs from 'react-tabs';
import Select from 'react-select';
import token from '../../services/token-service';
import cookieHandler from 'cookie-handler';
import Griddle from 'griddle-react';
import FG_GridPerZone from '../factigis/Factigis_GridPerZone.jsx';
import mymap from '../../services/map-service';
import layers from '../../services/layers-service';
import {loadCurrentUserData, updateAttributesPerFolio} from '../../services/factigis_services/factigis_loadBackofficeData';
import Modal from 'react-modal';
import {agregarEstadoHistoria} from '../../services/factigis_services/factigis_add-service';
import LayerList from '../../components/LayerList.jsx';
import jQuery from 'jquery';
import {Navbar, Nav, NavItem, NavDropdown, DropdownButton,FormGroup,FormControl,Button, MenuItem,Breadcrumb, CollapsibleNav} from 'react-bootstrap';
import BasemapToggle from "esri/dijit/BasemapToggle";
import _ from 'lodash';
import {saveGisredLogin, getFormatedDate} from '../../services/login-service';
import {factigis_findSedProperties, factigis_findRotuloProperties } from  '../../services/factigis_services/factigis_dynamicElementQuery';
import {factigis_findRotulo} from '../../services/factigis_services/factigis_find-service';



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
	{ value: 'MEJORA POST', label: 'MEJORA POST' },
  { value: 'CONEXION DIRECTA', label: 'CONEXION DIRECTA' }
];


var tiposFase = [
  { value: 'A', label: 'A' },
	{ value: 'B', label: 'B' },
	{ value: 'C', label: 'C' },
  { value: 'ABC', label: 'ABC' }
];



class FactigisBackOffice extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      facb_observaciones: '',
      open: false,
      modalStatus: '',
      zonaTitle: '',
      opcionesEstado: tipoEstado,
      opcionesMejora: tipoMejora,
      cbEstadoValue: '',
      cbMejoraValue: '',
      loadData: [],
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
      factB_distanciaRM: '',
      factB_distanciaDM: '',
      facB_clasificacion: '',


      //dynamic query
      facB_sedNombre: '',
      facB_sedKVA: '',
      facB_rotuloPropiedad: '',
      themap: '',
      togglePoste: 'OFF',
      btnPoste: '',
      rotuloFinal: '',
      btnGuardarState: true,
      fases: [],
      faseSelected: '',
      facB_tiposFase: '',
      facB_puntoConexion:'',

    }
    this.clearFields = this.clearFields.bind(this);
    this.loadDataa = this.loadDataa.bind(this);
    this.clearFieldsAttr = this.clearFieldsAttr.bind(this);
  }

  loadDataa(){
    loadCurrentUserData(data=>{
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
          'Creador': result.attributes['created_user'],
          'Clasificacion': result.attributes['Clasificacion'],
          'TiposFase':  result.attributes['Tipo_fase'],
          'PuntoConexion':  result.attributes['Poste_cnx_final'],
        }
        return theData;
      });
        this.setState({myData: loadData});
        var prof = cookieHandler.get('usrprfl');
        this.setState({zonaTitle: prof.ZONA_USUARIO})
        $("#iframeloadingBO").hide();
    });

  }

  onChildChanged(newState){
      $("#iframeloadingBO").show();



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
      cbEstadoValue: newState[0]['Estado Tramite'],
      cbMejoraValue: newState[0]['Tipo Mejora'],
      facb_observaciones: '',
      facB_clasificacion: newState[0]['Clasificacion'],
      facB_tiposFase:  newState[0]['TiposFase'],
      facB_puntoConexion:  newState[0]['PuntoConexion'],
      btnGuardarState: false


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
     });

    $("#iframeloadingBO").hide();
  }

  componentWillMount(){
    this.setState({
        myData: [createDataObject()],
        fases: tiposFase
    });
  }

  componentDidMount(){
    var d = cookieHandler.get('wllExp');
      if(d > getFormatedDate()){
        console.log("dentro del rango");
        if(!cookieHandler.get('tkn')){
          console.log("no hay, redirect...");
          window.location.href = "index.html";
          return;
        }
      }else{
        console.log("expiro");
        window.location.href = "index.html";
        return;
      }

      $("#iframeloadingBO").show();
    //ADD LAYER TO SHOW IN THE MAP
      let prfl = cookieHandler.get('usrprfl');
      var mapp = mymap.createMap("factigis_bo1_map","topo",-71.2905 ,-33.1009,9);
      this.setState({themap: mapp});
      var layerFactibilidad = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_factibilidad(),{id:"factigis_factibildades"});
      layerFactibilidad.setImageFormat("png32");
      layerFactibilidad.setVisibleLayers([0]);
      var layerDefs = [];
      layerDefs[0] = "Zona ='"+ prfl.ZONA_USUARIO + "' AND tipo_mejora <> 'FACTIBILIDAD DIRECTA' AND Estado_tramite <> 'CERRADA'";
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

      this.loadDataa();
      var toggle = new BasemapToggle({
        map: mapp,
        basemap: "hybrid"
      }, "BMToggle");
      toggle.startup();

      const page = "REACT_FACTIGIS_DESA";
      const module = "FACTIGIS_REVISAR_FACTIBILIDAD";
      const date = getFormatedDate();
      const user = cookieHandler.get('usrprfl')
      const myToken = cookieHandler.get('tkn');

      //console.log(user['USUARIO']);
    saveGisredLogin(user['USUARIO'],date,page,module,myToken);
  }


  onChange(e){console.log("h1",e); this.setState({cbEstadoValue: e});}

  onChange2(e){console.log("h2",e);this.setState({cbMejoraValue: e});}


  onClick(e){
    $("#iframeloadingBO").show();
    if( (this.state.facB_folio=='') || (this.state.cbEstadoValue=='') || (this.state.cbMejoraValue=='') ){
      this.setState({open: true, modalStatus: 'Por favor seleccione Estado de Trámite y/o Tipo Mejora antes de modificar.'});
      return;
    }
    let myDataUpdate = {
      "OBJECTID": this.state.facB_folio,
      "Estado_tramite": this.state.cbEstadoValue,
      "Tipo_mejora": this.state.cbMejoraValue
    }

    const data = {
      f: 'json',
      updates: JSON.stringify([{ attributes: myDataUpdate}]),
      token: token.read()
    };

    jQuery.ajax({
      method: 'POST',
      url: layers.read_updateFactibilidad(),
      dataType:'html',
      data: data
    })
      .done(d =>{
        let json = JSON.parse(d);
        if( (_.has(json,'error')) ){
          this.setState({open: true, modalStatus: 'Factibilidad '+ this.state.facB_folio+ ' NO ha sido modificada. Intente de nuevo.'});

        }else{
          if(json["updateResults"][0].objectId>0){
            //add to status historial
            let usrprfl = cookieHandler.get('usrprfl');
            let historial = {
              Estado_tramite: myDataUpdate["Estado_tramite"],
              ID_Factibilidad: myDataUpdate["OBJECTID"],
              Fecha_cambio: getFormatedDate(),
              Observacion: this.state.facb_observaciones,
              Usuario:  usrprfl.USUARIO
              }
            agregarEstadoHistoria(historial, myhistorialCb =>{
              if(myhistorialCb){
                  this.setState({open: true, modalStatus: 'Factibilidad '+ this.state.facB_folio+ ' modificada.'});
                  $("#iframeloadingBO").hide();
                  this.clearFields();
              }else{
                  this.setState({open: true, modalStatus: 'Factibilidad '+ this.state.facB_folio+ ' no ha podido ser modificada.'});
                  $("#iframeloadingBO").hide();
              }
              //this.setState({open: true, modalStatus: 'Factibilidad '+ this.state.facB_folio+ ' modificada.'});

            });

            $("#iframeloadingBO").show();
            //refresh the grid after update.

            this.loadDataa();

          }else{
            this.setState({open: true, modalStatus: 'No se ha podido modificar la factibilidad. Trate de nuevo.'});
            $("#iframeloadingBO").hide();
          }
        }

      }).fail(f=>{
          this.setState({open: true, modalStatus: 'No se ha podido modificar la factibilidad. Trate de nuevo.'});
            $("#iframeloadingBO").hide();
    });
  }

  onChangeObs(e){ this.setState({facb_observaciones: e.currentTarget.value });}

  openModal () { this.setState({open: true}); }

  closeModal () { this.setState({open: false}); }

  clearFields(){
    let mapp = mymap.getMap();
    mapp.graphics.clear();
    this.setState({
    facb_observaciones: '',

    zonaTitle: '',
    opcionesEstado: tipoEstado,
    opcionesMejora: tipoMejora,
    cbEstadoValue: '',
    cbMejoraValue: '',
    loadData: [],
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
    factB_distanciaRM: '',
    factB_distanciaDM: '',
    facB_clasificacion: '',
    facB_puntoConexion: '',
    facB_tiposFase: '',
    btnGuardarState: true,
    rotuloFinal: '',
    togglePoste: 'OFF',
    btnPoste: ''
    });
  }

  clearFieldsAttr(){
    this.setState({
      facB_tiposFase: this.state.faseSelected,
      facB_puntoConexion: this.state.rotuloFinal,
      faseSelected: '',
      rotuloFinal: ''

    });
  }

  onLoggOff(){
      cookieHandler.remove('myLetter');
      cookieHandler.remove('usrprfl');
      cookieHandler.remove('usrprmssns');
      cookieHandler.remove('wllExp');
      localStorage.removeItem('token');
      window.location.href = "index.html";
  }


  onChangeFase(e){
    console.log(e);
    this.setState({faseSelected: e});
  }

  onClickPuntoConexion(){
    var map = this.state.themap;

    if (this.state.togglePoste =='OFF'){
      this.setState({togglePoste: 'ON'});
        $('.fact_bo_poste').css('color',"crimson").css('border-color','red');

        var map_click_handle = dojo.connect(map, 'onClick', (g)=>{
        $("#iframeloadingBO").show();
          factigis_findRotulo(g.mapPoint, (featureSetFeatures)=>{

            //extrae datos de rotulo
            let rotulo = featureSetFeatures[0].attributes['rotulo'];
            this.setState({
              rotuloFinal: rotulo
            });
            $("#iframeloadingBO").hide();
          });

        });
        this.setState({btnPoste: map_click_handle});
    }else{
      this.setState({togglePoste: 'OFF'});
        $('.fact_bo_poste').css('color',"black");
        dojo.disconnect(this.state.btnPoste);

    }
  }

  onClickGuardarAtributos(){
    if( (this.state.facB_folio=='') || (this.state.faseSelected=='') || (this.state.rotuloFinal=='') ){
      this.setState({open: true, modalStatus: 'Por favor seleccione el punto de conexión y/o tipo de fase de conexión antes de modificar.'});
      return;
    }

    let myDataUpdate = {
      "OBJECTID": this.state.facB_folio,
      "Poste_cnx_final": this.state.rotuloFinal,
      "Tipo_fase": this.state.faseSelected
    }
    updateAttributesPerFolio(myDataUpdate, (cb)=>{
      if(!cb){
        this.setState({
          open: true,
          modalStatus: 'No se pudo guardar los cambios, intente nuevamente.'

        });
        return;
      }
      this.setState({
        open: true,
        modalStatus: 'Cambios en Folio ' + this.state.facB_folio +  ' han sido guardados'
      });
      $('.fact_bo_poste').css('color',"black");
      this.clearFieldsAttr();
      //LOAD FACTIBILIDAD FOR CURRENT USER : RULES: PER HIS/HER ZONE and <> of FACTIBILIDAD DIRECTA
      this.loadDataa();

    });

  }


  render(){
    if(!cookieHandler.get('usrprmssns') || (!cookieHandler.get('usrprfl'))){
      window.location.href = "index.html";
      return;
    }


    let prof = cookieHandler.get('usrprfl');
    prof = prof.NOMBRE_COMPLETO.split(" ");

    return (
      <div className="wrapper_factigisBO">
        <div className="factigisBO_top">
          <Breadcrumb className="dashboard_breadcrum">
            <Breadcrumb.Item href="index.html">
              Inicio
            </Breadcrumb.Item>
            <Breadcrumb.Item href="factigisDashboard.html">
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              Revisión Factibilidades:  Zona {this.state.zonaTitle}
              <img className="factigisBO_imgLoader" src="dist/css/images/ajax-loader.gif" alt="loading" id="iframeloadingBO"/>
            </Breadcrumb.Item>
            <div className="factigis_top-right">
               <Breadcrumb.Item active className="factigis_whologged">
                  Bienvenido/a: {prof[0]}
               </Breadcrumb.Item>
               <Breadcrumb.Item active >
                 <button onClick={this.onLoggOff.bind(this)} className="btnLogoff btn btn-info" title="Cerrar Sesión " type="button" >
                   <span><i className="fa fa-sign-out" aria-hidden="true"></i> Log Off</span>
                 </button>
               </Breadcrumb.Item>
             </div>

          </Breadcrumb>

        </div>

        <div className="factigisBO_table">
          <FG_GridPerZone title={"Medidores"} data={this.state.myData}  callbackParent={this.onChildChanged.bind(this)}/>
        </div>

        <div className="wrapper_mid">
          <div className="wrapper_mid-left">
            <div>
              <h1 className="factigis_bo1-h1">Datos Factibilidad > Folio: <b className="factigis_bo1-b">{this.state.facB_folio}</b></h1>
            </div>
            <div className="wrapper_mid-split">
              <div className="wrapper_mid-split-1">
                <h6 className="factigis_bo1-h6"><b>Datos de Cliente</b></h6>
                <h8 className="">Rut: {this.state.facB_rut}</h8>
                <h8 className="">Nombre Cliente: {this.state.facB_nombre}  </h8>
                <h8 className="">Apellido: {this.state.facB_apellido}</h8>
                <h8 className="">Dirección: {this.state.facB_direccion}</h8>
                <h8 className="">Telefono: {this.state.facB_telefono}</h8>
                <h8 className="">Email: {this.state.facB_email}</h8>
                <h8 className="">Tipo Cliente: {this.state.facB_tipoCliente}</h8>
                <h8 className="">Tipo Contribuyente: {this.state.facB_tipoContribuyente}</h8>
                <h6 className="factigis_bo1-h6"><b>Factibilidad: </b></h6>
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
                <h6 className="factigis_bo1-h6"><b>Datos de Red</b></h6>
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
                <h1 className="factigis_bo1-h1">Zonas Factibilidad</h1>
              </div>
              <div className="factigis_bo1_wrapper-zonas">
                <div><h8 className="factigis_bo1_zonas">Concesión: <b>{this.state.facB_concesion}</b></h8></div>
                <div><h8 className="factigis_bo1_zonas">Restringida: <b>{this.state.facB_restringida}</b></h8></div>
                <div><h8 className="factigis_bo1_zonas">Vialidad: <b>{this.state.facB_vialidad}</b></h8></div>
                <div><h8 className="factigis_bo1_zonas">Campamentos: <b>{this.state.facB_campamento}</b></h8></div>
                <div><h8 className="factigis_bo1_zonas">Transmisión: <b>{this.state.facB_transmision}</b></h8></div>
              </div>
            </div>

          </div>
          <div className="factigisBO_wrapper_mid-right">
            <div><h1 className="factigis_bo1-h1">Mapa - Ubicación</h1></div>
            <LayerList show={["check_factigis_transmision", "check_factigis_distribucion", "check_factigis_vialidad", "check_campamentos", "check_chqbasemap",
            "check_subestaciones","check_MT","check_BT"]} />
            <div id="factigis_bo1_map" className="factigis_bo1_map">
              <div id="BMToggle"></div>
            </div>

            <div>
              <h1 className="factigis_bo1-h1 factigis_h1_edited">Cambiar Atributos > Folio: {this.state.facB_folio}</h1>
              <div className="factigis_rows">
                <div className="factigis_row1">
                  <div><h8 className="factigis_bo1-h6">Punto Conexión: <b></b></h8></div>
                  <div>
                    <input id="factigis_txtRotulo" disabled={true} className="factigis_bo_txt" type="text" placeholder="Seleccione rótulo" value={this.state.rotuloFinal}  />
                    <button disabled={this.state.btnGuardarState} onClick={this.onClickPuntoConexion.bind(this)} className="fact_bo_poste btn btn-default" title="Selección de Rótulo " type="button">
                      <span><i className="fa fa-map-signs"></i></span>
                    </button>
                  </div>
                </div>
                <div className="factigis_row2">
                  <div><h8>Fases de Conexión:</h8></div>
                  <div><Select className="ddlTipoCliente factigis_tipoCliente" name="form-field-name" options={this.state.fases} value={this.state.faseSelected} onChange={this.onChangeFase.bind(this)}
                    simpleValue clearable={true} searchable={false} placeholder="Seleccione las fases de conexión"/>
                  </div>
                </div>
                <div className="factigis_row3">
                  <button onClick={this.onClickGuardarAtributos.bind(this)} disabled={this.state.btnGuardarState} className="factigis_bo_btnModified btn btn-info" title="Selección de Rótulo " type="button" >
                    <span><i className="fa fa-floppy-o"></i> Guardar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="factigisBO_wrapper_bot">
          <div className="wrapper_bot_title">
            <h1 className="factigis_bo1-h1 factigis_h1_edited">Cambiar Estado</h1>
          </div>
          <div className="wrapper_bot_content">
            <h8 className="factigis_bo1-h8">Observaciones:</h8>

            <input id="factigis_txtObservaciones" maxLength="100" className="marginRight05" value={this.state.facb_observaciones} onChange={this.onChangeObs.bind(this)} title="Observaciones" type="text" placeholder="Escriba su observación" />
            <Select id="ddlEstadoFactibilidad" className="factigis_bo1_cbEstado marginRight05" onChange={this.onChange.bind(this)} options={this.state.opcionesEstado}
            simpleValue clearable={true} searchable={false} value={this.state.cbEstadoValue} placeholder="Seleccione Estado Trámite"/>
            <Select id="ddlTipoMejoraFactibilidad" className="factigis_bo1_cbEstado marginRight05" onChange={this.onChange2.bind(this)} options={this.state.opcionesMejora}
            simpleValue clearable={true} searchable={false} value={this.state.cbMejoraValue} placeholder="Seleccione Tipo Mejora"/>
            <button className="factigis_submitButton btn btn-success" onClick={this.onClick.bind(this)} title="Modificar Estado Factibilidad " type="button" >

              <span><i className="fa fa-pencil"></i>  Modificar Factibilidad</span>

            </button>
          </div>

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

export default FactigisBackOffice;
