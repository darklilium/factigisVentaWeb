function customerValidator(obj, callback){
  var result = true;
  var falseEncontrados=[];
  console.log("validando datos de cliente...",obj);
  for (var i in obj) {
    if (obj[i] === false) {
        falseEncontrados.push(i);
        //return callback(false);
        changeColorValidator(i)
    }else{
      if(i.includes("geo")){
          changeColorValidator(i,'black');
      }else{
        changeColorValidator(i,'initial');
      }

    }
  }

  if(falseEncontrados.length==0){
    result= true;
  }else{
    result= false;
  }
  return callback(result,falseEncontrados);
}

function changeColorValidator(field, color='crimson'){
  switch (field) {
    case 'rut':
        $('.factigisRut').css('border-color',color).css('border-style', 'dashed').css('border-width', '1px');
    break;
    case 'nombre':
        $('.factigisNombre').css('border-color',color).css('border-style', 'dashed').css('border-width', '1px');
    break;
    case 'apellido':
        $('.factigisApellido').css('border-color',color).css('border-style', 'dashed').css('border-width', '1px');
    break;
    case 'telefono':
        $('.factigisTelefono').css('border-color',color).css('border-style', 'dashed').css('border-width', '1px');
    break;
    case 'email':
        $('.factigisEmail').css('border-color',color).css('border-style', 'dashed').css('border-width', '1px');
    break;
    case 'tramo':
        $('.factigisTramo').css('border-color',color).css('border-style', 'dashed').css('border-width', '1px');
    break;
    case 'potencia':
        $('.factigisPotencia').css('border-color',color).css('border-style', 'dashed').css('border-width', '1px');

    break;
    case 'potencia2':
        $('.factigisPotencia2').css('border-color',color).css('border-style', 'dashed').css('border-width', '1px');
      
    break;
    case 'cantidadEmpalmes':
        $('.factigisCantidadEmpalmes').css('border-color',color).css('border-style', 'dashed').css('border-width', '1px');
    break;
    case 'direccion':
        $('.factigisDireccion').css('border-color',color).css('border-style', 'dashed').css('border-width', '1px');
    break;
    case 'poste':
        $('.factigisRotulo').css('border-color',color).css('border-style', 'dashed').css('border-width', '1px');
    break;
    case 'tipoCliente':
        $('.factigis_tipoCliente').css('border-color',color).css('border-style', 'dashed').css('border-width', '1px');
    break;
    case 'tipoContribuyente':
        $('.factigis_tipoContribuyente').css('border-color',color).css('border-style', 'dashed').css('border-width', '1px');
    break;
    case 'tipoEmpalme':
        $('.factigisTipoEmpalme').css('border-color',color).css('border-style', 'dashed').css('border-width', '1px');
    break;
    case 'tipoFase':
        $('.factigis_tipoFase').css('border-color',color).css('border-style', 'dashed').css('border-width', '1px');
    break;
    case 'tipoBTMT':
        $('.factigisTipo').css('border-color',color).css('border-style', 'dashed').css('border-width', '1px');
    break;
    case 'geoCliente':
        $('.factigis_btnSelectCliente').css('border-color',color).css('border-style', 'solid').css('border-width', '1px');
    break;
    case 'geoRotulo':
        $('.factigis_btnSelectPoste').css('border-color',color).css('border-style', 'solid').css('border-width', '1px');
    break;
    case 'geoDireccion':
        $('.factigis_btnSelectDireccion').css('border-color',color).css('border-style', 'solid').css('border-width', '1px');
    break;

    default:


  }


}
export {customerValidator};
