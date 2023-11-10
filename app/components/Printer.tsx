"use client";
import React, { useEffect, useState } from "react";
import "./Printer.css";
import PrintTemplate from "./PrintTemplate";

interface PrinterProps {
  printing: boolean;
  setPrinting: (state: boolean) => void;
}

interface PrintDataProps {
  name: string;
  link: string;
}

const Printer = ({ printing, setPrinting }: PrinterProps) => {
  const [printData, setPrintData] = useState<PrintDataProps>();
  const startPrinting = () => {
    setPrinting(true);
    setTimeout(() => {
      setPrintData({
        name: "Ra Saroj",
        link: "http://localhost:3000/certify/213217",
      });
    }, 1000);
  };
  useEffect(() => {
    setTimeout(() => {
      startPrinting();
    }, 2000);
  }, []);

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
            <PrintTemplate name={printData.name} link={printData.link} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Printer;
