import { IsEmail, IsString, Matches, Length } from 'class-validator';

export class verifyEmailCodeDto {
    @IsEmail({}, { message: '유효한 이메일 형식이 아닙니다.' })
    email: string;

    code: string;
}