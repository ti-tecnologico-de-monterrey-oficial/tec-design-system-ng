type Options<OptionsT extends RequestInit = RequestInit> = OptionsT & {
    query?: Record<string, any>;
};
declare class FetchError extends Error {
    response: Response;
    data: Record<any, any> | undefined;
    constructor(response: Response, data: Record<any, any> | undefined);
}
export declare const isFetchError: (error: unknown) => error is FetchError;
export declare function getProxyUrl(): string | undefined;
export declare const request: {
    get: <MetaT>(url: string, options?: Options) => Promise<{
        response: Response;
        data: MetaT;
    }>;
    post: <MetaT>(url: string, body: Record<any, any>, options?: Options) => Promise<{
        response: Response;
        data: MetaT;
    }>;
    put: <MetaT>(url: string, body: Record<any, any>, options?: Options) => Promise<{
        response: Response;
        data: MetaT;
    }>;
    delete: <MetaT>(url: string, body?: Record<any, any>, options?: Options) => Promise<{
        response: Response;
        data: MetaT;
    }>;
};
export {};
//# sourceMappingURL=fetch.d.ts.map