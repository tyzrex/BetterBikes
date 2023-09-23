export interface IRegister {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    address: string;
}

export interface ILogin{
    email: string;
    password: string;
}

export interface IGoogleLogin{
    email: string;
    name: string;
    oAuthProvider: string;
    oAuthId: string;
    profileImage: string;
    token: string;
}