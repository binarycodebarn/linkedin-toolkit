const companyServicesDescription = `
  **Services Offered by Binary Code Barn**:
    - Comprehensive web and mobile app development using technologies like Node.js, AWS, React.js, Flutter, Swift, and Kotlin.
    - Staff augmentation to support team scaling with skilled professionals across software development fields.
    - Custom software solutions tailored to unique business needs.
    - Proven track record of delivering innovative, cost-effective solutions for clients worldwide.
`;

const outreachMessageTemplate = (name) => `
  **Message Guidelines**:
    1. **Focus on the Recipient**:
      - Start with a warm greeting and use the recipient's name i.e, Hi {first name}.
      - Compliment their achievements, company mission, or recent accomplishments.
      - Ensure the message feels tailored to them.

    2. **Introduction**:
      - Briefly introduce ${name} and Binary Code Barn.
      - Emphasize how ${name}'s expertise and team can subtly add value to their company's goals.

    3. **Value Proposition**:
      - Align Binary Code Barn's offerings with their company needs (e.g., staff augmentation, product development).
      - Highlight potential benefits, such as cost savings, efficiency, or scalability, without hard-selling.

    4. **Call-to-Action**:
      - Suggest a quick call to discuss potential collaboration.
      - If collaboration isn't immediate, express interest in staying connected and following their journey.

    5. **Tone**:
      - Professional, engaging, and recipient-focused.
      - Keep it concise and clear.
      - Maintain brevity and engagement. Don't exceed more then 2 paragraphs.
      - Given human focus is limited to the first few lines, make them impactful.
`;

const messageFormatRequirements = `
  **Output**:
    - **Subject Line**: Generate a creative and personalized subject line tailored to the recipient's role, company, or achievements to grab their attention.
    - **Message Body**: 
      - Limit the **message body** to no more than 125 words max. In 2 paragraphs.
      - Compose a unique LinkedIn message using the input data and following the guidelines above.
      - Ensure the message is personalized, relevant, and centered around the recipient's accomplishments and company mission.
      - Subtly highlight Binary Code Barn's expertise and how it aligns with their goals.
      - Avoid generic templates; craft each message to feel specific and meaningful.
`;

export const generatePromptAdeel = (
  recipientName,
  recipientJobTitle,
  recipientBio,
  companyName,
  companyBio,
  companyOverview,
) => `
    Purpose: Generate a personalized LinkedIn outreach message for **Adeel Imran**, a Berlin-based software consultant and entrepreneur. The message should focus on the recipient, build rapport, subtly highlight Adeel's and Binary Code Barn's expertise, and explore potential collaboration opportunities.

    **About Adeel Imran**:
    - Berlin-based full-stack software consultant with 9+ years of experience in web and mobile app development.
    - Founder of **Binary Code Barn**, a consultancy specializing in cost-effective web and mobile app development (Android/iOS) and staff augmentation.
    - Offers offshore development teams based in Pakistan and Berlin.
    - Expertise includes scalable platforms, MVP development, AI-driven solutions, and improving operational efficiency.

    ${companyServicesDescription}

    ${outreachMessageTemplate('Adeel')}

    **Input Information**:
    - Recipient Name: ${recipientName}
    - Recipient Job Title: ${recipientJobTitle}
    - Recipient Bio: ${recipientBio}
    - Company Name: ${companyName}
    - Company Bio: ${companyBio}
    - Company Overview: ${companyOverview}

    ${messageFormatRequirements}
`;

export const generatePromptJahanzaib = (
  recipientName,
  recipientJobTitle,
  recipientBio,
  companyName,
  companyBio,
  companyOverview,
) => `
  Purpose: Generate a personalized LinkedIn outreach message for **Jahanzaib Suleman**, a Berlin-based fullstack engineer and customer success specialist. The message should focus on the recipient, build rapport, subtly highlight Jahanzaib's and Binary Code Barn's expertise, and explore potential collaboration opportunities.

    **About Jahanzaib Suleman**:
    - Berlin-based fullstack engineer with 10+ years of experience in software development assurance and web applications.
    - Customer Success Specialist at **Binary Code Barn**, ensuring delivery of high-quality software solutions.
    - Expertise in implementing robust QA processes, automation frameworks, and maintaining high software quality standards.
    - Proven track record in building scalable testing infrastructures and improving development workflows.

    ${companyServicesDescription}

    ${outreachMessageTemplate('Jahanzaib')}

    **Input Information**:
    - Recipient Name: ${recipientName}
    - Recipient Job Title: ${recipientJobTitle}
    - Recipient Bio: ${recipientBio}
    - Company Name: ${companyName}
    - Company Bio: ${companyBio}
    - Company Overview: ${companyOverview}

    ${messageFormatRequirements}
`;

export const generatePromptLaeeq = (
  recipientName,
  recipientJobTitle,
  recipientBio,
  companyName,
  companyBio,
  companyOverview,
) => `
    Purpose: Generate a personalized LinkedIn outreach message for **Laeeq Rehman**, a Berlin-based platform engineer and customer success specialist. The message should focus on the recipient, build rapport, subtly highlight Laeeq's and Binary Code Barn's expertise, and explore potential collaboration opportunities.

    **About Laeeq Rehman**:
    - Berlin-based platform engineer with 10+ years of experience in software quality assurance and platform engineering.
    - Customer Success Specialist at **Binary Code Barn**, ensuring delivery of high-quality software solutions.
    - Expertise in implementing robust QA processes, automation frameworks, and maintaining high software quality standards.
    - Proven track record in building scalable testing infrastructures and improving development workflows.

    ${companyServicesDescription}

    ${outreachMessageTemplate('Laeeq')}

    **Input Information**:
    - Recipient Name: ${recipientName}
    - Recipient Job Title: ${recipientJobTitle}
    - Recipient Bio: ${recipientBio}
    - Company Name: ${companyName}
    - Company Bio: ${companyBio}
    - Company Overview: ${companyOverview}

    ${messageFormatRequirements}
`;
