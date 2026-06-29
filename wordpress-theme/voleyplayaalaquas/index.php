<?php get_header(); ?>

<main>
  <section class="hero" id="inicio">
    <div class="container hero-content">
      <div>
        <p class="eyebrow">Escuela activa y cercana</p>
        <h1>Tu próxima temporada de vóley playa empieza aquí</h1>
        <p class="lead">Formamos jugadores y amantes del vóley playa en Alaquàs con clases, entrenamientos y un proceso de inscripción rápido y sencillo.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#inscripciones">Inscribirme ahora</a>
          <a class="btn btn-secondary" href="#contacto">Hablar con nosotros</a>
        </div>
        <div class="hero-meta">
          <span>📞 618 75 18 70</span>
          <span>✉️ [correo]</span>
        </div>
      </div>
      <div class="hero-card">
        <h3>¿Qué incluye?</h3>
        <ul>
          <li>Clases para principiantes y niveles intermedios</li>
          <li>Entrenamientos para mejorar técnica y juego</li>
          <li>Asesoría rápida para reservar tu plaza</li>
        </ul>
        <p class="card-note">Inscripción sencilla en pocos minutos.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="servicios">
    <div class="section-heading">
      <p class="eyebrow">Servicios</p>
      <h2>Una escuela pensada para disfrutar y progresar</h2>
    </div>
    <div class="cards-grid">
      <article class="card">
        <h3>Clases</h3>
        <p>Sesiones guiadas para aprender fundamentos, coordinación y juego en equipo.</p>
      </article>
      <article class="card">
        <h3>Entrenamientos</h3>
        <p>Rutas de mejora para quienes ya tienen experiencia y quieren avanzar.</p>
      </article>
      <article class="card">
        <h3>Actividades de grupo</h3>
        <p>Ambiente cercano, dinámico y muy participativo para compartir la pasión por el deporte.</p>
      </article>
    </div>
  </section>

  <section class="section alt-section" id="inscripciones">
    <div class="container two-columns">
      <div>
        <p class="eyebrow">Inscripciones</p>
        <h2>Haz tu reserva en tres pasos</h2>
        <div class="steps">
          <div class="step">
            <strong>1. Rellena el formulario</strong>
            <p>Indica tus datos y el nivel de juego.</p>
          </div>
          <div class="step">
            <strong>2. Nos pondremos en contacto</strong>
            <p>Te confirmaremos disponibilidad y próximos horarios.</p>
          </div>
          <div class="step">
            <strong>3. Confirma tu plaza</strong>
            <p>Te guiaremos para completar la inscripción sin complicaciones.</p>
          </div>
        </div>
      </div>

      <form method="post" class="form-card">
        <h3>Solicitud de inscripción</h3>
        <input type="hidden" name="voley_submit" value="1">
        <?php voleyplayaalaquas_form_notice(); ?>
        <label>Nombre completo
          <input type="text" name="nombre" placeholder="Tu nombre" required>
        </label>
        <label>Edad
          <input type="number" name="edad" min="5" max="100" placeholder="Ej. 16" required>
        </label>
        <label>Nivel
          <select name="nivel" required>
            <option value="">Selecciona una opción</option>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </label>
        <label>Teléfono
          <input type="tel" name="telefono" placeholder="618 75 18 70" required>
        </label>
        <label>Correo electrónico
          <input type="email" name="email" placeholder="[correo]" required>
        </label>
        <label>Disponibilidad
          <input type="text" name="disponibilidad" placeholder="Ej. tardes, fines de semana">
        </label>
        <label>Comentarios
          <textarea name="comentarios" rows="4" placeholder="Cuéntanos algo más sobre ti o tus preferencias"></textarea>
        </label>
        <button class="btn btn-primary full-width" type="submit">Enviar solicitud</button>
      </form>
    </div>
  </section>
</main>

<?php get_footer(); ?>
