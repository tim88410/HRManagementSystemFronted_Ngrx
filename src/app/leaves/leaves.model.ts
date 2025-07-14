// src/app/leaves/leaves.model.ts
export interface Leaves {
  Id: number;
  LeaveName: string;
  Description: string;
  LeaveLimitHours: number;
  OperateUserId: number;
  CreateDate: string;
}

export interface LeavesApiResponse {
  ReturnCode: number;
  ReturnData: {
    ReturnCode: number;
    ReturnData: {
      LeavesInfos: Leaves[];
      Total: number;
    };
  };
}
