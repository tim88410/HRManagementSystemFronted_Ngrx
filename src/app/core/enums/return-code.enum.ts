export enum ReturnCode {
  None = 0,
  AuthorizationFailed = 1,
  ParamError = 2,
  DBConnectError = 3,
  OperationFailed = 4,
  OperationSuccessful = 5,
  DataNotFound = 6,
  ParseError = 7,
  IntegrationException = 8,
  IntegrationHTTP = 9,
  JsonParseError = 10
}