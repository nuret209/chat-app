import { login } from "./db";

export const loginController = async (username: string, password: string) => {
    if (!username || !password) {
        console.log("an error eccured");
        return;
    }
    const d: number = await login(username, password);
    return d;
}