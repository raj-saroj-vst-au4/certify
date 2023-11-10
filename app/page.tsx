"use client";
import { useState } from "react";
import Printer from "./components/Printer";
import InputModal from "./components/InputModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [printing, setPrinting] = useState<boolean>(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <div className="z-1 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 font-mono font-bold">
          100xDevs Cohort Certify
        </p>
      </div>

      <div className="flex place-items-center before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[140px] after:w-[120px] after:translate-x-2/3 after:bg-gradient-conic after:from-sky-400 after:via-blue-400 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Printer printing={printing} setPrinting={setPrinting} />
      </div>

      <div className="flex justify-around text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left lg:mt-20">
        <button
          onClick={() => setShowModal(true)}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 border-neutral-700 bg-neutral-800/30 z-1"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Verify{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Generate/Verify Certificate !
          </p>
        </button>
      </div>
      {showModal && <InputModal setShowModal={setShowModal} />}
    </main>
  );
}
