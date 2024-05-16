const getVariablesScssContent = obj => {
return `/*
Variables
*/
// Breakpoints
$tablet-portrait-breakpoint: 600;
$tablet-landscape-breakpoint: 768;
$desktop-breakpoint: 992;
$large-breakpoint: 1200;
`;
}

export default getVariablesScssContent;