import puppeteer from "puppeteer";
interface PdfDataProps {
  certid: number;
  url: string;
  name: string;
}

export default async function pdfGenerator(data: PdfDataProps) {
  // HTML template with dynamic values
  const htmlTemplate = `
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
        margin: 10mm auto;
        border: 1px #d3d3d3 solid;
        border-radius: 5px;
        background-image: url("./../../assets/printtempbg.png");
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
        size: A4;
        margin: 0;
      }
      @media print {
        html,
        body {
          width: 297mm;
          height: 210mm;
        }
        .page {
          margin: 0;
          border: initial;
          border-radius: initial;
          width: initial;
          min-height: initial;
          box-shadow: initial;
          background: initial;
          page-break-after: always;
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
            src="https://api.qrserver.com/v1/create-qr-code/?data=${data.url}/certify/${data.certid}&size=100x100"
            alt="qr"
            title="verify"
          />
        </div>
        <div class="qrtext">100xdevs.com</div>
      </div>
      <div class="name">${data.name}</div>
      <div class="certid">Certificate ID : ${data.certid}</div>
      <div class="issuedate">Date of Issue : 10th of November 2023</div>
      <div class="certifyurl">${data.url}/certify/${data.certid}</div>
    </div>
  </body>
</html>
  `;

  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint:
        "wss://chrome.browserless.io?token=c8dc96e8-a6c8-4b7c-97e3-5e7977f7389f",
    });

    const page = await browser.newPage();
    await page.setContent(htmlTemplate);
    const buffer = (await page.pdf({ printBackground: true })).buffer;
    await browser.close();

    const blob = new Blob([buffer], {
      type: "application/pdf",
    });

    return new File([blob], data.certid + "100xdevscohort" + ".pdf", {
      type: "application/pdf",
    });
  } catch (e) {
    console.log(e);
    return e;
  }
}
