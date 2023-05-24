import { useState } from "react";
import { useRouter } from "next/router";

import { parseCookies } from "../../helpers";
import HeaderComponent from "../../components/HeaderComponent";
import SidebarComponent from "../../components/SidebarComponent";
import Head from "next/head";

export default function NewVendor({ access }) {
  const router = useRouter();

  const [vendorID, setvendorID] = useState("");
  const [vendorName, setvendorName] = useState("");
  const [vendorCompany, setvendorCompany] = useState("");
  const [vendorEmail, setvendorEmail] = useState("");
  const [vendorMobile, setvendorMobile] = useState("");
  const vendorSlug = vendorName.replaceAll(" ", "-");

  const addVendor = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/vendors/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          vendorID,
          vendorName,
          vendorEmail,
          vendorMobile,
          vendorCompany,
          vendorSlug,
        }),
      });

      if (res.status === 201) {
        console.log("added vendor successfuly");
        router.push("/vendors");
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

  return (
    <>
      <Head>
        <title>New Vendor | Basic Books</title>
        <meta
          name="description"
          content="Basic Books let's you manage your business. add inventory and track income and expenses, work with your team and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <SidebarComponent />
        <div className="grid grid-rows-2 gap-6">
          <HeaderComponent />
          <div style={{ marginLeft: "202px", marginTop: "50px" }}>
            <div className="flex justify-between items-center px-8 w-[1150px]">
              <h2 className="text-xl font-bold">New Vendor</h2>
            </div>
            <div className="flex min-w-fit mx-auto px-8 w-[1000px]">
              <div className="mt-8">
                <h3 className="text-2xl mr-8  mb-5">vendor Name: </h3>
                <h3 className="text-2xl mr-8  mb-3">vendor # </h3>
                <h3 className="text-2xl mr-8  mb-3">Compnay: </h3>
                <h3 className="text-2xl mr-8  mb-3">Email: </h3>
                <h3 className="text-2xl mr-8  mb-3">Mobile: </h3>
              </div>

              <div className="mt-8 ml-2">
                <form id="form" onSubmit={addVendor}>
                  <input
                    className="block border border-grey-light w-[500px] p-1 rounded mb-3"
                    type="text"
                    placeholder="vendor name"
                    value={vendorName}
                    required
                    onChange={(e) => setvendorName(e.target.value)}
                  />
                  <input
                    className="block border border-grey-light w-[150px] p-1 rounded mb-3"
                    type="text"
                    placeholder="vendor id"
                    value={vendorID}
                    onChange={(e) => setvendorID(e.target.value)}
                  />
                  <input
                    className="block border border-grey-light w-[500px] p-1 rounded  mb-3"
                    type="text"
                    placeholder="vendor company"
                    value={vendorCompany}
                    required
                    onChange={(e) => setvendorCompany(e.target.value)}
                  />
                  <input
                    className="block border border-grey-light w-[500px] p-1 rounded  mb-3"
                    type="email"
                    placeholder="enter email"
                    value={vendorEmail}
                    required
                    onChange={(e) => setvendorEmail(e.target.value)}
                  />
                  <input
                    className="block border border-grey-light w-[500px] p-1 rounded  mb-5"
                    type="phone"
                    placeholder="enter mobile number"
                    value={vendorMobile}
                    required
                    onChange={(e) => setvendorMobile(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-[#3eb4d8] font-bold text-white hover:bg-[#57C4E5] my-1"
                  >
                    Add Vendor
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const { access } = parseCookies(req);

  if (!access) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      access,
    },
  };
}
