import Customer from "../../../DB/models/customer.model.js";
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
  const isNameExist = await Customer.findOne({ name });
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
  const customerInstance = new Customer({ name, address, groupid });
  await customerInstance.save();
  res.status(201).json({ msg: "Customer created ", customerInstance });
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
  const isNameExist = await Customer.findOne({ name });
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

  const customer = await Customer.findByIdAndUpdate(
    _id,
    {
      name,
      address,
      groupid,
    },
    { new: true }
  );
  res.status(200).json({ msg: "customer updated ", customer });
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns return response {message,  deleteCompany, deleteJob, dUser, deleteApp}
 * @description delete user
 */
export const deleteUser = async (req, res, next) => {
  const { _id } = req.params;
  const dUser = await Customer.findByIdAndDelete(_id);

  if (!dUser) {
    return next(
      new ErrorClass(
        "customer does not exists",
        400,
        "customer does not exists"
      )
    );
  }
  res.status(200).json({ msg: "customer deleted ", dUser });
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns return response { user}
 * @description get user information
 */
export const getInfo = async (req, res, next) => {
  const user = await Customer.find({});
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
  const user = await Customer.findById(_id);
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
