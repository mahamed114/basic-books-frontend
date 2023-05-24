import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { parseCookies } from "../../helpers";
import HeaderComponent from "../../components/HeaderComponent";
import SidebarComponent from "../../components/SidebarComponent";
import Head from "next/head";

export default function Expense({ access, expensesData }) {
  const router = useRouter();

  const [expensesID, setexpensesID] = useState(expensesData.expense_id);
  const [expensesType, setexpensesType] = useState(expensesData.expense_type);
  const [expensesQuantity, setexpensesQuantity] = useState(
    expensesData.quantity
  );
  const [expensesVendor, setexpensesVendor] = useState(
    expensesData.expenses_vendor
  );
  const [expensesProduct, setexpensesProduct] = useState(
    expensesData.expenses_product
  );

  const [expensesAmount, setexpensesAmount] = useState(expensesData.amount);
  const [expensesTax, setexpensesTax] = useState(expensesData.tax);
  const [expensesDate, setexpensesDate] = useState(expensesData.created_at);

  const updatEexpense = async () => {
    const expensesUUID = expensesData.id;

    try {
      const res = await fetch("/api/expenses/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          expensesUUID,
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

      if (res.status === 200) {
        // console.log("saved expenses changes");

        router.push("/expenses");
      } else {
        // console.log("error");
      }
    } catch (err) {
      // console.log(`CATCH ${err}`);
    }
  };

  const deleteExpense = async () => {
    const expensesUUID = expensesData.id;

    fetch("/api/expenses/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify({
        expensesUUID,
      }),
    });

    router.push("/expenses");
  };

  return (
    <>
      <Head>
        <title>Expenses | Basic Books</title>
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
              <h2 className="text-xl font-bold text-[#0000ff]">
                Expense #{expensesData.expense_id}
              </h2>
              <Link
                href="/expenses/new-expense"
                className="px-4 py-0.5 bg-[#FF6D6D] text-white font-semibold text-lg"
              >
                <small className="text-xl">+</small> NEW
              </Link>
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
                <div className="flex flex-wrap mb-5">
                  <div className="flex items-center mr-4">
                    <input
                      id="goods"
                      type="radio"
                      name="expensestype"
                      value="Goods"
                      checked={expensesType === "Goods"}
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
                      name="expensestype"
                      value="Service"
                      checked={expensesType === "Service"}
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
                <input
                  className="block border border-grey-light w-[500px] p-1 rounded mb-3"
                  type="text"
                  placeholder="select product"
                  value={expensesProduct}
                  readOnly
                  onChange={(e) => setexpensesProduct(e.target.value)}
                />
                <input
                  className="block border border-grey-light w-[150px] p-1 rounded mb-3"
                  type="number"
                  placeholder="total products"
                  value={expensesQuantity}
                  onChange={(e) => setexpensesQuantity(e.target.value)}
                />
                <input
                  className="block border border-grey-light w-[180px] p-1 rounded mb-3"
                  type="number"
                  placeholder="total cost"
                  value={expensesAmount}
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
                  onChange={(e) => setexpensesID(e.target.value)}
                />
                <input
                  className="block border border-grey-light w-[500px] p-1 rounded  mb-3"
                  type="date"
                  placeholder="enter date"
                  defaultValue={expensesDate}
                  onChange={(e) => setexpensesDate(e.target.value)}
                />
                <input
                  className="block border border-grey-light w-[500px] p-1 rounded  mb-6"
                  type="text"
                  placeholder="choose vendor"
                  value={expensesVendor}
                  readOnly
                  onChange={(e) => setexpensesVendor(e.target.value)}
                />
                <button
                  onClick={updatEexpense}
                  className="w-full text-center py-3 rounded bg-[#F0FF42] font-bold text-black hover:bg-[#eaff08] my-1"
                >
                  Update
                </button>
                <button
                  onClick={deleteExpense}
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
  const { access } = parseCookies(req);
  const expense = params.expense;

  if (!access) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const allexpenses = await fetch(process.env.EXPENSES_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  const expensesData = await allexpenses.find((theexpenses) => {
    return theexpenses.id === expense;
  });

  if (expensesData == undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      expensesData,
      access,
    },
  };
}
