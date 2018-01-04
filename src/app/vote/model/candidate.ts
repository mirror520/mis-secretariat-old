export class Candidate {
    private _vcid: number;
    private _candidate: string;

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
