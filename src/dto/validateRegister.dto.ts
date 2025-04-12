import { IsEmail, IsString, Matches, Length } from 'class-validator';

export class ValidateUserDto {
    @IsString()
    @Length(2, 10, { message: '닉네임은 2자 이상 20자 이하이어야 합니다.' })
    nickname: string;

    @IsEmail({}, { message: '유효한 이메일 형식이 아닙니다.' })
    email: string;

    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/, {
        message: '비밀번호는 8~16자, 문자와 숫자를 포함해야 합니다.',
    })
    password: string;
}