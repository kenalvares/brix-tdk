const getComponentsHeaderCenteredScssCode = obj => {
    return `
@use "../abstracts/mixins" as *;

$logo-height: 70px;
$menu-bottom-border: 1px solid black;
$menu-padding: 1rem 0;

.site-header {
    border-bottom: $menu-bottom-border;
    padding: $menu-padding;

    .site-branding {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .custom-logo-link {
        display: inline-block;
        @include box(auto);
        position: relative;

        img {
        @include box(100%, $logo-height);
        object-fit: contain;
        }
    }

    .site-title {
        margin: 0;

        a {
        text-decoration: none;
        }
    }

    .site-description {
        margin: 0;
    }
    }

    .main-navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    button.menu-toggle {
        @include box(auto);
        overflow: visible;
        padding: 0.6em 1em;
        background: transparent;
        /* inherit font & color from ancestor */
        color: inherit;
        font: inherit;
        /* Normalize 'line-height'. Cannot be changed from 'normal' in Firefox 4+. */
        line-height: normal;
        /* Corrects font smoothing for webkit */
        -webkit-font-smoothing: inherit;
        -moz-osx-font-smoothing: inherit;
        /* Corrects inability to style clickable 'input' types in iOS */
        -webkit-appearance: none;

        i {
        margin-right: 0.5rem;
        }
    }

    > div {
        @include box(100%, auto);

        .menu {
        li {
            text-align: center;
        }
        }

        @include tablet-portrait {
        @include box(auto);
        }
    }
    }
}
`;
}

export default getComponentsHeaderCenteredScssCode;