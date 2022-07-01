// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios"
let API = `http://ec2-35-90-127-101.us-west-2.compute.amazonaws.com:5500`
export default async function handler(req, res) {
  let rid = req.query.rid
  let res_bin = await axios.get(`${API}/review-card-bin/?rid=${rid}`);
  let img = Buffer.from(res_bin.data.bin, 'utf8');
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(img, 'binary');
}
