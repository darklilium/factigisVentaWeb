const chqLogo = 'data:image/png;base64,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';

//TODO: This export a letter on pdf
function exportGraphicsToPDF(folio='1', direccion='CRISTOBAL COLON 1283, VALPARAÍSO', solicitante='PABLO MATURANA'){

  //Setting up the pdf page
  var doc = new jsPDF('portrait', 'pt');
  //x,y,w,h
  doc.addImage(chqLogo,"PNG",210, 50, 150,40);
  doc.setFont("helvetica");
  doc.setFontSize(10);
  doc.setFontType("normal");
  doc.text(400, 100, 'Folio N°: '+ folio);

  doc.setFont("helvetica");
  doc.setFontSize(21);
  doc.setFontType("bold");
  doc.text(130, 200, "CERTIFICADO DE FACTIBILIDAD");

  doc.setFont("helvetica");
  doc.setFontSize(8);
  doc.setFontType("normal");

  let totalCaractPerLine = 101;
  doc.text(120, 280, "CHILQUINTA ENERGÍA S.A., certifica la factibilidad de suministro de energía eléctrica en la propiedad:");

  let y = 280;
  let textoL2 = "según lo indicado en el DFL N°4 del año 2006, Ministerio de  ";
  let textoL2_1 = "Minería (artículos 125 y 126), sus Reglamentos y Normas Eléctricas. ";
  let textoL2_2 = "Minería (artículos 125 y 126), ";
  let textoL2_3 = "sus Reglamentos y Normas Eléctricas.";
  //si la cantidad de textoL2 + direccion es menor al total de caracteres
  if(direccion.length+textoL2.length < totalCaractPerLine){
    //dejarla en la misma linea
    y = y+10;
    doc.text(120, y, direccion + ", " + textoL2);
    y = y+10;
    doc.text(120, y, textoL2_1);
  }else{
    //separar la direccion en otra linea
    y = y+10;
    doc.text(120, y, direccion + ", ");
    y = y+10;
    doc.text(120, y, textoL2+ textoL2_2);
    y = y+10;
    doc.text(120, y, textoL2_3);
  }
  y = y+30;
  //+30
  doc.text(120, y, "La presente certificación de factibilidad se otorga bajo el supuesto que el suministro se podrá conectar");
  y = y+10;
  doc.text(120, y, "en las condiciones técnicas de tensión, potencia y número de fases que actualmente posee la red eléctrica");
  y = y+10;
  doc.text(120, y, "donde se conectará el empalme.");
  //+30
  y = y+30;
  doc.text(120, y, "En caso de no cumplirse el supuesto antes indicado, será necesario que el interesado pague los costos");
  y = y+10;
  doc.text(120, y, "de estudios para elaborar proyecto y presupuesto, con el propósito de llegar a un acuerdo comercial");
  y = y+10;
  doc.text(120, y, "con CHILQUINTA ENERGÍA S.A.");

  y = y+30;
  //+30

  //si la cantidad de textoP4L1 + solicitante es menor al total de caracteres
  let textoP4L1 = "Se extiende el presente certificado a solicitud de: ";
  let textoP4L1_2 = ", para los fines que";
  let textoP4L1_3 = "estime conveniente.";
  if(solicitante.length + textoP4L1.length + textoP4L1_2.length < totalCaractPerLine){
    //dejarla en la misma linea
    y = y+10;
    doc.text(120, y, textoP4L1 + solicitante + textoP4L1_2);
    y = y+10;
    doc.text(120, y, textoP4L1_3);
  }else{
    //separar la direccion en otra linea
    y = y+10;
    doc.text(120, y, textoP4L1);
    y = y+10;
    doc.text(120, y, solicitante + textoP4L1_2 + " "+  textoP4L1_3  );

  }

  //+100
  y = y+100;
  doc.text(250, y, "Sintia Paulina Saavedra Castro");
  y = y+10;
  doc.text(250, y, "Asistente Servicio al Cliente");
  y = y+10;
  doc.text(250, y, "Centro de Servicio Valparaíso");
  y = y+10;
  doc.text(250, y, "Subgerencia Servicio al Cliente");

  var hoy = new Date();
  var dd = hoy.getDate();
  var mm = hoy.getMonth()+1; //hoy es 0!
  var yyyy = hoy.getFullYear();

  if(dd<10) {
      dd='0'+dd
  }

  if(mm<10) {
      mm='0'+mm
  }

  hoy = mm+'/'+dd+'/'+yyyy;

//+50
doc.text(120, 620, "Valparaíso, "+hoy);
//+50
doc.setFontSize(6);
doc.text(420, 670, "Dirección: Av. Argentina N°1, piso 9 Casilla 12 V");
doc.text(420, 680, "Fono: (56-32) 245 2000 - Fax: (56-32) 223 1171");
doc.text(420, 690, "Valparaíso - Chile - www.chilquinta.cl");

doc.save("CartaFactigis.pdf");
}


export default exportGraphicsToPDF;
