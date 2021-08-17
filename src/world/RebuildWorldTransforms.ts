import { GameObjectTree } from '../gameobjects/GameObjectTree';
import { GameObjectWorld } from '../GameObjectWorld';
import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { GetNumChildren } from '../components/hierarchy/GetNumChildren';
import { HasDirtyTransform } from '../components/dirty/HasDirtyTransform';
import { IBaseWorld } from './IBaseWorld';
import { MoveNextRenderable } from '../components/hierarchy/MoveNextRenderable';
import { Transform2DComponent } from '../components/transform/Transform2DComponent';
import { UpdateWorldTransform } from '../components/transform/UpdateWorldTransform';
import { WillRender } from '../components/permissions/WillRender';
import { WillRenderChildren } from '../components/permissions/WillRenderChildren';
import { hasComponent } from 'bitecs';

export function RebuildWorldTransforms (world: IBaseWorld): void
{
    let next = GetFirstChildID(world.id);

    while (next > 0)
    {
        if (WillRender(next) && HasDirtyTransform(next))
        {
            UpdateWorldTransform(next);
        }

        next = MoveNextRenderable(next);
    }
}

/*
export function RebuildWorldTransforms (world: IBaseWorld, parent: number, forceUpdate: boolean): void
{
    if (WillRender(parent))
    {
        if (!forceUpdate && HasDirtyTransform(parent))
        {
            forceUpdate = true;
        }

        if (forceUpdate && hasComponent(GameObjectWorld, Transform2DComponent, parent))
        {
            UpdateWorldTransform(parent);
        }

        const children = GameObjectTree.get(parent);

        for (let i = 0; i < children.length; i++)
        {
            const nodeID = children[i];

            if (WillRender(nodeID))
            {
                if (GetNumChildren(nodeID) > 0)
                {
                    if (WillRenderChildren(nodeID))
                    {
                        RebuildWorldTransforms(world, nodeID, forceUpdate);
                    }
                }
                else if (forceUpdate || HasDirtyTransform(nodeID))
                {
                    UpdateWorldTransform(nodeID);
                }
            }
        }
    }
}
*/
