function toggleOff(mytoggleBtnName, stateBtnHandler, stateToggleBtn ){
  switch (mytoggleBtnName) {
    case 'cliente':
    console.log("apagando control cliente...");
    dojo.disconnect(stateBtnHandler);
    $('.factigis_btnSelectCliente').css('color',"black").css('border-color','initial');
    break;
    case 'poste':
      console.log("apagando control poste...");
      dojo.disconnect(stateBtnHandler);
      $('.factigis_btnSelectPoste').css('color',"black").css('border-color','initial');
    break;
    case 'direccion':
      console.log("apagando control direccion...");
      dojo.disconnect(stateBtnHandler);
      $('.factigis_btnSelectDireccion').css('color',"black").css('border-color','initial');
    break;
    case 'calle':

    break;
    case 'tramo':
    console.log("apagando control tramo...");
    dojo.disconnect(stateBtnHandler);
    $('.factigis_btnSelectTramo').css('color',"black").css('border-color','initial');
    default:

  }

}


export default toggleOff;
