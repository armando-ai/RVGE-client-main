import { type NextPage } from "next";
import Head from "next/head";
import { Navigation } from "src/components/navigation";
import {
  VerticalAdjustmentBarIcon,
  CirclePlusIcon,
  UpDownArrowIcon,
} from "src/components/icons";
import { Filter, Data, ClientManager } from "src/features";
import { useState } from "react";
import React from "react";

const ClientsPage: NextPage = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [selected, setSelected] = useState(false);

  const toggleFilter = () => setOpenFilter((prev) => !prev);

  return (
    <>
      <Head>
        <title>Clients</title>
      </Head>

      <main className="flex min-h-screen w-full flex-col bg-slate-900">
        <Navigation />
        <div
          className={`relative flex w-full flex-col items-center space-y-8 duration-300`}
        >
          <div
            className={`my-4 flex w-11/12 flex-row items-center justify-between rounded bg-slate-200/80 px-4 py-4 text-black ${
              selected ? "hide--clients" : "show--clients"
            }`}
          >
            <h1 className="text-lg tracking-wider">Clients</h1>
            <div className="flex space-x-4">
              <VerticalAdjustmentBarIcon
                onClick={toggleFilter}
                className="h-6 w-6"
              />
              <CirclePlusIcon className="h-6 w-6" />
            </div>
            {/* <Filter isOpen={openFilter} /> */}
          </div>
          <ClientManager
            selected={selected}
            setSelected={setSelected}
            data={Data}
            className={`flex w-11/12 flex-col space-y-4`}
          />
        </div>
      </main>
    </>
  );
};

export default ClientsPage;
