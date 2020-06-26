import { Dot } from '../vec3';
import { IQuaternionLike } from './IQuaternionLike';
import { IVec3Like } from '../vec3/IVec3Like';
import { Quaternion } from './Quaternion';

// assumes direction vectors are normalized

export function SetFromUnitVectors (a: IQuaternionLike, from: IVec3Like, to: IVec3Like, out: Quaternion = new Quaternion()): Quaternion
{
    const { x: fx, y: fy, z: fz } = from;
    const { x: tx, y: ty, z: tz } = to;

    const epsilon = 0.000001;

    let r = Dot(from, to) + 1;

    if (r < epsilon)
    {
        r = 0;

        if (Math.abs(fx) > Math.abs(fz))
        {
            return out.set(
                -fy,
                fx,
                0,
                r
            );
        }
        else
        {
            return out.set(
                0,
                -fz,
                fy,
                r
            );
        }
    }
    else
    {
        // crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3
        return out.set(
            fy * tz - fz * ty,
            fz * tx - fx * tz,
            fx * ty - fy * tx,
            r
        );
    }
}
