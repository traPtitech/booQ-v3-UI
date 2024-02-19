/* eslint-disable @typescript-eslint/consistent-type-imports */

/**
 * volar global components
 * @see https://github.com/johnsoncodehk/volar/blob/37deac779c407d5de16275fd7f341d1e11b6ad60/extensions/vscode-vue-language-features/README.md#usage
 */

declare module 'vue' {
  export interface GlobalComponents {
    RouterLink: (typeof import('vue-router'))['RouterLink'];
    RouterView: (typeof import('vue-router'))['RouterView'];
  }
}

interface DataAndAriaAttributes {
  [dataAttr: `data${UppercaseAlphabet}${string}`]: unknown;
  [ariaAttr: `aria${UppercaseAlphabet}${string}`]: unknown;
}

declare module '@vue/runtime-dom' {
  interface ImgHTMLAttributes {
    loading?: 'eager' | 'lazy';
  }
  interface HTMLAttributes extends DataAndAriaAttributes {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint
    enterkeyhint?: string;
  }
  interface SVGAttributes extends DataAndAriaAttributes {}
}

declare module '@vue/runtime-core' {
  interface AllowedComponentProps extends DataAndAriaAttributes {
    title?: string;
    id?: string;
  }
}

type UppercaseAlphabet =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

export {};
