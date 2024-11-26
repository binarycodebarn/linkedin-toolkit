import OpenAI from 'openai';
import chalk from 'chalk';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates a personalized LinkedIn outreach message using OpenAI's GPT.
 * @param {string} prompt - The complete prompt for message generation.
 * @returns {Promise<string>} - The generated outreach message.
 */
export const generateMessage = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 250,
      temperature: 0.7,
    });
    console.log(chalk.bold(chalk.green('✨ Message generated successfully!')));
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error(
      chalk.bold(
        chalk.red.bold('🚫 OpenAI API Error: ') +
          chalk.red(error.message) +
          '\n' +
          chalk.yellow('Please check your API key and try again.'),
      ),
    );
    return 'Error generating message.';
  }
};
