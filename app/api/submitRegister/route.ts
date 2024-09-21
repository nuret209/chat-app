
import { NextResponse } from "next/server"
import { NextApiRequest } from "next"
import { registerController } from "@/lib/register";
const handler = async (req: NextApiRequest) => {
    try {
        const { name, email, password } = await req.json();
        console.log(email);
        const status : number = await registerController(name, email, password);
        return NextResponse.json({ name, password, email , status});
    } catch (err) {
        console.log(err);
        throw err;

    }
}
export { handler as GET, handler as POST }