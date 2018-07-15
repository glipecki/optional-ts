export default {
    input: './.build/tsc-out/lib/index.js',
    output: [
        {
            name: 'optional-ts',
            file: 'dist/index.umd.js',
            format: 'umd'
        },
        {
            name: 'optional-ts',
            file: 'dist/index.esm.js',
            format: 'esm'
        }
    ],
    plugins: []
};