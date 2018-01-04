export class Department {
    private _tdid: number;
    private _department: string;
    private _parent_tdid: number;
    private _seq: number;
    private _ou: string;
    private _tiid: number;

    public get tdid(): number {
        return this._tdid;
    }
    public set tdid(value: number) {
        this._tdid = value;
    }

    public get department(): string {
        return this._department;
    }
    public set department(value: string) {
        this._department = value;
    }

    public get parent_tdid(): number {
        return this._parent_tdid;
    }
    public set parent_tdid(value: number) {
        this._parent_tdid = value;
    }

    public get seq(): number {
        return this._seq;
    }
    public set seq(value: number) {
        this._seq = value;
    }

    public get ou(): string {
        return this._ou;
    }
    public set ou(value: string) {
        this._ou = value;
    }

    public get tiid(): number {
        return this._tiid;
    }
    public set tiid(value: number) {
        this._tiid = value;
    }
}
