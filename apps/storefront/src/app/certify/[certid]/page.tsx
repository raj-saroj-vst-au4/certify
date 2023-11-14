"use client";
import { useParams } from "next/navigation";
import kirat from "../../../assets/kirat.jpg";
import stdnt from "../../../assets/student.png";
import { serverClient } from "../../_app/serverClient";
import { useEffect, useState } from "react";
import InputAlert from "../../../components/InputAlert";
import Link from "next/link";

interface Certificate {
  certid: number;
  name: string;
  phone: string;
  email: string;
}

const Certify = () => {
  const [valid, setValid] = useState<boolean>();
  const [valData, setValData] = useState<Certificate>();
  const { certid } = useParams();

  const handleGetCert = async () => {
    if (certid) {
      const data = await serverClient.getCert({ certid: Number(certid) });
      if (data) {
        setValid(true);
        setValData(data);
      } else {
        setValid(false);
      }
    }
  };

  useEffect(() => {
    handleGetCert();
  }, []);
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
            {valid ? (
              <p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="w-8 h-8 dark:text-violet-400"
                >
                  <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                  <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                </svg>
                The certificate number :{" "}
                <span className="text-violet-400">{valData?.certid}</span> is
                valid and has been issued to{" "}
                <span className="text-violet-400">{valData?.name}</span> for the
                100x Devs Opensource Cohort on 10th November 2023
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="absolute right-0 w-8 h-8 dark:text-violet-400"
                >
                  <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                  <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                </svg>
              </p>
            ) : (
              <InputAlert />
            )}
            <div className="mt-8">
              <hr />
              {valid ? (
                <div className="flex mt-4 justify-center">
                  <img
                    className="w-10 h-10 rounded-full invert"
                    src={stdnt.src}
                    alt="avtr"
                  />
                  <div className="grid items-center pl-3">
                    <span>{valData?.name}</span>
                    <span>{valData?.email}</span>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center my-4">
                  <p className="text-red-600">Invalid Certificate</p>
                </div>
              )}
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
        href="/certify"
        className="pb-4 flex justify-center font-bold cursor-pointer text-violet-400"
      >
        Validate Another Certificate
      </Link>
    </section>
  );
};

export default Certify;
