
import connection from "./connection";
import Cryptr from "cryptr"
const db = connection();
const generateID = async () => {
    const id = Math.floor(Date.now() * Math.random() * Math.random() * 10000 * Math.random() * 10000 * Math.random());
    const q = "SELECT * FROM users WHERE id = ?";
    const dd = await (await db).query(q, id);
    if (dd[0].length === 0) return id;
    else { return generateID() }

}

export const findUsername = async (username: string) => {
    const q1 = "SELECT * FROM users WHERE username = ? ";
    const dd = await (await db).execute(q1, [username]);
    return dd;
}

export const findEmail = async (email: string) => {
    const q1 = "SELECT * FROM users WHERE email = ? ";
    const dd = await (await db).execute(q1, [email]);
    return dd;
}

export const login = async (username: string, password: string) => {
    try {
        const cryptKey: string | undefined = process.env.CRYPT_KEY;
        const cryptr = new Cryptr(cryptKey);
        const users = await findUsername(username);
        if (users[0].length === 0) {
            console.log("yanlis kullanici adi girdiniz");
            return 2;
        }
        else {
            if (cryptr.decrypt(users[0][0].password) === password) {
                console.log("giriş yaptınız");
                return 1;
            }
            else {
                console.log("şifreyi yanlış girdiniz");
                return 3;

            }
        }
    }
    catch (err) {
        return err;
    }
}


export const register = async (username: string, email: string, password: string) => {
    try {
        const cryptKey: string | undefined = process.env.CRYPT_KEY;
        const cryptr = new Cryptr(cryptKey);
        const q1 = "INSERT INTO users VALUE(?,?,?,?);";
        const id = await generateID();
        console.log(id);
        (await db).execute(q1, [id, username, email, cryptr.encrypt(password)
        ]);
        return 1;
    }
    catch (err) {
        return err;
    }
}
