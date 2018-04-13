const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');

jsdoc2md.render({ files: 'objects/robinhood/*' }).then(output => fs.writeFile('docs/ROBINHOOD.md', output));
jsdoc2md.render({ files: 'objects/data/*' }).then(output => fs.writeFile('docs/DATA.md', output));