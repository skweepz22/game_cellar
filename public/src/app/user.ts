export class User{
    constructor(
        public username: string = "",
        public email: string = "",
        public password: string = "",
        public bio: string = "",
        public phone: string = "",
        public system: string = "",
        public profile = "",
        public wishlist: Array<object> = []
    ){}
}