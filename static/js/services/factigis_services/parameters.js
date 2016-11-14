import cookieHandler from 'cookie-handler';
import myLayers from '../../services/layers-service';
import token from '../../services/token-service';
import createQueryTask from '../../services/createquerytask-service';

function factigisLoginVentaWeb(user,pass, callback){

  const url = myLayers.read_tokenURL();

  const data = {
    username: user,
    password: pass,
    client: 'requestip',
    expiration: 1440,
    format: 'jsonp'
  };

  $.ajax({
    method: 'POST',
    url: url,
    data: data,
    dataType: 'html'
  })
  .done(myToken => {
    if(myToken.indexOf('Exception') >= 0) {
      console.log('Login incorrecto, intente nuevamente');
        return callback([false,'login']);
      //notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }
    if (myToken.indexOf('error') >= 0){
      console.log('Login incorrecto, intente nuevamente');
      return callback([false,'login']);
      //notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }
    //IF EVERYTHING IS OK , GOING TO:
    console.log('writing token into system', myToken);
    token.write(myToken);
    cookieHandler.set('wllExp',getFormatedDateExp());
    //if the login is correct. Get user permission:
    callback(true,'all');

  })
  .fail(error => {
    console.log("Problem:" , error);
  //  notifications("Problema al iniciar sesión. Intente nuevamente.","Login_Failed", ".notification-login");
  });

  console.log('gisred login done');
}

function params(){
  var usrprmssns = [{
    username: 'vialactea\\ehernanr',
    application: 'FACTIGIS',
    module: 'GENERAR_FACTIBILIDAD',
    widget: 'CREAR_FACTIBILIDAD',
    insert: 'TRUE',
    update: 'FALSE',
    'delete': 'FALSE',
    platform: 'WEB'
    },
    {
    username: 'vialactea\\ehernanr',
    application: 'FACTIGIS',
    module: 'GENERAR_FACTIBILIDAD',
    widget: 'BUSCAR_FOLIO',
    insert: 'TRUE',
    update: 'FALSE',
    'delete': 'FALSE',
    platform: 'WEB'
    },
    {
    username: 'vialactea\\ehernanr',
    application: 'FACTIGIS',
    module: 'GENERAR_FACTIBILIDAD',
    widget: 'CREAR_DIRECCION',
    insert: 'TRUE',
    update: 'FALSE',
    'delete': 'FALSE',
    platform: 'WEB'
  }];

  var usrprfl = {
    OBJECTID: 55,
    USUARIO: 'vialactea\\ehernanr',
    NOMBRE_COMPLETO: 'Evelyn Elena Hernandez Riquelme',
    CARGO: 'Analista Calidad de Datos Comerciales',
    LUGAR_DE_TRABAJO: 'Área Pérdidas y GIS',
    DEPARTAMENTO: 'Subgerencia General',
    COMUNA: 'Valparaíso',
    ZONA_USUARIO: 'VALPARAISO - COSTA - MARGA MARGA'
  }

  return {
    setUsrprmssnsParams(){
      cookieHandler.set('usrprmssns', usrprmssns);
    },
    getUsrprmssnsParams(){
      return cookieHandler.get('usrprmssns');
    },
    setUsrprflParams(){
      cookieHandler.set('usrprfl', usrprfl);
    },
    getUsrprflParams(){
      return cookiehandler.get('usrprfl');
    }
  }

}

function getFormatedDateExp(){
  var d = new Date();

  var str = "day/month/year hour:minute:second"
    .replace('day', d.getDate() <10? '0'+ d.getDate()+1 : d.getDate()+1)
    .replace('month', (d.getMonth() + 1) <10? '0' + (d.getMonth()+1) : (d.getMonth()+1))
    .replace('year', d.getFullYear())
    .replace('hour', d.getHours() <10? '0'+ d.getHours() : d.getHours() )
    .replace('minute', d.getMinutes() <10? '0'+ d.getMinutes() : d.getMinutes())
    .replace('second', d.getSeconds() <10? '0'+ d.getSeconds() : d.getSeconds());
    console.log(str);
  return str;
}

function getFormatedDate(){
  var d = new Date();

  var str = "day/month/year hour:minute:second"
    .replace('day', d.getDate() <10? '0'+ d.getDate() : d.getDate())
    .replace('month', (d.getMonth() + 1) <10? '0' + (d.getMonth()+1) : (d.getMonth()+1))
    .replace('year', d.getFullYear())
    .replace('hour', d.getHours() <10? '0'+ d.getHours() : d.getHours() )
    .replace('minute', d.getMinutes() <10? '0'+ d.getMinutes() : d.getMinutes())
    .replace('second', d.getSeconds() <10? '0'+ d.getSeconds() : d.getSeconds());
    console.log("Today",str);
  return str;
}

function getUserPermission(user, token, callback){

    var getPermission = createQueryTask({
      url: myLayers.read_logAccess(),
      whereClause: "usuario='"+ user + "' AND plataforma='WEB' AND aplicacion='FACTIGIS'"
    });

    getPermission((map, featureSet) => {
      if(!featureSet.features){
        return callback("NOPERMISSIONS");
      }
        let permissions = featureSet.features.map((permission)=>{
          let per = {
            "username": permission.attributes['usuario'],
            "application": permission.attributes['aplicacion'],
            "module": permission.attributes['modulo'],
            "widget": permission.attributes['widget'],
            "insert": permission.attributes['insert_'],
            "update": permission.attributes['update_'],
            "delete": permission.attributes['delete_'],
            "platform": permission.attributes['plataforma']
          };
          return per;
        });
        return callback(permissions);

    },(errorQuery)=>{
        console.log("Error performing query for getUserPermissions", errorQuery);
        return callback("NOPERMISSIONS")
    });
}

function getProfile (user, userProfile){

  var getProf = createQueryTask({
    url: myLayers.read_factigisUserProfile(),
    whereClause: "USUARIO='"+ user +"'"
  });

  getProf((map, featureSet) => {

    if(!featureSet.features.length){
      return userProfile([]);
    }

    return userProfile(featureSet.features);
  });

}

function saveGisredLogin(user, fech, page, mod, tkn){

  const data = {
    f: 'json',
    adds: JSON.stringify([{ attributes: { "usuario": user, fecha: fech , "pagina": page, "modulo": mod  }, geometry: {} }]),
    token: tkn
  };

  jQuery.ajax({
    method: 'POST',
    url: myLayers.read_logAccessFactigis(),
    dataType:'html',
    data: data
  })
  .done(d =>{
    //console.log(d,"pase");
    console.log("")
  })
  .fail(f=>{
    console.log(f,"no pase");
    console.log("Error adding logReg")
  });
}

export {factigisLoginVentaWeb, getUserPermission, getProfile, saveGisredLogin, getFormatedDate};
