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
      {
        index: 0,
        content:
          "https://www.lpl.com/content/dam/lpl-www/images/newsroom/read/insider/insider-blog-meme-stocks-what-do-they-mean_article-hero-450x450.png",
        description: "Something about this meme",
        caption: "cool",
      },
      {
        index: 1,
        content:
          "https://static1.srcdn.com/wordpress/wp-content/uploads/2020/05/Elmo-Flames-Meme.jpg",
        description: "elmo my love",
        caption: "yes",
      },
      {
        index: 2,
        content:
          "https://img.buzzfeed.com/buzzfeed-static/complex/images/mpejsnjjyqb4lwfe27tu/devastated-elmo-photoshop-battle.png?output-format=jpg&output-quality=auto",
        description: "cool desc",
        caption: "talking about something",
      },
      {
        index: 3,
        content:
          "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b1bec78f-8ac8-4cb7-9e3b-a55d809ea91d/dfrbc0x-bd37be0f-1fd0-4b7c-8e15-0d2c45d8bb39.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IxYmVjNzhmLThhYzgtNGNiNy05ZTNiLWE1NWQ4MDllYTkxZFwvZGZyYmMweC1iZDM3YmUwZi0xZmQwLTRiN2MtOGUxNS0wZDJjNDVkOGJiMzkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.rSV_ghuHCU2c5tu9cqR8XGmWL2UOc4bhAYDcSE4lbtc",
        description: "cool desc",
        caption: "caption about something cool",
      },
    ];
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
      </div>
      <dialog-box title="hey more info"></dialog-box>`;
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
