export interface RegisterRequestDto {
    name: string;
    email: string;
    password: string;
}

export interface RegisterVerifyDto {
    email: string;
    code: string;
}