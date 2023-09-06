export class User {
    constructor(
        private _accessToken: string,
        public userId: number,
        public emailAddress: string,
        public username: string,
        public roleId: number,

        public source: string,
        public firstName: string,
        public middleName: string,
        public lastName: string,

        public pubId: number,
        public hireDate: string,
    ) { }
    getToken() {
        return this._accessToken;
    }
}
