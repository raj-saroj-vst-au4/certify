"use client";
import { useState } from "react";
import Printer from "./components/Printer";
import InputModal from "./components/InputModal";
import { serverClient } from "./_app/serverClient";
import { useRouter } from "next/navigation";

interface Certificate {
  certid: number;
  name: string;
  phone: string;
  email: string;
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [validInput, setValidInput] = useState<boolean>(true);
  const [printing, setPrinting] = useState<boolean>(false);
  const [inputCertid, setInputCertid] = useState<number>();
  const [inputEmail, setInputEmail] = useState<string>();
  const [phoneDigits, setPhoneDigits] = useState<number>();

  const router = useRouter();

  const [certificateData, setCertificateData] = useState<Certificate>({
    certid: 432121,
    name: "Invalid",
    phone: "Invalid",
    email: "invalid",
  });

  const handleGetCert = async () => {
    if (inputCertid) {
      const data = await serverClient.getCert({ certid: inputCertid });
      if (data) {
        setValidInput(true);
        setShowModal(false);
        return setCertificateData(data);
      } else {
        setValidInput(false);
      }
    }
  };

  const handleGenerateCert = async () => {
    if (inputEmail && phoneDigits) {
      const data = await serverClient.generateCert({
        email: inputEmail,
        digits: phoneDigits,
      });
      if (data) {
        setValidInput(true);
        setShowModal(false);
        return setCertificateData(data);
      } else {
        setValidInput(false);
      }
    }
  };

  const navToVal = () => {
    router.push("/certify");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <div className="z-[-20] max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 font-mono font-bold">
          100xDevs Cohort Certify
        </p>
      </div>

      <div className="flex place-items-center before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[140px] after:w-[120px] after:translate-x-2/3 after:bg-gradient-conic after:from-sky-400 after:via-blue-400 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Printer
          printing={printing}
          setPrinting={setPrinting}
          certificateData={certificateData}
        />
      </div>

      <div
        className={`flex ${
          printing ? "justify-around" : "justify-between"
        } text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left lg:mt-20`}
      >
        {!printing ? (
          <button
            onClick={() => setShowModal(true)}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 border-neutral-700 bg-neutral-800/30"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Produce{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Generate Certificate !
            </p>
          </button>
        ) : (
          <button
            type="button"
            className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-sky-400/100 hover:bg-sky-300/100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
          >
            <svg
              className="w-3.5 h-3.5 mr-2"
              width="18"
              height="22"
              viewBox="0 0 18 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 9L9 13M9 13L5 9M9 13V1"
                stroke="#F2F2F2"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1 17V18C1 18.7956 1.31607 19.5587 1.87868 20.1213C2.44129 20.6839 3.20435 21 4 21H14C14.7956 21 15.5587 20.6839 16.1213 20.1213C16.6839 19.5587 17 18.7956 17 18V17"
                stroke="#F2F2F2"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Save
          </button>
        )}
        {printing && (
          <button
            type="button"
            onClick={() => setPrinting(false)}
            className="focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 bg-gray-100 hover:bg-gray-400 focus:ring-blue-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="18"
              viewBox="0,0,256,256"
            >
              <g
                fill="#000000"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
              >
                <g transform="scale(8.53333,8.53333)">
                  <path d="M7,4c-0.25587,0 -0.51203,0.09747 -0.70703,0.29297l-2,2c-0.391,0.391 -0.391,1.02406 0,1.41406l7.29297,7.29297l-7.29297,7.29297c-0.391,0.391 -0.391,1.02406 0,1.41406l2,2c0.391,0.391 1.02406,0.391 1.41406,0l7.29297,-7.29297l7.29297,7.29297c0.39,0.391 1.02406,0.391 1.41406,0l2,-2c0.391,-0.391 0.391,-1.02406 0,-1.41406l-7.29297,-7.29297l7.29297,-7.29297c0.391,-0.39 0.391,-1.02406 0,-1.41406l-2,-2c-0.391,-0.391 -1.02406,-0.391 -1.41406,0l-7.29297,7.29297l-7.29297,-7.29297c-0.1955,-0.1955 -0.45116,-0.29297 -0.70703,-0.29297z"></path>
                </g>
              </g>
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
        )}
        {!printing ? (
          <button
            onClick={() => navToVal()}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 border-neutral-700 bg-neutral-800/30"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Validate{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Verify Certificate !
            </p>
          </button>
        ) : (
          <button
            type="button"
            className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-sky-400/100 hover:bg-sky-300/100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
          >
            <svg
              className="w-3.5 h-3.5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="18"
              viewBox="0,0,256,256"
            >
              <g
                fill="#ffffff"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
              >
                <g transform="scale(5.12,5.12)">
                  <path d="M40,0c-5.46875,0 -9.93359,4.42188 -10,9.875l-14.09375,7.0625c-1.65625,-1.21875 -3.69922,-1.9375 -5.90625,-1.9375c-5.51172,0 -10,4.48828 -10,10c0,5.51172 4.48828,10 10,10c2.20703,0 4.25,-0.71875 5.90625,-1.9375l14.09375,7.0625c0.06641,5.45313 4.53125,9.875 10,9.875c5.51172,0 10,-4.48828 10,-10c0,-5.51172 -4.48828,-10 -10,-10c-2.125,0 -4.09766,0.67578 -5.71875,1.8125l-13.65625,-6.8125l13.65625,-6.8125c1.62109,1.13672 3.59375,1.8125 5.71875,1.8125c5.51172,0 10,-4.48828 10,-10c0,-5.51172 -4.48828,-10 -10,-10zM40,2c4.42969,0 8,3.57031 8,8c0,4.42969 -3.57031,8 -8,8c-1.63672,0 -3.14062,-0.50781 -4.40625,-1.34375c-0.125,-0.41797 -0.50391,-0.70703 -0.9375,-0.71875c-0.00391,-0.00391 -0.02734,0.00391 -0.03125,0c-1.39453,-1.26172 -2.33203,-3.02734 -2.5625,-5c0.21094,-0.35156 0.1875,-0.79687 -0.0625,-1.125c0.10156,-4.33984 3.63281,-7.8125 8,-7.8125zM30.21875,12c0.37109,1.80859 1.23047,3.4375 2.4375,4.75l-12.84375,6.4375c-0.33984,-1.82812 -1.15625,-3.47656 -2.34375,-4.8125zM10,17c1.85156,0 3.55469,0.60938 4.90625,1.65625c0.01172,0.00781 0.01953,0.02344 0.03125,0.03125c0.00781,0.01953 0.01953,0.04297 0.03125,0.0625c0.08594,0.10547 0.19141,0.1875 0.3125,0.25c0.00391,0.00391 0.02734,-0.00391 0.03125,0c1.49609,1.32813 2.48438,3.22266 2.65625,5.34375c-0.11328,0.27344 -0.10156,0.58203 0.03125,0.84375c-0.01953,0.08203 -0.03125,0.16406 -0.03125,0.25c-0.12109,2.21875 -1.12891,4.19141 -2.6875,5.5625c-0.09375,0.05859 -0.17969,0.13281 -0.25,0.21875c-1.375,1.11328 -3.11719,1.78125 -5.03125,1.78125c-4.42969,0 -8,-3.57031 -8,-8c0,-4.42969 3.57031,-8 8,-8zM19.8125,26.8125l12.84375,6.4375c-1.20703,1.3125 -2.06641,2.94141 -2.4375,4.75l-12.75,-6.375c1.1875,-1.33594 2.00391,-2.98437 2.34375,-4.8125zM40,32c4.42969,0 8,3.57031 8,8c0,4.42969 -3.57031,8 -8,8c-4.42969,0 -8,-3.57031 -8,-8c0,-2.40625 1.04688,-4.56641 2.71875,-6.03125c0.02344,-0.01953 0.04297,-0.03906 0.0625,-0.0625c0.00391,-0.00391 0.02734,0.00391 0.03125,0c0.16016,-0.06641 0.30078,-0.17578 0.40625,-0.3125c1.33594,-0.99609 2.98047,-1.59375 4.78125,-1.59375z"></path>
                </g>
              </g>
            </svg>
            Share
          </button>
        )}
      </div>

      {showModal && (
        <InputModal
          setShowModal={setShowModal}
          setCertid={setInputCertid}
          handleGetCert={handleGetCert}
          setInputEmail={setInputEmail}
          setPhoneDigits={setPhoneDigits}
          handleGenerateCert={handleGenerateCert}
          validInput={validInput}
        />
      )}
    </main>
  );
}
