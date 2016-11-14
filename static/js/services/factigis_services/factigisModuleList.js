


function FactigisModuleList(){

  return [
    {module: 'GENERAR_FACTIBILIDAD', alias: 'CREAR', widgets:["CREAR_FACTIBILIDAD","BUSCAR_FOLIO","CREAR_DIRECCION"] , Available: 'yes', Permission: 'no', Insert: 'no', Update: 'no', Delete: 'no', url:'factigis.html', color: 'transparent', img:'dist/css/images/factigis_images/icono_planificacion.png' },
    {module: 'REVISAR_FACTIBILIDAD', alias: 'REVISAR',  widgets:["BUSCAR_FACTIBILIDADES", "LISTAR_FACTIBILIDAD","MODIFICAR_ESTADO_FACTIBILIDAD"] , Available: 'yes', Permission: 'no', Insert: 'no', Update: 'no', Delete: 'no',url:'backoffice_factigis.html', color: 'transparent', img:'dist/css/images/factigis_images/icono_verificarcliente.png'},
    {module: 'REVISAR_HISTORIAL_FACTIBILIDAD',alias: 'REVISAR HISTORIAL', widget:["BUSCAR_HISTORIA_FACTIBILIDAD","LISTAR_FACTIBILIDAD", "VER_FACTIBILIDAD"] , Available: 'yes', Permission: 'no', Insert: 'no', Update: 'no', Delete: 'no',url:'backoffice2_factigis.html', color: 'transparent', img:'dist/css/images/factigis_images/icono_factigis_revision.png'}

  ];

}

function FactigisInsertMyData(list, permissions){
  var newList = [];

  permissions.forEach(permission => {

    list.forEach(array => {
      if(array.module === permission.module){
        newList.push({
          module: array['module'],
          alias: array['alias'],
          available: array['Available'],
          Permission: 'yes',
          Insert: permission['insert'],
          Update: permission['update'],
          Delete: permission['delete'],
          url:array['url'],
          color: array['color'],
          img: array['img']
        });
      }
    });
  });

  return newList;
}

function excludeDataFactigis(allList, yourList,yourPropList){
  var props = yourPropList;
  var result = allList.filter(function(o1){

  // filter out (!) items in result2
    return !yourList.some(function(o2){
        return o1.module === o2.module;          // assumes unique id
    });
  }).map(function(o){
  // use reduce to make objects with only the required properties
  // and map to apply this to the filtered array as a whole
    return props.reduce(function(newo, name){
        newo[name] = o[name];
        return newo;
    }, {});
  });

  return result;
}

export {FactigisModuleList,FactigisInsertMyData,excludeDataFactigis};
