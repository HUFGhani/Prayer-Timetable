import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs";
import {mkdir} from "node:fs/promises";
import path from "path";
import {Readable} from "node:stream";
import {finished} from "node:stream/promises";



type ResponseData = {
    message: string
}



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {

    await getPDF()

}

const getPDF = async ()=>{
    const filePath = `${__dirname}/../../tmp`
    const res = await fetch("https://manchestercentralmosque.org/wp-content/uploads/2023/12/VP-JANURAY-2024-PRAYER-TIMETABLE.pdf")
    if (!fs.existsSync(filePath)) await mkdir(filePath);
    const destination = path.resolve(filePath, "prayer.pdf");
    const fileStream = fs.createWriteStream(destination, { flags: 'wx' })

    await finished(Readable.fromWeb(res.body).pipe(fileStream));
}
