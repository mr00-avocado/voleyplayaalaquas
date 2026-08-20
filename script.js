const form = document.getElementById('inscription-form');
const message = document.getElementById('form-message');
const googleSheetsEndpoint = '';

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const grupos = Array.from(form.querySelectorAll('input[name="grupos"]:checked'))
      .map((input) => input.value);

    const sheetData = {
      ...data,
      grupos: grupos.join(', '),
      autoriza_rgpd: data.autoriza_rgpd ? 'Sí' : 'No',
      autoriza_comunicaciones: data.autoriza_comunicaciones ? 'Sí' : 'No',
      autoriza_imagenes: data.autoriza_imagenes ? 'Sí' : 'No',
    };

    if (googleSheetsEndpoint) {
      try {
        await fetch(googleSheetsEndpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(sheetData),
        });
      } catch (error) {
        message.textContent = 'No se pudo guardar la inscripción en la hoja. Inténtalo de nuevo.';
        return;
      }
    }

    // Compilar datos para el email
    const datosPersonales = [
      `Nombre: ${data.nombre || '-'}`,
      `Apellidos: ${data.apellidos || '-'}`,
      `Fecha de nacimiento: ${data.fecha_nacimiento || '-'}`,
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
