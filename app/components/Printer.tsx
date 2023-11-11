"use client";
import React, { useEffect, useState } from "react";
import "./Printer.css";
import PrintTemplate from "./PrintTemplate";

interface Certificate {
  certid: number;
  name: string;
  phone: string;
  email: string;
}

interface PrinterProps {
  printing: boolean;
  setPrinting: (state: boolean) => void;
  certificateData: Certificate;
}

interface PrintDataProps {
  certid: number;
  name: string;
  link: string;
}

const Printer = ({ printing, setPrinting, certificateData }: PrinterProps) => {
  const [printData, setPrintData] = useState<PrintDataProps>();
  const startPrinting = () => {
    setPrinting(true);
    setTimeout(() => {
      setPrintData({
        certid: certificateData.certid,
        name: certificateData.name,
        link: `${process.env.NEXT_PUBLIC_CERTIFY_URL}/certify/${certificateData.certid}`,
      });
    }, 1000);
  };
  useEffect(() => {
    if (certificateData.name != "Invalid") {
      startPrinting();
    }
  }, [certificateData]);

  return (
    <div id="printer-animation" className="printer-animation">
      <div className="printer">
        <input id="printbutton" type="checkbox" checked={printing} readOnly />
        <label
          className={`printerbutton ${printing && "printing"}`}
          htmlFor="printbutton"
        />
        <div className="top"></div>
        <div className="middle"></div>
        <div className="trace"></div>
        <div className="paper text-sky-400/100">
          {printData && (
            <PrintTemplate
              certid={printData.certid}
              name={printData.name}
              link={printData.link}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Printer;
