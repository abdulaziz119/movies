import { IncomingHttpHeaders } from 'http';

export interface CustomHeaders extends IncomingHttpHeaders {
    authorization: string;
    language: 'uz' | 'ru' | 'en';
}
