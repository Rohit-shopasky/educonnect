import { Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import {
  IDevice,
  IDeviceDetails,
  IParentDTO,
  IParentDetails,
} from "../model/dto/parentDTO";
import { parents } from "../model/parents";
import { CustomError } from "../types/errorTypes";
import { ILoginReq } from "../types/interfaces";
import { EParentType } from "../model/dto/studentDTO";
var jwt = require("jsonwebtoken");
const jwtkey = "educonnect@works";

export class ParentsService {
  private parents: Model<any>;
  constructor() {
    this.parents = parents;
  }

  public async registerParentService(
    params: IParentDetails[],
    address?: string
  ) {
    try {
      const nonRegisteredParents: any[] = await this.checkIfParentExists(
        params
      );
      if (nonRegisteredParents.length > 0) {
        return await this.registerParents(nonRegisteredParents, address);
      } else {
        return await this.findParentByMob(params);
      }
    } catch (error) {
      throw new CustomError(
        "Something went wrong while registering parent!",
        500
      );
    }
  }

  public async checkIfParentExists(params: IParentDetails[]) {
    const parentChecks = params.map(async (parent: IParentDetails) => {
      const parentFound = await this.parents.findOne({
        "parentDetails.mob": parent.mob,
      });
      return !parentFound ? parent : null;
    });

    const results = await Promise.all(parentChecks);
    const nonRegisteredParents = results.filter((parent) => parent !== null);

    return nonRegisteredParents;
  }

  public async registerParents(params: IParentDetails[], address?: string) {
    const id = uuidv4();
    const parentCreate = await this.parents.create({
      id,
      parentDetails: params,
      address,
      device: [],
    });
    return parentCreate;
  }

  public async findParentByMob(params: IParentDetails[]) {
    return await this.parents.findOne({ "parentDetails.mob": params[0].mob });
  }

  public async findParentByMobLogin(mob: string) {
    return this.parents.findOne({ "parentDetails.mob": mob });
  }

  public async registerParentDevice(
    params: ILoginReq,
    parent: IParentDTO | any
  ): Promise<any> {
    try {
      const parentDetails: IParentDetails | undefined =
        parent.parentDetails.find((data: any) => data.mob === params.mob);

      const newJwt = this.generateJWT(parent.id, params.mob);

      if (parent.device.length == 0) {
        this.createDeviceOwner(
          params,
          parentDetails?.parentType as EParentType,
          parent.id as string,
          newJwt
        );
      } else if (parent?.device.length !== 0) {
        const deviceOwnerDetails = this.checkIfDeviceOwnerExists(
          params.mob,
          parent
        );

        if (deviceOwnerDetails) {
          // check device details
          // check if adid is same as incoming adid
          const isAdidExists = this.checkAdidExists(
            deviceOwnerDetails.deviceDetails,
            params.adid
          );

          if (isAdidExists) {
            await this.updateJWT(parent.id, params, newJwt);
          } else {
            // create new device details
            await this.createNewDevice(params, parent.id, newJwt);
          }
        } else {
          // push the owner
          await this.createDeviceOwner(
            params,
            parentDetails?.parentType as EParentType,
            parent.id as string,
            newJwt
          );
        }
      }
      return newJwt;
    } catch (error) {
      throw error;
    }
  }

  public checkAdidExists(deviceDetails: IDeviceDetails[], adid: string) {
    const isAdidExists = deviceDetails.find(
      (details: IDeviceDetails) => details.adid === adid
    );
    return isAdidExists ? true : false;
  }

  public checkIfDeviceOwnerExists(mob: string, parent: IParentDTO) {
    return parent.device?.find(
      (deviceOwner: IDevice) => deviceOwner.mob === mob
    );
  }

  public async createNewDevice(
    params: ILoginReq,
    parentId: string,
    jwt: string
  ) {
    try {
      await this.parents.updateOne(
        {
          id: parentId,
          "device.mob": params.mob,
        },
        {
          $push: {
            "device.$.deviceDetails": {
              platformType: params.platformType,
              token: params.token,
              adid: params.adid,
              sns: "",
              jwt: jwt,
            },
          },
        }
      );
    } catch (error) {
      throw new CustomError("Error while creating new device details", 500);
    }
  }

  public async createDeviceOwner(
    params: ILoginReq,
    parentType: EParentType,
    parentId: string,
    jwt: string
  ) {
    try {
      return await this.parents.updateOne(
        {
          id: parentId,
        },
        {
          $push: {
            device: {
              mob: params.mob,
              owner: parentType,
              deviceDetails: [
                {
                  platformType: params.platformType,
                  token: params.token,
                  adid: params.adid,
                  sns: "",
                  jwt: jwt,
                },
              ],
            },
          },
        }
      );
    } catch (error) {
      console.log("error===>", error);
      throw new CustomError("Error while creting device owner!", 500);
    }
  }

  public async updateJWT(parentId: string, params: ILoginReq, jwt: string) {
    try {
      console.log("parentId", parentId, " params==>", params, " jwt==>", jwt);
      const updateJwt = await this.parents.updateOne(
        { id: parentId, "device.mob": params.mob },
        {
          $set: {
            "device.$[deviceElement].deviceDetails.$[detailElement].jwt": jwt,
            "device.$[deviceElement].deviceDetails.$[detailElement].token":
              params.token,
          },
        },
        {
          arrayFilters: [
            { "deviceElement.mob": params.mob },
            { "detailElement.adid": params.adid },
          ],
        }
      );
      console.log("updateJWT===>", updateJwt);
    } catch (error) {
      throw new CustomError("Error while updating jwt", 500);
    }
  }

  public generateJWT(id: string, mob: string) {
    try {
      return jwt.sign({ id: id, mob: mob }, jwtkey);
    } catch (error) {
      console.log("jwt creation error==>", error);
      throw new CustomError("Error while creating jwt", 500);
    }
  }
}
