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
import { generateConnectionPrompt } from './linkedinConnectionPrompt.mjs';
import { processExcel } from './excelProcessor.mjs';

const MENU_OPTIONS = {
  CONNECTION_REQUEST: 'Connection Request - LinkedIn Outreach',
  ADEEL: 'Adeel - Linkedin Outreach',
  JAHANZAIB: 'Jahanzaib - Linkedin Outreach',
  LAEEQ: 'Laeeq - Linkedin Outreach',
  EXIT: 'Exit',
};

const selectPerson = async () => {
  const { person } = await inquirer.prompt([
    {
      type: 'list',
      name: 'person',
      message: 'Select person for LinkedIn outreach:',
      choices: [
        MENU_OPTIONS.CONNECTION_REQUEST,
        MENU_OPTIONS.ADEEL,
        MENU_OPTIONS.JAHANZAIB,
        MENU_OPTIONS.LAEEQ,
        MENU_OPTIONS.EXIT,
      ],
    },
  ]);

  return person;
};

const getPromptGenerator = (person) => {
  switch (person) {
    case MENU_OPTIONS.CONNECTION_REQUEST:
      return generateConnectionPrompt;
    case MENU_OPTIONS.ADEEL:
      return generatePromptAdeel;
    case MENU_OPTIONS.JAHANZAIB:
      return generatePromptJahanzaib;
    case MENU_OPTIONS.LAEEQ:
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
  // @TODO add some funcky 2 line consoles starting
  console.clear();
  console.log(chalk.yellow('Welcome to LinkedIn Outreach Program!'));
  console.log(
    chalk.bgGreen(
      'Select a person to generate a personalized LinkedIn outreach message.',
    ),
  );
  console.log(
    chalk.yellow('You can also exit the program by selecting "Exit".'),
  );
  console.log(chalk.bgWhiteBright('-'.repeat(50)));

  const person = await selectPerson();
  if (person === MENU_OPTIONS.EXIT) {
    console.log(chalk.yellow('Exiting program...'));
    process.exit(0);
  }

  const promptGenerator = getPromptGenerator(person);
  await processExcel(inputFile, outputFile, promptGenerator, person);
};

main();
