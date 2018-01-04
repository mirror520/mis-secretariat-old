export class Session {
    private _vsid: number;
    private _session: string;
    private _start_time: number;
    private _end_time: number;

    private _startTime: Date;
    private _endTime: Date;

    public get vsid(): number {
        return this._vsid;
    }
    public set vsid(value: number) {
        this._vsid = value;
    }

    public get session(): string {
        return this._session;
    }
    public set session(value: string) {
        this._session = value;
    }

    public get start_time(): number {
        return this._start_time;
    }
    public set start_time(value: number) {
        this._start_time = value;
        this._startTime = new Date(value * 1000);
    }

    public get end_time(): number {
        return this._end_time;
    }
    public set end_time(value: number) {
        this._end_time = value;
        this._endTime = new Date(value * 1000);
    }

    public get startTime(): Date {
        return this._startTime;
    }
    public get endTime(): Date {
        return this._endTime;
    }
}
