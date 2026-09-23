/**
 * Link normalization and formatting utilities for ResumeAI
 * Ensures all contact and social links are valid, secure, and clickable
 * in both browser preview and exported PDF documents.
 */

/**
 * Format email address into a mailto: link
 * @param {string} email
 * @returns {string}
 */
export const formatMailto = (email) => {
  if (!email) return '';
  const cleanEmail = email.trim();
  return cleanEmail.startsWith('mailto:') ? cleanEmail : `mailto:${cleanEmail}`;
};

/**
 * Format phone number into a tel: link
 * Strips whitespace, dashes, parentheses while preserving leading +
 * @param {string} phone
 * @returns {string}
 */
export const formatTel = (phone) => {
  if (!phone) return '';
  const digitsAndPlus = phone.trim().replace(/[^\d+]/g, '');
  return `tel:${digitsAndPlus || phone.trim()}`;
};

/**
 * Format GitHub profile into a complete HTTPS URL
 * Handles full URLs, github.com/user, and bare usernames
 * @param {string} github
 * @returns {string}
 */
export const formatGitHubUrl = (github) => {
  if (!github) return '';
  let clean = github.trim().replace(/^@/, '');
  if (/^https?:\/\//i.test(clean)) {
    return clean;
  }
  if (/^(www\.)?github\.com\//i.test(clean)) {
    return `https://${clean.replace(/^www\./i, '')}`;
  }
  return `https://github.com/${clean}`;
};

/**
 * Format LinkedIn profile into a complete HTTPS URL
 * Handles full URLs, linkedin.com/in/user, in/user, and bare usernames
 * @param {string} linkedin
 * @returns {string}
 */
export const formatLinkedInUrl = (linkedin) => {
  if (!linkedin) return '';
  let clean = linkedin.trim();
  if (/^https?:\/\//i.test(clean)) {
    return clean;
  }
  if (/^(www\.)?linkedin\.com\//i.test(clean)) {
    return `https://${clean.replace(/^www\./i, '')}`;
  }
  if (/^in\//i.test(clean)) {
    return `https://linkedin.com/${clean}`;
  }
  return `https://linkedin.com/in/${clean}`;
};

/**
 * Format Website / Portfolio into a complete HTTPS URL
 * @param {string} website
 * @returns {string}
 */
export const formatWebsiteUrl = (website) => {
  if (!website) return '';
  const clean = website.trim();
  if (/^https?:\/\//i.test(clean)) {
    return clean;
  }
  return `https://${clean}`;
};

/**
 * Clean URL for clean visual display (strips https://, http://, trailing slashes)
 * @param {string} url
 * @returns {string}
 */
export const formatDisplayUrl = (url) => {
  if (!url) return '';
  return url
    .trim()
    .replace(/^https?:\/\/(www\.)?/i, '')
    .replace(/\/+$/, '');
};

/**
 * Clean LinkedIn string for compact display (e.g. "in/username" or "username")
 * @param {string} linkedin
 * @returns {string}
 */
export const formatLinkedInDisplay = (linkedin) => {
  if (!linkedin) return '';
  return linkedin
    .trim()
    .replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//i, '')
    .replace(/^https?:\/\/(www\.)?linkedin\.com\//i, '')
    .replace(/^in\//i, '')
    .replace(/\/+$/, '');
};
