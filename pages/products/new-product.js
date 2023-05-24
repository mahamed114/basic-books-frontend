import { useState } from "react";
import { useRouter } from "next/router";

import { parseCookies } from "../../helpers";
import HeaderComponent from "../../components/HeaderComponent";
import SidebarComponent from "../../components/SidebarComponent";
import Head from "next/head";

export default function NewProduct({ access }) {
  const router = useRouter();

  const [itemID, setitemID] = useState();
  const [itemType, setitemType] = useState("Goods");
  const [itemName, setitemName] = useState("");
  const [itemDescription, setitemDescription] = useState("");
  const [itemUnit, setitemUnit] = useState("");
  const [itemParchasePrice, setitemParchasePrice] = useState("");
  const [itemSalePrice, setitemSalePrice] = useState("");
  const itemSlug = itemName.replaceAll(" ", "-");

  const addProduct = async () => {
    try {
      const res = await fetch("/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          itemID,
          itemType,
          itemName,
          itemUnit,
          itemDescription,
          itemParchasePrice,
          itemSalePrice,
          itemSlug,
        }),
      });

      if (res.status === 201) {
        console.log("added product successfuly");

        router.push("/products");
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
        <title>New Item | Basic Books</title>
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
              <h2 className="text-xl font-bold">New Product</h2>
            </div>
            <div className="flex min-w-fit mx-auto px-8 w-[1000px]">
              <div className="mt-8">
                <h3 className="text-2xl mr-8  mb-5">Item Type: </h3>
                <h3 className="text-2xl mr-8  mb-3">Item # </h3>
                <h3 className="text-2xl mr-8  mb-3">Item Name: </h3>
                <h3 className="text-2xl mr-8  mb-3">Item Description: </h3>
                <h3 className="text-2xl mr-8  mb-3">Unit: </h3>
                <h3 className="text-2xl mr-8  mb-3">Parchase Price: </h3>
                <h3 className="text-2xl mr-8  mb-3">Sale Price: </h3>
              </div>

              <div className="mt-8 ml-2">
                <form id="form" onSubmit={addProduct}>
                  <div className="flex flex-wrap mb-5">
                    <div className="flex items-center mr-4">
                      <input
                        id="goods"
                        type="radio"
                        name="itemtype"
                        value="Goods"
                        onChange={(e) => setitemType(e.target.value)}
                        required
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
                        name="itemtype"
                        value="Service"
                        onChange={(e) => setitemType(e.target.value)}
                        required
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
                    className="block border border-grey-light w-[150px] p-1 rounded mb-3"
                    type="text"
                    placeholder="product id"
                    value={itemID}
                    onChange={(e) => setitemID(e.target.value)}
                  />
                  <input
                    className="block border border-grey-light w-[500px] p-1 rounded mb-3"
                    type="text"
                    placeholder="product name"
                    value={itemName}
                    onChange={(e) => setitemName(e.target.value)}
                    required
                  />
                  <input
                    className="block border border-grey-light w-[500px] p-1 rounded  mb-3"
                    type="text"
                    placeholder="product description"
                    value={itemDescription}
                    onChange={(e) => setitemDescription(e.target.value)}
                    required
                  />
                  <input
                    className="block border border-grey-light w-[500px] p-1 rounded  mb-3"
                    type="text"
                    placeholder="ex: kg ml"
                    value={itemUnit}
                    onChange={(e) => setitemUnit(e.target.value)}
                    required
                  />
                  <input
                    className="block border border-grey-light w-[500px] p-1 rounded  mb-3"
                    type="number"
                    placeholder="item parchase price"
                    value={itemParchasePrice}
                    onChange={(e) => setitemParchasePrice(e.target.value)}
                    required
                  />
                  <input
                    className="block border border-grey-light w-[500px] p-1 rounded  mb-5"
                    type="number"
                    placeholder="item sale price"
                    value={itemSalePrice}
                    onChange={(e) => setitemSalePrice(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-[#3eb4d8] font-bold text-white hover:bg-[#57C4E5] my-1"
                  >
                    Add Product
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
