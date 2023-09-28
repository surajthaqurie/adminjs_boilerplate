import { IPaginationResponse, IUser, IUserPasswordChange } from "src/interfaces";
import { prisma, paginated_query, generateSalt, generateHashPassword, AppError } from "src/utility";
const { users: Users } = prisma;

const getUsers = async (page: number, itemNo: number): Promise<IPaginationResponse<IUser>> => {
  const pagination_query = paginated_query(page, itemNo);

  const [count, users] = await prisma.$transaction([
    Users.count(),
    Users.findMany({
      ...pagination_query,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    })
  ]);

  return {
    data: users,
    total_count: count
  };
};

const changePassword = async (userId: string, value: { new_password: string; confirm_password: string }): Promise<IUserPasswordChange> => {
  if (value.new_password !== value.confirm_password) throw new AppError("New password and confirm password doesn't matched !!", 400);

  const salt = await generateSalt();
  const hash_password = await generateHashPassword(value.new_password, salt);
  const user = await Users.update({
    where: { id: userId },
    data: { password: hash_password },
    select: { id: true, email: true }
  });

  if (!user) {
    throw new AppError("User record not found, Unable to change password !!", 404);
  }

  return user;
};

const getUserById = async (userId: string): Promise<IUser | null> => {
  const user = await Users.findFirst({
    where: {
      id: userId
    }
  });

  return user;
};

export const user_service = {
  getUsers,
  getUserById,
  changePassword
};
