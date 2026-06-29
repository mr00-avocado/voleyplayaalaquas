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
