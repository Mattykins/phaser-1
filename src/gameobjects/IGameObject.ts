import { IBaseWorld } from '../world/IBaseWorld';
import { ICanvasRenderer } from '../renderer/canvas/ICanvasRenderer';
import { IEventInstance } from '../events/IEventInstance';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';

export interface IGameObject
{
    readonly id: number;
    name: string;

    // world: IBaseWorld;
    // parentID: number;
    // children: IGameObject[];
    // numChildren: number;

    visible: boolean;

    events: Map<string, Set<IEventInstance>>;

    isRenderable (): boolean;

    beforeUpdate (delta: number, time: number): void;
    update (delta: number, time: number): void;
    afterUpdate (delta: number, time: number): void;

    renderGL <T extends IRenderPass> (renderPass: T): void;
    renderCanvas <T extends ICanvasRenderer> (renderer: T): void;
    postRenderGL <T extends IRenderPass> (renderPass: T): void;
    postRenderCanvas <T extends ICanvasRenderer> (renderer: T): void;

    destroy (reparentChildren?: IGameObject): void;
}
