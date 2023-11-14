import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

const generatepdfcert = async (
  name: string,
  certifyurl: string,
  certid: number
) => {
  const certbinchunks = fs
    .readFileSync(`${path.resolve(__dirname, "../public/printtempbg.png")}`)
    .toString("base64");
  // const name = "Raj Saroj";
  // const certifyurl = "verify.100xdevs.com";
  // const certid = 432121;
  try {
    const browser = await puppeteer.launch({
      headless: "new",
    });
    const page = await browser.newPage();

    let html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>100xDevs certificate</title>
        <style>
          body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            background-color: #fafafa;
            font: 12pt “Tahoma”;
          }
          * {
            box-sizing: border-box;
            -moz-box-sizing: border-box;
          }
          .page {
            width: 297mm;
            min-height: 210mm;
            padding: 10mm;
            border: 1px #d3d3d3 solid;
            border-radius: 5px;
            background-image: url("data:image/png;base64,${certbinchunks}");
            background-size: 105% 107%;
            background-repeat: no-repeat;
            background-position: top;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            position: relative;
          }
    
          .qrcodeimg {
            position: absolute;
            top: 10mm;
            left: 10mm;
            background-color: transparent;
          }
          .qrtext {
            position: absolute;
            top: 38mm;
            left: 10mm;
            font-weight: 600;
            color: black;
          }
    
          .name {
            position: absolute;
            top: 110mm;
            right: 55mm;
            font-size: 25mm;
            font-weight: 800;
            font-style: italic;
            color: rgb(56 189 248 / 1);
          }
    
          .certid {
            color: #fafafa;
            position: absolute;
            bottom: 20mm;
            left: 75mm;
            font-size: 6mm;
            font-weight: 550;
          }
    
          .issuedate {
            position: absolute;
            color: #fafafa;
            bottom: 20mm;
            right: 12mm;
            font-size: 6mm;
            font-weight: 550;
          }
    
          .certifyurl {
            position: absolute;
            color: black;
            font-size: 4mm;
            font-weight: 600;
            bottom: 2mm;
            right: 10mm;
          }
          @page {
            size: landscape;
            margin: 0;
          }
          @media print {
            html,
            body {
              width: 297mm;
              height: 210mm;
            }
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div>
            <div class="qrdiv">
              <img
                class="qrcodeimg"
                src="https://api.qrserver.com/v1/create-qr-code/?data=${certifyurl}/certify/${certid}&size=100x100"
                alt="qr"
                title="verify"
              />
            </div>
            <div class="qrtext">100xdevs.com</div>
          </div>
          <div class="name">${name}</div>
          <div class="certid">Certificate ID : ${certid}</div>
          <div class="issuedate">Date of Issue : 10th of November 2023</div>
          <div class="certifyurl">${certifyurl}/certify/${certid}</div>
        </div>
      </body>
    </html>
    `;

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      landscape: true,
      path: `${path.resolve(__dirname, "../outputpdf")}/certificate.pdf`,
    });
    await browser.close();
    // console.log("closed browser");
  } catch (e) {
    console.log(e);
  }
};

export const createServer = (): Express => {
  const app = express();

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(express.static(path.resolve(__dirname, "..") + "/public"))
    .get("/generatecertpdf/:certid", async (req, res) => {
      // return res.json({
      //   message: `hello ${process.env.NEXT_PUBLIC_CERTIFY_URL}`,
      // });
    })
    .get("/", (_, res) => {
      return res.json({ status: { alive: true } });
    });

  return app;
};
