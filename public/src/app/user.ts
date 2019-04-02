export class User{
    constructor(
        public username: String = "",
        public email: String = "",
        public password: String = "",
        public bio: String = "",
        public phone: String = "",
        public system: String = "",
        public wishlist: Array<object> = []
    ){}
}