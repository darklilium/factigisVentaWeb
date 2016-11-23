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
    top                   : '115%',
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
    var url = "http://gisred.chilquinta/factigisVentaWeb2/ayuda/ayuda.html"
    window.open(url, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");

  }

  handleSelect(index, last){

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

          </div>


      return (
        <div className="factigis_f">{factigisRender}</div>
      );



  }
}

export default Factigis;
