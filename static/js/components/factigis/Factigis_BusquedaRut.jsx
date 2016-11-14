import React from 'react';
import ReactDOM from 'react-dom';
import ReactTabs from 'react-tabs';
import Select from 'react-select';
import {tipoEdificacion, tipoCliente, tipoContribuyente, tipoEmpalme, tipoMonoTri, tipoEmpalmeBTMT, tipoPotencia} from '../../services/factigis_services/cbData-service';
import {mymap} from '../../services/map-service';
import {factigis_validator} from '../../services/factigis_services/factigis_validator-service';
import makeSymbol from '../../utils/makeSymbol';
import layers from '../../services/layers-service';
import {layersActivated, setLayers} from '../../services/layers-service';
import {factigis_findCalle} from '../../services/factigis_services/factigis_find-service';
import {factigis_addNuevaDireccion} from '../../services/factigis_services/factigis_add-service';
import LayerList from  '../../components/LayerList.jsx';
import Modal from 'react-modal';
import {factigis_searchFolioByRut} from '../../services/factigis_services/factigis_find-service';
import FG_GridFolios from './Factigis_GridFolios.jsx';
import Rut from 'rutjs';
import formatDate from '../../utils/milliSecondsToDate';
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    zIndex                : 50
  }
};

class Factigis_BusquedaRut extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //passed as parameter from the parent component (factigisAdd), and saves the current map
      themap: this.props.themap,
      open: false,
      problemsforAdding: '',
      factigisRut: '',
      factigisRutValidator: false,
      myDataFolios: []
    }
  }

  componentWillMount(){
    this.setState({
      factigisTipoEdificacion: tipoEdificacion,
      factigis_selectedValueEdificacion: ''
    });
  }

  onChangeRut(e){
    this.setState({factigisRut: e.currentTarget.value});
  }

  onClickSearchRut(){
    var rut = new Rut(this.state.factigisRut);
    if (rut.isValid){
      console.log("rut valido", rut.getNiceRut(false));
      this.setState({
        factigisRut: rut.getNiceRut(false),
        factigisRutValidator: true
      });
      factigis_searchFolioByRut(rut.getNiceRut(false), (callback)=>{
      
        let folios = callback.map(folio=>{
          //console.log(estado.attributes);
          let thefolio = {
            'Folio':  folio.attributes["OBJECTID"],
            'Nombre': folio.attributes['Nombre'],
            'Dirección':  folio.attributes["Direccion"] + ", "+ folio.attributes["Comuna"],
            'Fecha Creación': formatDate(folio.attributes["created_date"])
          }
          return thefolio;
        });
        this.setState({myDataFolios: folios});
      });

    }else{
      console.log("rut invalido");
      this.setState({factigisRutValidator: false, open:true, problemsforAdding: 'Ingrese un RUT válido.'});
      //here put the color red to the field for wrong validation.
    }


  }

  openModal () { this.setState({open: true}); }

  closeModal () { this.setState({open: false}); }

  render(){
    return (
      <div className="factigis_addDireccion-wrapper">
      <div className="factigisDir_searchTitle">
        <h7><b>Ingrese RUT a buscar</b></h7>
        <img className="factigisDir_imgLoader" src="dist/css/images/ajax-loader.gif" alt="loading" id="iframeloadingDir"/>
      </div>
        <hr className="factigis_hr-subtitle factigis_hr"/>
        <div className="factigis_BigGroupbox">
          <h8>*Rut:</h8>
          <div className="factigis_groupbox">
            <input id="factigis_txtRut" className="factigis-input" onChange={this.onChangeRut.bind(this)} value={this.state.factigisRut} title="Ingrese el rut del cliente" type="text" placeholder="Ingrese el rut del cliente"  />
            <button onClick={this.onClickSearchRut.bind(this)} className="factigis-selectFromMapButton factigis_btnSelectCalle btn btn-default" title="Ir " type="button" >
              <span><i className="fa fa-search"></i></span>
            </button>

          </div>
          <hr />
          <div className="factigis_groupbox">
            <FG_GridFolios title={"Folios"} data={this.state.myDataFolios} />
          </div>

          <Modal isOpen={this.state.open} style={customStyles}>
            <h2 className="factigis_h2">Búsqueda por Rut</h2>
            <p>{this.state.problemsforAdding}</p>
            <br />
            <button className="factigis_submitButton btn btn-info" onClick={this.closeModal.bind(this)}>Close</button>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Factigis_BusquedaRut;
