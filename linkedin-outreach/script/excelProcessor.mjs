import xlsx from 'xlsx';
import chalk from 'chalk';
import { generateMessage } from './messageGenerator.mjs';

/**
 * Processes an Excel file and generates LinkedIn outreach messages.
 * @param {string} inputFilePath - Path to the input Excel file.
 * @param {string} outputFilePath - Path to save the output Excel file.
 * @param {Function} promptGenerator - Function to generate prompts based on selected person
 * @param {string} selectedPerson - Name of the selected person
 */
export const processExcel = async (
  inputFilePath,
  outputFilePath,
  promptGenerator,
  selectedPerson,
) => {
  try {
    console.log(
      chalk.blue('📚 ') +
        chalk.cyan('Starting Excel processing as: ') +
        chalk.yellow.bold(selectedPerson),
    );

    // Read Excel file
    const workbook = xlsx.readFile(inputFilePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // Get headers and data while preserving order
    const headers = xlsx.utils.sheet_to_json(sheet, { header: 1 })[0];
    const data = xlsx.utils.sheet_to_json(sheet, { header: headers, range: 1 }); // Start from row 1 to skip header

    // Process rows and generate messages
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const {
        'Person Name': recipientName,
        'Job Title': recipientJobTitle,
        'Person Bio': recipientBio,
        Company: companyName,
        'Company Bio': companyBio,
        'Company Overview': companyOverview,
      } = row;

      if (recipientName && companyName) {
        console.log(
          chalk.blue('🎯 ') +
            chalk.cyan('Processing: ') +
            chalk.yellow.bold(`${recipientName} (${recipientJobTitle})`) +
            chalk.cyan(' | Company: ') +
            chalk.magenta.bold(companyName),
        );
        console.log(
          chalk.bold(
            chalk.blue('🤖 ') +
              chalk.cyan('Requesting AI response for ') +
              chalk.yellow.bold(`${recipientName} (${recipientJobTitle})`) +
              chalk.cyan(' from ') +
              chalk.magenta.bold(companyName),
          ),
        );

        const prompt = promptGenerator(
          recipientName,
          recipientJobTitle,
          recipientBio,
          companyName,
          companyBio,
          companyOverview,
        );

        row['Outreach Message'] = await generateMessage(prompt);
      } else {
        console.warn(
          chalk.yellow('⚠️ Missing data for entry: ') +
            chalk.yellow.bold(recipientName || 'Unknown Contact'),
        );
        row['Outreach Message'] = 'Insufficient data to generate a message.';
      }
    }

    // Create new workbook with preserved column order
    const newWorkbook = xlsx.utils.book_new();
    const newSheet = xlsx.utils.json_to_sheet(data, {
      header: headers,
      skipHeader: false, // Ensure headers are written only once
    });
    xlsx.utils.book_append_sheet(newWorkbook, newSheet, 'Messages');
    xlsx.writeFile(newWorkbook, outputFilePath);

    console.log(
      chalk.green.bold('✅ Success! ') +
        chalk.cyan('Generated messages saved to: ') +
        chalk.blue.underline(outputFilePath) +
        '\n' +
        chalk.green('🎉 Processing completed successfully!'),
    );
  } catch (error) {
    console.error(
      chalk.red.bold('❌ Excel Processing Error:\n') +
        chalk.red('→ ') +
        chalk.yellow(error.message) +
        '\n' +
        chalk.red('→ ') +
        chalk.yellow('Please check your input file and try again.'),
    );
  }
};
