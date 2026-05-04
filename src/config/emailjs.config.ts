/**
 * EmailJS Configuration
 * 
 * To set up EmailJS:
 * 1. Go to https://www.emailjs.com/ and create a free account
 * 2. Create an Email Service (Gmail, Outlook, etc.)
 * 3. Create an Email Template with these variables:
 *    - {{from_name}} - sender's name
 *    - {{from_email}} - sender's email
 *    - {{message}} - the message content
 * 4. Get your Public Key from Account settings
 * 5. Replace the placeholder values below with your actual EmailJS credentials
 */

export const EMAILJS_CONFIG = {
  // Replace with your EmailJS Public Key (from Account > General)
  PUBLIC_KEY: 'bYt9_HENj52RP2BzN',
  
  // Replace with your EmailJS Service ID (from Email Services)
  SERVICE_ID: 'service_f9ss0jz',
  
  // Replace with your EmailJS Template ID (from Email Templates)
  TEMPLATE_ID: 'template_f1tzlyn',
};

/**
 * Example EmailJS Template:
 * 
 * Subject: New Contact Form Message from {{from_name}}
 * 
 * Body:
 * You have received a new message from your portfolio website:
 * 
 * Name: {{from_name}}
 * Email: {{from_email}}
 * 
 * Message:
 * {{message}}
 * 
 * ---
 * This email was sent from your portfolio contact form.
 */
