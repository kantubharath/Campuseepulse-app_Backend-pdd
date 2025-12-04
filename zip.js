
const archiver = require('archiver');
const fs = require('fs');

const output = fs.createWriteStream('project.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// append files from a sub-directory, putting its contents at the root of the archive
archive.directory('./', false, { filter: (path) => !path.includes('node_modules') && !path.includes('.git') && !path.includes('.idx') && !path.includes('.vscode') });


archive.finalize();
