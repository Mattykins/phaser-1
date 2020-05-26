import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import filesize from 'rollup-plugin-filesize';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const extensions = [
    '.js', '.jsx', '.ts', '.tsx'
];

export default {

    watch: {
        include: 'dev/*.ts'
    },

    input: './dev/index.ts',

    output: [
        {
            file: './dev/dist/index.js',
            format: 'iife',
            name: 'Phaser4Example',
            sourcemap: true,
            plugins: [
                filesize()
            ]
        }
    ],

    plugins: [

        resolve({
            extensions
        }),

        del({ targets: './dev/dist/*', runOnce: true }),

        typescript({
            exclude: [
                './dev/wip/**/*',
                './src/stats/**/*'
            ],
            tsconfig: './fastdev.tsconfig.json'
        }),

        copy({
            targets: [
                { src: 'dev/index.html', dest: 'dev/dist', copyOnce: true }
            ]
        })

    ]

};
