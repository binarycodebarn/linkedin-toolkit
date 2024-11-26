# 🚀 LinkedIn Tools

Welcome to LinkedIn Tools! Because who doesn't love automating their LinkedIn outreach and making life a little easier? 😉

## 📂 Project Structure

Here's a quick rundown of what each folder does:

### linkedin-outreach/
This is your go-to folder for automating LinkedIn outreach messages. It contains scripts and configurations to help you generate personalized messages and process Excel files with LinkedIn profiles.

- **data/**: Store your input and output Excel files here. 
  - `input.xlsx`: The Excel file with LinkedIn profiles.
  - `output.xlsx`: The Excel file where the generated messages will be saved.
- **script/**: Contains the magic scripts that do all the heavy lifting.
  - `excelProcessor.mjs`: Processes the Excel file and generates outreach messages.
  - `index.mjs`: The main entry point to run the scripts.
  - `messageGenerator.mjs`: Uses OpenAI to generate personalized messages.
  - `prompt.mjs`: Contains the templates and prompt generators for different personas.
- **.env**: Environment variables configuration file.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **prettier.config.js**: Configuration for Prettier code formatter.

### linkedin-outreach-extension/
This folder contains a Chrome extension to automate LinkedIn outreach directly from your browser. 

- **assets/**: Icons and images used by the extension.
- **lib/**: Contains the `xlsx.min.js` library for handling Excel files.
- **utils/**: Utility scripts for various actions.
  - `actions.js`: Defines actions used in the extension.
  - `url-converter.js`: Converts LinkedIn URLs to Sales Navigator URLs.
- **background.js**: The background script that handles extension logic.
- **content.js**: The content script that interacts with LinkedIn pages.
- **manifest.json**: The configuration file for the Chrome extension.
- **popup.html**: The HTML file for the extension's popup interface.
- **popup.css**: Styles for the popup interface.
- **popup.js**: Logic for the popup interface.
- **README.md**: Documentation for the Chrome extension.

## 🎉 Getting Started

1. **Clone this repo**: `git clone https://github.com/yourusername/linkedin-tools.git`
2. **Install dependencies**: `npm install`
3. **Configure your settings**: Update the `.env` file with your API keys and other settings.
4. **Run the scripts**: `npm start` to process your Excel file and generate outreach messages.
5. **Load the Chrome extension**: Go to `chrome://extensions/`, enable Developer mode, and load the `linkedin-outreach-extension` folder.

## 🤖 Features

- **Automated LinkedIn Outreach**: Generate personalized messages with ease.
- **Chrome Extension**: Automate outreach directly from your browser.
- **Customizable Templates**: Tailor your messages to different personas.
- **Rate Limiting**: Keep LinkedIn happy by not spamming.

## 📬 Important Notes

- **Be Responsible**: Use this tool to enhance your networking, not spam people.
- **Customize Your Messages**: Make sure to personalize the templates to fit your style.
- **Start Slow**: Build your network gradually.

## 🛠️ Contributing

Found a bug? Want to add a feature? PRs are welcome! Just please don't automate sending cat GIFs to everyone - tempting as it may be.

## 📝 License

This project is proprietary and not open for public use. All rights reserved. 🚫

Remember: With great automation comes great responsibility. Use wisely!
