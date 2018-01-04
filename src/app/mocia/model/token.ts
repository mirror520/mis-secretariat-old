export class Token {
    private _firmwareVersion: number;
    private _flags: number;
    private _hardwareVersion: number;
    private _label: string;
    private _manufacturerID: string;
    private _model: string;
    private _serialNumber: string;
    private _ulFreePrivateMemory: number;
    private _ulFreePublicMemory: number;
    private _ulMaxPinLen: number;
    private _ulMaxRwSessionCount: number;
    private _ulMaxSessionCount: number;
    private _ulMinPinLen: number;
    private _ulSessionCount: number;
    private _ulTotalPrivateMemory: number;
    private _ulTotalPublicMemory: number;
    private _utcTime: string;

    public get firmwareVersion(): number {
        return this._firmwareVersion;
    }
    public set firmwareVersion(value: number) {
        this._firmwareVersion = value;
    }

    public get flags(): number {
        return this._flags;
    }
    public set flags(value: number) {
        this._flags = value;
    }

    public get hardwareVersion(): number {
        return this._hardwareVersion;
    }
    public set hardwareVersion(value: number) {
        this._hardwareVersion = value;
    }

    public get label(): string {
        return this._label;
    }
    public set label(value: string) {
        this._label = value;
    }

    public get manufacturerID(): string {
        return this._manufacturerID;
    }
    public set manufacturerID(value: string) {
        this._manufacturerID = value;
    }

    public get model(): string {
        return this._model;
    }
    public set model(value: string) {
        this._model = value;
    }

    public get serialNumber(): string {
        return this._serialNumber;
    }
    public set serialNumber(value: string) {
        this._serialNumber = value;
    }

    public get ulFreePrivateMemory(): number {
        return this._ulFreePrivateMemory;
    }
    public set ulFreePrivateMemory(value: number) {
        this._ulFreePrivateMemory = value;
    }

    public get ulFreePublicMemory(): number {
        return this._ulFreePublicMemory;
    }
    public set ulFreePublicMemory(value: number) {
        this._ulFreePublicMemory = value;
    }

    public get ulMaxPinLen(): number {
        return this._ulMaxPinLen;
    }
    public set ulMaxPinLen(value: number) {
        this._ulMaxPinLen = value;
    }

    public get ulMaxRwSessionCount(): number {
        return this._ulMaxRwSessionCount;
    }
    public set ulMaxRwSessionCount(value: number) {
        this._ulMaxRwSessionCount = value;
    }

    public get ulMaxSessionCount(): number {
        return this._ulMaxSessionCount;
    }
    public set ulMaxSessionCount(value: number) {
        this._ulMaxSessionCount = value;
    }

    public get ulMinPinLen(): number {
        return this._ulMinPinLen;
    }
    public set ulMinPinLen(value: number) {
        this._ulMinPinLen = value;
    }

    public get ulSessionCount(): number {
        return this._ulSessionCount;
    }
    public set ulSessionCount(value: number) {
        this._ulSessionCount = value;
    }

    public get ulTotalPrivateMemory(): number {
        return this._ulTotalPrivateMemory;
    }
    public set ulTotalPrivateMemory(value: number) {
        this._ulTotalPrivateMemory = value;
    }

    public get ulTotalPublicMemory(): number {
        return this._ulTotalPublicMemory;
    }
    public set ulTotalPublicMemory(value: number) {
        this._ulTotalPublicMemory = value;
    }

    public get utcTime(): string {
        return this._utcTime;
    }
    public set utcTime(value: string) {
        this._utcTime = value;
    }
}
