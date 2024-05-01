import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

export class MediaImage extends DDD {
  static get tag() {
    return "media-image";
  }

  constructor() {
    super();
    this.index = 0;
    this.content =
      "https://preview.redd.it/02411nxds2m91.png?width=640&crop=smart&auto=webp&s=3a91ab902fdab402e4bcb84a3907bb0a2bad2d9b";
    this.caption = "caption";
    this.description = "description";
    this.alttext = "alt text";
  }

  static get styles() {
    return css`
      :host {
        color: var(--media-image-primary-color-2);
        display: block;
        padding: var(--ddd-spacing-5);
        margin-bottom: 20px;
        text-align: center;
      }

      .image {
        width: var(--media-image-width, 20vw);
        height: var(--media-image-height, 20vw);
        overflow: hidden;
        object-fit: cover;
        border-radius: 12px;
        border: 4px solid var(--media-image-primary-color-1);
        transition: all 0.3s ease-in;
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

      .caption {
        font-size: 24px;
        font-family: "Tauri", sans-serif;
        color: var(--media-image-primary-color-3);
        text-align: left;
      }

      .image:hover,
      .image:focus,
      .image:active {
        cursor: pointer;
        box-shadow: var(--media-image-secondary-color-4) -10px 10px;
        -webkit-transform: translate(var(--ddd-spacing-4));
        transform: translate(var(--ddd-spacing-4));
        transition: 0.3s ease;
      }
    `;
  }

  render() {
    return html`<div>
      <div class="image-panel">
        ${this.displayContent()}
        <div class="info-panel">
          <h1 class="caption">${this.caption}</h1>
        </div>
      </div>
    </div> `;
  }

  displayContent() {
    //making it so that the media type is determined by the file extension
    if (
      this.content.includes("jpg") ||
      this.content.includes("jpeg") ||
      this.content.includes("png") ||
      this.content.includes("gif")
    ) {
      return html`<img
        class="image"
        src="${this.content}"
        @click=${this.contentClicked}
        alt=${this.alttext}
      />`;
    } else if (
      this.content.includes("mp4") ||
      this.content.includes("mov") ||
      this.content.includes("avi")
    ) {
      return html`<video
        class="image"
        src="${this.content}"
        controls
        @click=${this.contentClicked}
      ></video>`;
    } else if (
      this.content.includes("mp3") ||
      this.content.includes("wav") ||
      this.content.includes("flac")
    ) {
      return html`<audio
        class="image"
        src="${this.content}"
        controls
        @click=${this.contentClicked}
      ></audio>`;
    } else {
      return html`<p>Invalid media type</p>`;
    }
  }

  contentClicked() {
    this.createOpenGalleryEvent();
    this.updateIndex();
  }

  updateIndex() {
    document.body.querySelector("play-list").index = this.index;
  }

  createOpenGalleryEvent() {
    this.dispatchEvent(
      new CustomEvent("image-clicked", {
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );
  }

  static get properties() {
    return {
      content: { type: String },
      caption: { type: String },
      description: { type: String },
      alttext: { type: String },
      index: { type: Number },
    };
  }
}

globalThis.customElements.define(MediaImage.tag, MediaImage);
