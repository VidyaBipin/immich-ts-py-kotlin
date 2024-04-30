export const INotificationRepository = 'INotificationRepository';

export type SendEmailOptions = {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  smtp: SmtpOptions;
};

export type SmtpOptions = {
  host: string;
  port?: number;
  username?: string;
  password?: string;
};

export enum EmailTemplate {
  WELCOME = 'welcome',
  RESET_PASSWORD = 'reset-password',
}

export interface WelcomeEmailProps {
  baseUrl: string;
  displayName: string;
  username: string;
  password?: string;
}

export interface ResetPasswordEmailProps {
  user: string;
  email: string;
}

export type EmailRenderRequest =
  | { template: EmailTemplate.WELCOME; data: WelcomeEmailProps }
  | { template: EmailTemplate.RESET_PASSWORD; data: ResetPasswordEmailProps };

export type SendEmailResponse = {
  messageId: string;
  response: any;
};

export interface INotificationRepository {
  renderEmail(request: EmailRenderRequest): { html: string; text: string };
  sendEmail(options: SendEmailOptions): Promise<SendEmailResponse>;
  verifySmtp(options: SmtpOptions): Promise<true>;
}
