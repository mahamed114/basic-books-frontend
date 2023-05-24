import { useState } from "react";
import { useRouter } from "next/router";

import { parseCookies } from "../../helpers";
import HeaderComponent from "../../components/HeaderComponent";
import SidebarComponent from "../../components/SidebarComponent";
import Head from "next/head";

export default function NewExpense({ access, vendorsNames, productsNames }) {
  const router = useRouter();

  const [expensesID, setexpensesID] = useState("");
  const [expensesType, setexpensesType] = useState("");
  const [expensesQuantity, setexpensesQuantity] = useState("");
  const [expensesVendor, setexpensesVendor] = useState(vendorsNames[0]);
  const [expensesProduct, setexpensesProduct] = useState(productsNames[0]);
  const [expensesAmount, setexpensesAmount] = useState("");
  const [expensesTax, setexpensesTax] = useState("");
  const [expensesDate, setexpensesDate] = useState("");

  const addExpense = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/expenses/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          expensesID,
          expensesType,
          expensesQuantity,
          expensesVendor,
          expensesProduct,
          expensesAmount,
          expensesTax,
          expensesDate,
        }),
      });

      if (res.status === 201) {
        console.log("added expense successfuly");

        router.push("/expenses");
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
        <title>New Expense | Basic Books</title>
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
                <h3 className="text-2xl mr-8  mb-5">Expense Type: </h3>
                <h3 className="text-2xl mr-8  mb-[13px]">Product: </h3>
                <h3 className="text-2xl mr-8  mb-[13px]">Quantity: </h3>
                <h3 className="text-2xl mr-8  mb-[13px]">Amount: </h3>
                <h3 className="text-2xl mr-8  mb-[13px]">Tax: </h3>
                <h3 className="text-2xl mr-8  mb-[13px]">Expense # </h3>
                <h3 className="text-2xl mr-8  mb-[13px]">Expense Date: </h3>
                <h3 className="text-2xl mr-8  mb-[13px]">Vendor: </h3>
              </div>

              <div className="mt-8 ml-2">
                <form id="form" onSubmit={addExpense}>
                  <div className="flex flex-wrap mb-5">
                    <div className="flex items-center mr-4">
                      <input
                        id="goods"
                        type="radio"
                        name="expensetype"
                        value="Goods"
                        checked={expensesType === "Goods"}
                        required
                        onChange={(e) => setexpensesType(e.target.value)}
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
                        name="expensetype"
                        value="Service"
                        checked={expensesType === "Service"}
                        required
                        onChange={(e) => setexpensesType(e.target.value)}
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
                    onChange={(e) => setexpensesProduct(e.target.value)}
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
                    placeholder="total producs"
                    value={expensesQuantity}
                    required
                    onChange={(e) => setexpensesQuantity(e.target.value)}
                  />
                  <input
                    className="block border border-grey-light w-[180px] p-1 rounded mb-3"
                    type="number"
                    placeholder="total costs"
                    value={expensesAmount}
                    required
                    onChange={(e) => setexpensesAmount(e.target.value)}
                  />
                  <input
                    className="block border border-grey-light w-[150px] p-1 rounded  mb-3"
                    type="number"
                    placeholder="optional tax"
                    value={expensesTax}
                    onChange={(e) => setexpensesTax(e.target.value)}
                  />
                  <input
                    className="block border border-grey-light w-[180px] p-1 rounded  mb-3"
                    type="text"
                    placeholder="expense id"
                    value={expensesID}
                    required
                    onChange={(e) => setexpensesID(e.target.value)}
                  />
                  <input
                    className="block border border-grey-light w-[500px] p-1 rounded  mb-3"
                    type="date"
                    placeholder="enter date"
                    defaultValue={expensesDate}
                    required
                    onChange={(e) => setexpensesDate(e.target.value)}
                  />
                  <select
                    value={expensesVendor}
                    onChange={(e) => setexpensesVendor(e.target.value)}
                    required
                    className="py-1.5 px-2 bg-[#efff426c] rounded mb-6"
                  >
                    {vendorsNames.map((thevendor) => {
                      return (
                        <option
                          key={thevendor.id}
                          className="grid grid-cols-4 gap-x-4 gap-y-2 min-w-fit mx-auto px-4 w-[1000px]"
                        >
                          {thevendor}
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
  const vendorsNames = [];

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

  const vendors = await fetch(process.env.VENDORS_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  products.map((prod) => {
    productsNames.push(prod.item_slug);
  });

  vendors.map((vendor) => {
    vendorsNames.push(vendor.ven_slug);
  });

  return {
    props: {
      access,
      vendorsNames,
      productsNames,
    },
  };
}
