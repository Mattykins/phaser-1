import { ICamera3D } from '../camera3d/ICamera3D';
import { IGameObject3D } from '../gameobjects3d/IGameObject3D';
import { IScene } from '../scenes/IScene';
import { ISceneRenderData } from '../scenes/ISceneRenderData';
import { IWorld3DRenderData } from './IWorld3DRenderData';

export interface IBaseWorld3D extends IGameObject3D
{
    scene: IScene;
    camera: ICamera3D;
    renderData: IWorld3DRenderData;
    forceRefresh: boolean;
    is3D: boolean;
    render (sceneRenderData: ISceneRenderData): void;
    shutdown (): void;
}
