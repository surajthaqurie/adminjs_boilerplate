import { ILoginAdmin } from "../interfaces";
import { verifyPassword } from "./bcrypt";
import { prisma } from "./db_connection";
import { generateJWTToken } from "./jwt";
import axios from "axios";

const { users: Users } = prisma;

export const adminAuthenticate = async (email: string, password: string, context: any): Promise<ILoginAdmin | null> => {
  try {
    const { two_fa_token } = context.req.fields;
    const API_URL = `${process.env.APP_URL}/api/v1/two-fa`;
    const admin = await Users.findFirst({
      where: {
        OR: [{ role: "ADMIN" }, { role: "EDITOR" }, { role: "SEO" }],
        AND: { email }
      }
    });

    if (!admin) return null;
    const matched_password = await verifyPassword(password, admin.password);
    if (!matched_password) return null;

    const access_token = generateJWTToken(admin);
    const auth_header = { headers: { Authorization: "Bearer " + access_token } };

    const user_two_fa_status = await axios.get(`${API_URL}/${admin.id}`, auth_header);
    if (user_two_fa_status.data.data) {
      if (two_fa_token) {
        const is_valid_token = await axios.post(`${API_URL}/verify`, { userId: admin.id, twoFAToken: two_fa_token }, auth_header);
        if (!is_valid_token.data.data) return null;

        return Promise.resolve({
          email: admin.email,
          id: admin.id,
          role: admin.role,
          authorization_token: access_token
        });
      } else return null;
    }
    return Promise.resolve({
      email: admin.email,
      id: admin.id,
      role: admin.role,
      authorization_token: access_token
    });
  } catch (err) {
    return null;
  }
};
