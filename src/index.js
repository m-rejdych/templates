const { copy, exists, readdir } = require('fs-extra');
const path = require('path');

const main = async () => {
  const template = process.argv[2];

  if (!template) {
    throw new Error('"template" arg is required.');
  }

  const templatePath = path.join(__dirname, '..', 'templates', template);
  if (!(await exists(templatePath))) {
    throw new Error('Template does not exist.');
  }

  const filesToCopy = await readdir(templatePath);
  await Promise.all(
    filesToCopy
      .filter((filename) => filename !== 'node_modules')
      .map(async (filename) => {
        const filePath = path.join(templatePath, filename);
        const destPath = path.join(process.cwd(), filename);
        await copy(filePath, destPath);
      }),
  );
};

main().catch((error) => {
  console.log('ERR', error);
});
