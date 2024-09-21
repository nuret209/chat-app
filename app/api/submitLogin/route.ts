
import { NextResponse } from "next/server"
import { NextApiResponse } from "next"
import { redirect } from "next/dist/server/api-utils";
import { loginController } from "@/lib/login";

const handler = async (req: Request, res: NextApiResponse) => {
    try {
        const { name, password } = await req.json();
        if (!name || !password) {
            res.send("Bir hata oluştu");
            return;
        }
        console.log(name);
        const status: number | undefined = await loginController(name, password);
        return NextResponse.json({ name, password, status });
    } catch (err) {
        console.log(err);
        redirect(res, 500, "/");
        throw err;

    }
}
export { handler as GET, handler as POST }