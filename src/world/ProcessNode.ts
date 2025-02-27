import { HasChildren } from '../components/hierarchy/HasChildren';
import { HasDirtyDisplayList } from '../components/dirty/HasDirtyDisplayList';
import { WillUpdateTransform } from '../components/dirty/WillUpdateTransform';

export function ProcessNode (node: number, cameraUpdated: boolean, isDisplayList: boolean): boolean
{
    if (isDisplayList)
    {
        return HasDirtyDisplayList(node);
    }
    else if (HasChildren(node) && (cameraUpdated || WillUpdateTransform(node)))
    {
        return true;
    }

    return false;
}
