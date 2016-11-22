<?
$rutCliente 	= '11111111-1';
$nombre			= 'JUAN ALBERTO';
$apellido 		= 'PEREZ COTAPO';
$telefono		= '991111111';
$email			= 'JPCOTAPO@MAIL.CL';
$tpResidencia   = 'RESIDENCIAL';
$direccion 		= 'AV ARGENTINA 1';
$comuna 		= 'VALPARAISO';
$tpEmpalme 		= 'BT';
$estadoTramite 	= 'NUEVA';
$tpFactibilidad = 'FACTIBILIDAD ASISTIDA';
$empalme 		= 'SUBTERRANEO';
$fase 			= 'TRIFASICO';
$potencia 		= '10';
$potenciaCalc	= '10';
$origenFact		= 'VENTA DE EMPALMES WEB';
$nrEmpalme		= '1';
$tiempoEmp	 	= 'DEFINITIVO';
?>

<html>
	<head>
		<title>Env&iacute;o de par&aacute;metros a FactiGIS</title>
	</head>
	<body>
		<table border="1" width="90%">
			<!-- cambiar fin.html por http://gisred.chilquinta/factigisVentaWeb/index.html -->
			<form method="get" action="fin.html">
				<input type="hidden" name="rutCliente" 		value="<?=$rutCliente?>" 		/>
				<input type="hidden" name="nombre" 			value="<?=$nombre?>" 			/>
				<input type="hidden" name="apellido" 		value="<?=$apellido?>" 			/>
				<input type="hidden" name="telefono" 		value="<?=$telefono?>" 			/>
				<input type="hidden" name="email" 			value="<?=$email?>" 			/>
				<input type="hidden" name="tpResidencia" 	value="<?=$tpResidencia?>" 		/>
				<input type="hidden" name="direccion" 		value="<?=$direccion?>" 		/>
				<input type="hidden" name="comuna" 			value="<?=$comuna?>" 			/>
				<input type="hidden" name="tpEmpalme" 		value="<?=$tpEmpalme?>" 		/>
				<input type="hidden" name="estadoTramite" 	value="<?=$estadoTramite?>" 	/>
				<input type="hidden" name="tpFactibilidad" 	value="<?=$tpFactibilidad?>" 	/>
				<input type="hidden" name="empalme" 		value="<?=$empalme?>" 			/>
				<input type="hidden" name="fase" 			value="<?=$fase?>" 				/>
				<input type="hidden" name="potencia" 		value="<?=$potencia?>" 			/>
				<input type="hidden" name="potenciaCalc" 	value="<?=$potenciaCalc?>" 		/>
				<input type="hidden" name="origenFact" 		value="<?=$origenFact?>" 		/>
				<input type="hidden" name="nrEmpalme" 		value="<?=$nrEmpalme?>" 		/>
				<input type="hidden" name="tiempoEmp" 		value="<?=$tiempoEmp?>" 		/>
				<tr>
					<td align="center">
						<input type="submit" value="Enviar" />
					</td>
				</tr>
			</form>
		</table>
	</body>
</html>