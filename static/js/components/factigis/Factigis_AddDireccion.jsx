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

class Factigis_AddDireccion extends React.Component {
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

      factigis_geoCalle: '',
      factigis_geoUbicacionCasa: '',
      //save buton handler
      btnCalle: '',
      btnUbicacionCasa: '',

      //save states from controls when user switch tabs
      factigisCalle: '',

      factigisNumeroCalle: '',
      factigisAnexo1: '',
      factigisAnexo2: '',
      factigisTipoEdificacion: [],
      factigis_objectidCalle: ''
    }
    this.onClickCalle = this.onClickCalle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClickAgregarNuevaDireccion = this.onClickAgregarNuevaDireccion.bind(this);
  }

  componentWillMount(){
    this.setState({
      factigisTipoEdificacion: tipoEdificacion,
      factigis_selectedValueEdificacion: ''
    });
  }

  onClickUbicacionCasa(){
    $("#iframeloadingDir").show();
    var mapp = this.props.themap;
    var addDistribucionLayer = setLayers().gis_chqbasemap();
    document.getElementById('check_chqbasemap').checked=true;
    mapp.addLayer(addDistribucionLayer,1);

    if(this.state.toggleCalle=='ON'){
        this.setState({toggleCalle: 'OFF'});
        $('.factigis_btnSelectCalle').css('color',"black");
          dojo.disconnect(this.state.btnCalle);
    }
    if (this.state.toggleUbicacionCasa =='OFF'){
      this.setState({toggleUbicacionCasa: 'ON'});
      $('.factigis_btnSelectUbicacionCasa').css('color',"crimson");

      var map_click_handle = dojo.connect(mapp, 'onClick', (g)=>{
        //saves geometry point for customer.
        this.setState({factigis_geoUbicacionCasa: g.mapPoint});

        //draw customer location on the map.
        mapp.graphics.clear();
        let pointSymbol = makeSymbol.makePointCustomer();
        mapp.graphics.add(new esri.Graphic(g.mapPoint,pointSymbol));
        $("#iframeloadingDir").hide();
      });
      this.setState({btnUbicacionCasa: map_click_handle});

    }else{
      this.setState({toggleUbicacionCasa: 'OFF'});
      $('.factigis_btnSelectUbicacionCasa').css('color',"black");
      dojo.disconnect(this.state.btnUbicacionCasa);
      console.log("this is my saved point for ubicacion casa", this.state.factigis_geoUbicacionCasa);
       $("#iframeloadingDir").hide();
    }
  }

  onClickCalle(){
    $("#iframeloadingDir").show();
    var mapp = this.props.themap;
    //clean graphics on layer
    //  LayerList.onClick('check_chqbasemap');
    //  var x = new LayerList(["check_factigis_transmision", "check_factigis_distribucion", "check_factigis_vialidad", "check_campamentos", "check_chqbasemap"]);
    //  x.onShow('check_chqbasemap');
    //    console.log("my layerlist",x);

    var addDistribucionLayer = setLayers().gis_chqbasemap();
    document.getElementById('check_chqbasemap').checked=true;
    mapp.addLayer(addDistribucionLayer,1);

      if(this.state.toggleUbicacionCasa=='ON'){
        this.setState({toggleUbicacionCasa: 'OFF'});
        $('.factigis_btnSelectUbicacionCasa').css('color',"black");
        dojo.disconnect(this.state.btnUbicacionCasa);
      }

      if (this.state.toggleCalle =='OFF'){
        this.setState({toggleCalle: 'ON'});
        $('.factigis_btnSelectCalle').css('color',"crimson");

        var map_click_handle = dojo.connect(mapp, 'onClick', (g)=>{
          //saves geometry point for customer.
          factigis_findCalle(g.mapPoint, (featureSetFeatures)=>{
            this.setState({factigis_geoCalle: g.mapPoint});
            if(!featureSetFeatures.length){
              console.log("No se ha podido encontrar la calle, seleccione de nuevo");
              return;
            }
            this.setState({
              factigisCalle: featureSetFeatures[0].attributes['nombre'],
              factigis_objectidCalle: featureSetFeatures[0].attributes['OBJECTID']
            });
            $("#iframeloadingDir").hide();
          });
        });
        this.setState({btnCalle: map_click_handle});

      }else{
        this.setState({toggleCalle: 'OFF'});
        $('.factigis_btnSelectCalle').css('color',"black");
        dojo.disconnect(this.state.btnCalle);
        console.log("this is my saved point for CALLE", this.state.factigis_geoCalle);
        $("#iframeloadingDir").hide();
      }
  }

  onChange(event){
    switch (event.currentTarget.id) {
      case 'factigis_txtCalle':
          this.setState({factigisCalle: event.currentTarget.value});
          console.log('calle', event.currentTarget.value);
      break;
      case 'factigis_txtAnexo1':
          this.setState({factigisAnexo1: event.currentTarget.value});
          console.log('anexo1', event.currentTarget.value);
      break;
      case 'factigis_txtAnexo2':
          this.setState({factigisAnexo2: event.currentTarget.value});
          console.log('anexo2', event.currentTarget.value);
      break;
      case 'factigis_txtNumeroCalle':
          this.setState({factigisNumeroCalle: event.currentTarget.value});
          console.log('numero calle', event.currentTarget.value);
      break;
      default:
    }
  }

  onChangeTipoEdificacion(e){
    this.setState({factigis_selectedValueEdificacion: e});
    console.log("valor de tipo edificacion: ", e);
  }

  onClickAgregarNuevaDireccion(){
    $("#iframeloadingDir").show();
    let objNewAddress = {
      CALLE: this.state.factigisCalle,
      NUMERO : this.state.factigisNumeroCalle ,
      ANEXO1 : this.state.factigisAnexo1,
      ANEXO2 : this.state.factigisAnexo2,
      TIPO_EDIFICACION : this.state.factigis_selectedValueEdificacion,
      X: this.state.factigis_geoUbicacionCasa.x,
      Y: this.state.factigis_geoUbicacionCasa.y
    }

    let objGeometry = {
      geoUbicacionCasa: this.state.factigis_geoUbicacionCasa
    }
    factigis_addNuevaDireccion(objNewAddress, objGeometry, (callback)=>{
      if(callback){

        var mapp = this.props.themap;
        mapp.graphics.clear();

        //clean fields.
        this.setState({
          factigisCalle: '',
          factigisNumeroCalle: '',
          factigisAnexo1: '',
          factigisAnexo2: '',
          factigis_selectedValueEdificacion: '',
          factigis_objectidCalle: '',
          factigis_geoCalle: '',
          factigis_geoUbicacionCasa: '',
          toggleCalle: 'OFF',
          toggleUbicacionCasa: 'OFF',
          //save buton handler
          btnCalle: '',
          btnUbicacionCasa: ''
        });

        dojo.disconnect(this.state.btnCalle);
        dojo.disconnect(this.state.btnUbicacionCasa);
        $('.factigis_btnSelectCalle').css('color',"black");
        $('.factigis_btnSelectUbicacionCasa').css('color',"black");
        $("#iframeloadingDir").hide();
        this.setState({open: true, problemsforAdding: 'Nueva Dirección agregada'});
        console.log("Address Added.");
        return;
      }
        this.setState({open: true, problemsforAdding: 'Error al agregar dirección, intente nuevamente y revise los campos.'});
        console.log("Address not added.");
        $("#iframeloadingDir").hide();
    });
  }
  openModal () { this.setState({open: true}); }

  closeModal () { this.setState({open: false}); }

  render(){
    return (
      <div className="factigis_addDireccion-wrapper">
      <div className="factigisDir_searchTitle">
        <h7><b>Datos de Dirección</b></h7>
        <img className="factigisDir_imgLoader" src="dist/css/images/ajax-loader.gif" alt="loading" id="iframeloadingDir"/>
      </div>
        <hr className="factigis_hr-subtitle factigis_hr"/>
        <div className="factigis_BigGroupbox">
          <h8>*Calle:</h8>
          <div className="factigis_groupbox">
            <input id="factigis_txtCalle" className="factigis-input" onChange={this.onChange} value={this.state.factigisCalle} title="Indique el nombre de la calle" type="text" placeholder="Seleccione el nombre de la calle"  />

            <button onClick={this.onClickCalle} className="factigis-selectFromMapButton factigis_btnSelectCalle btn btn-default" title="Ir " type="button" >
              <span><i className="fa fa-road"></i></span>
            </button>
            <button onClick={this.onClickUbicacionCasa.bind(this)} className="factigis-selectFromMapButton factigis_btnSelectUbicacionCasa  btn btn-default" title="Ir " type="button" >
              <span><i className="fa fa-map-marker"></i></span>
            </button>
            <h8 className="factigis__toggleBtnLabel">{this.state.toggleCalle}</h8>
          </div>

          <div className="factigis_groupbox">
            <div className="factigis_group factigis_addressGroup">
              <h8>*Número:</h8>
              <input id="factigis_txtNumeroCalle" onChange={this.onChange} value={this.state.factigisNumeroCalle}   className="factigis-input factigis_input-solo" title="Escriba el número de la calle" type="text" placeholder="Número de la calle"  />

              <h8>*Anexo 1:</h8>
              <input id="factigis_txtAnexo1" onChange={this.onChange} value={this.state.factigisAnexo1} className="factigis-input factigis_input-solo" title="Escriba alguna descripción del lugar" type="text" placeholder="Escriba alguna descripción del lugar"  />
            </div>
          </div>

          <div className="factigis_groupbox">
            <div className="factigis_group factigis_addressGroup">
              <h8>Anexo 2:</h8>
              <input id="factigis_txtAnexo2" onChange={this.onChange} value={this.state.factigisAnexo2}  className="factigis-input factigis_input-solo" title="Escriba alguna descripción del lugar" type="text" placeholder="Escriba alguna descripción del lugar"  />
            </div>
          </div>
          <div className="factigis_groupbox">
            <div className="factigis_group factigis_addressGroup">
              <h8>*Tipo Edificación:</h8>
              <Select options={this.state.factigisTipoEdificacion} className="factigis_selectInput" name="form-field-name"  onChange={this.onChangeTipoEdificacion.bind(this)}
                value={this.state.factigis_selectedValueEdificacion} simpleValue clearable={true} searchable={false} placeholder="Seleccione el tipo de cliente"/>
            </div>
          </div>

          <hr className="factigis_hr"/>
            <p className="factigis_p obligatorio">* Campos obligatorios</p>
          <button className="factigis_submitButton btn btn-success" title="Ir " type="button" onClick={this.onClickAgregarNuevaDireccion} >
                <span><i className="fa fa-plus"></i> Agregar Dirección</span>
          </button>
          <Modal isOpen={this.state.open} style={customStyles}>
            <h2 className="factigis_h2">Agregar nueva dirección</h2>
            <p>{this.state.problemsforAdding}</p>
            <br />
            <button className="factigis_submitButton btn btn-info" onClick={this.closeModal.bind(this)}>Close</button>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Factigis_AddDireccion;
