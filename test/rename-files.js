'use strict';

const {join} = require('path');

const test = require('tape');
const tryCatch = require('try-catch');
const tryToCatch = require('try-to-catch');
const {promisify} = require('es6-promisify');
const {Volume} = require('memfs');
const readjson = require('readjson');
const mockRequire = require('mock-require');

const FIXTURE_PATH = join(__dirname, 'fixture', 'volume.json');
const FIXTURE = readjson.sync(FIXTURE_PATH);

const renameFiles = require('..');

test('rename-files: no args', (t) => {
    t.throws(renameFiles, /from should be a string!/, 'should throw when no from');
    t.end();
});

test('rename-files: no to', (t) => {
    const from = '/';
    const [e] = tryCatch(renameFiles, from);
    
    t.equal(e.message, 'to should be a string!', 'should throw when no from');
    t.end();
});

test('rename-files: no names', (t) => {
    const from = '/';
    const to = '/tmp';
    const [e] = tryCatch(renameFiles, from, to);
    
    t.equal(e.message, 'names should be an array!', 'should throw when no from');
    t.end();
});

test('rename-files: no callback', (t) => {
    const from = '/';
    const to = '/tmp';
    const names = [];
    const [e] = tryCatch(renameFiles, from, to, names);
    
    t.equal(e.message, 'callback should be a function!', 'should throw when no from');
    t.end();
});

test('rename-files: no error', async(t) => {
    const from = '/a';
    const to = '/b';
    const names = [
        'README',
    ];
    
    const vol = Volume.fromJSON(FIXTURE, '/');
    vol.rename = vol.rename.bind(vol);
    
    mockRequire('fs', vol);
    
    const renameFiles = promisify(rerequire('..'));
    const [e] = await tryToCatch(renameFiles, from, to, names);
    
    t.notOk(e, 'should not be error');
    
    mockRequire.stop('fs');
    t.end();
});

test('rename-files: error', async(t) => {
    const from = '/b';
    const to = '/a';
    const names = [
        'README',
    ];
    
    const vol = Volume.fromJSON(FIXTURE, '/');
    vol.rename = vol.rename.bind(vol);
    
    mockRequire('fs', vol);
    
    const renameFiles = promisify(rerequire('..'));
    const [e] = await tryToCatch(renameFiles, from, to, names);
    
    t.equal(e.code, 'ENOENT', 'should be error');
    
    mockRequire.stop('fs');
    t.end();
});

test('rename-files', async(t) => {
    const from = '/a';
    const to = '/b';
    const names = [
        'README',
    ];
    
    const vol = Volume.fromJSON(FIXTURE, '/');
    vol.rename = vol.rename.bind(vol);
    
    mockRequire('fs', vol);
    
    const renameFiles = promisify(rerequire('..'));
    await tryToCatch(renameFiles, from, to, names);
    
    const [e] = tryCatch(vol.statSync.bind(vol), '/b/README');
    
    t.notOk(e, 'should copy file');
    
    mockRequire.stop('fs');
    t.end();
});

function rerequire(name) {
    delete require.cache[require.resolve(name)];
    return require(name);
}

