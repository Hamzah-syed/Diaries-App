import { Response, Request } from "miragejs";
//errorHandler
import { handleError } from "../server";
//randomByte to genrate random token
import { randomBytes } from "crypto";
//Interface
import { User } from "../../../interfaces/user.interface";

const genrateToken = () => randomBytes(8).toString("hex");

export interface AuthResponse {
  token: string;
  user: User;
}

const signin = (schema: any, req: Request): AuthResponse | Response => {
  //email and password are extracting from the input provided by user
  const { email, password } = JSON.parse(req.requestBody);
  const user = schema.users.findBy({ email, password });

  if (email !== user.email) {
    handleError(null, "User does not exist");
  }
  if (password !== user.password) {
    handleError(null, "Incorrect password");
  }

  const token = genrateToken();
  return {
    user: user.attrs as User,
    token,
  };
};
const signup = (schema: any, req: Request): AuthResponse | Response => {
  const data = JSON.parse(req.requestBody);
  // cheking if user already exist
  const exUser = schema.users.findBy({ email: data.email });
  if (exUser) {
    handleError(null, "User already exist");
  }

  const user = schema.users.create(data);
  //genrating roken
  const token = genrateToken();

  return {
    user: user.attrs as User,
    token,
  };
};

export default {
  signin,
  signup,
};
