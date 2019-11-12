export class User
{
    constructor(
        public username:string, 
        public authKey:string,
        public passwordEncrypted:string,
        public reminderUsername:string, 
        public reminderUserId: string,
        public failureMessage){}
}