# Rename Files [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@cloudcmd/rename-files.svg?style=flat
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[CoverageIMGURL]: https://coveralls.io/repos/cloudcmd/rename-files/badge.svg?branch=master&service=github
[NPMURL]: https://npmjs.org/package/@cloudcmd/rename-files "npm"
[BuildStatusURL]: https://github.com/cloudcmd/rename-files/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/cloudcmd/rename-files/workflows/Node%20CI/badge.svg
[DependencyStatusURL]: https://david-dm.org/cloudcmd/rename-files "Dependency Status"
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[CoverageURL]: https://coveralls.io/github/cloudcmd/rename-files?branch=master

Rename files.

## Install

```
npm i @cloudcmd/rename-files
```

## API

### renameFiles(from, to[, names])

- `from` `<string>` - source filename to copy
- `to` `<string>`-  destination filename of the copy operation
- `names` `<array>`-  file processing streams (optional)

`renameFiles` is a promise, can be used with:

```js
import {renameFiles} from '@cloudcmd/rename-files';

const ok = () => 'ok';
const error = (e) => e.message;

renameFiles('/', '/tmp', ['bin'])
    .then(ok)
    .catch(error)
    .then(console.log);
```

You can use `renameFiles` as a promise with `async-await`:

```js
import {tryToCatch} from 'try-to-catch';
import {renameFiles} from '@cloudcmd/rename-files';

const [e] = await tryToCatch(renameFiles, '/', '/tmp', ['bin']);
```

## Related

- [copy-file](https://github.com/cloudcmd/copy-file "copy-file") - simply copy a file
- [fs-rename-files](https://github.com/coderaiser/fs-copy-file "fs-copy-file") - Node.js `v8.5.0` `fs.copyFile` ponyfill
- [fs-rename-files-sync](https://github.com/coderaiser/fs-copy-file-sync "fs-copy-file-sync") - Node.js `v8.5.0` `fs.copyFile` ponyfill

## License

MIT
