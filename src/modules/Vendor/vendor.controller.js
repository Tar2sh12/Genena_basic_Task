import Vendor from "../../../DB/models/vendor.model.js";
import Group from "../../../DB/models/group.model.js";
import { ErrorClass } from "../../utils/error-class.utils.js";

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns return response {message,userInstance }
 * @description sign up
 */
export const signUp = async (req, res, next) => {
  const { name, address, groupid } = req.body;
  const isNameExist = await Vendor.findOne({ name });
  if (isNameExist) {
    return next(
      new ErrorClass("name already exists", 400, "name already exists")
    );
  }
  const isGroupIdExists = await Group.findById(groupid);
  if (!isGroupIdExists) {
    return next(
      new ErrorClass("group does not exists", 400, "group does not exists")
    );
  }
  const VendorInstance = new Vendor({ name, address, groupid });
  await VendorInstance.save();
  res.status(201).json({ msg: "Vendor created ", VendorInstance });
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns return response {message, user}
 * @description update user
 */
export const updateUser = async (req, res, next) => {
  const { _id } = req.params;
  const { name, address, groupid } = req.body;
  const isNameExist = await Vendor.findOne({ name });
  if (isNameExist) {
    return next(
      new ErrorClass("name already exists", 400, "name already exists")
    );
  }
  if (groupid) {
    const isGroupIdExists = await Group.findById(groupid);
    if (!isGroupIdExists) {
      return next(
        new ErrorClass("group does not exists", 400, "group does not exists")
      );
    }
  }

  const vendor = await Vendor.findByIdAndUpdate(
    _id,
    {
      name,
      address,
      groupid,
    },
    { new: true }
  );
  res.status(200).json({ msg: "Vendor updated ", vendor });
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns return response {message, dUser}
 * @description delete user
 */
export const deleteUser = async (req, res, next) => {
  const { _id } = req.params;
  const dUser = await Vendor.findByIdAndDelete(_id);

  if (!dUser) {
    return next(
      new ErrorClass(
        "Vendor does not exists",
        400,
        "Vendor does not exists"
      )
    );
  }
  res.status(200).json({ msg: "Vendor deleted ", dUser });
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns return response { user}
 * @description get user information
 */
export const getInfo = async (req, res, next) => {
  const user = await Vendor.find({});
  res.status(200).json({ user });
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns return response { user}
 * @description get user information by id
 */
export const getById = async (req, res, next) => {
  const { _id } = req.params;
  //get user by id
  const user = await Vendor.findById(_id);
  // user not found
  if (!user) {
    return next(
      new ErrorClass(
        "there is no matched users",
        400,
        "there is no matched users"
      )
    );
  }

  res.status(200).json({ user });
};
