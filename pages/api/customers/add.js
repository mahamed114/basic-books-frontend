import { parseCookies } from "../../../helpers";

export default async (req, res) => {
  const { access } = parseCookies(req);

  if (req.method === "POST") {
    const {
      customerID,
      customerType,
      customerName,
      customerEmail,
      customerMobile,
      customerCompany,
      customerSlug,
    } = req.body;

    try {
      const apiRes = await fetch(`${process.env.CUSTOMERS_API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          cus_id: customerID,
          cus_type: customerType,
          cus_name: customerName,
          cus_email: customerEmail,
          cus_mobile: customerMobile,
          cus_company: customerCompany,
          cus_slug: customerSlug,
        }),
      });

      const data = await apiRes.json();

      if (apiRes.status === 201) {
        return res.status(201).json({
          message: "added customer successfully.",
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
