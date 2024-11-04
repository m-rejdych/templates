const { copy, copyFile, exists, readdir, lstat } = require('fs-extra');
const path = require('path');

const main = async () => {
  const template = process.argv[2];

  if (!template) {
    throw new Error('"template" arg is required.');
  }

  const templatesPath = path.join(__dirname, '..', 'templates');

  if (template === 'ls') {
    const templates = await readdir(templatesPath);
    console.log(templates.join('\n'));
  } else {
    const templatePath = path.join(templatesPath, template);
    if (!(await exists(templatePath))) {
      throw new Error('Template does not exist.');
    }

    if ((await lstat(templatePath)).isDirectory()) {
      const filesToCopy = await readdir(templatePath);
      await Promise.all(
        filesToCopy
          .filter((filename) => !['node_modules', 'package-lock.json'].includes(filename))
          .map(async (filename) => {
            const filePath = path.join(templatePath, filename);
            const destPath = path.join(process.cwd(), filename);
            await copy(filePath, destPath);
          }),
      );
    } else {
      await copyFile(templatePath, path.join(process.cwd(), template));
    }
  }
};

main().catch((error) => {
  console.log('ERR', error);
});
