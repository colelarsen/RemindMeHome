export class Reminder
{
    constructor(public info:string, public timestamp:number, 
        public username:string, public userID:string, public attachment:string, public id:string,
    public successMessage:string, failureMessage:string){}
}