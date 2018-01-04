export class Sender {
    private _sid: number;
    private _sender: string;
    private _addressor: string;
    private _host: string;
    private _port: number;
    private _username: string;
    private _password: string;
    private _reply_name: string;
    private _reply_address: string;
    private _confirm_reading: string;

    public get sid(): number {
        return this._sid;
    }
    public set sid(value: number) {
        this._sid = value;
    }

    public get sender(): string {
        return this._sender;
    }
    public set sender(value: string) {
        this._sender = value;
    }

    public get addressor(): string {
        return this._addressor;
    }
    public set addressor(value: string) {
        this._addressor = value;
    }

    public get host(): string {
        return this._host;
    }
    public set host(value: string) {
        this._host = value;
    }

    public get port(): number {
        return this._port;
    }
    public set port(value: number) {
        this._port = value;
    }

    public get username(): string {
        return this._username;
    }
    public set username(value: string) {
        this._username = value;
    }

    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }

    public get reply_name(): string {
        return this._reply_name;
    }
    public set reply_name(value: string) {
        this._reply_name = value;
    }

    public get reply_address(): string {
        return this._reply_address;
    }
    public set reply_address(value: string) {
        this._reply_address = value;
    }

    public get confirm_reading(): string {
        return this._confirm_reading;
    }
    public set confirm_reading(value: string) {
        this._confirm_reading = value;
    }
}
