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
  }

  static get styles() {
    return css`
      :host {
        background-color: white;
        color: black;
        display: block;
        width: 20vw;
        padding: 20px;
      }
      .x-button {
        background-color: red;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        float: right;
      }
    `;
  }

  render() {
    return html`<div>
      <button class="x-button" @click=${this.toggleOpen}>X</button>
      <div>
        <h1>${this.title}</h1>
        <p>${this.text}</p>
        <p>${this.open}</p>
      </div>
    </div>`;
  }

  firstUpdated() {
    this.addOpenImageEventListener();
  }

  addOpenImageEventListener() {
    document.body.addEventListener("open-gallery", this.toggleOpen.bind(this));
    console.log("event listener added");
  }

  toggleOpen() {
    this.open = !this.open;
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
