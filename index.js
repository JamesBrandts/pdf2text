import express from 'express';
const app = express()
const port = 3000
const pdfUrl = "https://eppg.fgv.br/sites/default/files/teste.pdf"
import { PdfReader } from "pdfreader";
app.use(express.json())
import { get } from "https";

app.get('/', async (req, res) => {
  res.send({
    text: await parsePdfBuffer(await urlToBuffer(pdfUrl))
  })
})

app.post('/', async (req, res) => {
  const fileBuffer = await urlToBuffer(req.body.url);
  res.send({
    text: await parsePdfBuffer(fileBuffer)
      })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function urlToBuffer(url) {
  return new Promise((resolve, reject) => {
    const data = [];
    get(url, (res) => {
      res
        .on("data", (chunk) => {
          data.push(chunk);
        })
        .on("end", () => {
          resolve(Buffer.concat(data));
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  });
}

async function parsePdfBuffer(fileBuffer) {
  let result = "";
  return new Promise((resolve, reject) => {
    new PdfReader().parseBuffer(fileBuffer, (err, item) => {
      if (err) {
        reject(err);
      } else if (!item) {
        resolve(result);
      } else if (item.text) {
        result += item.text;
      }
    })});
}
