import * as grpc from '@grpc/grpc-js';
import { AuthResponse, EmailRequest, UserIdResponse } from '../generated/auth_pb';
import { AuthServiceService, IAuthServiceServer } from '../generated/auth_grpc_pb';
import { verifyToken } from "../service/jwt.service";
import { JwtPayload } from "jsonwebtoken";
import {findIdByEmail} from "../repository/account.repository";

const authServiceImpl: IAuthServiceServer = {
    authByJWT: (call, callback) => {
        const jwt = call.request.getJwt();

        // "Bearer " 제거
        const token = jwt.split(' ')[1];

        const payload: JwtPayload = verifyToken(token);
        const email = payload.sub;
        if (!email) {
            return callback(new Error('Invalid JWT payload: missing email'), null);
        }

        const res = new AuthResponse();
        res.setEmail(email);

        callback(null, res);
    },
    getUserIdByEmail: async (call, callback) => {
        const email = call.request.getEmail();

        try {
            const userId = await findIdByEmail(email);
            if (!userId) {
                return callback(new Error('User not found'), null);
            }

            const response = new UserIdResponse();
            response.setUserId(userId);
            callback(null, response);
        } catch (error) {
            callback(error as Error, null);
        }
    }
};

export async function startGrpcServer() {
    const server = new grpc.Server();

    server.addService(AuthServiceService, authServiceImpl);

    await new Promise<void>((resolve, reject) => {
        server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
            if (err) {
                return reject(err);
            }
            console.log(`gRPC AuthService running on port ${port}`);
            server.start();
            resolve();
        });
    });
}