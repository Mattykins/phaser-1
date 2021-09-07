import { DIRTY, DirtyComponent } from './DirtyComponent';

export function HasDirtyChildCache (id: number): boolean
{
    return !!(DirtyComponent.data[id][DIRTY.CHILD_CACHE]);
}
