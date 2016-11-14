import token from '../services/token-service';
import myinfotemplate from '../utils/infoTemplates';
import mymap from '../services/map-service';
import {ap_infoWindow} from '../utils/makeInfowindow';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
function myLayers(){
  const serviceMain = 'http://gisred.chilquinta/arcgis/';
  //change this for external connection:
  //const serviceMain = 'http://gisred.chilquinta.cl:5555/arcgis/';
  const serviceURL = serviceMain + 'rest/services/';
  var graphicLayer = new GraphicsLayer;

  //check 8 and last one
  return {
    //The following layers are for common use in any gisred app.
    read_tokenURL(){
      return serviceMain + "tokens/generateToken";
    },

    read_logAccess(){  /*using*/
        console.log(token.read());
        return serviceURL + "Admin/LogAccesos/FeatureServer/2?f=json&token=" + token.read();
    },
    read_logAccess2(){
    //chq mapabase(){
    return serviceURL + "Admin/LogAccesos/FeatureServer/2?f=json&token=" + token.read();;
    },
    read_mapabase(){
      return serviceURL + "MapaBase/MapServer?f=json&token=" + token.read();
    },
    //dmps adresses
    read_cartography(){
      return serviceURL + "Cartografia/DMPS/MapServer?f=json&token=" + token.read();
    },

    //The following layers and services are just for Interruptions app. (interrupciones.html and interruptions.js)
    //Featurelayer for orders per sed (with graphics)

    read_layer_interr_sed(){ /*using : Layer: SED*/
      return serviceURL + "Interrupciones/PO_test/MapServer/0?f=json&token=" + token.read();
    },
    //Featurelayer for orders per customer (with graphics)
    read_layer_interr_clie(){ /*using: Layer Clientes*/
      return serviceURL + "Interrupciones/PO_test/MapServer/1?f=json&token=" + token.read();
    },
    //Feature layer for BT: Red BT
    read_layer_tramosBT(){ /*using Layer Tramos*/
      return serviceURL + "Interrupciones/PO_test/MapServer/2?f=json&token=" + token.read();
    },
    //Feature layer for getting the nis affected in the SED (green points)
    read_layer_ClienteSED(){ /*using Layer Cliente sed puntos verdes al extent*/
      return serviceURL + "Interrupciones/PO_test/MapServer/3?f=json&token=" + token.read();
    },
    read_layer_CriticalCustomers(){ /*using Layer Cliente sed puntos verdes al extent*/
      return serviceURL + "Interrupciones/PO_test/MapServer/4?f=json&token=" + token.read();
    },
    read_layer_CriticalPerSED(){ /*using Layer Cliente sed puntos verdes al extent*/
      return serviceURL + "Interrupciones/PO_test/MapServer/5?f=json&token=" + token.read();
    },
    //Table for PO Orders (without graphics)
    read_layer_poOrdenes(){ /*using*/
      return serviceURL + "Interrupciones/Interrupciones_clientes/MapServer/8?f=json&token=" + token.read();
    },
    //Feature layer for customers data  : Clientes (0)
    read_layer_ClieSED(){ /*using*/
      return serviceURL + "Interrupciones/PO_test/MapServer/9?f=json&token=" + token.read();
    },
    read_layer_countTotal(){ /*using*/
      return serviceURL + "Interrupciones/PO_test/MapServer/10?token=" + token.read();
    },
    read_layer_infoSED(){/*using for getting the sed information and location*/
      return serviceURL + "Chilquinta_006/Equipos_pto_006/MapServer/1?f=json&token=" + token.read();
    },
    read_layer_nisInfo(){
      return serviceURL + "Chilquinta_006/ClientesV2/MapServer/0?f=json&token=" + token.read();
    },
    save_graphicLayer(myGraphicsLayer){  /*using*/
      graphicLayer = myGraphicsLayer;
    },
    read_graphicLayer(){  /*using*/
      return graphicLayer;
    },
    read_dyn_layerClieSED(){  /*using*/
        return serviceURL + "Interrupciones/PO_test/MapServer?f=json&token=" + token.read();
    },
    read_qtty_comuna(){  /*using*/
        return serviceURL + "Interrupciones/PO_test/MapServer/11?f=json&token=" + token.read();
    },
    read_qtty_office(){  /*using*/
        return serviceURL + "Interrupciones/PO_test/MapServer/12?f=json&token=" + token.read();
    },
    read_qtty_total_comuna(){  /*using*/
        return serviceURL + "Interrupciones/PO_test/MapServer/13?f=json&token=" + token.read();
    },
    write_logAccess(){  /*using*/
        return serviceURL + "Admin/LogAccesos/FeatureServer/1/applyEdits?f=json&token=" + token.read();
    },

    read_layerAlimentador(){  /*using*/
        return serviceURL + "Chilquinta_006/Tramos_006/MapServer?f=json&token=" + token.read();
    },

    //layers for AP CHQ
    read_ap_comuna(){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/MapServer/4?f=json&token=" + token.read();
    },
    //19-05-2016
    read_ap_modificaciones(){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/MapServer?f=json&token=" + token.read();
    }/*,
    read_ap_luminarias(){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/FeatureServer/1?f=json&token=" + token.read();
    },
    */
    ,
    read_ap_luminarias(){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/MapServer?f=json&token=" + token.read();
    },
    read_ap_luminariasQuery(){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/FeatureServer/1?f=json&token=" + token.read();
    },
    //20/05/2016
    read_ap_rotulos(){
      return serviceURL + "Chilquinta_006/Nodos_006/MapServer/0?f=json&token=" + token.read();
    },
    read_ap_equipos(){
        return serviceURL + "AP_Municipal/AP_MUNICIPAL/MapServer/3?f=json&token=" + token.read();
    },
    read_ap_tramos(){
        return serviceURL + "AP_Municipal/AP_MUNICIPAL/MapServer/2?f=json&token=" + token.read();
    },
    read_ap_catastro_fotos(){
        return serviceURL + "AP_Municipal/AP_MUNICIPAL/FeatureServer/10?f=json&token=" + token.read();
    },

    /* FACTIGIS LAYERS*/
    read_factigis_transmision(){
        return serviceURL + "Varios/FACTIBILIDAD/MapServer/0?f=json&token=" + token.read();
    },
    read_factigis_distribucion(){
        return serviceURL + "Chilquinta_006/Concesiones006/MapServer/0?f=json&token=" + token.read();
    },
    read_factigis_vialidad(){
        return serviceURL + "PMS/Vialidad/MapServer/0?f=json&token=" + token.read();
    },
    read_factigis(){
        return serviceURL + "PMS/Concesiones/MapServer?f=json&token=" + token.read();
    },
    read_factigis2(){
        return serviceURL + "PMS/Vialidad/MapServer?f=json&token=" + token.read();
    },
    read_SSEE(){
      return serviceURL + "Chilquinta_006/Equipos_pto_006/MapServer?f=json&token=" + token.read();
    },
    read_campamentos(){
      return serviceURL + "MANTENIMIENTO/Otras_Capas/MapServer/3?f=json&token=" + token.read();
    },
    read_direcciones(){
      return serviceURL + "Cartografia/DMPS/MapServer/0?f=json&token=" + token.read();
    },
    read_rotulos(){
      return serviceURL + "Chilquinta_006/Nodos_006/MapServer?f=json&token=" + token.read();
    },
    read_rotulos2(){
      return serviceURL + "Chilquinta_006/Nodos_006/MapServer/0?f=json&token=" + token.read();
    },
    read_direccionesNuevasMobile(){
      return serviceURL + "Mobile/Ingreso_externo_nuevo/MapServer?f=json&token=" + token.read();
    },
    read_calles(){
        return serviceURL + "MapaBase/MapServer/2?f=json&token=" + token.read();
    },
    read_direccionesNuevasQuery(){
      return serviceURL + "Mobile/Ingreso_externo_nuevo/FeatureServer/2?f=json&token=" + token.read();
    },
    read_chqTramosBT(){
      return serviceURL + "Chilquinta_006/Tramos_006/MapServer/1?f=json&token=" + token.read();
    },
    read_chqTramosMT(){
      return serviceURL + "Chilquinta_006/Tramos_006/MapServer/0?f=json&token=" + token.read();
    },
    read_subestaciones(){
      return serviceURL + "Chilquinta_006/Equipos_pto_006/MapServer?f=json&token=" + token.read();
    },
    read_sep(){
      return serviceURL + "Chilquinta_006/Equipos_pto_006/MapServer/1?f=json&token=" + token.read();
    },
    read_comuna(){
        return serviceURL + "MapaBase/MapServer/4?f=json&token=" + token.read();
    },
    read_agregarFactibilidad(){
        return serviceURL + "FACTIBILIDAD/FACTIGIS_DESA/FeatureServer/0?f=json&token=" + token.read();
    },
    read_factigisUserProfile(){
      return serviceURL + "FACTIBILIDAD/FACTIGIS_DESA/FeatureServer/2?f=json&token=" + token.read();
    },
    read_factibilidad(){
        return serviceURL + "FACTIBILIDAD/FACTIGIS_DESA/MapServer?f=json&token=" + token.read();
    },
    read_updateFactibilidad(){
      return serviceURL + "FACTIBILIDAD/FACTIGIS_DESA/FeatureServer/0/applyedits";
    },
    read_direccionesDyn(){
      return serviceURL + "Cartografia/DMPS/MapServer?f=json&token=" + token.read();
    },
    read_historial_factibilidad(){
      return serviceURL + "FACTIBILIDAD/FACTIGIS_DESA/FeatureServer/1?f=json&token=" + token.read();
    },
    read_factigis_addDireccion(){
      return serviceURL + "Mobile/Ingreso_externo_nuevo/FeatureServer/2/applyedits";
    },
    read_factigis_addEstadoHistoria(){
      return serviceURL + "FACTIBILIDAD/FACTIGIS_DESA/FeatureServer/1/applyedits";
    },
    read_factigis_addFactibilidad(){
      return serviceURL + "FACTIBILIDAD/FACTIGIS_DESA/FeatureServer/0/applyedits";

    },
    read_logAccessFactigis(){
      return serviceURL + "Admin/LogAccesos/FeatureServer/1/applyedits";
    }


  };
}

//TO DO: this function sets the layers that will be added in the app, integrating the infowindow and their special properties.
function setLayers(){
  //check n°7
  return {
    alimentadores(){
      var layerAlimentador = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_layerAlimentador(),{id:"gis_alimentadores"});
      layerAlimentador.setImageFormat("png32");
      layerAlimentador.setVisibleLayers([0]);
      layerAlimentador.setInfoTemplates({
        0: {infoTemplate: myinfotemplate.getAlimentadorInfoWindow()}
      });

      return layerAlimentador;
    },
    interrupciones(){
      var interrClienteSED = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_dyn_layerClieSED(),{id:"po_interrupciones"});
      interrClienteSED.setInfoTemplates({
        3: {infoTemplate: myinfotemplate.getNisInfo()},
        1: {infoTemplate: myinfotemplate.getIsolatedNisFailure()},
        0: {infoTemplate: myinfotemplate.getSubFailure()}
      });
      interrClienteSED.refreshInterval = 1;
      interrClienteSED.setImageFormat("png32");
      interrClienteSED.on('update-end', (obj)=>{
        if(obj.error){
          console.log("Redirecting to login page, token for this session is ended...");
          window.location.href = "index.html";
        }
      });
        return interrClienteSED;
    },
    cuadrillas(){
      var cuadrillasLayer = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_dyn_layerClieSED(),{id:"po_cuadrillas"});
      /*cuadrillasLayer.setInfoTemplates({
        3: {infoTemplate: myinfotemplate.getNisInfo()},
        1: {infoTemplate: myinfotemplate.getIsolatedNisFailure()},
        0: {infoTemplate: myinfotemplate.getSubFailure()}
      });
      */
      //interrClienteSED.refreshInterval = 1;
      cuadrillasLayer.setImageFormat("png32");
      return cuadrillasLayer;
    },
    ap_comuna(whereRegion){
      var apComunaLayer = new esri.layers.FeatureLayer(myLayers().read_ap_comuna(),{id:"ap_comuna"});
      apComunaLayer.setDefinitionExpression(whereRegion);
      console.log(whereRegion);
      return apComunaLayer;
    },
    ap_modificaciones(whereRegion, layerNumber){
      var apModificacionesLayer = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_ap_modificaciones(),{id:"ap_modificaciones"});
      apModificacionesLayer.setImageFormat("png32");
      apModificacionesLayer.setVisibleLayers([0]);
      var layerDefinitions = [];
      layerDefinitions[0] = whereRegion;
      apModificacionesLayer.setLayerDefinitions(layerDefinitions);

      return apModificacionesLayer;
    }/*,
    ap_luminarias(whereRegion, layerNumber){
      var apLuminariasLayer = new esri.layers.FeatureLayer(myLayers().read_ap_luminarias(),{id:"ap_luminarias",
      mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
      minScale: 9000,
      outFields: ["*"]});
      apLuminariasLayer.setDefinitionExpression(whereRegion);

      //ON MOUSE OVER EVENT
      apLuminariasLayer.on('mouse-over',(evt)=>{

        ap_infoWindow(evt.graphic.attributes['ID_LUMINARIA'],
          evt.graphic.attributes['ROTULO'],
          evt.graphic.attributes['TIPO_CONEXION'],
          evt.graphic.attributes['TIPO'],
          evt.graphic.attributes['PROPIEDAD'],
          evt.graphic.attributes['MEDIDO_TERRENO'],
          evt.graphic.geometry);

      });
      apLuminariasLayer.on('click', (evt)=>{
        ap_showEditor(evt);
      });

      return apLuminariasLayer;
    },
    */
    ,
    ap_luminarias(whereRegion, layerNumber){
      var apLuminariasLayer = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_ap_luminarias(),{id:"ap_luminarias",
      minScale: 9000});
      apLuminariasLayer.setImageFormat("png32");
      apLuminariasLayer.setVisibleLayers([1,2]);
      var layerDefinitions = [];
      layerDefinitions[1] = whereRegion;
      layerDefinitions[2] = whereRegion;

      apLuminariasLayer.setLayerDefinitions(layerDefinitions);

      /*//ON MOUSE OVER EVENT
      apLuminariasLayer.on('mouse-over',(evt)=>{

        ap_infoWindow(evt.graphic.attributes['ID_LUMINARIA'],
          evt.graphic.attributes['ROTULO'],
          evt.graphic.attributes['TIPO_CONEXION'],
          evt.graphic.attributes['TIPO'],
          evt.graphic.attributes['PROPIEDAD'],
          evt.graphic.attributes['MEDIDO_TERRENO'],
          evt.graphic.geometry);

      });
      apLuminariasLayer.on('click', (evt)=>{
        ap_showEditor(evt);
      });
      */
      return apLuminariasLayer;
    },
    ap_tramos(whereRegion, layerNumber){
      var apTramosLayer = new esri.layers.FeatureLayer(myLayers().read_ap_tramos(),{id:"ap_tramos",
      mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
      minScale: 9000});

      apTramosLayer.setDefinitionExpression(whereRegion);
      console.log(whereRegion);

      return apTramosLayer;
    },
    /* factigis module */
    factigis_transmision(whereRegion, layerNumber){
      var fDistribucionsLayer = new esri.layers.FeatureLayer(myLayers().read_factigis_transmision(),{id:"factigis_transmision"
      });

      return fDistribucionsLayer;
    },
    factigis_distribucion(whereRegion, layerNumber){
      var fTransmisionLayer = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_factigis(),{id:"factigis_distribucion",
      opacity:0.3});
      fTransmisionLayer.setImageFormat("png32");
      fTransmisionLayer.setVisibleLayers([1]);
      return fTransmisionLayer;
    },
    factigis_vialidad(whereRegion, layerNumber){
      var fVialidadsLayer = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_factigis2(),{id:"factigis_vialidad",
      opacity:0.3});
      fVialidadsLayer.setVisibleLayers([0]);
      fVialidadsLayer.setImageFormat("png32");
      return fVialidadsLayer;
    },
    gis_SSEE(whereRegion, layerNumber){
      var fSSEELayer = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_SSEE(),{id:"gis_SSEE"});
      fSSEELayer.setVisibleLayers([0]);
      fSSEELayer.setImageFormat("png32");
      return fSSEELayer;
    },
    gis_campamentos(whereRegion, layerNumber){
      var fcampamentosLayer = new esri.layers.FeatureLayer(myLayers().read_campamentos(),{id:"gis_campamentos",
      mode: esri.layers.FeatureLayer.MODE_ONDEMAND});

      return fcampamentosLayer;
    },
    gis_rotulos(){
      var frotulosLayer = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_rotulos(),{id:"gis_rotulos"});
      frotulosLayer.setVisibleLayers([0]);
      frotulosLayer.setImageFormat("png32");
      return frotulosLayer;
    },
    gis_direcciones(){
      var fdireccionesLayer = new esri.layers.FeatureLayer(myLayers().read_direcciones(),{id:"gis_direcciones",
      outFields: ["id_direccion","comuna","nombre_calle","numero"]});

      return fdireccionesLayer;
    },
    gis_cartografia(){
      var fSSEELayer = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_cartography(),{id:"gis_cartografia"});
      fSSEELayer.setVisibleLayers([0]);
      fSSEELayer.setImageFormat("png32");
      return fSSEELayer;
    //  http://gisred.chilquinta.cl:5555/arcgis/rest/services/Cartografia/Cartografia/MapServer
    },
    gis_chqbasemap(){
      var fSSEELayer = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_mapabase(),{id:"gis_chqbasemap"});

      fSSEELayer.setImageFormat("png32");
      return fSSEELayer;
    //  http://gisred.chilquinta.cl:5555/arcgis/rest/services/Cartografia/Cartografia/MapServer
    },
    mobile_direccionesNuevas(){
      var fSSEELayer = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_direccionesNuevasMobile(),{id:"mobile_direccionesNuevas",
      minScale: 3000});
      fSSEELayer.setImageFormat("png32");
      fSSEELayer.setVisibleLayers([2]);
      return fSSEELayer;

    },
    factigis_subestaciones(){
      var fSSEELayer = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_subestaciones(),{id:"factigis_subestaciones",
      minScale: 3000});
      fSSEELayer.setImageFormat("png32");
      fSSEELayer.setVisibleLayers([1]);
      return fSSEELayer;
    },
    factigis_MT(){
      var fSSEELayer = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_layerAlimentador(),{id:"factigis_MT",
      minScale: 3000});
      fSSEELayer.setImageFormat("png32");
      fSSEELayer.setVisibleLayers([0]);
      return fSSEELayer;

    },
    factigis_BT(){
      var fSSEELayer = new esri.layers.ArcGISDynamicMapServiceLayer(myLayers().read_layerAlimentador(),{id:"factigis_BT",
      minScale: 3000});
      fSSEELayer.setImageFormat("png32");
      fSSEELayer.setVisibleLayers([1]);
      return fSSEELayer;

    }
  }
}

//TO DO: this function can be used to know the active layers in the map.
function layersActivated(){
  var activeLayers= [];
  var mapp = mymap.getMap();
  var activeLayersLength = mapp.layerIds.length;
  //console.log(mapp.layerIds.length);
  return {
    getMapLayers() {
      for (var j=0; j<activeLayersLength; j++) {
        var currentLayer = mapp.getLayer(mapp.layerIds[j]);
        activeLayers.push(currentLayer.id);
        //alert("id: " + currentLayer.id);
      }
      console.log("Layers actived" ,activeLayers);
      return activeLayers;

    }
  }
}

// TO DO: this function add the default and not defaults layer (from the LayerList) in the app.
function addCertainLayer(layerNameToAdd, order, where, callback){
  //checkbox setup n° 6
  var mapp = mymap.getMap();
  var myLayerToAdd;

  console.log("adding layer: ", layerNameToAdd,order);

  switch (layerNameToAdd) {

    case 'ap_comuna':
      myLayerToAdd = setLayers().ap_comuna(where, 4);
    break;

    case 'po_interrupciones':
      myLayerToAdd = setLayers().interrupciones();
    break;

    case 'gis_alimentadores':
      myLayerToAdd = setLayers().alimentadores();
    break;

    case 'ap_luminarias':
      myLayerToAdd = setLayers().ap_luminarias(where,6);
    break;

    case 'ap_modificaciones':
      myLayerToAdd = setLayers().ap_modificaciones(where,7);
    break;

    case 'ap_tramos':
      myLayerToAdd = setLayers().ap_tramos(where,5);
    break;

    case 'factigis_transmision':
      myLayerToAdd = setLayers().factigis_transmision(where,order);
    break;

    case 'factigis_distribucion':
      myLayerToAdd = setLayers().factigis_distribucion(where,order);
    break;

    case 'factigis_vialidad':
      myLayerToAdd = setLayers().factigis_vialidad(where,order);
    break;

    case 'gis_SSEE':
      myLayerToAdd = setLayers().read_SSEE(where,order);
    break;
    case 'gis_campamentos':
      myLayerToAdd = setLayers().read_campamentos(where,order);
    break;
    case 'gis_direcciones':
      myLayerToAdd = setLayers().gis_direcciones(where,order);
    break;
    case 'gis_cartografia':
      myLayerToAdd = setLayers().gis_cartografia(where,order);
    break;
    case 'gis_rotulos':
      myLayerToAdd = setLayers().gis_rotulos(where,order);
    break;
    case 'gis_chqbasemap':
      myLayerToAdd = setLayers().gis_chqbasemap(where,order);
    break;
    case 'mobile_direccionesNuevas':
      myLayerToAdd = setLayers().mobile_direccionesNuevas(where,order);
    break;
    case 'factigis_subestaciones':
      myLayerToAdd = setLayers().factigis_subestaciones(where,order);
    break;
    case 'factigis_MT':
      myLayerToAdd = setLayers().factigis_MT(where,order);
    break;
    case 'factigis_BT':
      myLayerToAdd = setLayers().factigis_BT(where,order);
    break;
    default:
  }

  mapp.addLayer(myLayerToAdd,order);

  //Set here if you add more layers in the LayerList.
  //checkbox setup n° 5
  if (check_alimentador.checked){
    mapp.addLayer(setLayers().alimentadores(),1);
  }
  if (check_ap_modificaciones.checked){
    mapp.addLayer(setLayers().ap_modificaciones(), 1);
  }
  if (check_factigis_distribucion.checked){
    mapp.addLayer(setLayers().factigis_distribucion(), 1);
  }
  if (check_factigis_transmision.checked){
    mapp.addLayer(setLayers().factigis_transmision(), 1);
  }
  if (check_factigis_vialidad.checked){
    mapp.addLayer(setLayers().factigis_vialidad(), 1);
  }
  if (check_SSEE.checked){
    mapp.addLayer(setLayers().SSEE(), 1);
  }
  if (check_campamentos.checked){
    mapp.addLayer(setLayers().campamentos(), 1);
  }
  if (check_chqbasemap.checked){
    mapp.addLayer(setLayers().gis_chqbasemap(), 1);
  }
  if (check_subestaciones.checked){
    mapp.addLayer(setLayers().factigis_subestaciones(), 1);
  }
  if (check_MT.checked){
    mapp.addLayer(setLayers().factigis_MT(), 1);
  }
  if (check_BT.checked){
    mapp.addLayer(setLayers().factigis_BT(), 1);
  }
  if (check_Postes.checked){
    mapp.addLayer(setLayers().gis_rotulos(), 1);
  }

  callback(myLayerToAdd);
}
export default myLayers();
export {setLayers,layersActivated,addCertainLayer};
