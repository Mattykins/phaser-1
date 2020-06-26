import { IVec3Like } from './IVec3Like';
import { Normalize } from './Normalize';
import { Scale } from './Scale';
import { Vec3 } from './Vec3';

export function SetLength (a: IVec3Like, length: number, out: Vec3 = new Vec3()): Vec3
{
    Normalize(a, out);

    return Scale(out, length, out);
}
