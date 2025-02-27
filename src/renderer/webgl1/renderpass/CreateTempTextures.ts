import { GetMaxTextures } from '../../../config/maxtextures/GetMaxTextures';
import { SetMaxTextures } from '../../../config/maxtextures/SetMaxTextures';
import { gl } from '../GL';

//  As per the WebGL spec, the browser should always support at least 8 texture units
//  However, the user can set this to any value they like (lower than this)

export function CreateTempTextures (): Array<[ number, WebGLTexture ]>
{
    //  Note: This is the maximum number of TIUs that a _fragment_ shader supports
    //  https://www.khronos.org/opengl/wiki/Common_Mistakes#Texture_Unit
    let maxGPUTextures: number = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    let maxCombinedGPUTextures: number = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);

    console.log('MAX GPU', maxGPUTextures, 'MAX COMBINED', maxCombinedGPUTextures);

    const maxConfigTextures = GetMaxTextures();

    if (maxConfigTextures === 0 || maxConfigTextures > maxGPUTextures)
    {
        //  Insert gpu limit into config value
        SetMaxTextures(maxGPUTextures);
    }
    else
    {
        maxGPUTextures = maxConfigTextures;
    }

    const textures: Array<[ number, WebGLTexture ]> = [];

    //  Create temp textures to stop WebGL errors on mac os
    for (let i: number = 0; i < maxGPUTextures; i++)
    {
        const tempTexture = gl.createTexture();

        gl.activeTexture(gl.TEXTURE0 + i);

        gl.bindTexture(gl.TEXTURE_2D, tempTexture);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([ 0, 0, 255, 255 ]));

        textures.push([ i, tempTexture ]);
    }

    return textures;
}
