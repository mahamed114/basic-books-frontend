import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { parseCookies } from "../../helpers";
import HeaderComponent from "../../components/HeaderComponent";
import SidebarComponent from "../../components/SidebarComponent";
import Head from "next/head";

export default function Income({ access, incomeData }) {
  const router = useRouter();

  const [incomeID, setincomeID] = useState(incomeData.income_id);
  const [incomeType, setincomeType] = useState(incomeData.income_type);
  const [incomeQuantity, setincomeQuantity] = useState(incomeData.quantity);
  const [incomeCustomer, setincomeCustomer] = useState(
    incomeData.income_customer
  );
  const [incomeProduct, setincomeProduct] = useState(incomeData.income_product);

  const [incomeAmount, setincomeAmount] = useState(incomeData.amount);
  const [incomeTax, setincomeTax] = useState(incomeData.tax);
  const [incomeDate, setincomeDate] = useState(incomeData.created_at);

  const updateIncome = async () => {
    const incomeUUID = incomeData.id;

    console.log(
      incomeUUID,
      incomeID,
      incomeType,
      incomeQuantity,
      incomeCustomer,
      incomeProduct,
      incomeAmount,
      incomeTax,
      incomeDate
    );

    try {
      const res = await fetch("/api/income/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          incomeUUID,
          incomeID,
          incomeType,
          incomeQuantity,
          incomeCustomer,
          incomeProduct,
          incomeAmount,
          incomeTax,
          incomeDate,
        }),
      });

      if (res.status === 200) {
        console.log("saved income changes");

        router.push("/income");
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

  const deleteIncome = async () => {
    const incomeUUID = incomeData.id;

    fetch("/api/income/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify({
        incomeUUID,
      }),
    });

    router.push("/income");
  };

  return (
    <>
      <Head>
        <title>Income | Basic Books</title>
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
                Income #{incomeData.income_id}
              </h2>
              <Link
                href="/income/new-income"
                className="px-4 py-0.5 bg-[#FF6D6D] text-white font-semibold text-lg"
              >
                <small className="text-xl">+</small> NEW
              </Link>
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
                <div className="flex flex-wrap mb-5">
                  <div className="flex items-center mr-4">
                    <input
                      id="goods"
                      type="radio"
                      name="incometype"
                      value="Goods"
                      checked={incomeType === "Goods"}
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
                <input
                  className="block border border-grey-light w-[500px] p-1 rounded mb-3"
                  type="text"
                  placeholder="select product"
                  value={incomeProduct}
                  readOnly
                  onChange={(e) => setincomeProduct(e.target.value)}
                />
                <input
                  className="block border border-grey-light w-[150px] p-1 rounded mb-3"
                  type="number"
                  placeholder="total products"
                  value={incomeQuantity}
                  onChange={(e) => setincomeQuantity(e.target.value)}
                />
                <input
                  className="block border border-grey-light w-[180px] p-1 rounded mb-3"
                  type="number"
                  placeholder="total price"
                  value={incomeAmount}
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
                  onChange={(e) => setincomeID(e.target.value)}
                />
                <input
                  className="block border border-grey-light w-[500px] p-1 rounded  mb-3"
                  type="date"
                  placeholder="enter date"
                  defaultValue={incomeDate}
                  onChange={(e) => setincomeDate(e.target.value)}
                />
                <input
                  className="block border border-grey-light w-[500px] p-1 rounded  mb-6"
                  type="text"
                  placeholder="choose customer"
                  value={incomeCustomer}
                  readOnly
                  onChange={(e) => setincomeCustomer(e.target.value)}
                />
                <button
                  onClick={updateIncome}
                  className="w-full text-center py-3 rounded bg-[#F0FF42] font-bold text-black hover:bg-[#eaff08] my-1"
                >
                  Update
                </button>
                <button
                  onClick={deleteIncome}
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
  const income = params.income;

  if (!access) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const incomes = await fetch(process.env.INCOME_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  const incomeData = await incomes.find((theincome) => {
    return theincome.id === income;
  });

  if (incomeData == undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      incomeData,
      access,
    },
  };
}
