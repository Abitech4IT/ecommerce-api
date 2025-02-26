import User from "@models/user.model";

const getUserById = async (id: string) => {
  return await User.findOne({ where: { id } });
};

const getUserByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
};

const getUserByEmailAndPassword = async (email: string, password: string) => {
  let user = await User.findOne({
    where: { email },
  });

  if (user) {
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      user = null;
    }
  }

  return user;
};

type SignUpUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
};

const signupUser = async (data: SignUpUserParams): Promise<User> => {
  const user = new User();
  user.firstName = data.firstName;
  user.lastName = data.lastName;
  user.email = data.email;
  user.phoneNumber = data.phoneNumber;
  user.address = data.address;
  user.password = data.password;

  await user.save();
  return user;
};

const repo = {
  getUserById,
  getUserByEmail,
  getUserByEmailAndPassword,
  signupUser,
};

export default repo;
