'use strict';

const path = require('path');
const fs = require('fs');

const promisify = require('es6-promisify').promisify;
const rename = promisify(fs.rename);

module.exports = (from, to, names, callback) => {
    check(from, to, names, callback);
    
    const array = names.slice();
    const iterate = () => {
        const isLast = !array.length;
        
        if (isLast)
            return callback();
        
        const name = array.shift();
        const fromFull = path.join(from, name);
        const toFull = path.join(to, name);
        
        rename(fromFull, toFull)
            .then(iterate)
            .catch(callback);
    };
    
    iterate();
};

function check(from, to, names, callback) {
    if (typeof from !== 'string')
        throw Error('from should be a string!');
    
    if (typeof to !== 'string')
        throw Error('to should be a string!');
    
    if (!Array.isArray(names))
        throw Error('names should be an array!');
    
    if (typeof callback !== 'function')
        throw Error('callback should be a function!');
}

