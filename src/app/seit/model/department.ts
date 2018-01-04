import { Mail } from './mail';

export class Department {
    private _did: number;
    private _department: string;
    private _seq: number;

    private _mails: Mail[];

    public get did(): number {
        return this._did;
    }
    public set did(value: number) {
        this._did = value;
    }

    public get department(): string {
        return this._department;
    }
    public set department(value: string) {
        this._department = value;
    }

    public get seq(): number {
        return this._seq;
    }
    public set seq(value: number) {
        this._seq = value;
    }

    public get mails(): Mail[] {
        return this._mails;
    }
    public set mails(value: Mail[]) {
        const mails: Mail[] = new Array();
        for (const temp of value) {
            mails.push(Object.assign(new Mail(), temp));
        }

        this._mails = mails;
    }
}
