import { LitElement, html, css } from "lit";
import { MediaImage } from "./media-image.js";

export class PlayList extends LitElement {
  static get tag() {
    return "play-list";
  }



  constructor() {
    super();
    this.index = 0;
    this.slides = [
      "https://www.lpl.com/content/dam/lpl-www/images/newsroom/read/insider/insider-blog-meme-stocks-what-do-they-mean_article-hero-450x450.png",
      "https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?format=pjeg&auto=webp&crop=16:9",
      "https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale",
      "https://cdn.vox-cdn.com/thumbor/VZNJM5S4Cw2i3JaycT9waVLCwqw=/715x248:1689x721/1200x800/filters:focal(972x299:1278x605)/cdn.vox-cdn.com/uploads/chorus_image/image/69305239/shrek4_disneyscreencaps.com_675.0.jpg",
    ];
  }

  static get styles() {
    return css`
      :host {
        background-color: white;
        color: black;
        display: block;
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
      ${this.displaySlide()}
      <div class="info-panel"><button @click=${this.prevSlide}>←</button><button @click=${this.nextSlide}>→</button>
      <p>Slide ${this.index + 1} / ${this.slides.length}</p></div>
    </div>`;
  }

  displayIndex() {
    return html` <p>${this.index} of ${this.slides.length}</p>`;
  }

  displaySlide() {
    return html`<media-image content="${this.slides[this.index]}" caption="peepeepoopoo"></media-image>`;
  }

  nextSlide() {
    if (this.index < this.slides.length - 1){
    this.index++;
    this.requestUpdate(); //see if i can use something else here so I don't update the whole component
  }
  }
  prevSlide() {
    if (this.index > 0){
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
