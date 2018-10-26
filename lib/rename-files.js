'use strict';

const fs = require('fs');
const {join} = require('path');
const {promisify} = require('util');

const rename = promisify(fs.rename);

module.exports = async (from, to, names) => {
    check(from, to, names);
    
    for (const name of names) {
        const fromFull = join(from, name);
        const toFull = join(to, name);
        
        await rename(fromFull, toFull);
    }
};

function check(from, to, names) {
    if (typeof from !== 'string')
        throw Error('from should be a string!');
    
    if (typeof to !== 'string')
        throw Error('to should be a string!');
    
    if (!Array.isArray(names))
        throw Error('names should be an array!');
}

