import { LitElement, html, css } from "lit";
import "./media-image.js";

export class DialogBox extends LitElement {
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
      super.styles,
      :host {
        --container-width: 70vw;
        --container-height: 100vh;
        display: none;
      }

      :host([open]) {
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
        height: var(--container-height);
        width: var(--container-width);
        margin: 24px;
        padding: 24px;
        position: fixed;
        border-radius: 16px;
        display: block;
        background-color: white;
        border: 4px solid black; /* Ensure it's above other content */
        z-index: 999;
        top: 50%;
        left: 50%;
        transform: translate(
          -50%,
          -50%
        ); /* so the dialog box is centered (if this isnt here its like cut off by the screen) */
      }

      .panel {
        transition: all 250ms ease-in;
        display: flex;
        justify-content: center;
      }

      .pic {
        width: 60vw;
        height: 70vh;
        object-fit: contain;
        border: 4px solid var(--media-image-primary-color-3);
        border-radius: 8px;
      }

      .x-button {
        background-color: red;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        float: right;
      }

      .next-button,
      .prev-button {
        font-size: 32px;
        background-color: var(--media-image-primary-color-3);
        width: 5vw;
        height: 10vh;
        border: none; /* Remove borders */
      }

      .x-button:hover,
      .x-button:focus,
      .x-button:active {
        background-color: maroon;
      }

      .next-button:hover,
      .next-button:focus,
      .next-button:active {
        background-color: var(--media-image-primary-color-2);
      }
    `;
  }

  render() {
    console.log("rendered dialog box");
    if (!this.open) {
      return html``;
    }
    return html` <div class="shadow">
      <div class="container">
        <button class="x-button" @click=${this.openFalse}>X</button>

        <div>${this.displaySlide()}</div>
        <div class="panel">
          <button
            class="prev-button"
            @click=${this.prevSlide}
            ?disabled="${this.index === 0}"
          >
            ←</button
          ><button
            class="next-button"
            @click=${this.nextSlide}
            ?disabled="${this.index === this.slides.length - 1}"
          >
            →
          </button>
        </div>
      </div>
    </div>`;
  }

  firstUpdated() {
    this.populateSlide();
    this.addOpenImageEventListener();
  }

  addOpenImageEventListener() {
    window.addEventListener("open-dialog", (e) => {
      this.open = true;
      this.disableScroll();
      console.log("open dialog");
    });
    console.log("added event listener");
  }

  openFalse() {
    this.open = false;
    this.enableScroll();
  }

  displaySlide() {
    return html`<div>
      <img class="pic" src="${this.slides[this.index].content}" />
      <p style="right: 8px; position:absolute;z-index:1000;">
        Slide ${this.index + 1} / ${this.slides.length}
      </p>
      <h1>${this.slides[this.index].caption}</h1>
      <p>${this.slides[this.index].description}</p>
    </div>`;
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
    //pushes image to the slides array and sets the index of the image based on where it is in the document
    document.body.querySelectorAll("media-image").forEach((image) => {
      image.index = this.slides.length;
      this.slides.push(image);
    });
  }

  disableScroll() {
    // get the current page scroll position (saves the pixels that have been scroller vertically and horizontally)
    const scrollTop = document.documentElement.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft;

    // Store the current scroll position
    this._scrollPosition = { top: scrollTop, left: scrollLeft };

    // Disable scrolling
    document.body.style.overflow = "hidden";
  }

  enableScroll() {
    // Resetting to Enable scrolling
    document.body.style.overflow = "";

    // Restore the scroll position
    if (this._scrollPosition) {
      window.scrollTo(this._scrollPosition.left, this._scrollPosition.top);
    }
  }

  static get properties() {
    return {
      index: { type: Number },
      open: { type: Boolean, reflect: true },
      slides: { type: Array },
    };
  }
}

globalThis.customElements.define(DialogBox.tag, DialogBox);
