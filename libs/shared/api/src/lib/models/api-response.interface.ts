// api-response.interface.ts

export interface ApiMetaInfo {
    version: string;
    type: 'object' | 'list' | 'none';
    count: number;
}

export interface ApiSingleResponse<T> {
    result?: T;
    info: ApiMetaInfo;
}

export interface ApiListResponse<T> {
    results?: T[];
    info: ApiMetaInfo;
}
