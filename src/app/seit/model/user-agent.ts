export class UserAgent {
    private _mid: number;
    private _fail_time: number;
    private _user_agent: string;
    private _platform: string;
    private _device_type: string;
    private _browser_name_pattern: string;

    public get mid(): number {
        return this._mid;
    }
    public set mid(value: number) {
        this._mid = value;
    }

    public get fail_time(): number {
        return this._fail_time;
    }
    public set fail_time(value: number) {
        this._fail_time = value * 1000;
    }

    public get user_agent(): string {
        return this._user_agent;
    }
    public set user_agent(value: string) {
        this._user_agent = value;
    }

    public get platform(): string {
        return this._platform;
    }
    public set platform(value: string) {
        this._platform = value;
    }

    public get device_type(): string {
        return this._device_type;
    }
    public set device_type(value: string) {
        this._device_type = value;
    }

    public get browser_name_pattern(): string {
        return this._browser_name_pattern;
    }
    public set browser_name_pattern(value: string) {
        this._browser_name_pattern = value;
    }
}
