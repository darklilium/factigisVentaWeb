import React from 'react';
import ReactDOM from 'react-dom';
import cookieHandler from 'cookie-handler';


class FactigisCarta extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      open : false,
      myElements: []
    }

  }

  open(){
    this.setState({open: true});

  }
  closed(){
    this.setState({open: false})
  }
  componentWillMount(){
    //if theres no cookie, the user cannot be in factigis Carta.
  /*  if(!cookieHandler.get('usrprmssns')){
      window.location.href = "index.html";
      return;
    }
  */  
    //else , charge the modules that the user has permissions
    this.setState({myElements: cookieHandler.get('myLetter') });

  }

  render(){
    var direccion = this.state.myElements[0];
    var solicitante = this.state.myElements[1];
    var ejecutor = this.state.myElements[2];
    var folio = this.state.myElements[3];
    var cargo = this.state.myElements[4];
    var lugar = this.state.myElements[5];
    var departamento = this.state.myElements[6];
    var lugarEmision = this.state.myElements[7];


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

    //dev
    let image = "dist/css/images/factigis_images/logo_chq400.png";
    //prod
    //let image = "css/images/factigis_images/logo_chq400.png";

    return (
    <div className="wrapper_factigisCarta">
      <img className="factigisCarta_img" src={image}></img>
      <h4 className="factigisCarta_h4">Folio N°  {folio}</h4>
      <h3 className="factigisCarta_h3">CERTIFICADO DE FACTIBILIDAD</h3>
      <br />
      <p className="factigisCarta_p p1"><b>CHILQUINTA ENERGÍA S.A.,</b> certifica la factibilidad de suministro de energía eléctrica en la propiedad {direccion}, según lo indicado en el DFL N° 4 del año 2006, Ministerio de Minería (artículos 125 y 126), sus Reglamentos y Normas Eléctricas.</p>
      <p className="factigisCarta_p p2">La presente certificación de factibilidad se otorga bajo el supuesto que el suministro se podrá conectar en las condiciones técnicas de tensión, potencia y número de fases que actualmente posee la red eléctrica donde se conectará el empalme.</p>
      <p className="factigisCarta_p p3">En caso de no cumplirse el supuesto antes indicado, será necesario que el interesado pague los costos de estudios para elaborar proyecto y presupuesto, con el propósito de llegar a un acuerdo comercial con CHILQUINTA ENERGÍA S.A.</p>
      <p className="factigisCarta_p p4">Se extiende el presente certificado a solicitud de <b>{solicitante}</b>, para los fines que estime conveniente.</p>

      <p className="factigisCarta_p p5">{ejecutor}<br/>{cargo}<br/>{lugar}<br/>{departamento}</p>
      <p className="factigisCarta_fecha">{lugarEmision}, {hoy}</p>
      <p className="factigisCarta_pie">Dirección: Av. Argentina N°1, piso 9, Casilla 12V<br />Fono: (56-32) 245 2000 - Fax: (56-32) 223 1171 <br/>Valparaíso - Chile - www.chilquinta.cl</p>

    </div>
  );
  }
}

export default FactigisCarta;
