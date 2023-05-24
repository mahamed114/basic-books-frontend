import { parseCookies } from "../../../helpers";

export default async (req, res) => {
  const { access } = parseCookies(req);

  if (req.method === "DELETE") {
    const { prodId } = req.body;

    try {
      const apiRes = await fetch(`${process.env.PRODUCTS_API}${prodId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
          body: {},
        },
      });

      const data = await apiRes.json();

      console.log(`apiRes.status ${apiRes.status}`);

      if (apiRes.status === 200) {
        return res.status(200).json({
          message: "Product Deleted successfully.",
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
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).json({ error: `Method ${req.method} now allowed` });
  }
};
