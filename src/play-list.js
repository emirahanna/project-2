import { LitElement, html, css } from "lit";

export class PlayList extends LitElement {
  static get tag() {
    return "play-list";
  }

  constructor() {
    super();
    this.index = 0;
    this.slides = [1, 2, 3, 4];
  }

  static get styles() {
    return css`
      :host {
        background-color: white;
        color: black;
        display: block;
        width: 20vw;
        padding: 20px;
        margin-bottom: 20px;
      }
    `;
  }

  render() {
    return html`<div>
      <p>Index = ${this.index}</p>
      <p>Slides:</p>
        ${this.displaySlides()}
    </div>`;
  }

  displaySlides() {
    return this.slides.map((slide, index) => {
      return html`<p>Slide ${slide} of ${this.slides.length}</p>`;
    });
  }

  static get properties() {
    return {
      index: { type: Number, Reflect: true },
      slides: { type: Array, Reflect: true },
    };
  }
}

globalThis.customElements.define(PlayList.tag, PlayList);
