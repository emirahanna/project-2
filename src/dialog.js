import { LitElement, html, css } from "lit";

export class Dialog extends LitElement {
  static get tag() {
    return "dialog-box";
  }

  constructor() {
    super();
    this.title = "title";
    this.text = "text";
    this.open = false;
    this.index = 0;
    this.slides = this.populateSlide || [
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
        display: block;
        height: 100%;
        width: 70%;
      }

      
      .container {
        padding: 20px;
        position: fixed;
        transition: all 250ms ease-in;
        border-radius: 8px;
        background-color: white;
        border: 1px solid black; /* Ensure it's above other content */
        z-index: 999;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); /* Center the element itself */
      }
      .container::before{
        width:100vw;
        height:100vh;
        background-color: rgb(0,0,0,0.7);
      }

      .pic{
        max-width:40vw;
        height:auto;
        object-fit: cover;
      }
      
      .x-button {
        background-color: red;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        float: right;
      }

      .x-button:hover,
      .x-button:focus,
      .x-button:active {
        background-color: maroon;
      }
    `;
  }

  render() {
    if (!this.open) {
      return html``;
    }
    return html`<div class="container">
        <button class="x-button" @click=${this.openFalse}>X</button>
        <div>
          <h1>${this.title}</h1>
          <p>${this.text}</p>
          <p>${this.open}</p>
        </div>
        <button class="prev-button" @click=${this.prevSlide} ?disabled="${
      this.index === 0
    }">←</button>
      <div>
        ${this.slides.map((slide) => this.displaySlide(slide))}
        </div>
          <button class="next-button" @click=${this.nextSlide} ?disabled="${
      this.index === this.slides.length - 1
    }">→</button>
        </div>
      </div>
    </div>`;
  }

  firstUpdated() {
    this.addOpenImageEventListener();
  }

  addOpenImageEventListener() {
    document.body.addEventListener("open-dialog", this.openTrue.bind(this));
  }

  openTrue() {
    this.open = true;
    console.log("NOW TRUE");
  }

  openFalse() {
    this.open = false;
  }

  displayIndex() {
    return html` <p>${this.index} of ${this.slides.length}</p>`;
  }

  displaySlide(slide) {
    if (slide.index === this.index) {
      return html`<img class="pic" src="${slide.content}" />
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

  populateSlide(){
    document.body.querySelectorAll("media-image").forEach(e => this.slides.appendChild(e.content));
  }

  static get properties() {
    return {
      title: { type: String, Reflect: true },
      text: { type: String, Reflect: true },
      open: { type: Boolean, Reflect: true },
    };
  }
}

globalThis.customElements.define(Dialog.tag, Dialog);

// register globally so we can make sure there is only one
window.Dialog = window.Dialog || {};
// request if this exists. This helps invoke the element existing in the dom
// as well as that there is only one of them. That way we can ensure everything
// is rendered through the same modal
window.Dialog.requestAvailability = () => {
  if (!window.Dialog.instance) {
    window.Dialog.instance = document.createElement("dialog-box");
    document.body.appendChild(window.Dialog.instance);
  }
  return window.Dialog.instance;
};
