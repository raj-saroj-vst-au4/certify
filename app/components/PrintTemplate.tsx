import React from "react";

interface PrintTemplateProps {
  name: string;
  link: string;
}

const PrintTemplate = ({ name, link }: PrintTemplateProps) => {
  return (
    <div className="bg-printemp h-full bg-cover">
      <div>
        <div className="pt-[0.2rem] px-[0.2rem]">
          <img
            className="h-[1rem] w-[1rem]"
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${process.env.NEXT_PUBLIC_CERTIFY_URL}/certify/3212&size=100x100`}
            alt="qr"
            title="verify"
          />
        </div>
        <div className="text-[0.12rem] p-[0.1rem]">
          {process.env.NEXT_PUBLIC_CERTIFY_URL}
        </div>
      </div>
      <div className="text-[0.75rem] italic absolute top-[2.3rem] right-[1.1rem]">
        Raj Saroj
      </div>
    </div>
  );
};

export default PrintTemplate;
