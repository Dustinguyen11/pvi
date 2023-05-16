

export enum ChatAIApiEndpoint { 
    askDocument
}


export class ChatAI {
    private endpoint: ChatAIApiEndpoint
    private _data: any  | null
    private _headers: any
    private _query: any
    constructor(endpoint: ChatAIApiEndpoint, {data, headers, query}: { data: any | null, headers: any| null, query: any | null}) {
        this.endpoint = endpoint
        this._data = data
        this._headers = headers || {}
        this._query = query || {}
    }

    get base(): string {
        return "https://api.berri.ai"
    }
    get path() : string {
        switch (this.endpoint) {
            case ChatAIApiEndpoint.askDocument:
                return "/query"
        }
    }

    get url(): string {
        return this.base + this.path + "?"+ new URLSearchParams(this._query)
    }

    get body(): string | null {
        if (this._data == null) {
            return null
        }
        return JSON.stringify(this._data)
    }

    get method(): string {
        switch (this.endpoint) {
            case ChatAIApiEndpoint.askDocument:
                return "GET"
        }
    }

    get headers(): Headers {
        const headers = new Headers();
        for (var key in this._headers) {
            let value = headers.get(key);
            if (value == null) {
                continue
            }
            headers.append(key, value );

        }
        return headers
    }

    get contentType(): string {
        return 'application/json; charset=utf-8'
    }
}