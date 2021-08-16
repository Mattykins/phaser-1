import { HierarchyComponent } from './HierarchyComponent';

export function GetParentID (id: number): number
{
    return HierarchyComponent.parent[id];
}
