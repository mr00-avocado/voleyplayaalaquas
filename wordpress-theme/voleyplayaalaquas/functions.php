<?php
function voleyplayaalaquas_theme_setup() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  register_nav_menus(array(
    'primary' => __('Menú principal', 'voleyplayaalaquas'),
  ));
}
add_action('after_setup_theme', 'voleyplayaalaquas_theme_setup');

function voleyplayaalaquas_theme_scripts() {
  wp_enqueue_style('voleyplayaalaquas-style', get_stylesheet_uri(), array(), '1.0.0');
}
add_action('wp_enqueue_scripts', 'voleyplayaalaquas_theme_scripts');

function voleyplayaalaquas_handle_form() {
  if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['voley_submit'])) {
    return;
  }

  $nombre = sanitize_text_field($_POST['nombre'] ?? '');
  $edad = sanitize_text_field($_POST['edad'] ?? '');
  $nivel = sanitize_text_field($_POST['nivel'] ?? '');
  $telefono = sanitize_text_field($_POST['telefono'] ?? '');
  $email = sanitize_email($_POST['email'] ?? '');
  $disponibilidad = sanitize_text_field($_POST['disponibilidad'] ?? '');
  $comentarios = sanitize_textarea_field($_POST['comentarios'] ?? '');

  $to = get_option('admin_email');
  $subject = 'Solicitud de inscripción - ' . ($nombre ?: 'Sin nombre');
  $message = sprintf(
    "Nombre: %s\nEdad: %s\nNivel: %s\nTeléfono: %s\nCorreo electrónico: %s\nDisponibilidad: %s\nComentarios: %s",
    $nombre,
    $edad,
    $nivel,
    $telefono,
    $email,
    $disponibilidad,
    $comentarios
  );

  $sent = wp_mail($to, $subject, $message);

  if ($sent) {
    set_transient('voley_form_notice', 'Tu solicitud ha sido enviada correctamente. Nos pondremos en contacto contigo pronto.', 60);
  } else {
    set_transient('voley_form_notice', 'No se pudo enviar la solicitud en este momento. Puedes escribirnos al 618 75 18 70.', 60);
  }

  wp_safe_redirect(home_url('/#inscripciones'));
  exit;
}
add_action('init', 'voleyplayaalaquas_handle_form');

function voleyplayaalaquas_form_notice() {
  if ($notice = get_transient('voley_form_notice')) {
    echo '<p class="form-message" role="status">' . esc_html($notice) . '</p>';
    delete_transient('voley_form_notice');
  }
}
