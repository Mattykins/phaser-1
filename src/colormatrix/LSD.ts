import { DEFAULT_COLOR_OFFSET } from './consts';
import { IContainer } from '../gameobjects/container/IContainer';
import { SetColorMatrix } from './SetColorMatrix';

const values = [
    2, -0.4, 0.5, 0,
    -0.5, 2, -0.4, 0,
    -0.4, -0.5, 3, 0,
    0, 0, 0, 1
];

export function LSD <T extends IContainer> (gameObject: T, multiply: boolean = false): T
{
    if (SetColorMatrix(gameObject.id, values, DEFAULT_COLOR_OFFSET, multiply))
    {
        gameObject.color.colorMatrixEnabled = true;
    }

    return gameObject;
}
