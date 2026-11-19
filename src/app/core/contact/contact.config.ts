import { Web3FormsConfig } from './contact.gateway';

/**
 * Contact form delivery. Get the access key at https://web3forms.com (enter the inbox that should
 * receive the messages) and paste it below. The key is public by design: it only lets this form
 * send to that inbox, so it is safe to commit.
 */
export const CONTACT_FORM_CONFIG: Web3FormsConfig = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: '1f99103c-740a-4d63-bc14-7e8be69376f4',
  subject: 'Nuevo mensaje desde el portafolio',
  fromName: 'Portafolio Lazaro Guerra',
};
