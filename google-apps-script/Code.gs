function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    
    if (!e.postData || !e.postData.contents) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'No hay datos' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.fecha_hora || new Date(),
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
  } catch (error) {
    Logger.log('Error en doPost: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}