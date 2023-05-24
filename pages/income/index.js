import Link from "next/link";

import { parseCookies } from "../../helpers";
import HeaderComponent from "../../components/HeaderComponent";
import SidebarComponent from "../../components/SidebarComponent";
import Head from "next/head";

export default function Incomes({ incomesData }) {
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
        <div className="grid grid-rows-2 gap-6">
          <HeaderComponent />
          <div style={{ marginLeft: "202px", marginTop: "50px" }}>
            <div className="flex justify-between items-center px-8 w-[1150px]">
              <h2 className="text-xl font-bold">All Incomes</h2>
              <Link
                href="/income/new-income"
                className="px-4 py-0.5 bg-[#FF6D6D] text-white font-semibold text-lg"
              >
                <small className="text-xl">+</small> NEW
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-x-4 mx-auto mt-4 px-4 w-[1000px]">
              <h4 className="text-[#57C4E5] flex">DATE</h4>
              <h4 className="">Income #</h4>
              <h4 className="">Customer Name</h4>
              <h4 className="">Amount</h4>
            </div>
            <div className="border-b-stone-600  border h-0.5 bg-stone-600 mt-2 mb-4"></div>
            {incomesData.map((income) => {
              return (
                <div
                  key={income.id}
                  className="grid grid-cols-4 gap-x-4 gap-y-2 min-w-fit mx-auto px-4 w-[1000px]"
                >
                  <>
                    <Link href={`/income/${income.id}`}>
                      <h3 className="flex">
                        <small className="mr-2">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 3H6C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6V18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18V6C21 5.20435 20.6839 4.44129 20.1213 3.87868C19.5587 3.31607 18.7956 3 18 3ZM19 18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19H6C5.73478 19 5.48043 18.8946 5.29289 18.7071C5.10536 18.5196 5 18.2652 5 18V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H18C18.2652 5 18.5196 5.10536 18.7071 5.29289C18.8946 5.48043 19 5.73478 19 6V18Z"
                              fill="#C0C0C0"
                            />
                            <path
                              d="M14.7002 8.38993L10.9202 13.3899L9.29019 11.2799C9.12708 11.0704 8.88742 10.9343 8.62393 10.9014C8.36044 10.8686 8.09471 10.9418 7.88519 11.1049C7.67567 11.268 7.53952 11.5077 7.5067 11.7712C7.47389 12.0347 7.54708 12.3004 7.71019 12.5099L10.1402 15.6199C10.2344 15.7391 10.3544 15.8353 10.4913 15.9011C10.6282 15.967 10.7783 16.0008 10.9302 15.9999C11.0829 15.9996 11.2335 15.9642 11.3705 15.8966C11.5074 15.829 11.627 15.7309 11.7202 15.6099L16.2902 9.60993C16.452 9.39776 16.5228 9.13001 16.4872 8.86558C16.4516 8.60116 16.3124 8.36171 16.1002 8.19993C15.888 8.03815 15.6203 7.96728 15.3558 8.00291C15.0914 8.03854 14.852 8.17776 14.6902 8.38993H14.7002Z"
                              fill="#C0C0C0"
                            />
                          </svg>
                        </small>{" "}
                        {income.created_at}
                      </h3>
                    </Link>
                    <h3 className="text-[#57c4e5] font-bold">
                      {income.income_id}
                    </h3>
                    <h3 className="">{income.income_customer}</h3>
                    <h3 className="">{income.amount}</h3>
                  </>
                </div>
              );
            })}
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

  const incomesData = await fetch(process.env.INCOME_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  return {
    props: {
      incomesData,
    },
  };
}
