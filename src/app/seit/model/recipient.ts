export class Recipient {
    private _rid: number;
    private _recipient: string;
    private _account: string;
    private _addressee: string;
    private _did: number;

    public get rid(): number {
        return this._rid;
    }
    public set rid(value: number) {
        this._rid = value;
    }

    public get recipient(): string {
        return this._recipient;
    }
    public set recipient(value: string) {
        this._recipient = value;
    }

    public get account(): string {
        return this._account;
    }
    public set account(value: string) {
        this._account = value;
    }

    public get addressee(): string {
        return this._addressee;
    }
    public set addressee(value: string) {
        this._addressee = value;
    }

    public get did(): number {
        return this._did;
    }
    public set did(value: number) {
        this._did = value;
    }
}
