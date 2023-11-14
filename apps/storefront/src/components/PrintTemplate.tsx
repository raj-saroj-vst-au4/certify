import React from "react";

interface PrintTemplateProps {
  certid: number;
  name: string;
  link: string;
}

const PrintTemplate = ({ certid, name, link }: PrintTemplateProps) => {
  return (
    <div className="bg-printemp h-full bg-cover">
      <div>
        <div className="pt-[0.2rem] px-[0.2rem]">
          <img
            className="h-[1rem] w-[1rem]"
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${link}&size=100x100`}
            alt="qr"
            title="verify"
          />
        </div>
        <div className="text-[0.12rem] p-[0.1rem] ml-[0.15rem] text-black">
          100xdevs.com
        </div>
      </div>
      <div className="text-[0.75rem] italic absolute top-[2.4rem] right-[1.1rem]">
        {name}
      </div>
      <div className="text-[0.14rem] absolute bottom-[0.5rem] left-[1.9rem] text-white">
        Certificate ID : {certid}
      </div>
      <div className="text-[0.14rem] absolute bottom-[0.5rem] right-[0.4rem] text-white">
        Date of Issue : 10th of November 2023
      </div>
      <div className="text-[0.14rem] italic absolute bottom-[0rem] right-[0.4rem] text-black">
        {`${link}`}
      </div>
    </div>
  );
};

export default PrintTemplate;
