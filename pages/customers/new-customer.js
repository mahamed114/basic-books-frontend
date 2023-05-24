import { useState } from "react";
import { useRouter } from "next/router";

import { parseCookies } from "../../helpers";
import HeaderComponent from "../../components/HeaderComponent";
import SidebarComponent from "../../components/SidebarComponent";
import Head from "next/head";

export default function NewCustomer({ access }) {
  const router = useRouter();

  const [customerID, setcustomerID] = useState();
  const [customerType, setcustomerType] = useState("");
  const [customerName, setcustomerName] = useState("");
  const [customerCompany, setcustomerCompany] = useState("");
  const [customerEmail, setcustomerEmail] = useState("");
  const [customerMobile, setcustomerMobile] = useState("");

  const customerSlug = customerName.replaceAll(" ", "-");

  const addCustomer = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/customers/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          customerID,
          customerType,
          customerName,
          customerEmail,
          customerMobile,
          customerCompany,
          customerSlug,
        }),
      });

      if (res.status === 201) {
        // console.log("added customer successfuly");
        router.push("/customers");
      } else {
        // console.log("error");
      }
    } catch (err) {
      // console.log(`CATCH ${err}`);
    }
  };

  return (
    <>
      <Head>
        <title>New Customer | Basic Books</title>
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
              <h2 className="text-xl font-bold">New Customer</h2>
            </div>
            <div className="flex min-w-fit mx-auto px-8 w-[1000px]">
              <div className="mt-8">
                <h3 className="text-2xl mr-8  mb-5">Customer Type: </h3>
                <h3 className="text-2xl mr-8  mb-3">Customer # </h3>
                <h3 className="text-2xl mr-8  mb-3">Customer Name: </h3>
                <h3 className="text-2xl mr-8  mb-3">Company: </h3>
                <h3 className="text-2xl mr-8  mb-3">Email: </h3>
                <h3 className="text-2xl mr-8  mb-3">Mobile: </h3>
              </div>

              <div className="mt-8 ml-2">
                <form id="form" onSubmit={addCustomer}>
                  <div className="flex flex-wrap mb-5">
                    <div className="flex items-center mr-4">
                      <input
                        id="business"
                        type="radio"
                        name="customer"
                        value="Business"
                        onChange={(e) => setcustomerType(e.target.value)}
                        required
                        className="w-4 h-4 bg-gray-100 border-gray-300"
                      />
                      <label
                        htmlFor="business"
                        className="ml-2 text-xl font-bold text-gray-900"
                      >
                        Business
                      </label>
                    </div>
                    <div className="flex items-center mr-4">
                      <input
                        id="individual"
                        type="radio"
                        name="customer"
                        value="Individual"
                        onChange={(e) => setcustomerType(e.target.value)}
                        required
                        className="w-4 h-4 bg-gray-100 border-gray-300"
                      />
                      <label
                        htmlFor="individual"
                        className="ml-2 text-xl font-bold text-gray-900"
                      >
                        Individual
                      </label>
                    </div>
                  </div>
                  <input
                    className="block border border-grey-light w-[150px] p-1 rounded mb-3"
                    type="text"
                    placeholder="customer id"
                    value={customerID}
                    onChange={(e) => setcustomerID(e.target.value)}
                  />
                  <input
                    className="block border border-grey-light w-[500px] p-1 rounded mb-3"
                    type="text"
                    placeholder="customer name"
                    value={customerName}
                    onChange={(e) => setcustomerName(e.target.value)}
                    required
                  />
                  <input
                    className="block border border-grey-light w-[500px] p-1 rounded  mb-3"
                    type="text"
                    placeholder="customer company"
                    value={customerCompany}
                    onChange={(e) => setcustomerCompany(e.target.value)}
                    required
                  />
                  <input
                    className="block border border-grey-light w-[500px] p-1 rounded  mb-3"
                    type="email"
                    placeholder="enter email"
                    value={customerEmail}
                    onChange={(e) => setcustomerEmail(e.target.value)}
                    required
                  />
                  <input
                    className="block border border-grey-light w-[500px] p-1 rounded  mb-5"
                    type="phone"
                    placeholder="enter mobile number"
                    value={customerMobile}
                    onChange={(e) => setcustomerMobile(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-[#3eb4d8] font-bold text-white hover:bg-[#57C4E5] my-1"
                  >
                    Add Customer
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
