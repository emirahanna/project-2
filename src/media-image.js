  import { LitElement, html, css } from "lit";
  /**
   * Now it's your turn. Here's what we need to try and do:
   * 1. Get you HTML from your card working in here
   * 2. Get your CSS rescoped as needed to work here
   * pls help i need to sleep but i also need to do this but i also need to sleep this is a cry for help
   * b
   */

  export class MediaImage extends LitElement {
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
          color: black;
          display: block;
          padding: 20px;
          margin-bottom: 20px;
          text-align: center;
        }

        .image {
          max-width: var(--media-image-width, 40vw);
          height: var(--media-image-height, auto);
          overflow: hidden;
          object-fit: fil;
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

        .image:hover,
        .image:focus,
        .image:active {
          cursor: pointer;
          transform: translate(8px, -8px);
          box-shadow: grey -10px 10px;
        }
      `;
    }

    render() {
      return html`<div>
        <div class="image-panel">
          ${this.displayContent()}
          <div class="info-panel">
            <h1>${this.caption}</h1>
          </div>
        </div>
      </div>
      `;
    }


    displayContent() {
      //making it so that the media type is determined by the file extension
      if (
        this.content.includes("jpg") ||
        this.content.includes("jpeg") ||
        this.content.includes("png") ||
        this.content.includes("gif")
      ) {
        return html`<img class="image" src="${this.content}" @click=${this.contentClicked}/>`;
      } else if (
        this.content.includes("mp4") ||
        this.content.includes("mov") ||
        this.content.includes("avi")
      ) {
        return html`<video class="image" src="${this.content}" controls @click=${this.contentClicked}></video>`;
      } else if (
        this.content.includes("mp3") ||
        this.content.includes("wav") ||
        this.content.includes("flac")
      ) {
        return html`<audio class="image" src="${this.content}" controls @click=${this.contentClicked}></audio>`;
      } else {
        return html`<p>Invalid media type</p>`;
      }
    }

    contentClicked(){
      this.createOpenGalleryEvent();
      this.updateIndex();
    }

    updateIndex(){
      document.body.querySelector("dialog-box").index = this.index;
    }

    createOpenGalleryEvent(){
      this.dispatchEvent(new CustomEvent("open-dialog", {bubbles: true, composed: true, cancelable: true}));
    }

    static get properties() {
      return {
        content: { type: String},
        caption: { type: String},
        description: { type: String},
        index: { type: Number},
      };
    }
  }

  globalThis.customElements.define(MediaImage.tag, MediaImage);
