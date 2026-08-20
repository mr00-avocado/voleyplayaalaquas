## Guardar inscripciones en Google Sheets

La web puede guardar cada inscripción en una hoja de cálculo de Google y seguir enviando el correo.

1. Crea una hoja nueva en Google Sheets.
2. Abre `Extensiones > Apps Script`.
3. Copia el contenido de `google-apps-script/Code.gs` y pulsa **Implementar > Nueva implementación**.
4. Selecciona **Aplicación web**, ejecuta como tú y permite el acceso a **Cualquier persona**.
5. Copia la URL de la aplicación web.
6. Pega esa URL en `googleSheetsEndpoint` dentro de `script.js`.
7. Publica de nuevo los cambios con `git add .`, `git commit -m "configurar hoja de inscripciones"` y `git push origin main`.

La primera fila que se añada contendrá la fecha y todos los campos del formulario, incluidos los grupos seleccionados.
