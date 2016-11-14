var tipoCliente = [
	{ value: 'RESIDENCIAL', label: 'RESIDENCIAL' },
	{ value: 'COMERCIAL', label: 'COMERCIAL' },
	{ value: 'ESTATAL', label: 'ESTATAL' },
	{ value: 'INDUSTRIAL', label: 'INDUSTRIAL' },
	{ value: 'MUNICIPAL', label: 'MUNICIPAL'},
	{ value: 'AGRICOLA', label: 'AGRICOLA' },
	{ value: 'UTILIDAD PUBLICA', label: 'UTILIDAD PUBLICA' }
];

var tipoCantidadEmpalmes = [
	{ value: '1', label: '1' },
	{ value: '2', label: '2' },
	{ value: '3', label: '3' },
	{ value: '4', label: '4' },
	{ value: '5', label: '5'}
];

var tipoContribuyente = [
	{ value: 'PERSONA NATURAL', label: 'PERSONA NATURAL' },
	{ value: 'PERSONA JURIDICA', label: 'PERSONA JURIDICA' },
	{ value: 'AUTOCONSUMO', label: 'AUTOCONSUMO' }
];

var tipoEmpalme = [
	{ value: 'AEREO', label: 'AÉREO'},
	{ value: 'SUBTERRANEO', label: 'SUBTERRÁNEO' }
];

var tipoAereo = [
	{ value: 'AEREO', label: 'AÉREO'}
];

var tipoSubterraneo = [
	{ value: 'SUBTERRANEO', label: 'SUBTERRÁNEO' }
];

var tipoMonoTri=[
	{ value: 'MONOFASICO', label: 'MONOFÁSICO'},
	{ value: 'TRIFASICO', label: 'TRIFÁSICO' }
];

var tipoPotencia = [
	{ value: '0.60', label: '0.60'},
	{ value: '1.23', label: '1.23'},
	{ value: '2', label: '1.23'},
	{ value: '3', label: '1.23'},
	{ value: '4', label: '1.23'},
	{ value: '5', label: '1.23'},
	{ value: '6', label: '1.23'},
	{ value: '7', label: '1.23'},
	{ value: '8', label: '1.23'}

];

var tipoEmpalmeBTMT = [
	{ value: 'BT', label: 'BT' },
	{ value: 'MT', label: 'MT' }
];


//FOR ADDRESS
var tipoEdificacion = [
	{ value: 'AREA VERDE', label: 'AREA VERDE' },
	{ value: 'CASA', label: 'CASA' },
	{ value: 'CEMENTERIO', label: 'CEMENTERIO' },
	{ value: 'CENTRO RECREATIVO', label: 'CENTRO RECREATIVO' },
	{ value: 'CONDOMINIO', label: 'CONDOMINIO' },
	{ value: 'CONGRESO', label: 'CONGRESO' },
	{ value: 'EDIFICIO', label: 'EDIFICIO' },
	{ value: 'EDIFICIO CORPORATIVO', label: 'EDIFICIO CORPORATIVO' },
	{ value: 'EN ACTUALIZACION', label: 'EN ACTUALIZACION' },
	{ value: 'ESTACION DE METRO', label: 'ESTACION DE METRO' },
	{ value: 'ESTACIONAMIENTO', label: 'ESTACIONAMIENTO' },
	{ value: 'ESTADIO', label: 'ESTADIO' },
	{ value: 'GALERIA COMERCIAL', label: 'GALERIA COMERCIAL' },
	{ value: 'HIPODROMO', label: 'HIPODROMO' },
	{ value: 'INDUSTRIA', label: 'INDUSTRIA' },
	{ value: 'KIOSCO', label: 'KIOSCO' },
	{ value: 'LOCAL COMERCIAL', label: 'LOCAL COMERCIAL' },
	{ value: 'MALL', label: 'MALL' },
	{ value: 'MEDIDOR', label: 'MEDIDOR' },
	{ value: 'PARQUES', label: 'PARQUES' },
	{ value: 'PISCINA', label: 'PISCINA' },
	{ value: 'PLAZA', label: 'PLAZA' },
	{ value: 'POSTE', label: 'POSTE' },
	{ value: 'SITIO AGRICOLA', label: 'SITIO AGRICOLA' },
	{ value: 'SITIO ERIAZO', label: 'SITIO ERIAZO' },
	{ value: 'STRIPCENTER', label: 'STRIPCENTER' }

];

//FOR search
var tipoElementoRotulo = [
	{ value: 'POSTE', label: 'POSTE' },
	{ value: 'CAMARA', label: 'CÁMARA' }
];


//for clasificacion
var tipoClasificacion = [
	{ value: 'NUEVO', label: 'NUEVO' },
	{ value: 'AUMENTO CAPACIDAD', label: 'AUMENTO CAPACIDAD' },
	{ value: 'TRANSLADO', label: 'TRANSLADO' },
	{ value: 'RECONEXION', label: 'RECONEXIÓN' }
];
export {tipoCliente,tipoContribuyente,tipoEmpalme,tipoAereo,tipoSubterraneo, tipoMonoTri,
		tipoEmpalmeBTMT, tipoPotencia, tipoEdificacion, tipoCantidadEmpalmes, tipoElementoRotulo, tipoClasificacion}
