import { IGameObject } from '../gameobject/IGameObject';
import { Texture } from '../../textures/Texture';
import { WebGLRenderer } from '../..';
import { MultiTextureQuadShader } from '../../renderer/webgl1/shaders/MultiTextureQuadShader';
import { ISprite } from '../sprite/ISprite';

export interface ISpriteBuffer extends IGameObject
{
    data: ArrayBuffer;
    vertexViewF32: Float32Array;
    vertexViewU32: Uint32Array;
    index: Uint16Array | Uint32Array;
    vertexBuffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;
    size: number;
    maxSize: number;
    quadIndexSize: number;
    indexType: GLenum;
    activeTextures: Texture[];
    gl: WebGLRenderingContext;
    renderer: WebGLRenderer;
    shader: MultiTextureQuadShader;
    resetBuffers (maxSize: number): void;
    clear (): this;
    add (...sprites: ISprite[]): this;
    addAt (offset: number, ...sprites: ISprite[]): this;
}
