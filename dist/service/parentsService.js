"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentsService = void 0;
const uuid_1 = require("uuid");
const parents_1 = require("../model/parents");
const errorTypes_1 = require("../types/errorTypes");
var jwt = require("jsonwebtoken");
const jwtkey = "educonnect@works";
class ParentsService {
    parents;
    constructor() {
        this.parents = parents_1.parents;
    }
    async registerParentService(params, address) {
        try {
            const nonRegisteredParents = await this.checkIfParentExists(params);
            if (nonRegisteredParents.length > 0) {
                return await this.registerParents(nonRegisteredParents, address);
            }
            else {
                return await this.findParentByMob(params);
            }
        }
        catch (error) {
            throw new errorTypes_1.CustomError("Something went wrong while registering parent!", 500);
        }
    }
    async checkIfParentExists(params) {
        const parentChecks = params.map(async (parent) => {
            const parentFound = await this.parents.findOne({
                "parentDetails.mob": parent.mob,
            });
            return !parentFound ? parent : null;
        });
        const results = await Promise.all(parentChecks);
        const nonRegisteredParents = results.filter((parent) => parent !== null);
        return nonRegisteredParents;
    }
    async registerParents(params, address) {
        const id = (0, uuid_1.v4)();
        const parentCreate = await this.parents.create({
            id,
            parentDetails: params,
            address,
            device: [],
        });
        return parentCreate;
    }
    async findParentByMob(params) {
        return await this.parents.findOne({ "parentDetails.mob": params[0].mob });
    }
    async findParentByMobLogin(mob) {
        return this.parents.findOne({ "parentDetails.mob": mob });
    }
    async registerParentDevice(params, parent) {
        try {
            const parentDetails = parent.parentDetails.find((data) => data.mob === params.mob);
            const newJwt = this.generateJWT(parent.id, params.mob);
            if (parent.device.length == 0) {
                this.createDeviceOwner(params, parentDetails?.parentType, parent.id, newJwt);
            }
            else if (parent?.device.length !== 0) {
                const deviceOwnerDetails = this.checkIfDeviceOwnerExists(params.mob, parent);
                if (deviceOwnerDetails) {
                    // check device details
                    // check if adid is same as incoming adid
                    const isAdidExists = this.checkAdidExists(deviceOwnerDetails.deviceDetails, params.adid);
                    if (isAdidExists) {
                        await this.updateJWT(parent.id, params, newJwt);
                    }
                    else {
                        // create new device details
                        await this.createNewDevice(params, parent.id, newJwt);
                    }
                }
                else {
                    // push the owner
                    await this.createDeviceOwner(params, parentDetails?.parentType, parent.id, newJwt);
                }
            }
            return newJwt;
        }
        catch (error) {
            throw error;
        }
    }
    checkAdidExists(deviceDetails, adid) {
        const isAdidExists = deviceDetails.find((details) => details.adid === adid);
        return isAdidExists ? true : false;
    }
    checkIfDeviceOwnerExists(mob, parent) {
        return parent.device?.find((deviceOwner) => deviceOwner.mob === mob);
    }
    async createNewDevice(params, parentId, jwt) {
        try {
            await this.parents.updateOne({
                id: parentId,
                "device.mob": params.mob,
            }, {
                $push: {
                    "device.$.deviceDetails": {
                        platformType: params.platformType,
                        token: params.token,
                        adid: params.adid,
                        sns: "",
                        jwt: jwt,
                    },
                },
            });
        }
        catch (error) {
            throw new errorTypes_1.CustomError("Error while creating new device details", 500);
        }
    }
    async createDeviceOwner(params, parentType, parentId, jwt) {
        try {
            return await this.parents.updateOne({
                id: parentId,
            }, {
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
            });
        }
        catch (error) {
            console.log("error===>", error);
            throw new errorTypes_1.CustomError("Error while creting device owner!", 500);
        }
    }
    async updateJWT(parentId, params, jwt) {
        try {
            console.log("parentId", parentId, " params==>", params, " jwt==>", jwt);
            const updateJwt = await this.parents.updateOne({ id: parentId, "device.mob": params.mob }, {
                $set: {
                    "device.$[deviceElement].deviceDetails.$[detailElement].jwt": jwt,
                    "device.$[deviceElement].deviceDetails.$[detailElement].token": params.token,
                },
            }, {
                arrayFilters: [
                    { "deviceElement.mob": params.mob },
                    { "detailElement.adid": params.adid },
                ],
            });
            console.log("updateJWT===>", updateJwt);
        }
        catch (error) {
            throw new errorTypes_1.CustomError("Error while updating jwt", 500);
        }
    }
    generateJWT(id, mob) {
        try {
            return jwt.sign({ id: id, mob: mob }, jwtkey);
        }
        catch (error) {
            console.log("jwt creation error==>", error);
            throw new errorTypes_1.CustomError("Error while creating jwt", 500);
        }
    }
}
exports.ParentsService = ParentsService;
