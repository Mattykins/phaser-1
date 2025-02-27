var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { GetBackgroundColor } from "../../config/backgroundcolor/GetBackgroundColor";
import { GetCanvasContext } from "../../config/canvascontext/GetCanvasContext";
import { GetHeight } from "../../config/size/GetHeight";
import { GetResolution } from "../../config/size/GetResolution";
import { GetWidth } from "../../config/size/GetWidth";
export class CanvasRenderer {
  constructor() {
    __publicField(this, "canvas");
    __publicField(this, "ctx");
    __publicField(this, "clearColor");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "resolution");
    __publicField(this, "textureIndex");
    __publicField(this, "flushTotal");
    __publicField(this, "clearBeforeRender", true);
    __publicField(this, "optimizeRedraw", true);
    __publicField(this, "autoResize", true);
    this.width = GetWidth();
    this.height = GetHeight();
    this.resolution = GetResolution();
    this.setBackgroundColor(GetBackgroundColor());
    const canvas = document.createElement("canvas");
    this.canvas = canvas;
    this.initContext();
  }
  initContext() {
    const ctx = this.canvas.getContext("2d", GetCanvasContext());
    this.ctx = ctx;
    this.resize(this.width, this.height, this.resolution);
  }
  resize(width, height, resolution = 1) {
    this.width = width * resolution;
    this.height = height * resolution;
    this.resolution = resolution;
    const canvas = this.canvas;
    canvas.width = this.width;
    canvas.height = this.height;
    if (this.autoResize) {
      canvas.style.width = (this.width / resolution).toString() + "px";
      canvas.style.height = (this.height / resolution).toString() + "px";
    }
  }
  setBackgroundColor(color) {
    const r = color >> 16 & 255;
    const g = color >> 8 & 255;
    const b = color & 255;
    const a = color > 16777215 ? color >>> 24 : 255;
    this.clearColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    return this;
  }
  reset() {
    const ctx = this.ctx;
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  begin(willRedraw) {
  }
  end() {
  }
  render() {
  }
  destroy() {
  }
}
