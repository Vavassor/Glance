export interface EmailSpec {
    from: string;
    html: string;
    subject: string;
    text: string;
    to: string | string[];
}