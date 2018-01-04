import { Token } from './token';

export class Slot {
    private _firmwareVersion: number;
    private _flags: number;
    private _hardwareVersion: number;
    private _manufacturerID: string;
    private _slotDescription: string;
    private _slotID: number;
    private _token: Token;

    public set firmwareVersion(value: number) {
        this._firmwareVersion = value;
    }
    public get firmwareVersion(): number {
        return this._firmwareVersion;
    }

    public set flags(value: number) {
        this._flags = value;
    }
    public get flags(): number {
        return this._flags;
    }

    public set hardwareVersion(value: number) {
        this._hardwareVersion = value;
    }
    public get hardwareVersion(): number {
        return this._hardwareVersion;
    }

    public set manufacturerID(value: string) {
        this._manufacturerID = value;
    }
    public get manufacturerID(): string {
        return this._manufacturerID;
    }

    public set slotDescription(value: string) {
        this._slotDescription = value;
    }
    public get slotDescription(): string {
        return this._slotDescription;
    }

    public set slotID(value: number) {
        this._slotID = value;
    }
    public get slotID(): number {
        return this._slotID;
    }

    public set token(value: Token) {
        this._token = Object.assign(new Token(), value);
    }
    public get token(): Token {
        return this._token;
    }
}
