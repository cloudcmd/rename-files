import {join} from 'node:path';
import {rename as _rename} from 'node:fs/promises';

const isString = (a) => typeof a === 'string';

export const renameFiles = async (from, to, names, overrides = {}) => {
    const {rename = _rename} = overrides;
    
    check(from, to, names);
    
    for (const name of names) {
        const fromFull = join(from, name);
        const toFull = join(to, name);
        
        await rename(fromFull, toFull);
    }
};

function check(from, to, names) {
    if (!isString(from))
        throw Error('from should be a string!');
    
    if (!isString(to))
        throw Error('to should be a string!');
    
    if (!Array.isArray(names))
        throw Error('names should be an array!');
    
    if (!names.every(isSafeName))
        throw Error('names should not contain path separators or parent segments!');
}

function isSafeName(name) {
    if (!isString(name) || !name)
        return false;
    
    if (name === '.' || name === '..')
        return false;
    
    return !/[/\\\0]/.test(name);
}
