import { DIRTY, DirtyComponent } from './DirtyComponent';

export function HasDirtyDisplayList (id: number): boolean
{
    return !!(DirtyComponent.data[id][DIRTY.DISPLAY_LIST]);
}
