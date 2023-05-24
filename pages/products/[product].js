import { useState } from "react";
import { useRouter } from "next/router";

import { parseCookies } from "../../helpers";
import HeaderComponent from "../../components/HeaderComponent";
import SidebarComponent from "../../components/SidebarComponent";
import Link from "next/link";
import Head from "next/head";

export default function Product({ access, itemData }) {
  const router = useRouter();

  const [itemID, setitemID] = useState(itemData.prod_id);
  const [itemType, setitemType] = useState(itemData.item_type);
  const [itemName, setitemName] = useState(itemData.item_name);
  const [itemDescription, setitemDescription] = useState(
    itemData.item_description
  );
  const [itemUnit, setitemUnit] = useState(itemData.item_unit);
  const [itemParchasePrice, setitemParchasePrice] = useState(
    itemData.item_parchase_price
  );
  const [itemSalePrice, setitemSalePrice] = useState(itemData.item_sale_price);

  const itemSlug = itemName.replaceAll(" ", "-");

  const updateProduct = async () => {
    const prodId = itemData.id;

    try {
      const res = await fetch("/api/products/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          prodId,
          itemID,
          itemType,
          itemName,
          itemDescription,
          itemUnit,
          itemParchasePrice,
          itemSalePrice,
          itemSlug,
        }),
      });

      if (res.status === 200) {
        console.log("saved product changes");

        router.push("/products");
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

  const deleteProduct = async () => {
    const prodId = itemData.id;

    fetch("/api/products/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify({
        prodId,
      }),
    });

    router.push("/products");
  };

  return (
    <>
      <Head>
        <title>Product | Basic Books</title>
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
              <h2 className="text-xl font-bold">Product #{itemData.prod_id}</h2>
              <Link
                href="/products/new-product"
                className="px-4 py-0.5 bg-[#FF6D6D] text-white font-semibold text-lg"
              >
                <small className="text-xl">+</small> NEW
              </Link>
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
                <div className="flex flex-wrap mb-5">
                  <div className="flex items-center mr-4">
                    <input
                      id="goods"
                      type="radio"
                      name="itemtype"
                      value="Goods"
                      checked={itemType === "Goods"}
                      onChange={(e) => setitemType(e.target.value)}
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
                      checked={itemType === "Service"}
                      onChange={(e) => setitemType(e.target.value)}
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
                />
                <input
                  className="block border border-grey-light w-[500px] p-1 rounded  mb-3"
                  type="text"
                  placeholder="product description"
                  value={itemDescription}
                  onChange={(e) => setitemDescription(e.target.value)}
                />
                <input
                  className="block border border-grey-light w-[500px] p-1 rounded  mb-3"
                  type="text"
                  placeholder="ex: kg ml"
                  value={itemUnit}
                  onChange={(e) => setitemUnit(e.target.value)}
                />
                <input
                  className="block border border-grey-light w-[500px] p-1 rounded  mb-3"
                  type="number"
                  placeholder="item parchase price"
                  value={itemParchasePrice}
                  onChange={(e) => setitemParchasePrice(e.target.value)}
                />
                <input
                  className="block border border-grey-light w-[500px] p-1 rounded  mb-5"
                  type="number"
                  placeholder="item sale price"
                  value={itemSalePrice}
                  onChange={(e) => setitemSalePrice(e.target.value)}
                />
                <button
                  onClick={updateProduct}
                  className="w-full text-center py-3 rounded bg-[#F0FF42] font-bold text-black hover:bg-[#eaff08] my-1"
                >
                  Update
                </button>
                <button
                  onClick={deleteProduct}
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
  const product = params.product;

  if (!access) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const productData = await fetch(process.env.PRODUCTS_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  const itemData = await productData.find((item) => {
    return item.id === product;
  });

  if (itemData == undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      itemData,
      access,
    },
  };
}
