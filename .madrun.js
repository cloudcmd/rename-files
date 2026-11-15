'use strict';

const {run} = require('madrun');

module.exports = {
    'wisdom': () => run('build'),
    'watch:coverage': () => run('watcher', 'npm run coverage'),
    'watch:test': () => run('watcher', 'npm test'),
    'watcher': () => 'nodemon -w test -w lib --exec',
    'test': () => 'tape test/*.js',
    'coverage': () => 'c8 npm test',
    'report': () => 'c8 report --reporter=text-lcov | coveralls',
    'lint': () => 'putout .',
    'lint:test': () => 'eslint test -c .eslintrc.test',
    'fix:lint': () => run('lint', '--fix'),
};
