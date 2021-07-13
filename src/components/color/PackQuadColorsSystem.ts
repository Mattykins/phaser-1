import { Changed, defineQuery, defineSystem } from 'bitecs';

import { ColorComponent } from './ColorComponent';
import { QuadVertexComponent } from '../vertices';
import { SetQuadColor } from '../vertices/SetQuadColor';

const changedColorQuery = defineQuery([ Changed(ColorComponent), QuadVertexComponent ]);

const packQuadColorsSystem = defineSystem(world =>
{
    const entities = changedColorQuery(world);

    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];

        const red = ColorComponent.red[id] / 255;
        const green = ColorComponent.green[id] / 255;
        const blue = ColorComponent.blue[id] / 255;
        const alpha = ColorComponent.alpha[id];

        SetQuadColor(id, red, green, blue, alpha);
    }

    return world;
});

export const PackQuadColorsSystem = packQuadColorsSystem;
