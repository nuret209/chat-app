
import { findEmail, findUsername, register } from "./db";

export const registerController = async (username: string, email: string, password: string) => {
    if (email.length > 49)
        return 6
    if (username.length > 15)
        return 5
    const emails = await findEmail(email);
    if (emails[0].length !== 0)
        return 4;
    const usernames = await findUsername(username);
    if (usernames[0].length !== 0)
        return 3;
    if (password.length < 6)
        return 2;
    register(username, email, password);
    return 1;

}