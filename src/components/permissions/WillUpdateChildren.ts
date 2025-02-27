import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function WillUpdateChildren (id: number): boolean
{
    return !!(PermissionsComponent.data[id][PERMISSION.WILL_UPDATE_CHILDREN]);
}
