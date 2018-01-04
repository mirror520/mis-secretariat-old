import { InstalledModule } from './installed-module';
import { Slot } from './slot';

export class Pkcs11 {
    private _cryptokiVersion: string;
    private _flags: string;
    private _func: string;
    private _last_error: number;
    private _libraryDescription: string;
    private _libraryVersion: number;
    private _manufacturerID: string;
    private _ret_code: number;
    private _slots: Slot[];
    private _version: string;
    private _serverVersion: string;
    private _installedModule: InstalledModule[];

    public set cryptokiVersion(value: string) {
        this._cryptokiVersion = value;
    }
    public get cryptokiVersion(): string {
        return this._cryptokiVersion;
    }

    public set flags(value: string) {
        this._flags = value;
    }
    public get flags(): string {
        return this._flags;
    }

    public set func(value: string) {
        this._func = value;
    }
    public get func(): string {
        return this._func;
    }

    public set last_error(value: number) {
        this._last_error = value;
    }
    public get last_error(): number {
        return this._last_error;
    }

    public set libraryDescription(value: string) {
        this._libraryDescription = value;
    }
    public get libraryDescription(): string {
        return this._libraryDescription;
    }

    public set libraryVersion(value: number) {
        this._libraryVersion = value;
    }
    public get libraryVersion(): number {
        return this._libraryVersion;
    }

    public set manufacturerID(value: string) {
        this._manufacturerID = value;
    }
    public get manufacturerID(): string {
        return this._manufacturerID;
    }

    public set ret_code(value: number) {
        this._ret_code = value;
    }
    public get ret_code(): number {
        return this._ret_code;
    }

    public set slots(value: Slot[]) {
        const temps: Slot[] = new Array();
        for (const slot of value) {
            temps.push(Object.assign(new Slot(), slot));
        }

        this._slots = temps;
    }
    public get slots(): Slot[] {
        return this._slots;
    }

    public set version(value: string) {
        this._version = value;
    }
    public get version(): string {
        return this._version;
    }

    public set serverVersion(value: string) {
        this._serverVersion = value;
    }
    public get serverVersion(): string {
        return this._serverVersion;
    }

    public set installedModule(value: InstalledModule[]) {
        const temps: InstalledModule[] = new Array();
        for (const installedModule of value) {
            temps.push(Object.assign(new InstalledModule(), installedModule));
        }

        this._installedModule = temps;
    }
    public get installedModule(): InstalledModule[] {
        return this._installedModule;
    }
}
