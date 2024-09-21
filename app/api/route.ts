import { NextResponse } from "next/server"
import { NextApiRequest, NextApiResponse } from "next"
import connection from "@/lib/connection";


export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(await (await connection()).execute("SELECT * FROM users"));
    


    return NextResponse.json({ name: "A" });
}

