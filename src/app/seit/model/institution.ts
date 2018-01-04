import { Department } from './department';

export class Institution {
    private _iid: number;
    private _institution: string;

    private _departments: Department[];

    public get iid(): number {
        return this._iid;
    }
    public set iid(value: number) {
        this._iid = value;
    }

    public get institution(): string {
        return this._institution;
    }
    public set institution(value: string) {
        this._institution = value;
    }

    public get departments(): Department[] {
        return this._departments;
    }
    public set departments(value: Department[]) {
        const departments: Department[] = new Array();
        for (const temp of value) {
            departments.push(Object.assign(new Department(), temp));
        }

        this._departments = departments;
    }
}
