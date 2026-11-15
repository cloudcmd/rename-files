import {run} from 'madrun';

export default {
    'watch:coverage': () => run('watcher', 'npm run coverage'),
    'watch:test': () => run('watcher', 'npm test'),
    'watcher': () => 'nodemon -w test -w lib --exec',
    'test': () => 'tape test/*.js',
    'coverage': () => 'c8 npm test',
    'report': () => 'c8 report --reporter=lcov',
    'lint': () => 'putout .',
    'lint:test': () => 'eslint test -c .eslintrc.test',
    'fix:lint': () => run('lint', '--fix'),
};
