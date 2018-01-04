export class MailTemplate {
    private _mtid: number;
    private _subject: string;
    private _body: string;

    public get mtid(): number {
        return this._mtid;
    }
    public set mtid(value: number) {
        this._mtid = value;
    }

    public get subject(): string {
        return this._subject;
    }
    public set subject(value: string) {
        this._subject = value;
    }

    public get body(): string {
        return this._body;
    }
    public set body(value: string) {
        this._body = value;
    }
}
