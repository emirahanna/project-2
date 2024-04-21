import { LitElement, html, css } from "lit";

export class Dialog extends LitElement {
  static get tag() {
    return "dialog-box";
  }

  constructor() {
    super();
    this.open = false;
    this.index = 0;
    this.slides = [];
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

    this.populateSlide();
    this.addOpenImageEventListener();
    console.log(this.slides);
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
        <h1>${slide.caption}</h1>
        <p>${slide.description}</p>
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
    document.body.querySelectorAll("media-image").forEach( image => this.slides.push(image));

  }

  static get properties() {
    return {
      title: { type: String, Reflect: true },
      text: { type: String, Reflect: true },
      open: { type: Boolean, Reflect: true },
      slides: { type: Array, Reflect: true },
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
