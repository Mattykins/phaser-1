import { AKey, DownKey, LeftKey, MKey, RightKey, UpKey } from '../src/input/keyboard/keys';
import { BackgroundColor, Parent, Scenes, SetWebGL, Size } from '../src/config';

import { AddChild3D } from '../src/display3d/AddChild3D';
import { AddChildren3D } from '../src/display3d/AddChildren3D';
import { Box } from '../src/gameobjects3d/box/Box';
import { BoxGeometry } from '../src/geom3d/BoxGeometry';
import { Cache } from '../src/cache/Cache';
import { Camera3D } from '../src/camera3d/Camera3D';
import { Clone } from '../src/math/vec3/Clone';
import { Cone } from '../src/gameobjects3d/cone/Cone';
import { ConeGeometry } from '../src/geom3d/ConeGeometry';
import { CylinderGeometry } from '../src/geom3d/CylinderGeometry';
import { Game } from '../src/Game';
import { Geometry } from '../src/gameobjects3d/geometry/Geometry';
import { IWorld3D } from '../src/world3d/IWorld3D';
import { ImageFile } from '../src/loader/files/ImageFile';
import { JSONFile } from '../src/loader/files/JSONFile';
import { Keyboard } from '../src/input/keyboard';
import { Loader } from '../src/loader/Loader';
import { Mesh } from '../src/gameobjects3d/mesh/Mesh';
import { On } from '../src/events';
import { OrbitCamera } from '../src/camera3d/OrbitCamera';
import { Plane } from '../src/gameobjects3d/plane/Plane';
import { PlaneGeometry } from '../src/geom3d/PlaneGeometry';
import { Scene } from '../src/scenes/Scene';
import { Sphere } from '../src/gameobjects3d/sphere/Sphere';
import { SphereGeometry } from '../src/geom3d/SphereGeometry';
import { TorusGeometry } from '../src/geom3d/TorusGeometry';
import { Vec3 } from '../src/math/vec3';
import { VertexBuffer } from '../src/renderer/webgl1/buffers/VertexBuffer';
import { World3D } from '../src/world3d/World3D';

class Demo extends Scene
{
    leftKey: LeftKey;
    rightKey: RightKey;
    upKey: UpKey;
    downKey: DownKey;

    world: IWorld3D;
    camMode: number = 0;
    model: Mesh;

    constructor ()
    {
        super();

        const loader = new Loader();

        if (window.location.href.includes('192.168.0.100/phaser-genesis/'))
        {
            loader.setPath('/phaser4-examples/public/assets/textures/');
        }
        else
        {
            loader.setPath('/examples/public/assets/textures/');
        }

        loader.add(ImageFile('wood', 'wooden-crate.png', { flipY: true }));
        loader.add(ImageFile('field', 'field.png', { flipY: true }));
        loader.add(ImageFile('water', 'water.png', { flipY: true }));
        loader.add(ImageFile('bricks', 'bricks.png', { flipY: true }));
        loader.add(ImageFile('dirt', 'dirt.png', { flipY: true }));
        loader.add(ImageFile('icerock', 'icerock.png', { flipY: true }));
        loader.add(ImageFile('keops', 'keops.png', { flipY: true }));
        loader.add(ImageFile('metal', 'metal.png', { flipY: true }));
        loader.add(ImageFile('stone', 'stone.png', { flipY: true }));
        loader.add(ImageFile('stonegrass', 'stonegrass.png', { flipY: true }));

        loader.start().then(() => this.create());
    }

    create ()
    {
        this.world = new World3D(this);

        const ball = new Sphere(-2.5, 0, 0, 1, 24, 24).setTexture('field');
        const box = new Box(0, 0, 0, 1.5, 1.5).setTexture('wood');
        const cone = new Cone(2.5, 0, 0, 0.8, 1.8, 24, 6).setTexture('stonegrass');

        AddChildren3D(this.world, ball, box, cone);

        const camera = new OrbitCamera(new Vec3(0, -2, 4), 0, 1, -7);

        box.transform.rotateX(0.1);

        // camera.panUp(0.1);

        this.world.camera = camera;

        // camera.setAutoRotate(1);

        // this.world.camera.position.set(0, -1, -6);

        // this.model = box1;

        window['camera'] = this.world.camera;

        //  Keyboard input ...

        const keyboard = new Keyboard();

        this.leftKey = new LeftKey();
        this.rightKey = new RightKey();
        this.upKey = new UpKey();
        this.downKey = new DownKey();

        const aKey = new AKey();
        const mKey = new MKey();

        keyboard.addKeys(this.leftKey, this.rightKey, this.upKey, this.downKey, aKey, mKey);

        /*
        On(aKey, 'keydown', () => {

            this.camMode++;

            if (this.camMode === 3)
            {
                this.camMode = 0;
            }

            console.log('cam mode: ' + this.camMode);

        });
        */

        /*
        let m = 1;

        On(mKey, 'keydown', () => {

            m++;

            if (m === 7)
            {
                m = 1;
            }

            this.model = this['mesh' + m];

            switch (m)
            {
                case 1:
                    this.model = box1;
                    break;

                case 2:
                    this.model = box2;
                    break;

                case 3:
                    this.model = box3;
                    break;
            }

            console.log('model: ' + m);

        });
        */

        /*
        On(this, 'update', () => camera.updateOrbit());

        // On(this, 'update', (delta, time) => this.update(delta, time));
        */

        On(this, 'update', () => camera.updateOrbit());
    }

    /*
    update (delta: number, time: number)
    {
        const camera = this.world.camera;
        const camMode = this.camMode;
        const box = this.model;

        if (this.leftKey.isDown)
        {
            if (camMode === 0)
            {
                box.transform.position.x -= 0.05;
            }
            else if (camMode === 1)
            {
                box.transform.rotateX(-0.05);
            }
            else
            {
                camera.pitch(0.05);
            }
        }
        else if (this.rightKey.isDown)
        {
            if (camMode === 0)
            {
                box.transform.position.x += 0.05;
            }
            else if (camMode === 1)
            {
                box.transform.rotateX(0.05);
            }
            else
            {
                camera.pitch(-0.05);
            }
        }

        if (this.upKey.isDown)
        {
            if (camMode === 0)
            {
                box.transform.position.y += 0.05;
            }
            else if (camMode === 1)
            {
                box.transform.rotateY(-0.05);
            }
            else
            {
                camera.forward(0.05);
            }
        }
        else if (this.downKey.isDown)
        {
            if (camMode === 0)
            {
                box.transform.position.y -= 0.05;
            }
            else if (camMode === 1)
            {
                box.transform.rotateY(0.05);
            }
            else
            {
                camera.forward(-0.05);
            }
        }
    }
    */
}

export default function (): void
{
    new Game(
        SetWebGL(),
        Size(800, 600),
        Parent('gameParent'),
        BackgroundColor(0x2d2d2d),
        Scenes(Demo)
    );
}
