const form = document.getElementById('inscription-form');
const message = document.getElementById('form-message');
const googleSheetsEndpoint = 'https://script.google.com/macros/s/AKfycbwP-lW1P9jBM9pBkSmNsvg0eZbaGBJXoysOgweSKG9ej7hR-HiO8BbIpB5OSj3mbkYl/exec';

// Función para convertir fecha a formato DD-MM-YYYY
function formatearFecha(fecha) {
  if (!fecha) return '';
  const date = new Date(fecha + 'T00:00:00');
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  return `${dia}-${mes}-${ano}`;
}

// Función para obtener fecha y hora actual en formato DD-MM-YYYY HH:MM:SS
function obtenerFechaHoraActual() {
  const ahora = new Date();
  const dia = String(ahora.getDate()).padStart(2, '0');
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const ano = ahora.getFullYear();
  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  const segundos = String(ahora.getSeconds()).padStart(2, '0');
  return `${dia}-${mes}-${ano} ${horas}:${minutos}:${segundos}`;
}

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const grupos = Array.from(form.querySelectorAll('input[name="grupos"]:checked'))
      .map((input) => input.value);

    const sheetData = {
      fecha_hora: obtenerFechaHoraActual(),
      ...data,
      fecha_nacimiento: formatearFecha(data.fecha_nacimiento),
      grupos: grupos.join(', '),
      autoriza_rgpd: data.autoriza_rgpd ? 'Sí' : 'No',
      autoriza_comunicaciones: data.autoriza_comunicaciones ? 'Sí' : 'No',
      autoriza_imagenes: data.autoriza_imagenes ? 'Sí' : 'No',
    };

    if (googleSheetsEndpoint) {
      try {
        const response = await fetch(googleSheetsEndpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetData),
        });
        console.log('Datos guardados en Google Sheets:', response);
      } catch (error) {
        console.error('Error al guardar en Google Sheets:', error);
        message.textContent = 'No se pudo guardar la inscripción en la hoja. Inténtalo de nuevo.';
        return;
      }
    }

    // Compilar datos para el email
    const datosPersonales = [
      `Nombre: ${data.nombre || '-'}`,
      `Apellidos: ${data.apellidos || '-'}`,
      `Fecha de nacimiento: ${formatearFecha(data.fecha_nacimiento) || '-'}`,
      `Padre/Madre/Tutor/a: ${data.tutor || '-'}`,
      `Teléfono 1: ${data.telefono1 || '-'}`,
      `Teléfono 2: ${data.telefono2 || '-'}`,
      `Dirección: ${data.direccion || '-'}`,
      `Municipio: ${data.municipio || '-'}`,
      `Código postal: ${data.codigo_postal || '-'}`,
    ].join('\n');

    const datosInscripcion = [
      `Nivel: ${data.nivel || '-'}`,
      `Grupo o grupos preferidos: ${grupos.length ? grupos.join(', ') : '-'}`,
      `Forma de pago: ${data.forma_pago || '-'}`,
      `Talla camiseta: ${data.talla_camiseta || '-'}`,
    ].join('\n');

    const autorizaciones = [
      `RGPD: ${data.autoriza_rgpd ? 'Sí' : 'No'}`,
      `Comunicaciones (teléfono/WhatsApp): ${data.autoriza_comunicaciones ? 'Sí' : 'No'}`,
      `Uso de imágenes: ${data.autoriza_imagenes ? 'Sí' : 'No'}`,
    ].join('\n');

    const subject = `Inscripción - ${data.nombre || 'Sin nombre'} ${data.apellidos || ''}`;
    const body = [
      'FORMULARIO DE INSCRIPCIÓN',
      '=========================',
      `Fecha de envío: ${obtenerFechaHoraActual()}`,
      '',
      'A. DATOS PERSONALES',
      datosPersonales,
      '',
      'B. INSCRIPCIÓN',
      datosInscripcion,
      '',
      'C. AUTORIZACIONES',
      autorizaciones,
      '',
      'D. OBSERVACIONES',
      data.observaciones || '(Sin observaciones)',
    ].join('\n');

    const mailtoLink = `mailto:voleyplayaalaquas@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    message.textContent = '✓ Formulario preparado. Si no se abre el correo, escríbenos a voleyplayaalaquas@gmail.com o llama al 618 75 18 70.';
    form.reset();
  });
}

const galleryGrid = document.getElementById('gallery-grid');
const galleryManifest = 'images/gallery.json?t=' + Date.now();

function createGalleryCard(item) {
  const card = document.createElement('article');
  card.className = 'gallery-card';

  const media = document.createElement('div');
  media.className = 'gallery-media';

  if (item.type === 'video') {
    const video = document.createElement('video');
    video.src = 'images/' + item.src;
    video.controls = true;
    if (item.poster) {
      video.poster = 'images/' + item.poster;
    }
    video.setAttribute('aria-label', item.alt || 'Vídeo de la galería');
    media.appendChild(video);
  } else {
    const image = document.createElement('img');
    image.src = 'images/' + item.src;
    image.alt = item.alt || 'Imagen de la galería';
    media.appendChild(image);
  }

  card.appendChild(media);
  return card;
}

async function loadGallery() {
  if (!galleryGrid) return;

  try {
    const response = await fetch(galleryManifest);
    if (!response.ok) {
      throw new Error('No se encontró el manifiesto de la galería.');
    }

    const items = await response.json();
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('No hay elementos en la galería.');
    }

    galleryGrid.innerHTML = '';
    items.forEach((item) => {
      galleryGrid.appendChild(createGalleryCard(item));
    });
  } catch (error) {
    galleryGrid.innerHTML = `
      <div class="gallery-empty">
        La galería se llenará cuando añadas tus fotos o vídeos a <code>images/</code> y completes <code>images/gallery.json</code>.
      </div>
    `;
  }
}

loadGallery();
