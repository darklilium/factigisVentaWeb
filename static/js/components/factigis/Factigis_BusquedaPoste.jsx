import React from 'react';
import ReactDOM from 'react-dom';
import ReactTabs from 'react-tabs';
import Select from 'react-select';
import {tipoElementoRotulo} from '../../services/factigis_services/cbData-service';
import {mymap} from '../../services/map-service';
import {factigis_validator} from '../../services/factigis_services/factigis_validator-service';
import makeSymbol from '../../utils/makeSymbol';
import layers from '../../services/layers-service';
import {layersActivated, setLayers} from '../../services/layers-service';
import {factigis_findRotuloByNumber} from '../../services/factigis_services/factigis_find-service';
import LayerList from  '../../components/LayerList.jsx';
import Modal from 'react-modal';


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

class Factigis_BusquedaPoste extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //passed as parameter from the parent component (factigisAdd), and saves the current map
      themap: this.props.themap,
      open: false,
      problemsforAdding: '',
      //toggle button
      toggleCalle: 'OFF',
      toggleUbicacionCasa: 'OFF',

      factigisTipoRotulo: [],
      factigis_selectedTipoRotulo: ''
    }

  }

  componentWillMount(){
    this.setState({
      factigisTipoRotulo: tipoElementoRotulo,
      factigis_selectedValueRotulo: ''
    });
  }

  onChangeRotulo(e){this.setState({factigisRotulo: e.currentTarget.value});}

  onChangeTipoRotulo(e){this.setState({factigis_selectedTipoRotulo: e})}

  onClickBuscarRotulo(){
    let mapp = this.state.themap;
    mapp.graphics.clear();
    $("#iframeloadingPoste").show();
    let tipo = this.state.factigis_selectedTipoRotulo;

    if(tipo=='POSTE'){
      //es poste
      factigis_findRotuloByNumber(this.state.factigisRotulo, 'ele!poste', (cb)=>{
        if(!cb.length){
          this.setState({open: true, problemsforAdding: 'No se ha encontrado rótulo con ese número, intente nuevamente.'});
          $("#iframeloadingPoste").hide();
          return;
        }
        let pointSymbol = makeSymbol.makePoint();
        mapp.graphics.add(new esri.Graphic(cb[0]['geometry'],pointSymbol));
        mapp.centerAndZoom(cb[0]['geometry'],20);
        $("#iframeloadingPoste").hide();
       });
    }else {
      //es camara
      factigis_findRotuloByNumber(this.state.factigisRotulo, 'ele!camara', (cb)=>{
        if(!cb.length){
          this.setState({open: true, problemsforAdding: 'No se ha encontrado rótulo con ese número, intente nuevamente.'});
          $("#iframeloadingPoste").hide();
          return;
        }
        let pointSymbol = makeSymbol.makePoint();
        mapp.graphics.add(new esri.Graphic(cb[0]['geometry'],pointSymbol));
        mapp.centerAndZoom(cb[0]['geometry'],20);
        $("#iframeloadingPoste").hide();
      });
    }

  }

  openModal () { this.setState({open: true}); }

  closeModal () { this.setState({open: false}); }

  onClickLimpiarUbicacion(){
    var mapp = this.state.themap;
    this.setState({  factigisTipoRotulo: tipoElementoRotulo, factigisRotulo: '', factigis_selectedTipoRotulo: ''});
    mapp.graphics.clear();
  }

  render(){
    return (
      <div className="factigis_addDireccion-wrapper">
      <div className="factigisDir_searchTitle">
        <h7><b>Búsqueda de Poste</b></h7>
        <img className="factigisBF_imgLoader" src="dist/css/images/ajax-loader.gif" alt="loading" id="iframeloadingPoste"/>
      </div>
        <hr className="factigis_hr-subtitle factigis_hr"/>
        <div className="factigis_BigGroupbox">
          <h8>*Seleccione rótulo o cámara:</h8>
          <div className="factigis_groupbox">
              <Select options={this.state.factigisTipoRotulo} className="factigis_selectInput" name="form-field-name"  onChange={this.onChangeTipoRotulo.bind(this)}
                value={this.state.factigis_selectedTipoRotulo} simpleValue clearable={true} searchable={false} placeholder="Seleccione el tipo de elemento"/>
          </div>

          <div className="factigis_groupbox">
            <div className="factigis_group factigis_addressGroup">
              <h8>*Rótulo N°:</h8>
              <input id="factigis_txtNumeroCalle" onChange={this.onChangeRotulo.bind(this)} value={this.state.factigisRotulo} className="factigis-input factigis_input-solo" title="Escriba el n° de rotulo" type="text" placeholder="Número de la calle"  />
            </div>
          </div>

          <hr className="factigis_hr"/>
            <p className="factigis_p obligatorio">* Campos obligatorios</p>
          <div className="factigis_groupboxBtn">
            <button className="factigis_submitButton btn btn-success" title="Limpiar Ubicación " type="button" onClick={this.onClickLimpiarUbicacion.bind(this)} >
                    <span><i className="fa fa-eraser"></i> Limpiar Ubicación</span>
            </button>
            <button className="factigis_submitButton btn btn-success" title="Buscar Rótulo " type="button" onClick={this.onClickBuscarRotulo.bind(this)} >
                  <span><i className="fa fa-search"></i> Buscar</span>
            </button>
          </div>
          <Modal isOpen={this.state.open} style={customStyles}>
            <h2 className="factigis_h2">Búsqueda de Rótulo</h2>
            <p>{this.state.problemsforAdding}</p>
            <br />
            <button className="factigis_submitButton btn btn-info" onClick={this.closeModal.bind(this)}>Close</button>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Factigis_BusquedaPoste;
