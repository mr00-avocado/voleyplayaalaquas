function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.nombre || '',
    data.apellidos || '',
    data.fecha_nacimiento || '',
    data.tutor || '',
    data.telefono1 || '',
    data.telefono2 || '',
    data.direccion || '',
    data.municipio || '',
    data.codigo_postal || '',
    data.nivel || '',
    data.grupos || '',
    data.forma_pago || '',
    data.talla_camiseta || '',
    data.autoriza_rgpd || '',
    data.autoriza_comunicaciones || '',
    data.autoriza_imagenes || '',
    data.observaciones || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}