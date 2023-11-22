import React from "react";

interface AlertProps {
  message: string;
  color: string;
}

const OutputAlert = ({ message, color }: AlertProps) => {
  return (
    <div
      className={`bg-${color}-100 border border-${color}-400 text-${color}-700 px-4 py-3 rounded relative`}
      role="alert"
    >
      <strong className="font-bold">{message}</strong>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
    </div>
  );
};

export default OutputAlert;
