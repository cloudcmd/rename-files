import {test, stub} from 'supertape';
import {tryToCatch} from 'try-to-catch';
import {renameFiles} from '../lib/rename-files.js';

const {assign} = Object;

test('rename-files: no args', async (t) => {
    const [e] = await tryToCatch(renameFiles);
    t.equal(e.message, 'from should be a string!', 'should throw when no from');
    t.end();
});

test('rename-files: no to', async (t) => {
    const from = '/';
    const [e] = await tryToCatch(renameFiles, from);
    
    t.equal(e.message, 'to should be a string!', 'should throw when no from');
    t.end();
});

test('rename-files: no names', async (t) => {
    const from = '/';
    const to = '/tmp';
    const [e] = await tryToCatch(renameFiles, from, to);
    
    t.equal(e.message, 'names should be an array!', 'should throw when no from');
    t.end();
});

test('rename-files: no error', (t) => {
    const from = '/a';
    const to = '/b';
    const names = ['README'];
    
    const rename = stub();
    
    renameFiles(from, to, names, {
        rename,
    });
    
    t.calledWith(rename, ['/a/README', '/b/README']);
    t.end();
});

test('rename-files: error', async (t) => {
    const from = '/b';
    const to = '/a';
    
    const names = ['README'];
    const error = Error('');
    
    assign(error, {
        code: 'ENOENT',
    });
    
    const rename = stub().rejects(error);
    
    const [e] = await tryToCatch(renameFiles, from, to, names, {
        rename,
    });
    
    t.equal(e.code, 'ENOENT');
    t.end();
});
