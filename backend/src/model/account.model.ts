import { User } from "../schema/interface/User.interface";
import { compareHash, generateHash } from "../helper/commom.helper";
import { UserModel } from "../schema/User.schema";

export const isDuplicate = async (email: string) => {
  const user: any = await UserModel.findOne({ email: email });
  if (user?.id) {
    return true;
  }
  return false;
};

export const createAccount = async (accountData: User) => {
  const encryptedPassword = await generateHash(accountData.password);
  if (encryptedPassword != null) accountData.password = encryptedPassword;

  const user = new UserModel(accountData);
  return await user.save();
};

export const updateProfileData = async (userId: string, name: string) => {
  console.log("userId >>", userId);
  return await UserModel.findByIdAndUpdate(
    userId,
    {
      name: name,
    },
    {
      new: true,
      select: "_id name email",
    }
  ).exec();
};

export const validatePassword = async (userId: string, oldPassword: string) => {
  const result = await UserModel.findById(userId).select("password").exec();

  if (result?.password) {
    return await compareHash(oldPassword, result.password);
  }
  return false;
};

export const updateAccountPassword = async (
  userId: string,
  newPassword: string
) => {
  const encryptedPassword = await generateHash(newPassword);
  return await UserModel.findOneAndUpdate(
    { _id: userId },
    { password: encryptedPassword }
  ).exec();
};

export const validateUser = async (email: string, password: string) => {
  const result = await UserModel.findOne({ email: email }).exec();
  if (result?.id && (await compareHash(password, result.password))) return true;
  return false;
};

export const getUserById = async (userId: string) => {
  return await UserModel.findById(userId).exec();
};

export const getUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email: email }).exec();
};

export const getAllUser = async () => {
  const result = await UserModel.find().select("_id name email").exec();
  const userList: any = {};
  result.forEach((user) => {
    userList[user._id.toString()] = user;
  });

  return userList;
};
