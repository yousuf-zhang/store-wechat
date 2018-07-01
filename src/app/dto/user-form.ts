import {BaseForm} from "./base-form";

export class UserForm extends BaseForm {
    loginName: string;
    telephone: string;
    wechart: string;
    state: number;
    startTime: string;
    endTime: string;
    statusList: any[];
}
