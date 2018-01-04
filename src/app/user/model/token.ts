export class Token {
    private _access_token: string;
    private _token_type: string;
    private _expires_in: number;

    private _expiresIn: Date;

    public get access_token(): string {
        return this._access_token;
    }
    public set access_token(value: string) {
        this._access_token = value;
    }

    public get token_type(): string {
        return this._token_type;
    }
    public set token_type(value: string) {
        this._token_type = value;
    }

    public get expires_in(): number {
        return this._expires_in;
    }
    public set expires_in(value: number) {
        this._expires_in = value;
        this._expiresIn = new Date(value * 1000);
    }

    public get expiresIn(): Date {
        return this._expiresIn;
    }
}
