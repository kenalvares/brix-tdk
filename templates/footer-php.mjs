/*
    footer.php
*/
const getFooterPhpCode = (obj) => {
  return `
<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package ${obj.themeSlug}
 */

?>

    <footer id="colophon" class="site-footer">
        <div class="site-info">
            <a href="<?php echo esc_url( __( 'https://forwwward.co/brix-tdk', '${obj.themeSlug}' ) ); ?>">
                <?php
                printf( esc_html__( 'Powered by %s', '${obj.themeSlug}' ), 'Brix-TDK' );
                ?>
            </a>
        </div><!-- .site-info -->
    </footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
`;
};

export default getFooterPhpCode;
