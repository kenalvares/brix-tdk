#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const prompt = require("prompt-sync")({ sigint: true });
let brixConfig = {};

// Returns the name of the project entered when typing `npx create-brix-theme <project-name>`
const getThemeName = () => {
  if (process.argv.length < 3 || process.argv.length > 3) {
    console.log(
      "(!) Please only enter a name without spaces or a name with spaces inside double quotes like:"
    );
    console.log("    npx create-brix-theme myThemeName");
    console.log('    npx create-brix-theme "My Theme Name"');
    process.exit(1);
  } else {
    process.chdir("..");
    return process.argv[2];
  }
}

// Removes all whitespaces in a string
const removeWhiteSpaces = str => str.replace(/\s+/g, '');

// Returns the path to the newly generated theme
const getThemePath = str => path.join(process.cwd(), str);

// Returns Theme URI after basic formatting and validation
const getThemeUri = () => {
  const str = removeWhiteSpaces(prompt("\n* Enter your Theme URL: "));
  if(str.length <= 0 || str == "" || str == undefined || str == null) {return "";}
  return str;
}

// Returns Author Name
const getThemeAuthorName = () => prompt("\n* Enter Author Name: ");

// Returns Author URI after basic formatting and validation
const getThemeAuthorUri = () => {
  const str = removeWhiteSpaces(prompt("\nEnter Author URL: "));
  if(str.length <= 0 || str == "" || str == undefined || str == null) {return "";}
  return str;
}

// Returns Description
const getThemeDescription = () => prompt("\nEnter Theme Description: ");

// Returns minimum required version of WordPress
const getThemeRequiredWp = () => {
  const str = prompt("\nEnter minimum WordPress version requied: ");
  if(str.length <= 0 || str == "" || str == undefined || str == null) {return "5.4";}
  return str;
}

// Returns maximum tested version of WordPress
const getThemeTestedWp = () => {
  const str = prompt("\nEnter last WordPress version tested: ");
  if(str.length <= 0 || str == "" || str == undefined || str == null) {return "5.4";}
  return str;
}

// Returns minimum required version of PHP
const getThemeRequiredPhp = () => {
  const str = prompt("\nEnter minimum PHP version required: ");
  if(str.length <= 0 || str == "" || str == undefined || str == null) {return "5.6";}
  return str;
}

// Returns License Name
const getThemeLicenseName = () => {
  const str = prompt("\nEnter License Name: ");
  if (str.length <= 0 || str == "" || str == undefined || str == null) {return "GNU General Public License v2 or later";}
  return str;
}

// Returns License URI after basic formatting and validation
const getThemeLicenseUri = () => {
  const str = removeWhiteSpaces(prompt("\nEnter License URI: "));
  if(str.length <= 0 || str == "" || str == undefined || str == null) {return "https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html";}
  return str;
}

// Creates parent theme folder after basic formatting and validation
const createThemeFolder = (name, dir) => {
  try {
    console.log("\n* Creating theme folder");
    fs.mkdirSync(dir);
    console.log("    - Successfully created /" + dir);
    process.chdir(dir);
  } catch (err) {
    if (err.code === "EEXIST") {
      console.log(
        `(!) '${name}' already exists in the current directory, please give your theme another name.`
      );
    } else {
      console.log(err);
    }
    process.exit(1);
  }
}

// Creates config folder and brix-config.json to store config info
const createConfig = obj => {
  try {
    console.log("\n* Creating /config folder");
    fs.mkdirSync("./config");
    console.log("    - Successfully created /config");
  } catch (err) {
    console.log(err);
  }

  try {
    console.log("\n* Creating brix-config.json");
    fs.writeFileSync("./config/brix-config.json", JSON.stringify(obj));
    console.log("    - Successfully created brix-config.json");
  } catch (err) {
    console.log(err);
  }
}

// Parses `brixConfig` object into stylesheet header for WordPress
const getStylesheetHeader = obj => {
  return `/*
  Theme Name: ${obj.themeName}
  Theme URI: ${obj.themeUri}
  Author: ${obj.themeAuthorName}
  Author URI: ${obj.themeAuthorUri}
  Description: ${obj.themeDescription}
  Version: ${obj.themeVersion}
  Requires at least: ${obj.themeRequiredWp}
  Tested up to: ${obj.themeTestedWp}
  Requires PHP: ${obj.themeRequiredPhp}
  License: ${obj.themeLicenseName}
  License URI: ${obj.themeLicenseUri}
  Text Domain: ${obj.themeSlug}
  This theme is powered by the Brix Theme Development Kit (TDK), based on Underscores https://underscores.me/, (C) 2012-2020 Automattic, Inc. Underscores is distributed under the terms of the GNU GPL v2 or later. Normalizing styles have been helped along thanks to the fine work of Nicolas Gallagher and Jonathan Neal https://necolas.github.io/normalize.css/
*/\n\n`;
}

const getMainStyles = () => fs.readFileSync(process.cwd() + '/brix-tdk/templates/style.css', 'utf8');

const getRtlStyles = () => fs.readFileSync(process.cwd() + '/brix-tdk/templates/style-rtl.css', 'utf8');

// Creates style.css
const createFile = (name, format, content) => {
  try {
    console.log(`\n* Creating name.${format}`);
    fs.writeFileSync(`./${name}.${format}`, content);
    console.log(`\t- Successfully created ${name}.${format}`);
  } catch (err) {
    console.log(err);
  }
}

const getFunctionsContent = obj => {
  return `<?php
  /**
   * ${obj.themeName} functions and definitions
   *
   * @link https://developer.wordpress.org/themes/basics/theme-functions/
   *
   * @package ${obj.themeSlug}
   */
  
  if ( ! defined( '_BRIX_VERSION' ) ) {
    // Replace the version number of the theme on each release.
    define( '_BRIX_VERSION', '${obj.themeVersion}' );
  }
  
  /**
   * Sets up theme defaults and registers support for various WordPress features.
   *
   * Note that this function is hooked into the after_setup_theme hook, which
   * runs before the init hook. The init hook is too late for some features, such
   * as indicating support for post thumbnails.
   */
  function ${obj.themeSlug}_setup() {
    /*
      * Make theme available for translation.
      * Translations can be filed in the /languages/ directory.
      * If you're building a theme based on ${obj.themeName}, use a find and replace
      * to change '${obj.themeSlug}' to the name of your theme in all the template files.
      */
    load_theme_textdomain( '${obj.themeSlug}', get_template_directory() . '/languages' );
  
    // Add default posts and comments RSS feed links to head.
    add_theme_support( 'automatic-feed-links' );
  
    /*
      * Let WordPress manage the document title.
      * By adding theme support, we declare that this theme does not use a
      * hard-coded <title> tag in the document head, and expect WordPress to
      * provide it for us.
      */
    add_theme_support( 'title-tag' );
  
    /*
      * Enable support for Post Thumbnails on posts and pages.
      *
      * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
      */
    add_theme_support( 'post-thumbnails' );
  
    // This theme uses wp_nav_menu() in one location.
    register_nav_menus(
      array(
        'menu-1' => esc_html__( 'Primary', '${obj.themeSlug}' ),
      )
    );
  
    /*
      * Switch default core markup for search form, comment form, and comments
      * to output valid HTML5.
      */
    add_theme_support(
      'html5',
      array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
      )
    );
  
    // Set up the WordPress core custom background feature.
    add_theme_support(
      'custom-background',
      apply_filters(
        '${obj.themeSlug}_custom_background_args',
        array(
          'default-color' => 'ffffff',
          'default-image' => '',
        )
      )
    );
  
    // Add theme support for selective refresh for widgets.
    add_theme_support( 'customize-selective-refresh-widgets' );
  
    /**
     * Add support for core custom logo.
     *
     * @link https://codex.wordpress.org/Theme_Logo
     */
    add_theme_support(
      'custom-logo',
      array(
        'height'      => 250,
        'width'       => 250,
        'flex-width'  => true,
        'flex-height' => true,
      )
    );
  }
  add_action( 'after_setup_theme', '${obj.themeSlug}_setup' );
  
  /**
   * Set the content width in pixels, based on the theme's design and stylesheet.
   *
   * Priority 0 to make it available to lower priority callbacks.
   *
   * @global int $content_width
   */
  function ${obj.themeSlug}_content_width() {
    $GLOBALS['content_width'] = apply_filters( '${obj.themeSlug}_content_width', 640 );
  }
  add_action( 'after_setup_theme', '${obj.themeSlug}_content_width', 0 );
  
  /**
   * Register widget area.
   *
   * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
   */
  function ${obj.themeSlug}_widgets_init() {
    register_sidebar(
      array(
        'name'          => esc_html__( 'Sidebar', '${obj.themeSlug}' ),
        'id'            => 'sidebar-1',
        'description'   => esc_html__( 'Add widgets here.', '${obj.themeSlug}' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
      )
    );
  }
  add_action( 'widgets_init', '${obj.themeSlug}_widgets_init' );
  
  /**
   * Enqueue scripts and styles.
   */
  function ${obj.themeSlug}_scripts() {
    wp_enqueue_style( '${obj.themeSlug}-style', get_stylesheet_uri(), array(), _BRIX_VERSION );
    wp_style_add_data( '${obj.themeSlug}-style', 'rtl', 'replace' );
  
    wp_enqueue_script( '${obj.themeSlug}-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _BRIX_VERSION, true );
  
    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
      wp_enqueue_script( 'comment-reply' );
    }
  }
  add_action( 'wp_enqueue_scripts', '${obj.themeSlug}_scripts' );
  
  /**
   * Implement the Custom Header feature.
   */
  require get_template_directory() . '/inc/custom-header.php';
  
  /**
   * Custom template tags for this theme.
   */
  require get_template_directory() . '/inc/template-tags.php';
  
  /**
   * Functions which enhance the theme by hooking into WordPress.
   */
  require get_template_directory() . '/inc/template-functions.php';
  
  /**
   * Customizer additions.
   */
  require get_template_directory() . '/inc/customizer.php';
  
  /**
   * Load Jetpack compatibility file.
   */
  if ( defined( 'JETPACK__VERSION' ) ) {
    require get_template_directory() . '/inc/jetpack.php';
  }
  
  /**
   * Load WooCommerce compatibility file.
   */
  if ( class_exists( 'WooCommerce' ) ) {
    require get_template_directory() . '/inc/woocommerce.php';
  }
`;
}

const getIndexContent = obj => {
  return `<?php
  /**
   * The main template file
   *
   * This is the most generic template file in a WordPress theme
   * and one of the two required files for a theme (the other being style.css).
   * It is used to display a page when nothing more specific matches a query.
   * E.g., it puts together the home page when no home.php file exists.
   *
   * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
   *
   * @package ${obj.themeSlug}
   */
  
  get_header();
  ?>
  
    <main id="primary" class="site-main">
  
      <?php
      if ( have_posts() ) :
  
        if ( is_home() && ! is_front_page() ) :
          ?>
          <header>
            <h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
          </header>
          <?php
        endif;
  
        /* Start the Loop */
        while ( have_posts() ) :
          the_post();
  
          /*
           * Include the Post-Type-specific template for the content.
           * If you want to override this in a child theme, then include a file
           * called content-___.php (where ___ is the Post Type name) and that will be used instead.
           */
          get_template_part( 'template-parts/content', get_post_type() );
  
        endwhile;
  
        the_posts_navigation();
  
      else :
  
        get_template_part( 'template-parts/content', 'none' );
  
      endif;
      ?>
  
    </main><!-- #main -->
  
  <?php
  get_sidebar();
  get_footer();
  `;
}

// Main function
const main = () => {
  brixConfig.themeName = getThemeName();
  const themePath = getThemePath(brixConfig.themeName);
  brixConfig.themeSlug = _.snakeCase(brixConfig.themeName);
  brixConfig.themeUri = getThemeUri();
  brixConfig.themeAuthorName = getThemeAuthorName();
  brixConfig.themeAuthorUri = getThemeAuthorUri();
  brixConfig.themeDescription = getThemeDescription();
  brixConfig.themeVersion = "1.0.0";
  brixConfig.themeRequiredWp = getThemeRequiredWp();
  brixConfig.themeTestedWp = getThemeTestedWp();
  brixConfig.themeRequiredPhp = getThemeRequiredPhp();
  brixConfig.themeLicenseName = getThemeLicenseName();
  brixConfig.themeLicenseUri = getThemeLicenseUri();

  brixConfig.initialContent = {};
  brixConfig.initialContent.style = getStylesheetHeader(brixConfig).concat(getMainStyles());
  brixConfig.initialContent.styleRtl = getStylesheetHeader(brixConfig).concat(getRtlStyles());
  brixConfig.initialContent.functions = getFunctionsContent(brixConfig);
  brixConfig.initialContent.index = getIndexContent(brixConfig);

  createThemeFolder(brixConfig.themeName, themePath);

  createFile("style", "css", brixConfig.initialContent.style);

  createFile("style-rtl", "css", brixConfig.initialContent.styleRtl);

  createFile("functions", "php", brixConfig.initialContent.functions);
  
  createFile("index", "php", brixConfig.initialContent.index);

  delete brixConfig.initialContent;

  createConfig(brixConfig);

  try {
    console.log(`\n* Your Brix Theme is ready for use!\nTry 'cd ${themePath}'`);
  } catch (error) {
    console.log(error);
  }

  // console.log(themePath, brixConfig.themeAuthorName, brixConfig.themeUri);
}

main();