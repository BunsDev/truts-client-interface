// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios"
let API = `https://rsqt69nmq4.us-west-2.awsapprunner.com`
export default async function handler(req, res) {
  let rid = req.query.rid
  let res_bin = await axios.get(`${API}/review-snapshot?rid=${rid}`);
  let img = Buffer.from(res_bin.data.bin, 'utf8');
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(img, 'binary');
}
