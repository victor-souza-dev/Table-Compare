export enum StatusEnum {
  Created = "Created",
  Updated = "Updated",
  Deleted = "Deleted",
  Reordered = "Reordered",
  None = "None",
  Normal = "Normal",
}

export enum TypesEnum {
  PIS = "PIS",
  PPA = "PPA",
  PPP = "PPP",
}

export interface IData {
  code: string;
  name: string;
  type: TypesEnum | null;
}

export interface IDataWithStatus extends IData {
  status: StatusEnum;
}
