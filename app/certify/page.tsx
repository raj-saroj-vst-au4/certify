"use client";
import { useRouter } from "next/navigation";
import kirat from "@/assets/kirat.jpg";
import Link from "next/link";
import { serverClient } from "../_app/serverClient";
import { useState } from "react";
import InputAlert from "../components/InputAlert";

interface Certificate {
  certid: number;
  name: string;
  phone: string;
  email: string;
}

const Validation = () => {
  const [validInput, setValidInput] = useState<boolean>(true);
  const [inputCertid, setInputCertid] = useState<number>();
  const router = useRouter();

  const handleGetCert = async () => {
    if (inputCertid) {
      console.log(inputCertid);
      const data = await serverClient.getCert({ certid: inputCertid });
      if (data) {
        setValidInput(true);
        router.push(`/certify/${inputCertid}`);
      } else {
        setValidInput(false);
      }
    }
  };
  return (
    <section className="my-8 dark:bg-gray-800 dark:text-gray-100">
      <div className="container flex flex-col items-center mx-auto mb-12 md:p-10 md:px-12">
        <h1 className="p-4 text-4xl font-semibold leadi text-center">
          100xDevs Certificate Validation
        </h1>
      </div>
      <div className="container flex flex-col items-center justify-center mx-auto lg:flex-row lg:flex-wrap lg:justify-evenly lg:px-10">
        <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
          <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 dark:bg-gray-900">
            <p className="relative px-6 py-1 text-lg text-center dark:text-gray-100">
              <span className="text-violet-400">Verify a Certificate</span>
            </p>

            <div className="my-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Certificate ID
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="6 Digit Certificate ID"
                onChange={(e) => setInputCertid(parseInt(e.target.value))}
                required
              />
              <button
                className="w-full text-white bg-violet-400 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-7"
                onClick={() => handleGetCert()}
              >
                Validate Certificate
              </button>
            </div>
            {!validInput && <InputAlert />}

            <div className="mt-8">
              <hr />
              <span className="flex justify-center my-4">
                Dont have one?{" "}
                <Link
                  className="ml-2 cursor-pointer text-violet-400"
                  href={`${process.env.NEXT_PUBLIC_CERTIFY_URL}/`}
                >
                  Generate
                </Link>
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-8 rounded-b-lg dark:bg-violet-400 dark:text-gray-900">
            <img
              src={kirat.src}
              alt="kirat"
              className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full dark:bg-gray-500 dark:bg-gray-700"
            />
            <p className="text-xl font-semibold leadi">100x Devs</p>
            <p className="text-sm uppercase">Harkirat Singh</p>
          </div>
        </div>
      </div>
      <Link
        href={`${process.env.NEXT_PUBLIC_CERTIFY_URL}`}
        className="pb-4 flex justify-center font-bold cursor-pointer text-violet-400"
      >
        Produce Your Certificate
      </Link>
    </section>
  );
};

export default Validation;
