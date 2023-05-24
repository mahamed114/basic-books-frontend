import { parseCookies } from "../../../helpers";

export default async (req, res) => {
  const { access } = parseCookies(req);

  if (req.method === "DELETE") {
    const { venID } = req.body;

    try {
      const apiRes = await fetch(`${process.env.VENDORS_API}${venID}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
          body: {},
        },
      });

      if (apiRes.status === 204) {
        return res.status(204).json({
          message: "Vendor Deleted successfully.",
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
