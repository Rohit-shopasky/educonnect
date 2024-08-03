import { EParentType } from "./studentDTO";

export interface IParentDTO {
  parentDetails: IParentDetails[];
  instituteId: string;
  device?: IDevice[];
  address?: string;
  childIds?: string[];
  id?: string;
  createdAt?: Date;
}

export enum EPlatformType {
  ANDROID = "ANDROID",
  APPLE = "APPLE",
  WEB = "WEB",
}

export interface IParentDetails {
  firstName: string;
  lastName: string;
  mob: string;
  parentType: EParentType;
}

export interface IDevice {
  mob: string;
  owner: EParentType;
  deviceDetails: IDeviceDetails[];
}

export interface IDeviceDetails {
  platformType: EPlatformType;
  token: string;
  adid: string;
  sns: string;
  jwt:string
}
