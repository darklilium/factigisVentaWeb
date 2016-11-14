
import layers from '../../services/layers-service';
import token from '../../services/token-service';

//extrae nombre y kva de sed
function factigis_findSedProperties(sed, callback){

  var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_layer_infoSED());
  var qInterruptions = new esri.tasks.Query();

  qInterruptions.returnGeometry = false;
  qInterruptions.outFields=["*"];
  qInterruptions.where = "codigo=" + sed;

  qTaskInterruptions.execute(qInterruptions, (featureSet)=>{

    if(!featureSet.features.length){
      return callback([]);
    }

    callback(featureSet.features);
  }, (Errorq)=>{
    console.log(Errorq,"Error doing query for sed properties");
    callback([]);
  });
}

//saca propiedad de rotulo.
function factigis_findRotuloProperties(rotulo, callback){

  var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_rotulos2());
  var qInterruptions = new esri.tasks.Query();

  qInterruptions.returnGeometry = false;
  qInterruptions.outFields=["*"];
  qInterruptions.where = "rotulo='" + rotulo  + "'";

  qTaskInterruptions.execute(qInterruptions, (featureSet)=>{

    if(!featureSet.features.length){
      return callback([]);
    }

    callback(featureSet.features);
  }, (Errorq)=>{
    console.log(Errorq,"Error doing query for rotulo properties");
    callback([]);
  });
}


export {factigis_findSedProperties, factigis_findRotuloProperties}
