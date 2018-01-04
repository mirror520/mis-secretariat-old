import { Department } from './department';
import { Token } from './token';

export class User {
    private _account: string;
    private _name: string;
    private _mail: string;
    private _title: string;
    private _phone: string;
    private _sex: string;
    private _role: string;
    private _enabled: boolean;
    private _dn: string;

    private _department: Department;
    private _token: Token;

    public set account(value: string) {
        this._account = value;
    }
    public get account(): string {
        return this._account;
    }

    public set name(value: string) {
        this._name = value;
    }
    public get name(): string {
        return this._name;
    }

    public set mail(value: string) {
        this._mail = value;
    }
    public get mail(): string {
        return this._mail;
    }

    public set title(value: string) {
        this._title = value;
    }
    public get title(): string {
        return this._title;
    }

    public set phone(value: string) {
        this._phone = value;
    }
    public get phone(): string {
        return this._phone;
    }

    public set sex(value: string) {
        this._sex = value;
    }
    public get sex(): string {
        return this._sex;
    }

    public set role(value: string) {
        this._role = value;
    }
    public get role(): string {
        return this._role;
    }

    public set department(value: Department) {
        this._department = Object.assign(new Department(), value);
    }
    public get department(): Department {
        return this._department;
    }

    public set enabled(value: boolean) {
        this._enabled = value;
    }
    public get enabled(): boolean {
        return this._enabled;
    }

    public set token(value: Token) {
        this._token = Object.assign(new Token(), value);
    }
    public get token(): Token {
        return this._token;
    }
}
