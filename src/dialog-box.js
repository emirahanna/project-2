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
        height: 100%;
        width: 100%;
        background: #000000aa;
        z-index: 998; /* Ensure the shadow is behind the dialog box */
      }

      .main-panel {
        display: flex;
        align-items: center; /* Centers children vertically */
        justify-content: space-between; /* Distributes space between children */
        height: 100%; /* Ensure it takes full height of its container */
      }

      .close-container {
        margin: -2px 0px 0px -10px;
      }

      .leftright {
        height: 4px;
        width: 20px;
        position: absolute;
        background-color: white;
        border-radius: 2px;
        transform: rotate(45deg);
        transition: all 0.3s ease-in;
      }

      .rightleft {
        height: 4px;
        width: 20px;
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
        padding: 20px;
        margin: 0px 0px 8px 8px;
        border-radius: 50%;
        right: 12px;
        cursor: pointer;
        border: none;
      }

      .content {
  flex-grow: 1; /* Takes the remaining space between buttons */
  display: flex;
  flex-direction: column; /* Stacks image and details vertically */
  justify-content: center; /* Aligns content in the center vertically */
}

      .image {
        width: 60vw;
        height: 45vh;
        border-radius: 12px;
        object-fit: contain;
        background: rgb(0, 212, 255);
        background: radial-gradient(
          circle,
          rgba(0, 212, 255, 0) 0%,
          rgba(0, 0, 0, 1) 78%,
          rgba(9, 6, 15, 1) 100%
        );
      }

      .description-container {
        width: 60vw;
        height: 20vh;
        overflow-x: hidden;
        overflow-y: visible;
        scroll-behavior: smooth;
      }

      .image-index {
  position: absolute;
  bottom: 10px; /* Adjust as necessary */
  right: 10px; /* Adjust as necessary */
  color: white; /* Ensures visibility on darker backgrounds */
  z-index: 10; /* Ensures it's above the image */
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
        right: 12px;
        position: absolute;
        z-index: 1010;
        box-sizing: border-box;
        position: relative;
        display: block;
        transform: scale(1);
        border: 2px solid transparent;
        border-radius: 100px;
      }
      .next-button::after {
        content: "";
        display: block;
        box-sizing: border-box;
        position: absolute;
        width: 20px;
        height: 20px;
        border-bottom: 2px solid;
        border-left: 2px solid;
        transform: rotate(225deg);
        left: 6px;
        top: 4px;
      }

      .prev-button {
        font-size: 32px;
        background-color: var(--media-image-primary-color-3, white);
        width: 5vw;
        height: 10vh;
        z-index: 1010;
                box-sizing: border-box;
        position: relative;
        display: block;
        transform: scale(1);
        border: 2px solid transparent;
        border-radius: 100px;
      }
      .prev-button::after {
        content: "";
        display: block;
        box-sizing: border-box;
        position: absolute;
        width: 20px;
        height: 20px;
        border-bottom: 2px solid;
        border-left: 2px solid;
        transform: rotate(45deg);
        left: 6px;
        top: 4px;
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
      }

      .next-button:focus,
      .prev-button:focus{
        background-color: var(--media-image-primary-color-2);
        animation: wiggle 1s;
      }

      @keyframes fadeInUp {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      @keyframes wiggle {
        0%,
        7% {
          transform: rotateZ(0);
        }
        15% {
          transform: rotateZ(-15deg);
        }
        20% {
          transform: rotateZ(10deg);
        }
        25% {
          transform: rotateZ(-10deg);
        }
        30% {
          transform: rotateZ(6deg);
        }
        35% {
          transform: rotateZ(-4deg);
        }
        40%,
        100% {
          transform: rotateZ(0);
        }
      }
    `;
  }

  render() {
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
        <div class="main-panel">
          <button
            class="prev-button"
            @click=${this.prevSlide}
            ?disabled="${this.index === 0}"
          ></button>
          <div class="content">
            ${this.displayImage()} ${this.displayDetail()}
          </div>

          <button
            class="next-button"
            @click=${this.nextSlide}
            ?disabled="${this.index === this.slides.length - 1}"
          ></button>
        </div>
      </div>
    </div>`;
  }

  displayContent(content) {
    //making it so that the media type is determined by the file extension
    if (
      content.includes("jpg") ||
      content.includes("jpeg") ||
      content.includes("png") ||
      content.includes("gif")
    ) {
      return html`<img
        class="image"
        src="${content}"
        alt="${this.slides[this.index].alttext}"
      />`;
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
    });
  }

  openFalse() {
    this.open = false;
    this.enableScroll();
  }

  displayImage() {
    return html` ${this.displayContent(this.slides[this.index].content)} `;
  }

  displayDetail() {
    return html`
      <p class="image-index">Slide ${this.index + 1} / ${this.slides.length}</p>
      <h1 class="caption">${this.slides[this.index].caption}</h1>
      <div class="description-container">
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
