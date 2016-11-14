import mymap from '../services/map-service';

function createQueryTask({url, whereClause, returnGeometry = true, outFields = ['*']}){
  var map = mymap.getMap();
  var queryTaskNIS = new esri.tasks.QueryTask(url);
  var queryNIS = new esri.tasks.Query();
  queryNIS.where = whereClause;
  queryNIS.returnGeometry = returnGeometry;
  queryNIS.outFields = outFields;

  return function(success, failure){
    var ok = success.bind(null, map);
    queryTaskNIS.execute(queryNIS, ok, failure);
  };
}

export default createQueryTask;
