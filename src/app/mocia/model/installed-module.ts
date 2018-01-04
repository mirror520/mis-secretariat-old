export class InstalledModule {
    private _version: string;
    private _description: string;

    set version(value: string) {
        this._version = value;
    }
    get version(): string {
        return this._version;
    }

    set description(value: string) {
        this._description = value;
    }
    get description(): string {
        return this._description;
    }
}
