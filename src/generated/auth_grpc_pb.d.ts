// package: useraccount
// file: auth.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as auth_pb from "./auth_pb";

interface IAuthServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    authByJWT: IAuthServiceService_IAuthByJWT;
    getUserIdByEmail: IAuthServiceService_IGetUserIdByEmail;
    adminAuthByJWT: IAuthServiceService_IAdminAuthByJWT;
}

interface IAuthServiceService_IAuthByJWT extends grpc.MethodDefinition<auth_pb.AuthRequest, auth_pb.AuthResponse> {
    path: "/useraccount.AuthService/AuthByJWT";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<auth_pb.AuthRequest>;
    requestDeserialize: grpc.deserialize<auth_pb.AuthRequest>;
    responseSerialize: grpc.serialize<auth_pb.AuthResponse>;
    responseDeserialize: grpc.deserialize<auth_pb.AuthResponse>;
}
interface IAuthServiceService_IGetUserIdByEmail extends grpc.MethodDefinition<auth_pb.EmailRequest, auth_pb.UserIdResponse> {
    path: "/useraccount.AuthService/GetUserIdByEmail";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<auth_pb.EmailRequest>;
    requestDeserialize: grpc.deserialize<auth_pb.EmailRequest>;
    responseSerialize: grpc.serialize<auth_pb.UserIdResponse>;
    responseDeserialize: grpc.deserialize<auth_pb.UserIdResponse>;
}
interface IAuthServiceService_IAdminAuthByJWT extends grpc.MethodDefinition<auth_pb.AuthRequest, auth_pb.AdminAuthResponse> {
    path: "/useraccount.AuthService/AdminAuthByJWT";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<auth_pb.AuthRequest>;
    requestDeserialize: grpc.deserialize<auth_pb.AuthRequest>;
    responseSerialize: grpc.serialize<auth_pb.AdminAuthResponse>;
    responseDeserialize: grpc.deserialize<auth_pb.AdminAuthResponse>;
}

export const AuthServiceService: IAuthServiceService;

export interface IAuthServiceServer extends grpc.UntypedServiceImplementation {
    authByJWT: grpc.handleUnaryCall<auth_pb.AuthRequest, auth_pb.AuthResponse>;
    getUserIdByEmail: grpc.handleUnaryCall<auth_pb.EmailRequest, auth_pb.UserIdResponse>;
    adminAuthByJWT: grpc.handleUnaryCall<auth_pb.AuthRequest, auth_pb.AdminAuthResponse>;
}

export interface IAuthServiceClient {
    authByJWT(request: auth_pb.AuthRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    authByJWT(request: auth_pb.AuthRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    authByJWT(request: auth_pb.AuthRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    getUserIdByEmail(request: auth_pb.EmailRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.UserIdResponse) => void): grpc.ClientUnaryCall;
    getUserIdByEmail(request: auth_pb.EmailRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.UserIdResponse) => void): grpc.ClientUnaryCall;
    getUserIdByEmail(request: auth_pb.EmailRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.UserIdResponse) => void): grpc.ClientUnaryCall;
    adminAuthByJWT(request: auth_pb.AuthRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.AdminAuthResponse) => void): grpc.ClientUnaryCall;
    adminAuthByJWT(request: auth_pb.AuthRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.AdminAuthResponse) => void): grpc.ClientUnaryCall;
    adminAuthByJWT(request: auth_pb.AuthRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.AdminAuthResponse) => void): grpc.ClientUnaryCall;
}

export class AuthServiceClient extends grpc.Client implements IAuthServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public authByJWT(request: auth_pb.AuthRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    public authByJWT(request: auth_pb.AuthRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    public authByJWT(request: auth_pb.AuthRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    public getUserIdByEmail(request: auth_pb.EmailRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.UserIdResponse) => void): grpc.ClientUnaryCall;
    public getUserIdByEmail(request: auth_pb.EmailRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.UserIdResponse) => void): grpc.ClientUnaryCall;
    public getUserIdByEmail(request: auth_pb.EmailRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.UserIdResponse) => void): grpc.ClientUnaryCall;
    public adminAuthByJWT(request: auth_pb.AuthRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.AdminAuthResponse) => void): grpc.ClientUnaryCall;
    public adminAuthByJWT(request: auth_pb.AuthRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.AdminAuthResponse) => void): grpc.ClientUnaryCall;
    public adminAuthByJWT(request: auth_pb.AuthRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.AdminAuthResponse) => void): grpc.ClientUnaryCall;
}
