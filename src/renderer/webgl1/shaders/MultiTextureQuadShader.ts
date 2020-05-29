import { GetMaxTextures } from '../../../config/MaxTextures';
import { IDefaultAttribs } from './IDefaultAttribs';
import { IMultiTextureQuadShaderUniforms } from './IMultiTextureQuadShaderUniforms';
import { IShaderConfig } from './IShaderConfig';
import { MULTI_QUAD_FRAG } from '../glsl/MULTI_QUAD_FRAG';
import { Shader } from './Shader';

export class MultiTextureQuadShader extends Shader
{
    attributes: IDefaultAttribs;
    uniforms: IMultiTextureQuadShaderUniforms;

    constructor (config: IShaderConfig = {})
    {
        if (!config.fragmentShader)
        {
            config.fragmentShader = MULTI_QUAD_FRAG;
        }

        super(config);
    }

    create (fragmentShaderSource: string, vertexShaderSource: string): void
    {
        const maxTextures = GetMaxTextures();

        let src = '';

        for (let i = 1; i < maxTextures; i++)
        {
            if (i > 1)
            {
                src += '\n\telse ';
            }

            if (i < maxTextures - 1)
            {
                src += `if (vTextureId < ${i}.5)`;
            }

            src += '\n\t{';
            src += `\n\t\tcolor = texture2D(uTexture[${i}], vTextureCoord);`;
            src += '\n\t}';
        }

        fragmentShaderSource = fragmentShaderSource.replace(/%count%/gi, `${maxTextures}`);
        fragmentShaderSource = fragmentShaderSource.replace(/%forloop%/gi, src);

        // console.log(fragmentShaderSource);

        super.create(fragmentShaderSource, vertexShaderSource);

        this.uniforms.uTexture = this.renderer.textures.textureIndex;
    }

    bind (uProjectionMatrix: Float32Array, uCameraMatrix: Float32Array): boolean
    {
        return super.bind(uProjectionMatrix, uCameraMatrix);
    }
}
