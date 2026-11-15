'use strict';

const {rename} = require('node:fs/promises');
const {join} = require('node:path');
const isString = (a) => typeof a === 'string';

module.exports = async (from, to, names) => {
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
}
