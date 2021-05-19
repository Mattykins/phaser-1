import { Types, defineComponent } from 'bitecs';

const TransformComponent = defineComponent({
    x: Types.f32,
    y: Types.f32,
    rotation: Types.f32,
    scaleX: Types.f32,
    scaleY: Types.f32,
    skewX: Types.f32,
    skewY: Types.f32
});

export const Transform2D = TransformComponent;
