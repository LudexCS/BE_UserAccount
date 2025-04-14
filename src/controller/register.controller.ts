import { Request, Response } from 'express';
import {
    sendVerificationEmail,
    setPendingUser,
    verifyEmailCode,
    getVerifiedUserData,
} from '../service/email.service';
import { registerUser } from '../service/register.service';
import { checkEmailDuplicate, checkNicknameDuplicate } from '../service/register.service';
import {registerRequestDto} from "../dto/registerRequest.dto";
import {verifyEmailCodeDto} from "../dto/verifyEmailCode.dto";

export const sendVerifyEmailControl = async (req: Request, res: Response) => {
    const userData = req.body as registerRequestDto;
    await sendVerificationEmail(userData.email);
    setPendingUser(userData);
};

export const getVerifyEmailCodeControl = async (req: Request, res: Response): Promise<boolean> => {
    const emailandCode = req.body as verifyEmailCodeDto;
    return verifyEmailCode(emailandCode)
};

//이메일 인증이 끝난 회원이 회원가입 버튼을 눌렀을때 작동하도록 할 함수입니다.
export const completeRegisterControl = async (req: Request, res: Response): Promise<void> => {
    const { email, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        throw new Error('비밀번호가 일치하지 않습니다.')
    }

    // 이메일 인증이 완료된 경우에만 회원가입을 진행
    const userData = await getVerifiedUserData(email);  // 인증된 사용자 데이터 가져오기
    if (!userData) {
        throw new Error('이메일 인증이 완료되지 않았습니다.')
    }
    const registrationData = {
        email,
        nickname: userData.nickname,
        password
    };

    await registerUser(registrationData);  // 비밀번호와 함께 사용자 데이터 DB에 등록
};

export const checkEmailControl = async (req: Request, res: Response) : Promise<void> => {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
        throw new Error('이메일을 입력하세요.')
    }
    await checkEmailDuplicate(email);
};

export const checkNicknameControl = async (req: Request, res: Response) : Promise<void> => {
    const { nickname } = req.body;

    if (!nickname || typeof nickname !== 'string') {
        throw new Error('닉네임을 입력하세요.')
    }
    await checkNicknameDuplicate(nickname);
};