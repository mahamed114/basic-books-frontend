import { useState } from "react";
import { useRouter } from "next/router";

import { parseCookies } from "../../helpers";
import HeaderComponent from "../../components/HeaderComponent";
import SidebarComponent from "../../components/SidebarComponent";
import Head from "next/head";

export default function NewIncome({ access, customersNames, productsNames }) {
  const router = useRouter();

  const [incomeID, setincomeID] = useState("");
  const [incomeType, setincomeType] = useState("");
  const [incomeQuantity, setincomeQuantity] = useState("");
  const [incomeCustomer, setincomeCustomer] = useState(customersNames[0]);
  const [incomeProduct, setincomeProduct] = useState(productsNames[0]);
  const [incomeAmount, setincomeAmount] = useState("");
  const [incomeTax, setincomeTax] = useState("");
  const [incomeDate, setincomeDate] = useState("");

  const addIncome = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/income/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          incomeCustomer,
          incomeProduct,
          incomeID,
          incomeType,
          incomeQuantity,
          incomeAmount,
          incomeTax,
          incomeDate,
        }),
      });

      const data = await res.json();
      console.log(data);
      console.log(res.status);

      if (res.status === 201) {
        console.log("added income successfuly");

        router.push("/income");
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
        <title>New Income | Basic Books</title>
        <meta
          name="description"
          content="Basic Books let's you manage your business. add inventory and track income and expenses, work with your team and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <SidebarComponent />
        <div className="grid grid-rows-1 gap-6">
          <HeaderComponent />
          <div style={{ marginLeft: "202px", marginTop: "50px" }}>
            <div className="flex justify-between items-center px-8 w-[1150px]">
              <h2 className="text-xl font-bold text-[#0000ff]">New Income</h2>
            </div>
            <div className="flex min-w-fit mx-auto px-8 w-[1000px]">
              <div className="mt-8">
                <h3 className="text-2xl mr-8  mb-5">Income Type: </h3>
                <h3 className="text-2xl mr-8  mb-[13px]">Product: </h3>
                <h3 className="text-2xl mr-8  mb-[13px]">Quantity: </h3>
                <h3 className="text-2xl mr-8  mb-[13px]">Amount: </h3>
                <h3 className="text-2xl mr-8  mb-[13px]">Tax: </h3>
                <h3 className="text-2xl mr-8  mb-[13px]">Income # </h3>
                <h3 className="text-2xl mr-8  mb-[13px]">Income Date: </h3>
                <h3 className="text-2xl mr-8  mb-[13px]">Customer: </h3>
              </div>

              <div className="mt-8 ml-2">
                <form id="form" onSubmit={addIncome}>
                  <div className="flex flex-wrap mb-5">
                    <div className="flex items-center mr-4">
                      <input
                        id="goods"
                        type="radio"
                        name="incometype"
                        value="Goods"
                        checked={incomeType === "Goods"}
                        required
                        onChange={(e) => setincomeType(e.target.value)}
                        className="w-4 h-4 bg-gray-100 border-gray-300"
                      />
                      <label
                        htmlFor="goods"
                        className="ml-2 text-xl font-bold text-gray-900"
                      >
                        Goods
                      </label>
                    </div>
                    <div className="flex items-center mr-4">
                      <input
                        id="service"
                        type="radio"
                        name="incometype"
                        value="Service"
                        checked={incomeType === "Service"}
                        required
                        onChange={(e) => setincomeType(e.target.value)}
                        className="w-4 h-4 bg-gray-100 border-gray-300"
                      />
                      <label
                        htmlFor="service"
                        className="ml-2 text-xl font-bold text-gray-900"
                      >
                        Service
                      </label>
                    </div>
                  </div>

                  <select
                    value={incomeProduct}
                    onChange={(e) => setincomeProduct(e.target.value)}
                    required
                    className="py-1.5 px-2 bg-[#57c4e523] rounded mb-3"
                  >
                    {productsNames.map((theproduct) => {
                      return (
                        <option
                          key={theproduct.id}
                          className="grid grid-cols-4 gap-x-4 gap-y-2 min-w-fit mx-auto px-4 w-[1000px]"
                        >
                          {theproduct}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    className="block border border-grey-light w-[150px] p-1 rounded mb-3"
                    type="number"
                    placeholder="total price"
                    value={incomeQuantity}
                    required
                    max={999}
                    onChange={(e) => setincomeQuantity(e.target.value)}
                  />
                  <input
                    className="block border border-grey-light w-[180px] p-1 rounded mb-3"
                    type="number"
                    placeholder="total price"
                    value={incomeAmount}
                    required
                    onChange={(e) => setincomeAmount(e.target.value)}
                  />
                  <input
                    className="block border border-grey-light w-[150px] p-1 rounded  mb-3"
                    type="number"
                    placeholder="optional tax"
                    value={incomeTax}
                    onChange={(e) => setincomeTax(e.target.value)}
                  />
                  <input
                    className="block border border-grey-light w-[180px] p-1 rounded  mb-3"
                    type="text"
                    placeholder="income id"
                    value={incomeID}
                    required
                    onChange={(e) => setincomeID(e.target.value)}
                  />
                  <input
                    className="block border border-grey-light w-[500px] p-1 rounded  mb-3"
                    type="date"
                    placeholder="enter date"
                    defaultValue={incomeDate}
                    required
                    onChange={(e) => setincomeDate(e.target.value)}
                  />
                  <select
                    value={incomeCustomer}
                    onChange={(e) => setincomeCustomer(e.target.value)}
                    required
                    className="py-1.5 px-2 bg-[#efff426c] rounded mb-6"
                  >
                    {customersNames.map((thecustomer) => {
                      return (
                        <option
                          key={thecustomer.id}
                          className="grid grid-cols-4 gap-x-4 gap-y-2 min-w-fit mx-auto px-4 w-[1000px]"
                        >
                          {thecustomer}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-[#F0FF42] font-bold text-white hover:bg-[#e5ff00] my-1"
                  >
                    Add Income
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
  const productsNames = [];
  const customersNames = [];

  if (!access) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const products = await fetch(process.env.PRODUCTS_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  const customers = await fetch(process.env.CUSTOMERS_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  products.map((prod) => {
    productsNames.push(prod.item_slug);
  });

  customers.map((customer) => {
    customersNames.push(customer.cus_slug);
  });

  return {
    props: {
      access,
      customersNames,
      productsNames,
    },
  };
}
