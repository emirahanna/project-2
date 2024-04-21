import { LitElement, html, css } from "lit";
import { MediaImage } from "./media-image.js";

export class PlayList extends LitElement {
  static get tag() {
    return "play-list";
  }

  constructor() {
    super();
    
  }

  static get styles() {
    return css`
      :host {
        background-color: white;
        color: black;
        display: grid;
        width: 70vw;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 8px;
        justify-content: center;
      }
    `;
  }

  render() {
    return html`<div>
      <button class="prev-button" @click=${this.prevSlide} ?disabled="${this.index===0}">←</button>
      <div>
        ${this.slides.map((slide) => this.displaySlide(slide))}
        </div>
          <button class="next-button" @click=${this.nextSlide} ?disabled="${this.index===this.slides.length - 1}">→</button>
        </div>
      </div>`;
  }

  displayIndex() {
    return html` <p>${this.index} of ${this.slides.length}</p>`;
  }

  displaySlide(slide) {
    if (slide.index === this.index) {
      return html`<media-image
        index="${slide.index}"
        content="${slide.content}"
        description="${slide.description}"
        caption="${slide.caption}"
      ></media-image>
      <p>Slide ${this.index + 1} / ${this.slides.length}</p>`;
    }
  }

  nextSlide() {
    if (this.index < this.slides.length - 1) {
      this.index++;
      this.requestUpdate(); //see if i can use something else here so I don't update the whole component
    }

  }
  prevSlide() {
    if (this.index > 0) {
      this.index--;
      this.requestUpdate(); //see if i can use something else here so I don't update the whole component
    }

  }

  static get properties() {
    return {
      index: { type: Number, Reflect: true },
      slides: { type: Array, Reflect: true },
    };
  }
}

globalThis.customElements.define(PlayList.tag, PlayList);
