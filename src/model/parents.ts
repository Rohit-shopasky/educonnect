import mongoose from "mongoose";
import { IDevice, IParentDetails } from "./dto/parentDTO";

export type ParentsDocument = mongoose.Document & {
  id: String;
  parentDetails: IParentDetails[];
  instituteId: string;
  device: IDevice[];
  address: String;
  childIds?: String[];
};

const parentsSchema = new mongoose.Schema({
  id: { type: String, index: true, unique: true },
  parentDetails: [
    {
      firstName: String,
      lastName: String,
      mob: String,
      parentType: String,
    },
  ],
  instituteId: String,
  device: [
    {
      mob: String,
      owner: String,
      deviceDetails: [
        {
          platformType: String,
          token: String,
          adid: String,
          sns: String,
          jwt: String,
        },
      ],
    },
  ],
  address: String,
  createdAt: { type: Date, default: Date.now },
});

export const parents =
  mongoose.models.parents ||
  mongoose.model<ParentsDocument>("parents", parentsSchema, "parents");
