import { parseCookies } from "../../../helpers";

export default async (req, res) => {
  const { access } = parseCookies(req);

  if (req.method === "POST") {
    const {
      itemID,
      itemType,
      itemName,
      itemUnit,
      itemDescription,
      itemParchasePrice,
      itemSalePrice,
      itemSlug,
    } = req.body;

    try {
      const apiRes = await fetch(`${process.env.PRODUCTS_API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          prod_id: itemID,
          item_type: itemType,
          item_unit: itemUnit,
          item_name: itemName,
          item_description: itemDescription,
          item_parchase_price: itemParchasePrice,
          item_sale_price: itemSalePrice,
          item_slug: itemSlug,
        }),
      });

      const data = await apiRes.json();
      console.log(`APIRES ${data}`);

      if (apiRes.status === 200) {
        return res.status(200).json({
          message: "added product successfully.",
        });
      } else {
        return res.status(400).json({
          message: "Something Went Wrong",
        });
      }
    } catch (err) {
      console.log(`CATCH SERVER ${err}`);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} now allowed` });
  }
};
