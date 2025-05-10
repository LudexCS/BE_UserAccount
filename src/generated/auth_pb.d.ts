// package: useraccount
// file: auth.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class AuthRequest extends jspb.Message { 
    getJwt(): string;
    setJwt(value: string): AuthRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AuthRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AuthRequest): AuthRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AuthRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AuthRequest;
    static deserializeBinaryFromReader(message: AuthRequest, reader: jspb.BinaryReader): AuthRequest;
}

export namespace AuthRequest {
    export type AsObject = {
        jwt: string,
    }
}

export class AuthResponse extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): AuthResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AuthResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AuthResponse): AuthResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AuthResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AuthResponse;
    static deserializeBinaryFromReader(message: AuthResponse, reader: jspb.BinaryReader): AuthResponse;
}

export namespace AuthResponse {
    export type AsObject = {
        email: string,
    }
}

export class EmailRequest extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): EmailRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EmailRequest.AsObject;
    static toObject(includeInstance: boolean, msg: EmailRequest): EmailRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EmailRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EmailRequest;
    static deserializeBinaryFromReader(message: EmailRequest, reader: jspb.BinaryReader): EmailRequest;
}

export namespace EmailRequest {
    export type AsObject = {
        email: string,
    }
}

export class UserIdResponse extends jspb.Message { 
    getUserId(): number;
    setUserId(value: number): UserIdResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserIdResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UserIdResponse): UserIdResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserIdResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserIdResponse;
    static deserializeBinaryFromReader(message: UserIdResponse, reader: jspb.BinaryReader): UserIdResponse;
}

export namespace UserIdResponse {
    export type AsObject = {
        userId: number,
    }
}

export class AdminAuthResponse extends jspb.Message { 
    getUserId(): number;
    setUserId(value: number): AdminAuthResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AdminAuthResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AdminAuthResponse): AdminAuthResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AdminAuthResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AdminAuthResponse;
    static deserializeBinaryFromReader(message: AdminAuthResponse, reader: jspb.BinaryReader): AdminAuthResponse;
}

export namespace AdminAuthResponse {
    export type AsObject = {
        userId: number,
    }
}
