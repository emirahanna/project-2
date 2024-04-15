import { LitElement, html, css } from "lit";

/**
 * Now it's your turn. Here's what we need to try and do:
 * 1. Get you HTML from your card working in here
 * 2. Get your CSS rescoped as needed to work here
 */

export class MediaImage extends LitElement {
  static get tag() {
    return "media-image";
  }

  constructor() {
    super();
    this.image =
      "https://preview.redd.it/02411nxds2m91.png?width=640&crop=smart&auto=webp&s=3a91ab902fdab402e4bcb84a3907bb0a2bad2d9b";
    this.caption = "caption";
    this.description = "description";
  }

  static get styles() {
    return css`
      :host {
        --media-image-primary-color-1: #333;
        --media-image-primary-color-2: navy;
        --media-image-primary-color-3: yellow;
        --media-image-secondary-color-1: white;
        --media-image-secondary-color-2: lightgray;
        --media-image-secondary-color-3: red;
        background-color: white;
        color: black;
        display: block;
        width: 20vw;
        padding: 20px;
        margin-bottom: 20px;
        text-align: center;
      }

      .image {
        width: 50%;
        height: auto;
      }
      .info-panel {
        display: block;
        text-align: left;
      }
      .button-panel {
        display: inline-flex;
        margin: auto;
        padding: auto;  
      }
    `;
  }

  render() {
    return html`<div>
      <img class="image" src="${this.image}" />
      <div class="image-panel">
        <div class="info-panel">
          <h1>${this.caption}</h1>
          <p>${this.description}</p>
        </div>
        <div class="button-panel"><button>←</button><button>→</button></div>
      </div>
    </div>`;
  }

  static get properties() {
    return {
      image: { type: String, Reflect: true },
      caption: { type: String, Reflect: true },
      description: { type: String, Reflect: true },
    };
  }
}

globalThis.customElements.define(MediaImage.tag, MediaImage);
