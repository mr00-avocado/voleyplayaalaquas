<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
  <header class="site-header">
    <div class="container site-nav">
      <a class="site-brand" href="<?php echo esc_url(home_url('/')); ?>">Vóley Playa Alaquàs</a>
      <nav class="site-menu" aria-label="Menú principal">
        <?php
        wp_nav_menu(array(
          'theme_location' => 'primary',
          'container' => false,
          'fallback_cb' => false,
          'items_wrap' => '%3$s',
        ));
        ?>
      </nav>
    </div>
  </header>
