import { MailTemplate } from './mail-template';
import { Sender } from './sender';
import { Recipient } from './recipient';

export class Mail {
    private _mid: number;
    private _create_time: number;
    private _delivery_time: number;
    private _fail_time: number;
    private _mail_status: string;
    private _test_status: string;
    private _mtid: number;
    private _sid: number;
    private _rid: number;

    private _mail_template: MailTemplate;
    private _sender: Sender;
    private _recipient: Recipient;

    public get mid(): number {
        return this._mid;
    }
    public set mid(value: number) {
        this._mid = value;
    }

    public get create_time(): number {
        return this._create_time;
    }
    public set create_time(value: number) {
        this._create_time = value * 1000;
    }

    public get delivery_time(): number {
        return this._delivery_time;
    }
    public set delivery_time(value: number) {
        this._delivery_time = value * 1000;
    }

    public get fail_time(): number {
        return this._fail_time;
    }
    public set fail_time(value: number) {
        this._fail_time = value * 1000;
    }

    public get mail_status(): string {
        return this._mail_status;
    }
    public set mail_status(value: string) {
        this._mail_status = value;
    }

    public get test_status(): string {
        return this._test_status;
    }
    public set test_status(value: string) {
        this._test_status = value;
    }

    public get mtid(): number {
        return this._mtid;
    }
    public set mtid(value: number) {
        this._mtid = value;
    }

    public get sid(): number {
        return this._sid;
    }
    public set sid(value: number) {
        this._sid = value;
    }

    public get rid(): number {
        return this._rid;
    }
    public set rid(value: number) {
        this._rid = value;
    }

    public get mail_template(): MailTemplate {
        return this._mail_template;
    }
    public set mail_template(value: MailTemplate) {
        this._mail_template = Object.assign(new MailTemplate(), value);
    }

    public get sender(): Sender {
        return this._sender;
    }
    public set sender(value: Sender) {
        this._sender = Object.assign(new Sender(), value);
    }

    public get recipient(): Recipient {
        return this._recipient;
    }
    public set recipient(value: Recipient) {
        this._recipient = Object.assign(new Recipient(), value);
    }
}
