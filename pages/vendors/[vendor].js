import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { parseCookies } from "../../helpers";
import HeaderComponent from "../../components/HeaderComponent";
import SidebarComponent from "../../components/SidebarComponent";
import Head from "next/head";

export default function Vendor({ access, vendorData }) {
  const router = useRouter();

  const [vendorID, setvendorID] = useState(vendorData.ven_id);
  const [vendorName, setvendorName] = useState(vendorData.ven_name);
  const [vendorCompany, setvendorCompany] = useState(vendorData.ven_company);
  const [vendorEmail, setvendorEmail] = useState(vendorData.ven_email);
  const [vendorMobile, setvendorMobile] = useState(vendorData.ven_mobile);

  const vendorSlug = vendorName.replaceAll(" ", "-");

  const updatevendor = async () => {
    const venID = vendorData.id;

    try {
      const res = await fetch("/api/vendors/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          venID,
          vendorID,
          vendorName,
          vendorEmail,
          vendorMobile,
          vendorCompany,
          vendorSlug,
        }),
      });

      const data = await res.json();
      console.log(data);
      console.log(res.status);

      if (res.status === 200) {
        console.log("saved vendor changes");

        router.push("/vendors");
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

  const deletevendor = async () => {
    const venID = vendorData.id;

    fetch("/api/vendors/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify({
        venID,
      }),
    });

    router.push("/vendors");
  };

  return (
    <>
      <Head>
        <title>Vendor | Basic Books</title>
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
              <h2 className="text-xl font-bold">vendor #{vendorData.ven_id}</h2>
              <Link
                href="/vendors/new-vendor"
                className="px-4 py-0.5 bg-[#FF6D6D] text-white font-semibold text-lg"
              >
                <small className="text-xl">+</small> NEW
              </Link>
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
                <input
                  className="block border border-grey-light w-[500px] p-1 rounded mb-3"
                  type="text"
                  placeholder="vendor name"
                  value={vendorName}
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
                  onChange={(e) => setvendorCompany(e.target.value)}
                />
                <input
                  className="block border border-grey-light w-[500px] p-1 rounded  mb-3"
                  type="email"
                  placeholder="enter email"
                  value={vendorEmail}
                  onChange={(e) => setvendorEmail(e.target.value)}
                />
                <input
                  className="block border border-grey-light w-[500px] p-1 rounded  mb-5"
                  type="phone"
                  placeholder="enter mobile number"
                  value={vendorMobile}
                  onChange={(e) => setvendorMobile(e.target.value)}
                />
                <button
                  onClick={updatevendor}
                  className="w-full text-center py-3 rounded bg-[#F0FF42] font-bold text-black hover:bg-[#eaff08] my-1"
                >
                  Update
                </button>
                <button
                  onClick={deletevendor}
                  className="w-full text-center py-3 rounded bg-[#f1f1f1] font-bold text-black hover:bg-[#e7e7e7] my-1"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, params }) {
  const vendor = params.vendor;
  const { access } = parseCookies(req);

  if (!access) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const vendorsData = await fetch(process.env.VENDORS_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  const vendorData = await vendorsData.find((ven) => {
    return ven.id === vendor;
  });

  if (vendorData == undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      vendorData,
      access,
    },
  };
}
