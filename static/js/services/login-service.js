import {notifications} from '../utils/notifications';
import myLayers from './layers-service';
import token from '../services/token-service';
import createQueryTask from '../services/createquerytask-service';
import cookieHandler from 'cookie-handler';

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

function factigisLogin(user,pass){
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
      notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }
    if (myToken.indexOf('error') >= 0){
      notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }
    //IF EVERYTHING IS OK , GOING TO:
    console.log('writing token into system', myToken);
    token.write(myToken);
    cookieHandler.set('wllExp',getFormatedDateExp());
    //if the login is correct. Get user permission:
    getUserPermission(user, myToken, (UserPermissions)=>{


        if(UserPermissions=='NOPERMISSIONS'){
          console.log('User doesnt have permissions for any application, dashboard empty...');
          notifications("Usuario sin permisos","Login_Error", ".notification-login");

        }else{
          console.log('User has permissions...requesting service access and login in to FACTIGIS_DASHBOARD');

          token.write(myToken);
          cookieHandler.set('usrprmssns',UserPermissions);

          let profiles = [];
          profiles = UserPermissions.map(permission=>{
            return permission.module;
          });


          let goesTo = profiles.filter(profile =>{
            return profile == "REVISAR_FACTIBILIDAD" || profile=="REVISAR_HISTORIAL_FACTIBILIDAD";
          });
          console.log("encontrado perfil",goesTo);

          //va a dashboard o factigis directamente dependiendo permisos del usuario para los modulos y widgets.
            if(!goesTo.length){
              const page = "REACT_FACTIGIS_DESA";
              const module = "FACTIGIS_CREAR_FACTIBILIDAD";
              const date = getFormatedDate();

              saveGisredLogin(user,date,page,module,myToken);
              notifications("Logging in...","Login_Success", ".notification-login");
                getProfile(user, userProfile =>{
                    console.log("esto llega",userProfile);
                  if(!userProfile.length){
                    console.log("El usuario no posee un perfil para el modulo");
                    return;
                  }
                  cookieHandler.set('usrprfl',userProfile[0].attributes);

                window.location.href = "factigis.html";
                });

            }else{
              //Save that the user is in dashboard
              const page = "REACT_FACTIGIS_DESA";
              const module = "FACTIGIS_DASHBOARD";
              const date = getFormatedDate();

              saveGisredLogin(user,date,page,module,myToken);
              notifications("Logging in...","Login_Success", ".notification-login");
              getProfile(user, userProfile =>{
                  console.log("esto llega",userProfile);
                if(!userProfile.length){
                  console.log("El usuario no posee un perfil para el modulo");
                  return;
                }
                cookieHandler.set('usrprfl',userProfile[0].attributes);
                window.location.href = "factigisDashboard.html";
              });


            }
        }
    });

  })
  .fail(error => {
    console.log("Problem:" , error);
    notifications("Problema al iniciar sesión. Intente nuevamente.","Login_Failed", ".notification-login");
  });

  console.log('gisred login done');
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
export { saveGisredLogin, factigisLogin,getFormatedDate };
