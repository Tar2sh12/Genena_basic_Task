import Customer from "../../../DB/models/customer.model.js";
import Group from "../../../DB/models/group.model.js";
import Vendor from "../../../DB/models/vendor.model.js";

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns return response { msg, group }
 * @description add group
 */
export const addGroup = async (req, res, next) => {
  const { name } = req.body;
  const group = await Group.create({ name });
  res.status(201).json({ msg: "group created", group });
};


/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns return response { msg, group }
 * @description update group information
 */
export const updateGroup = async (req, res, next) => {
  const { _id } = req.params;
  const { name } = req.body;

  const isGroupIdExists = await Group.findById(_id);
  if (!isGroupIdExists) {
    return next(
      new ErrorClass("group does not exists", 400, "group does not exists")
    );
  }

  const group = await Group.findByIdAndUpdate(_id, { name }, { new: true });
  res.status(200).json({ msg: "group updated ", group });
};


/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns return response { msg, isGroupIdExists , customers,vendors }
 * @description delete group and any related customers or vendors
 */
export const deleteGroup = async (req, res, next) => {
  const { _id } = req.params;
  const isGroupIdExists = await Group.findByIdAndDelete(_id);

  if (!isGroupIdExists) {
    return next(
      new ErrorClass("group does not exists", 400, "group does not exists")
    );
  }
  const customers = await Customer.deleteMany({groupid:_id});
  const vendors = await Vendor.deleteMany({groupid:_id});
  res.status(200).json({ msg: "group and any related customers or vendors are deleted ", isGroupIdExists , customers,vendors});
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns return response { groups }
 * @description get group information
 */
export const getInfo = async (req, res, next) => {
  const groups = await Group.find({});
  res.status(200).json({ groups });
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns return response { group}
 * @description get group information by id
 */
export const getById = async (req, res, next) => {
  const { _id } = req.params;
  //get group by id
  const group = await Group.findById(_id);
  // group not found
  if (!group) {
    return next(
      new ErrorClass(
        "there is no matched group",
        400,
        "there is no matched group"
      )
    );
  }

  res.status(200).json({ group });
};
