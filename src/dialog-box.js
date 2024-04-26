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
      :host {
        --container-width: 70vw;
        --container-height: 90vh;
        display: none;
      }

      :host([open]) {
        display: block;
      }

      .container {
        height: var(--container-height);
        width: var(--container-width);
        padding: 24px;
        position: fixed;
        border-radius: 24px;
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

      .container-shadow {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black */
        z-index: 998; /* Ensure the shadow is behind the dialog box */
      }

      .info-panel {
        transition: all 250ms ease-in;
        display: flex;
        background: transparent;
        justify-content: center;
      }

      .close-container {
        margin: -2px 0px 0px -11px;
      }

      .leftright {
        height: 4px;
        width: 25px;
        position: absolute;
        background-color: white;
        border-radius: 2px;
        transform: rotate(45deg);
        transition: all 0.3s ease-in;
      }

      .rightleft {
        height: 4px;
        width: 25px;
        position: absolute;
        background-color: white;
        border-radius: 2px;
        transform: rotate(-45deg);
        transition: all 0.3s ease-in;
      }
      .close-button {
        background-color: red;
        position: absolute;
        color: white;
        border: 1px solid red;
        padding: 25px;
        margin-bottom: 8px;
        border-radius: 50%;
        right: 12px;
        cursor: pointer;
      }

      .image-container {
        width: 70vw;
        height: 70vh;
        overflow: hidden;
        margin: auto;
        margin-top: 24px;
      }

      .image {
        width: 70vw;
        height: 50vh;
        border-radius: 12px;
        object-fit: contain;
      }

      .caption,
      .description {
        z-index: 1000;
        display: block;
      }

      .next-button {
        font-size: 32px;
        background-color: var(--media-image-primary-color-3);
        width: 5vw;
        height: 10vh;
        border: none; /* Remove borders */
      }
      .prev-button {
        font-size: 32px;
        background-color: var(--media-image-primary-color-3);
        width: 5vw;
        height: 10vh;
        border: none; /* Remove borders */
      }

      .close-button:hover .rightleft,
      .close-button:hover .leftright {
        transform: rotate(180deg);
        transition: transform 0.3 ease-in;
      }
      .close-button:hover,
      .close-button:focus,
      .close-button:active {
        background-color: #800033;
        border: 1px solid maroon;
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
    return html` <div class="container-shadow">
      <div class="container">
        <button class="close-button" @click=${this.openFalse}>
          <div class="close-container">
            <div class="leftright"></div>
            <div class="rightleft"></div>
          </div>
        </button>
        <div class="image-container">${this.displaySlide()}</div>
        <div class="info-panel">
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

  displayContent(content) {
    console.log(content);
    //making it so that the media type is determined by the file extension
    if (
      content.includes("jpg") ||
      content.includes("jpeg") ||
      content.includes("png") ||
      content.includes("gif")
    ) {
      return html`<img class="image" src="${content}" />`;
    } else if (
      content.includes("mp4") ||
      content.includes("mov") ||
      content.includes("avi")
    ) {
      return html`<video class="image" src="${content}" controls></video>`;
    } else if (
      content.includes("mp3") ||
      content.includes("wav") ||
      content.includes("flac")
    ) {
      return html`<audio class="image" src="${content}" controls></audio>`;
    } else {
      return html`<p>Invalid media type</p>`;
    }
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
    return html`
      <div>
        ${this.displayContent(this.slides[this.index].content)}
        <p>Slide ${this.index + 1} / ${this.slides.length}</p>
        <h1 class="caption">${this.slides[this.index].caption}</h1>
        <p class="description">${this.slides[this.index].description}</p>
      </div>
    `;
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
      ...super.properties,
      index: { type: Number },
      open: { type: Boolean, reflect: true },
      slides: { type: Array },
    };
  }
}

globalThis.customElements.define(DialogBox.tag, DialogBox);
