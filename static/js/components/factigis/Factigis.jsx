import React from 'react';
import ReactDOM from 'react-dom';
import Factigis_Add from '../factigis/Factigis_Add.jsx';
import mymap from '../../services/map-service';
import {addCertainLayer} from '../../services/layers-service';
import LayerList from '../../components/LayerList.jsx';
import layers from '../../services/layers-service';
import FModal from '../factigis/Factigis_Modal.jsx';
import cookieHandler from 'cookie-handler';
import BasemapToggle from "esri/dijit/BasemapToggle";
import {Navbar, Nav, NavItem, NavDropdown, DropdownButton,FormGroup,FormControl,Button, MenuItem,Breadcrumb, CollapsibleNav} from 'react-bootstrap';
import Search from 'esri/dijit/Search';
import {saveGisredLogin, getFormatedDate} from '../../services/login-service';
import {factigisLoginVentaWeb, getUserPermission, getProfile} from '../../services/factigis_services/parameters';
import Modal from 'react-modal';
import ReactTabs from 'react-tabs';
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

var customStyles = {
  content : {
    top                   : '120%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '80%'
  }
};

class Factigis extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      themap: {},
      permissions: [],
      openAyuda: false,
      problemsforAyuda: '',
      btnModalCloseStatus: false,
      customStyles: customStyles,
      selectedTab: 0
    };

  }

  componentWillMount(){
    this.setState({permissions: ['CREAR_FACTIBILIDAD','CREAR_DIRECCION']});
  }

  componentDidMount(){
    factigisLoginVentaWeb('vialactea\\ehernanr',"Chilquinta8",(cb)=>{
      /*if(!cookieHandler.get('usrprmssns')){
        window.location.href = "index.html";
        return;
      }
      */
      var mapp = mymap.createMap("factigis_map_div","topo",-71.2905 ,-33.1009,9);
      this.setState({themap: mapp});

      //Add layer for old addresses
      var layerDirecciones = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_direccionesDyn(),{id:"factigis_direcciones"});
      layerDirecciones.setImageFormat("png32");
      layerDirecciones.setVisibleLayers([0]);

      mapp.addLayer(layerDirecciones);

      // add layer for new ones
      var layerDireccionesNew = new esri.layers.ArcGISDynamicMapServiceLayer(layers.read_direccionesNuevasMobile(),{id:"factigis_direccionesNew", minScale: 15000});
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
      mapp.addLayer(layerRotulos,2);

      var toggle = new BasemapToggle({
        map: mapp,
        basemap: "hybrid"
      }, "BasemapToggle");
      toggle.startup();

      var search = new Search({
        map: mapp
        }, "search");
      search.startup();

      const page = "REACT_FACTIGIS_DESA";
      const module = "FACTIGIS_CREAR_FACTIBILIDAD";
      const date = getFormatedDate();
      const user = cookieHandler.get('usrprfl')
      const myToken = cookieHandler.get('tkn');

    });
  }

  onAyuda(){
     this.setState({problemsforAyuda: 'Seleccione un paso para ver su ayuda:'});
     this.openModal();
  }

  handleSelect(index, last){
    console.log(index);
    switch (index) {
      case 0:
        var customStyles = {
          content : {
            top                   : '120%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            width                 : '80%'
          }
        };
        this.setState({customStyles: customStyles});
      break;

      case 1:
        var customStyles = {
          content : {
            top                   : '120%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            width                 : '80%'
          }
        };
        this.setState({customStyles: customStyles});
      break;

      case 2:
        var customStyles = {
          content : {
            top                   : '85%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            width                 : '80%'
          }
        };
        this.setState({customStyles: customStyles});
      break;

      case 3:
        var customStyles = {
          content : {
            top                   : '160%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            width                 : '80%'
          }
        };
        this.setState({customStyles: customStyles});
        break;

      default:

    }
    this.setState({
      selectedTab: index,
    });
  }

  openModal () { this.setState({openAyuda: true}); }

  closeModal () { this.setState({openAyuda: false}); }


  render(){
  /*  let whoLogged = cookieHandler.get('usrprfl');
    whoLogged = whoLogged.NOMBRE_COMPLETO.split(" ");
*/
    const factigisRender =
          <div className="wrapper_factigis">
            <div className="wrapper_factibilidadTop">
              <Breadcrumb className="dashboard_breadcrum">
                <Breadcrumb.Item active>
                  Crear Factibilidad
                </Breadcrumb.Item>
                <div className="factigis_top-right">
                  <Breadcrumb.Item active className="factigis_search">
                    <div id="search"></div>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active className="factigis_whologged">
                  <button onClick={this.onAyuda.bind(this)} className="btnLogoff btn btn-info" title="Ayuda " type="button" >
                     Ayuda <span><i className="fa fa-question-circle" aria-hidden="true"></i></span>
                  </button>
                  </Breadcrumb.Item>

                </div>
              </Breadcrumb>
            </div>
            <div className="wrapper_factibilidadContent">
              <div className="wrapper_factibilidadLeft">
                <Factigis_Add themap={this.state.themap} permissions={this.state.permissions}/>
              </div>
              <div className="wrapper_factibilidadRight">
                <LayerList show={["check_factigis_transmision", "check_factigis_distribucion", "check_factigis_vialidad", "check_campamentos", "check_chqbasemap",
                "check_subestaciones","check_MT","check_BT"]} />
                <div className="factigis_map_div" id="factigis_map_div">
                  <div id="BasemapToggle" ></div>
                </div>
              </div>
            </div>
            <Modal isOpen={this.state.openAyuda} style={this.state.customStyles}>
              <div className="help_title"><h2 className="factigis_h2">Ayuda  - Factibilidad {this.state.numeroFactibilidad}</h2>
              <p>{this.state.problemsforAyuda}</p>
              </div>
              <br />
              <Tabs onSelect={this.handleSelect.bind(this)} selectedIndex={this.state.selectedTab}>
                <TabList>
                  <Tab>Paso 1</Tab>
                  <Tab>Paso 2</Tab>
                  <Tab>Paso 3</Tab>
                  <Tab>Paso 4</Tab>
                  <Tab>Crear Dirección</Tab>
                </TabList>
                <TabPanel>
                  <div className="Div1_help">
                    <h2>Buscar su dirección en el mapa.</h2>
                    <hr />
                    <ol>
                      <li><b>Busque su dirección en el mapa haciendo zoom hasta ver las calles y los números de las casas. (Ver Figura 1). </b></li>
                        <div className="help_paso1">Figura 1: <img className="help_figuras help_p1_especial" src="dist\css\images\images_ventaEmpalmes\p1f1.png"></img></div>
                      <li><b>Active el botón <span><i className="fa fa-home"></i></span> y seleccione la dirección (nueva o en sistema) haciendo clic sobre ella en el mapa. (Ver Figura 2) </b> </li>
                        <div className="help_paso1">Figura 2: <img className="help_figuras help_p1f2" src="dist\css\images\images_ventaEmpalmes\p1f2.png"></img></div>
                      <li><b>Al seleccionar una dirección, ésta aparecerá escrita en el campo de texto del paso 1 automáticamente (Ver figura 3).  Luego de esto se procede al paso 2.</b></li>
                        <div className="help_paso1">Figura 3: <img className="help_figuras help_p1f2" src="dist\css\images\images_ventaEmpalmes\p1f3.png"></img></div>
                    </ol>
                  </div>
                </TabPanel>
                 <TabPanel>
                  <h2>Seleccionar el poste cercano</h2>
                  <hr />
                  <ol>
                    <li><b>Active el botón <span><i className="fa fa-map-signs"></i></span> y seleccione el poste aéreo o cámara subterránea más cercano a la dirección que ha elegido, haciendo clic sobre uno de ellos en el mapa. (Ver Figura 4). </b></li>
                      <div className="help_paso1">Figura 4: <img className="help_figuras" src="dist\css\images\images_ventaEmpalmes\p2f4.png"></img></div>
                    <li><b>Al seleccionar un poste o cámara, aparecerá una marca de color verde, además se escribirá el rótulo en el campo de texto del paso 2. Luego proceda con el paso 3. (Ver figura 5)</b> </li>
                      <div className="help_paso1">Figura 5: <img className="help_figuras help_p1f2" src="dist\css\images\images_ventaEmpalmes\p2f5.png"></img></div>
                  </ol>
                    <hr />
                </TabPanel>
                <TabPanel>
                  <h2>Nivel de Tensión</h2>
                    <hr />
                    <ol>
                      <li><b>Seleccione el nivel de tensión que desea contratar. (Ver Figura 6). Una vez seleccionado siga con el paso 4. </b></li>
                        <div className="help_paso1">Figura 6: <img className="help_figuras" src="dist\css\images\images_ventaEmpalmes\p2f6.png"></img></div>
                    </ol>
                </TabPanel>
                <TabPanel>
                  <h2>Seleccionar ubicación del medidor y rellenar datos de empalme</h2>
                    <hr />
                    <ol>
                      <li><b>Active el botón   <span><i className="fa fa-map-marker"></i></span> y seleccione la ubicación de su medidor en el mapa haciendo zoom hasta ver las calles y los números de las casas. (Ver Figura 7). </b></li>
                        <div className="help_paso1">Figura 7: <img className="help_figuras" src="dist\css\images\images_ventaEmpalmes\p4f7.png"></img></div>
                      <li><b>Una vez seleccionada la ubicación del medidor, aparecerá un punto azul unido a dos líneas que dibujarán su empalme pedido. (Ver Figura 8). Además se cambiará el texto de "ESPERANDO PUNTO DE UBICACIÓN..." a "MEDIDOR UBICADO". En caso contrario se recomienda repetir el paso o limpiar el formulario.</b> </li>
                        <div className="help_paso1">Figura 8: <img className="help_figuras " src="dist\css\images\images_ventaEmpalmes\p4f8.png"></img></div>
                      <li><b>Tras haber seleccionado la ubicación del medidor, siga con los demás datos como, empalme, fase, potencia y si su empalme es definitivo o provisorio. (Ver ejemplo Figura 9)</b></li>
                        <div className="help_paso1">Figura 9: <img className="help_figuras " src="dist\css\images\images_ventaEmpalmes\p4f9.png"></img></div>
                      <li><b>Tras tener todos los datos correctamente ingresados, presione el botón + Agregar, ubicado en la parte posterior del formulario. (Ver ejemplo Figura 10)</b></li>
                        <div className="help_paso1">Figura 10: <img className="help_figuras" src="dist\css\images\images_ventaEmpalmes\p4f10.png"></img></div>
                    </ol>
                </TabPanel>
                <TabPanel>
                  <h2>Crear su dirección en el mapa.</h2>
                     <hr />
                     <ol>
                       <li><b>Vaya a la pestaña de creación de direcciones <i className="fa fa-plus"></i> <i className="fa fa-home" aria-hidden="true"></i>  (Ver Figura 4). </b></li>
                         <div className="help_paso1">Figura 1: <img className="help_figuras" src="dist\css\images\images_ventaEmpalmes\p1f1.png"></img></div>
                       <li><b>Active el botón <span><i className="fa fa-home"></i></span> y seleccione la dirección (nueva o en sistema) haciendo clic sobre ella en el mapa. (Ver Figura 2) </b> </li>
                         <div className="help_paso1">Figura 2: <img className="help_figuras " src="dist\css\images\images_ventaEmpalmes\p1f2.png"></img></div>
                       <li><b>Al seleccionar una dirección, ésta aparecerá escrita en el campo de texto del paso 1 automáticamente (Ver figura 3).  Luego de esto se procede al paso 2.</b></li>
                         <div className="help_paso1">Figura 3: <img className="help_figuras " src="dist\css\images\images_ventaEmpalmes\p1f3.png"></img></div>
                     </ol>
                </TabPanel>
               </Tabs>
              <button disabled={this.state.btnModalCloseStatus} className="factigis_submitButton btn btn-info" onClick={this.closeModal.bind(this)}>Close</button>
            </Modal>
          </div>


      return (
        <div className="factigis_f">{factigisRender}</div>
      );



  }
}

export default Factigis;
