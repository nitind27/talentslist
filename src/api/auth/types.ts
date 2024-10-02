export interface ILoginResponse {
    token:   string;
    status:  boolean;
    message: string;
}

export interface ISignUpResponse {
    talent: number | string;
    message: string;
    status: boolean;
}

export interface IPassword {
    status:  boolean;
    message: string;
}

export interface ForgatePasswordtData {
    email: string;
}

export interface ResetPasswordtData {
    email: string;
    token: string;
    password: number | string;
    password_confirmation: number | string;
}



