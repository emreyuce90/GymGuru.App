import { IQueryResult } from './IQueryResult';

// export type ResponseType = {
//   Success: boolean;
//   Message?: string;
//   Comment?: string;
//   Code?: number;
//   Details?: string[];
//   Resource?: unknown;
// };

export interface IResponse<T = any> {
  Success: boolean;
  Message?: string;
  Comment?: string;
  Code?: number;
  Details?: string[];
  Resource?: T;
}

// export type QueryResponseType = ResponseType & {
//   Resource?: IQueryResult<unknown>;
// };

export interface IQueryResponse<T = any> extends IResponse<IQueryResult> {
  Resource?: IQueryResult<T>;
}
