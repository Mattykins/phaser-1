import * as WorldEvents from './events';

import { Query, defineQuery } from 'bitecs';
import { SetWillCacheChildren, SetWillTransformChildren, WillUpdate } from '../components/permissions';

import { BaseWorld } from './BaseWorld';
import { Begin } from '../renderer/webgl1/renderpass/Begin';
import { BoundsIntersects } from '../components/bounds/BoundsIntersects';
import { ClearDirtyChild } from '../components/dirty/ClearDirtyChild';
import { ClearDirtyChildColor } from '../components/dirty/ClearDirtyChildColor';
import { ClearDirtyChildTransform } from '../components/dirty/ClearDirtyChildTransform';
import { ClearDirtyChildWorldTransform } from '../components/dirty/ClearDirtyChildWorldTransform';
import { ColorComponent } from '../components/color/ColorComponent';
import { Emit } from '../events/Emit';
import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GameObjectWorld } from '../GameObjectWorld';
import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { HasDirtyChildColor } from '../components/dirty/HasDirtyChildColor';
import { HasDirtyChildTransform } from '../components/dirty/HasDirtyChildTransform';
import { HasDirtyChildWorldTransform } from '../components/dirty/HasDirtyChildWorldTransform';
import { IBaseCamera } from '../camera/IBaseCamera';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { IStaticCamera } from '../camera/IStaticCamera';
import { IStaticWorld } from './IStaticWorld';
import { MoveNextRenderable } from '../components/hierarchy/MoveNextRenderable';
import { MoveNextUpdatable } from '../components/hierarchy/MoveNextUpdatable';
import { PopColor } from '../renderer/webgl1/renderpass/PopColor';
import { QuadVertexComponent } from '../components/vertices';
import { RebuildWorldTransforms } from './RebuildWorldTransforms';
import { RendererInstance } from '../renderer/RendererInstance';
import { SetColor } from '../renderer/webgl1/renderpass/SetColor';
import { Transform2DComponent } from '../components/transform/Transform2DComponent';
import { UpdateLocalTransform } from '../components/transform/UpdateLocalTransform';
import { UpdateQuadColorSystem } from '../components/color/UpdateQuadColorSystem';
import { UpdateVertexPositionSystem } from '../components/vertices/UpdateVertexPositionSystem';
import { WillRender } from '../components/permissions/WillRender';
import { WorldCamera } from '../camera/WorldCamera';

//  A Static World is designed specifically to have a bounds of a fixed size
//  and a camera that doesn't move at all (no scrolling, rotation, etc)
//  Because it has a fixed size, there is no camera culling enabled.
//  Games that use this kind of world include Pacman, Bejeweled and 2048.

export class StaticWorld extends BaseWorld implements IStaticWorld
{
    readonly type: string = 'StaticWorld';

    declare camera: IStaticCamera;

    private colorQuery: Query;
    private transformQuery: Query;

    renderData: { gameFrame: number; dirtyLocal: number; dirtyWorld: number; dirtyColor: number; numChildren: number; rendered: number; renderMs: number; updated: number; updateMs: number; };

    constructor (scene: IScene)
    {
        super(scene);

        const tag = this.tag;

        this.colorQuery = defineQuery([ tag, ColorComponent, QuadVertexComponent ]);
        this.transformQuery = defineQuery([ tag, Transform2DComponent ]);

        const renderer = RendererInstance.get();

        // this.camera = new StaticCamera(renderer.width, renderer.height);
        this.camera = new WorldCamera(renderer.width, renderer.height);

        this.renderData = {
            gameFrame: 0,
            dirtyLocal: 0,
            dirtyWorld: 0,
            dirtyColor: 0,
            numChildren: 0,
            rendered: 0,
            renderMs: 0,
            updated: 0,
            updateMs: 0
        };

        SetWillTransformChildren(this.id, false);
        SetWillCacheChildren(this.id, false);
    }

    preRender (gameFrame: number): boolean
    {
        const id = this.id;

        const renderData = this.renderData;

        renderData.gameFrame = gameFrame;
        renderData.dirtyLocal = 0;
        renderData.dirtyWorld = 0;

        ClearDirtyChild(id);

        const entities = this.transformQuery(GameObjectWorld);

        if (HasDirtyChildTransform(id))
        {
            const dirtyLocal = UpdateLocalTransform(id, entities);

            renderData.dirtyLocal = dirtyLocal;

            ClearDirtyChildTransform(id);
        }

        if (HasDirtyChildWorldTransform(id))
        {
            const dirtyWorld = RebuildWorldTransforms(entities);

            UpdateVertexPositionSystem(entities);

            renderData.dirtyWorld = dirtyWorld;

            ClearDirtyChildWorldTransform(id);
        }

        if (HasDirtyChildColor(id))
        {
            UpdateQuadColorSystem(id, GameObjectWorld, this.colorQuery);

            ClearDirtyChildColor(id);
        }

        return true;
    }

    update (delta: number, time: number): void
    {
        Emit(this, WorldEvents.WorldBeforeUpdateEvent, this);

        const start = performance.now();

        let next = GetFirstChildID(this.id);

        let total = 0;

        while (next > 0)
        {
            if (WillUpdate(next))
            {
                GameObjectCache.get(next).update(delta, time);

                total++;
            }

            next = MoveNextUpdatable(next);
        }

        this.renderData.updated = total;
        this.renderData.updateMs = performance.now() - start;

        Emit(this, WorldEvents.WorldUpdateEvent, this);
    }

    render <T extends IRenderPass, C extends IBaseCamera> (renderPass: T, camera: C): void
    {
        const x = camera.getBoundsX();
        const y = camera.getBoundsY();
        const right = camera.getBoundsRight();
        const bottom = camera.getBoundsBottom();

        const start = performance.now();

        let next = GetFirstChildID(this.id);

        let total = 0;

        while (next > 0)
        {
            if (WillRender(next))
            {
                const intersects = BoundsIntersects(next, x, y, right, bottom);

                if (intersects)
                {
                    const gameObject = GameObjectCache.get(next);

                    total++;

                    gameObject.renderGL(renderPass);
                    gameObject.postRenderGL(renderPass);
                }
            }

            next = MoveNextRenderable(next);
        }

        this.renderData.rendered = total;
        this.renderData.renderMs = performance.now() - start;
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        SetColor(renderPass, this.color);

        Emit(this, WorldEvents.WorldRenderEvent, this);

        const camera = this.camera;

        Begin(renderPass, camera);

        this.render(renderPass, camera);

        PopColor(renderPass, this.color);

        //#ifdef RENDER_STATS
        this.renderData.numChildren = this.getNumChildren();
        window['renderStats'] = this.renderData;
        //#endif

        Emit(this, WorldEvents.WorldPostRenderEvent, renderPass, this);
    }
}
