import React, { useState } from "react";
import InputAlert from "./InputAlert";
import OutputAlert from "./OutputAlert";

interface ModalProps {
  setShowModal: (state: boolean) => void;
  setCertid: (state: number) => void;
  handleGetCert: () => void;
  setInputEmail: (state: string) => void;
  setPhoneDigits: (state: number) => void;
  handleGenerateCert: () => void;
  validInput: boolean;
  genCertid: number;
}

const InputModal = ({
  setShowModal,
  setCertid,
  handleGetCert,
  setInputEmail,
  setPhoneDigits,
  handleGenerateCert,
  validInput,
  genCertid,
}: ModalProps) => {
  const [isGenerated, setIsGenerated] = useState<boolean>(true);

  return (
    <div className="absolute z-50 p-4">
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setShowModal(false)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <section className="space-y-6">
              {isGenerated ? (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Certificate ID
                  </label>
                  <input
                    type="number"
                    onChange={(e) => setCertid(parseInt(e.target.value))}
                    placeholder="6-Digit code"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      onChange={(e) => setInputEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Last 4-digits of Phone
                    </label>
                    <input
                      type="number"
                      id="phone"
                      onChange={(e) => setPhoneDigits(parseInt(e.target.value))}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="4321"
                      required
                    />
                  </div>
                </>
              )}

              {!validInput && <InputAlert />}
              {validInput && genCertid > 99999 && (
                <OutputAlert
                  message={`Generated Certificate id - ${genCertid}`}
                  color="green"
                />
              )}

              {isGenerated ? (
                <button
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => handleGetCert()}
                >
                  Print Certificate
                </button>
              ) : (
                <button
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => handleGenerateCert()}
                >
                  Generate Certificate
                </button>
              )}

              {isGenerated ? (
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not generated?{" "}
                  <a
                    onClick={() => setIsGenerated(false)}
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Generate ID
                  </a>
                </div>
              ) : (
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Already generated?{" "}
                  <a
                    onClick={() => setIsGenerated(true)}
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Validate ID
                  </a>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
