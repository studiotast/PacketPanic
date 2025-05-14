/// <reference types="node" />

/**
 * SCSS modules
 */
declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

/**
 * Regular SCSS imports
 */
declare module "*.scss" {
  const content: { readonly [key: string]: string };
  export default content;
}

/**
 * CSS modules
 */
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

/**
 * Regular CSS imports
 */
declare module "*.css" {
  const content: { readonly [key: string]: string };
  export default content;
}
