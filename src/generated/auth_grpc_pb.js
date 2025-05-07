// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var auth_pb = require('./auth_pb.js');

function serialize_useraccount_AdminAuthResponse(arg) {
  if (!(arg instanceof auth_pb.AdminAuthResponse)) {
    throw new Error('Expected argument of type useraccount.AdminAuthResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_useraccount_AdminAuthResponse(buffer_arg) {
  return auth_pb.AdminAuthResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_useraccount_AuthRequest(arg) {
  if (!(arg instanceof auth_pb.AuthRequest)) {
    throw new Error('Expected argument of type useraccount.AuthRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_useraccount_AuthRequest(buffer_arg) {
  return auth_pb.AuthRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_useraccount_AuthResponse(arg) {
  if (!(arg instanceof auth_pb.AuthResponse)) {
    throw new Error('Expected argument of type useraccount.AuthResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_useraccount_AuthResponse(buffer_arg) {
  return auth_pb.AuthResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_useraccount_EmailRequest(arg) {
  if (!(arg instanceof auth_pb.EmailRequest)) {
    throw new Error('Expected argument of type useraccount.EmailRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_useraccount_EmailRequest(buffer_arg) {
  return auth_pb.EmailRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_useraccount_UserIdResponse(arg) {
  if (!(arg instanceof auth_pb.UserIdResponse)) {
    throw new Error('Expected argument of type useraccount.UserIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_useraccount_UserIdResponse(buffer_arg) {
  return auth_pb.UserIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var AuthServiceService = exports.AuthServiceService = {
  authByJWT: {
    path: '/useraccount.AuthService/AuthByJWT',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.AuthRequest,
    responseType: auth_pb.AuthResponse,
    requestSerialize: serialize_useraccount_AuthRequest,
    requestDeserialize: deserialize_useraccount_AuthRequest,
    responseSerialize: serialize_useraccount_AuthResponse,
    responseDeserialize: deserialize_useraccount_AuthResponse,
  },
  getUserIdByEmail: {
    path: '/useraccount.AuthService/GetUserIdByEmail',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.EmailRequest,
    responseType: auth_pb.UserIdResponse,
    requestSerialize: serialize_useraccount_EmailRequest,
    requestDeserialize: deserialize_useraccount_EmailRequest,
    responseSerialize: serialize_useraccount_UserIdResponse,
    responseDeserialize: deserialize_useraccount_UserIdResponse,
  },
  adminAuthByJWT: {
    path: '/useraccount.AuthService/AdminAuthByJWT',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.AuthRequest,
    responseType: auth_pb.AdminAuthResponse,
    requestSerialize: serialize_useraccount_AuthRequest,
    requestDeserialize: deserialize_useraccount_AuthRequest,
    responseSerialize: serialize_useraccount_AdminAuthResponse,
    responseDeserialize: deserialize_useraccount_AdminAuthResponse,
  },
};

exports.AuthServiceClient = grpc.makeGenericClientConstructor(AuthServiceService, 'AuthService');
