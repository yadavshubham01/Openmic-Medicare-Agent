import { NextApiRequest, NextApiResponse } from "next";
import { read_data } from "@/lib/data";


export default function handler(req: NextApiRequest, res: NextApiResponse){
  const data = read_data();
  if(data){
    res.status(200).json({ ok: true, calls: data.calls});
  }else{
    res.status(304).json({ msg:"failed to read logs"})
  }
}
