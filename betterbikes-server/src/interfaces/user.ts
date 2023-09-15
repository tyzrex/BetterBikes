export interface IUser{
    id: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    name: string;
    phone: string;
    address: string;
    role:  string;
}

export interface IOauthUser{
    id: string;
    email: string;
    profile_image: string | null;
    created_at: Date;
    updated_at: Date;
    name: string;
    phone: string | null;
    address: string | null;
    oAuth_provider: string;
    oAuth_id: string;
    role: string
}

export interface IRegisteredUser{
    user:IUser | null;
    oAuthUser: IOauthUser | null;
    status:boolean;
}

export type IRegisteredResponse = IRegisteredUser | undefined;