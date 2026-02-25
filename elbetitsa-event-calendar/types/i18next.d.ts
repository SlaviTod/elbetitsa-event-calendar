import 'i18next';
import translation from '@/translator/en.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'translation';
        resources: {
            translation: typeof translation;
        };
    }
}