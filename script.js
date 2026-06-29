const form = document.getElementById('inscription-form');
const message = document.getElementById('form-message');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const subject = `Solicitud de inscripción - ${data.nombre || 'Sin nombre'}`;
    const body = [
      `Nombre: ${data.nombre || '-'}`,
      `Edad: ${data.edad || '-'}`,
      `Nivel: ${data.nivel || '-'}`,
      `Teléfono: ${data.telefono || '-'}`,
      `Correo electrónico: ${data.email || '-'}`,
      `Disponibilidad: ${data.disponibilidad || '-'}`,
      `Comentarios: ${data.comentarios || '-'}`,
    ].join('\n');

    const mailtoLink = `mailto:voleyplayaalaquas@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    window.open(mailtoLink, '_blank');

    message.textContent = 'Tu solicitud se está preparando para enviarse a nuestro correo de contacto. Si no se abre, escríbenos al 618 75 18 70.';
    form.reset();
  });
}

const galleryGrid = document.getElementById('gallery-grid');
const galleryManifest = 'images/gallery.json';

function createGalleryCard(item) {
  const card = document.createElement('article');
  card.className = 'gallery-card';

  const media = document.createElement('div');
  media.className = 'gallery-media';

  if (item.type === 'video') {
    const video = document.createElement('video');
    video.src = item.src;
    video.controls = true;
    if (item.poster) {
      video.poster = item.poster;
    }
    video.setAttribute('aria-label', item.alt || 'Vídeo de la galería');
    media.appendChild(video);
  } else {
    const image = document.createElement('img');
    image.src = item.src;
    image.alt = item.alt || 'Imagen de la galería';
    media.appendChild(image);
  }

  const caption = document.createElement('p');
  caption.className = 'gallery-caption';
  caption.textContent = item.alt || '';

  card.appendChild(media);
  card.appendChild(caption);
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
