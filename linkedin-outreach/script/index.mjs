import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import 'dotenv/config';

import {
  generatePromptAdeel,
  generatePromptJahanzaib,
  generatePromptLaeeq,
} from './prompt.mjs';
import { processExcel } from './excelProcessor.mjs';

const selectPerson = async () => {
  const { person } = await inquirer.prompt([
    {
      type: 'list',
      name: 'person',
      message: 'Select person for LinkedIn outreach:',
      choices: ['Adeel', 'Jahanzaib', 'Laeeq', 'Exit'],
    },
  ]);

  return person;
};

const getPromptGenerator = (person) => {
  switch (person) {
    case 'Adeel':
      return generatePromptAdeel;
    case 'Jahanzaib':
      return generatePromptJahanzaib;
    case 'Laeeq':
      return generatePromptLaeeq;
    default:
      return null;
  }
};

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// File paths
const inputFile = resolve(__dirname, '..', 'data', 'input.xlsx');
const outputFile = resolve(__dirname, '..', 'data', 'output.xlsx');

// Main execution
const main = async () => {
  const person = await selectPerson();
  if (person === 'Exit') {
    console.log(chalk.yellow('Exiting program...'));
    process.exit(0);
  }

  const promptGenerator = getPromptGenerator(person);
  await processExcel(inputFile, outputFile, promptGenerator, person);
};

main();
