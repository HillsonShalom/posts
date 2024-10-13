// types/global.d.ts

declare global {
    class AppResError extends Error {
        statusCode?: number;

        constructor(status: number, message: string);
    }

    interface AppResError extends Error {
        statusCode?: number;
    }
}

// הכנס את הקובץ תחת מודול
export {};
