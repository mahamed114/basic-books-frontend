import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { parseCookies } from "../../helpers";
import HeaderComponent from "../../components/HeaderComponent";
import SidebarComponent from "../../components/SidebarComponent";
import Head from "next/head";

export default function Customer({ access, customerData }) {
  const router = useRouter();

  const [customerID, setcustomerID] = useState(customerData.cus_id);
  const [customerType, setcustomerType] = useState(customerData.cus_type);
  const [customerName, setcustomerName] = useState(customerData.cus_name);
  const [customerCompany, setcustomerCompany] = useState(
    customerData.cus_company
  );
  const [customerEmail, setcustomerEmail] = useState(customerData.cus_email);
  const [customerMobile, setcustomerMobile] = useState(customerData.cus_mobile);

  const customerSlug = customerName.replaceAll(" ", "-");

  const updateCustomer = async () => {
    const cusID = customerData.id;

    try {
      const res = await fetch("/api/customers/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          cusID,
          customerID,
          customerType,
          customerName,
          customerCompany,
          customerEmail,
          customerMobile,
          customerSlug,
        }),
      });

      const data = await res.json();
      console.log(data);
      console.log(res.status);

      if (res.status === 200) {
        // console.log("saved customer changes");

        router.push("/customers");
      } else {
        // console.log("error");
      }
    } catch (err) {
      // console.log(`CATCH ${err}`);
    }
  };

  const deleteCustomer = async () => {
    const cusID = customerData.id;

    fetch("/api/customers/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify({
        cusID,
      }),
    });

    router.push("/customers");
  };

  return (
    <>
      <Head>
        <title>Customer | Basic Books</title>
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
              <h2 className="text-xl font-bold">
                Customer #{customerData.cus_id}
              </h2>
              <Link
                href="/customers/new-customer"
                className="px-4 py-0.5 bg-[#FF6D6D] text-white font-semibold text-lg"
              >
                <small className="text-xl">+</small> NEW
              </Link>
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
                <div className="flex flex-wrap mb-5">
                  <div className="flex items-center mr-4">
                    <input
                      id="business"
                      type="radio"
                      name="customer"
                      value="Business"
                      checked={customerType === "Business"}
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
                      checked={customerType === "Individual"}
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
                  onClick={updateCustomer}
                  className="w-full text-center py-3 rounded bg-[#F0FF42] font-bold text-black hover:bg-[#eaff08] my-1"
                >
                  Update
                </button>
                <button
                  onClick={deleteCustomer}
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
  const customer = params.customer;
  const { access } = parseCookies(req);

  if (!access) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const customersData = await fetch(process.env.CUSTOMERS_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  const customerData = await customersData.find((cus) => {
    return cus.id === customer;
  });

  if (customerData == undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      customerData,
      access,
    },
  };
}
