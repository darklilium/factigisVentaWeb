
const monofasicosAereos = [
  { value: '1', label: '0.60', capacidadInterruptor: '3', capacidadEmpalme: '0.66', tipo:'A-6' },
  { value: '2', label: '1.23' , capacidadInterruptor: '6', capacidadEmpalme: '1.32', tipo:'A-6'},
  { value: '3', label: '2' , capacidadInterruptor: '10', capacidadEmpalme: '2.2', tipo:'A-6'},
  { value: '4', label: '3', capacidadInterruptor: '15' , capacidadEmpalme: '3.3', tipo:'A-6'},
  { value: '5', label: '4', capacidadInterruptor: '20', capacidadEmpalme: '4.4', tipo:'A-6'},
  { value: '6', label: '5' , capacidadInterruptor: '25', capacidadEmpalme: '5.5', tipo:'A-9'},
  { value: '7', label: '6' , capacidadInterruptor: '30', capacidadEmpalme: '6.6', tipo:'A-9'},
  { value: '8', label: '7' , capacidadInterruptor: '35', capacidadEmpalme: '7.7', tipo:'A-9'},
  { value: '9', label: '8' , capacidadInterruptor: '40', capacidadEmpalme: '8.8', tipo:'A-9'}
];

const monofasicosSubterraneos = [
  { value: '1', label: '0.60', capacidadInterruptor: '3', capacidadEmpalme: '0.66', tipo:'S-6' },
  { value: '2', label: '1.23' , capacidadInterruptor: '6', capacidadEmpalme: '1.32', tipo:'S-6'},
  { value: '3', label: '2' , capacidadInterruptor: '10', capacidadEmpalme: '2.2', tipo:'S-6'},
  { value: '4', label: '3', capacidadInterruptor: '15' , capacidadEmpalme: '3.3', tipo:'S-6'},
  { value: '5', label: '4', capacidadInterruptor: '20', capacidadEmpalme: '4.4', tipo:'S-6'},
  { value: '6', label: '5' , capacidadInterruptor: '25', capacidadEmpalme: '5.5', tipo:'S-9'},
  { value: '7', label: '6' , capacidadInterruptor: '30', capacidadEmpalme: '6.6', tipo:'S-9'},
  { value: '8', label: '7' , capacidadInterruptor: '35', capacidadEmpalme: '7.7', tipo:'S-9'},
  { value: '9', label: '8' , capacidadInterruptor: '40', capacidadEmpalme: '8.8', tipo:'S-9'}

];

const trifasicosAereos = [
  { value: '1', label: '4', capacidadInterruptor: '6', capacidadEmpalme: '3.9', tipo:'A-18' },
  { value: '2', label: '6' , capacidadInterruptor: '10', capacidadEmpalme: '6.6', tipo:'A-18'},
  { value: '3', label: '9' , capacidadInterruptor: '15', capacidadEmpalme: '9.9', tipo:'A-18'},
  { value: '4', label: '12', capacidadInterruptor: '20' , capacidadEmpalme: '13.2', tipo:'A-18'},
  { value: '5', label: '15', capacidadInterruptor: '25', capacidadEmpalme: '16.5', tipo:'A-18'},
  { value: '6', label: '18' , capacidadInterruptor: '30', capacidadEmpalme: '19.8', tipo:'A-18'},
  { value: '7', label: '23' , capacidadInterruptor: '35', capacidadEmpalme: '23.1', tipo:'A-27'},
  { value: '8', label: '26' , capacidadInterruptor: '40', capacidadEmpalme: '26.4', tipo:'A-27'},
  { value: '9', label: '30' , capacidadInterruptor: '45', capacidadEmpalme: '29.7', tipo:'AR-48'},
  { value: '10', label: '31' , capacidadInterruptor: '50', capacidadEmpalme: '33', tipo:'AR-48'},
  { value: '11', label: '37' , capacidadInterruptor: '60', capacidadEmpalme: '39.6', tipo:'AR-48'},
  { value: '12', label: '43' , capacidadInterruptor: '70', capacidadEmpalme: '46.2', tipo:'AR-48'},
  { value: '13', label: '49' , capacidadInterruptor: '80', capacidadEmpalme: '52.8', tipo:'AR-75'},
  { value: '14', label: '55' , capacidadInterruptor: '90', capacidadEmpalme: '59.4', tipo:'AR-75'},
  { value: '15', label: '61' , capacidadInterruptor: '100', capacidadEmpalme: '66', tipo:'AR-75'},
  { value: '16', label: '77' , capacidadInterruptor: '125', capacidadEmpalme: '82.5', tipo:'AR-100'}
];

const trifasicosSubterraneos = [
  { value: '1', label: '4', capacidadInterruptor: '6', capacidadEmpalme: '3.9', tipo:'S-18' },
  { value: '2', label: '6' , capacidadInterruptor: '10', capacidadEmpalme: '6.6', tipo:'S-18'},
  { value: '3', label: '9' , capacidadInterruptor: '15', capacidadEmpalme: '9.9', tipo:'S-18'},
  { value: '4', label: '12', capacidadInterruptor: '20' , capacidadEmpalme: '13.2', tipo:'S-18'},
  { value: '5', label: '15', capacidadInterruptor: '25', capacidadEmpalme: '16.5', tipo:'S-18'},
  { value: '6', label: '18' , capacidadInterruptor: '30', capacidadEmpalme: '19.8', tipo:'S-18'},
  { value: '7', label: '23' , capacidadInterruptor: '35', capacidadEmpalme: '23.1', tipo:'S-27'},
  { value: '8', label: '26' , capacidadInterruptor: '40', capacidadEmpalme: '26.4', tipo:'S-27'},
  { value: '9', label: '30' , capacidadInterruptor: '45', capacidadEmpalme: '29.7', tipo:'SR-48'},
  { value: '10', label: '31' , capacidadInterruptor: '50', capacidadEmpalme: '33', tipo:'SR-48'},
  { value: '11', label: '37' , capacidadInterruptor: '60', capacidadEmpalme: '39.6', tipo:'SR-48'},
  { value: '12', label: '43' , capacidadInterruptor: '70', capacidadEmpalme: '46.2', tipo:'SR-48'},
  { value: '13', label: '49' , capacidadInterruptor: '80', capacidadEmpalme: '52.8', tipo:'SR-75'},
  { value: '14', label: '55' , capacidadInterruptor: '90', capacidadEmpalme: '59.4', tipo:'SR-75'},
  { value: '15', label: '61' , capacidadInterruptor: '100', capacidadEmpalme: '66', tipo:'SR-75'},
  { value: '16', label: '77' , capacidadInterruptor: '125', capacidadEmpalme: '82.5', tipo:'SR-100'},
  { value: '17', label: '92' , capacidadInterruptor: '150', capacidadEmpalme: '99', tipo:'SR-150'},
  { value: '18', label: '98' , capacidadInterruptor: '160', capacidadEmpalme: '105.5', tipo:'SR-150'},
  { value: '19', label: '107' , capacidadInterruptor: '175', capacidadEmpalme: '115.5', tipo:'SR-150'},
  { value: '20', label: '123' , capacidadInterruptor: '200', capacidadEmpalme: '132', tipo:'SR-150'},
  { value: '21', label: '138' , capacidadInterruptor: '225', capacidadEmpalme: '148.5', tipo:'SR-225'},
  { value: '22', label: '153' , capacidadInterruptor: '250', capacidadEmpalme: '165', tipo:'SR-225'},
  { value: '23', label: '184' , capacidadInterruptor: '300', capacidadEmpalme: '198', tipo:'SR-225'},
  { value: '24', label: '196' , capacidadInterruptor: '320', capacidadEmpalme: '211', tipo:'SR-350'},
  { value: '25', label: '215' , capacidadInterruptor: '350', capacidadEmpalme: '231', tipo:'SR-350'},
  { value: '26', label: '246' , capacidadInterruptor: '400', capacidadEmpalme: '264', tipo:'SR-350'},
  { value: '27', label: '276' , capacidadInterruptor: '450', capacidadEmpalme: '297', tipo:'SR-350'}

];

function getPotenciaEmpalme(empalme, fase, callback){
  switch (empalme) {
    case 'AEREO':
      if(fase=='MONOFASICO'){
        callback(monofasicosAereos);
      }
      if(fase=='TRIFASICO'){
        callback(trifasicosAereos);
      }
    break;

    case 'SUBTERRANEO':
      if(fase=='MONOFASICO'){
        callback(monofasicosSubterraneos);
      }
      if(fase=='TRIFASICO'){
        callback(trifasicosSubterraneos);
      }
    break;

    default:

  }
}

function getDetailsForPotencia(id, empalme, fase, callback){
  var result = "NOTFOUND";
  switch (empalme) {
    case 'AEREO':
      if(fase=='MONOFASICO'){
        result = monofasicosAereos.filter(function( obj ) {
          return obj.value == id;
        });
      return callback(result);
      }
      if(fase=='TRIFASICO'){
        result = trifasicosAereos.filter(function( obj ) {
          return obj.value == id;
        });
      return callback(result);
      }
    break;

    case 'SUBTERRANEO':
      if(fase=='MONOFASICO'){
        result = monofasicosSubterraneos.filter(function( obj ) {
          return obj.value == id;
        });
        return callback(result);

      }
      if(fase=='TRIFASICO'){
        result = trifasicosSubterraneos.filter(function( obj ) {
          return obj.value == id;
        });
        return callback(result);
      }
    break;

    default:

  }
}
export {getPotenciaEmpalme, getDetailsForPotencia}
