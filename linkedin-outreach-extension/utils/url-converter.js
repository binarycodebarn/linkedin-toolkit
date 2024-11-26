
export function convertToSalesNavigatorURL(profileURL) {
  if (!profileURL) return '';
  
  const linkedinRegex = /linkedin\.com\/in\/([^\/]+)/;
  const match = profileURL.match(linkedinRegex);
  
  if (match && match[1]) {
    return `https://www.linkedin.com/sales/people/${match[1]}`;
  }
  
  return profileURL;
}