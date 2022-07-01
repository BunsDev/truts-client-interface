// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios"
let API = `http://35.88.248.101:5500`
export default async function handler(req, res) {
  let rid = req.query.rid
  let res_bin = await axios.get(`${API}/review-card-bin/?rid=${rid}`);
  let img = Buffer.from(res_bin.data.bin, 'utf8');
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(img, 'binary');
}
