import { parseCookies } from "../../../helpers";

export default async (req, res) => {
  const { access } = parseCookies(req);

  if (req.method === "DELETE") {
    const { cusID } = req.body;

    try {
      const apiRes = await fetch(`${process.env.CUSTOMERS_API}${cusID}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
          body: {},
        },
      });

      if (apiRes.status === 204) {
        return res.status(204).json({
          message: "Customer Deleted successfully.",
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
