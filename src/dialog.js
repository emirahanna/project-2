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
      }

      .shadow {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black */
        z-index: 998; /* Ensure the shadow is behind the dialog box */
      }

      .container {
        height: 100%;
        width: 70%;
        margin: 20px;
        padding: 20px;
        position: fixed;
        transition: all 250ms ease-in;
        border-radius: 8px;
        background-color: white;
        border: 1px solid black; /* Ensure it's above other content */
        z-index: 999;
        top: 50%;
        left: 50%;
        transform: translate(
          -50%,
          -50%
        ); /* so the dialog box is centered (if this isnt here its like cut off by the screen) */
      }

      .pic {
        width: 40vw;
        height: 30vw;
        object-fit: contain;
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
    return html` <div class="shadow">
      <div class="container">
        <button class="x-button" @click=${this.openFalse}>X</button>
        <button
          class="prev-button"
          @click=${this.prevSlide}
          ?disabled="${this.index === 0}"
        >
          ←
        </button>
        <div>${this.displaySlide()}</div>
        <button
          class="next-button"
          @click=${this.nextSlide}
          ?disabled="${this.index === this.slides.length - 1}"
        >
          →
        </button>
      </div>
    </div>`;
  }

  firstUpdated() {
    this.populateSlide();
    this.addOpenImageEventListener();
  }

  addOpenImageEventListener() {
    document.body.addEventListener("open-dialog", this.openTrue.bind(this));
  }

  openTrue() {
    this.open = true;
    this.disableScroll();
  }

  openFalse() {
    this.open = false;
    this.enableScroll();
  }

  displayIndex() {
    return html`<p>Slide ${this.index + 1} / ${this.slides.length}</p>`;
  }

  displaySlide() {
    return html`<img class="pic" src="${this.slides[this.index].content}" />
      <h1>${this.slides[this.index].caption}</h1>
      <p>${this.slides[this.index].description}</p>
      ${this.displayIndex()}`;
  }

  nextSlide() {
    if (this.index < this.slides.length - 1) {
      this.index++;
      this.requestUpdate();
    }
  }
  prevSlide() {
    if (this.index > 0) {
      this.index--;
      this.requestUpdate();
    }
  }

  populateSlide() {
    document.body
      .querySelectorAll("media-image")
      .forEach((image) => this.slides.push(image));
  }

  disableScroll() {
   // get the current page scroll position (saves the pixels that have been scroller vertically and horizontally)
   const scrollTop =  document.documentElement.scrollTop;
   const scrollLeft =  document.documentElement.scrollLeft;
   
   // Store the current scroll position
   this._scrollPosition = { top: scrollTop, left: scrollLeft };

   // Disable scrolling
   document.body.style.overflow = 'hidden';
  }

  enableScroll() {
        // Resetting to Enable scrolling
        document.body.style.overflow = '';

        // Restore the scroll position
        if (this._scrollPosition) {
            window.scrollTo(this._scrollPosition.left, this._scrollPosition.top);
        }
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
