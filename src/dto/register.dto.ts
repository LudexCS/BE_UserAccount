export interface RegisterRequestDto {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
}

export interface RegisterVerifyDto {
    email: string;
    code: string;
}