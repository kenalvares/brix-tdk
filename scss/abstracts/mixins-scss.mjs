const getMixinsScssContent = (obj) => {
  return `/*
Mixins
*/
// Defines width and height. Usage:
// div {
//   // You can pass width && height
//   @include box(200px, 300px);
//   /* or just pass width and the height
//      will default to the width value */
//   @include box(200px);
// }
@mixin box($width, $height: $width) {
    width: $width;
    height: $height;
}

// Defines font-size, line-height and letter-spacing. Usage:
// p {
//   @include font-size(12, 18, 1.2);
//   // returns
//   font-size: 12px;
//   line-height: 1.5; // 18 / 12
//   letter-spacing: 0.1em;
// }
@mixin font-size($font-size, $line-height: normal, $letter-spacing: normal) {
    font-size: $font-size * 1px;
    // font-size: $font-size * 0.1rem;
    // example using rem values and 62.5% font-size so 1rem = 10px

    @if $line-height==normal {
        line-height: normal;
    } @else {
        line-height: $line-height / $font-size;
    }

    @if $letter-spacing==normal {
        letter-spacing: normal;
    } @else {
        letter-spacing: #{$letter-spacing / $font-size}em;
    }
}

// Makes a background cover image. Usage:
//   div {
//     background-image: url("cute-doggo.png");
//     @include cover-background;
//   }
@mixin cover-background {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

// Adds width, height, display, position and content for pseudo elements. Usage:
// div {
//   position: relative;
//   width: 200px;
//   height: 200px;
//
//   &:after {
//     @include pseudo(100px, 100px);
//   }
// }
@mixin pseudo(
    $width: 100%,
    $height: 100%,
    $display: inline-block,
    $pos: absolute,
    $content: ""
) {
    content: $content;
    display: $display;
    position: $pos;
    @include box($width, $height);
}

// Responsive Breakpoints. Usage:
// h1 {
//   font-size: 10px;

//   @include tablet-portrait {
//     font-size: 12px;
//   }

//   @include desktop {
//     font-size: 20px;
//   }
// }
@mixin tablet-portrait {
    @media only screen and (min-width: $tablet-portrait-breakpoint * 1px) {
        @content;
    }
}

@mixin tablet-landscape {
    @media only screen and (min-width: $tablet-landscape-breakpoint * 1px) {
        @content;
    }
}

@mixin desktop {
    @media only screen and (min-width: $desktop-breakpoint * 1px) {
        @content;
    }
}

@mixin large {
    @media only screen and (min-width: $large-breakpoint * 1px) {
        @content;
    }
}`;
};

export default getMixinsScssContent;
