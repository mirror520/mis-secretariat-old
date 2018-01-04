export class Result {
    private _result: number;
    private _vcid: number;
    private _candidate: string;

    public get result(): number {
        return this._result;
    }
    public set result(value: number) {
        this._result = value;
    }

    public get vcid(): number {
        return this._vcid;
    }
    public set vcid(value: number) {
        this._vcid = value;
    }

    public get candidate(): string {
        return this._candidate;
    }
    public set candidate(value: string) {
        this._candidate = value;
    }
}
