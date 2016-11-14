import React from 'react';
import Griddle from 'griddle-react';
import mymap from '../../../js/services/map-service';
import layers from '../../../js/services/layers-service';
import makeSymbol from '../../utils/makeSymbol';
import FactigisBackOffice from '../factigis/FactigisBackOffice.jsx';
import {find_folioData} from '../../services/factigis_services/factigis_loadBackofficeData.js';
import _ from 'lodash';

var HeaderComponent = React.createClass({
  textOnClick: function(e) {
    e.stopPropagation();
  },

  filterText: function(e) {
    this.props.filterByColumn(e.target.value, this.props.columnName)
  },

  render: function(){
    return (
      <span>
        <div><strong style={{color: this.props.color}}>{this.props.displayName}</strong></div>
        <input type='text' onChange={this.filterText} onClick={this.textOnClick} />
      </span>
    );
  }
});


class FG_GridPerZoneH extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    var columnMeta = [
        {
        "columnName": "ID Factibilidad",
        "customHeaderComponent": HeaderComponent,
        "customHeaderComponentProps": { color: '#da291c' }
        },
        {
        "columnName": "Estado Tramite",
        "customHeaderComponent": HeaderComponent,
        "customHeaderComponentProps": { color: '#da291c' }
        },
        {
        "columnName": "Fecha Cambio",
        "customHeaderComponent": HeaderComponent,
        "customHeaderComponentProps": { color: '#da291c' }
        },
        {
        "columnName": "Usuario",
        "customHeaderComponent": HeaderComponent,
        "customHeaderComponentProps": { color: '#da291c' }
        },

        {
        "columnName": "Observacion",
        "customHeaderComponent": HeaderComponent,
        "customHeaderComponentProps": { color: '#da291c' }
        }
    ];
    return (

      <Griddle results={this.props.data} columnMetadata={columnMeta} resultsPerPage={2}
      columns={["ID Factibilidad","Estado Tramite", "Fecha Cambio", "Usuario", "Observacion"]}/>

    );
  }
}

export default FG_GridPerZoneH;
