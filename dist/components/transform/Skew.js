var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { TRANSFORM, Transform2DComponent } from "./Transform2DComponent";
import { SetDirtyTransform } from "../dirty/SetDirtyTransform";
import { UpdateAxisAligned } from "./UpdateAxisAligned";
export class Skew {
  constructor(id, x = 0, y = 0) {
    __publicField(this, "id");
    __publicField(this, "_x");
    __publicField(this, "_y");
    __publicField(this, "_data");
    this.id = id;
    this._data = Transform2DComponent.data[id];
    this.set(x, y);
  }
  set(x, y = x) {
    this.x = x;
    this.y = y;
    return this;
  }
  set x(value) {
    this._x = value;
    this._data[TRANSFORM.SKEW_X] = value;
    const id = this.id;
    UpdateAxisAligned(id);
    SetDirtyTransform(id);
  }
  get x() {
    return this._x;
  }
  set y(value) {
    this._y = value;
    this._data[TRANSFORM.SKEW_Y] = value;
    const id = this.id;
    UpdateAxisAligned(id);
    SetDirtyTransform(id);
  }
  get y() {
    return this._y;
  }
  destroy() {
    this._data = null;
  }
}
