import { parseCookies } from "../../../helpers";

export default async (req, res) => {
  const { access } = parseCookies(req);

  if (req.method === "PUT") {
    const {
      venID,
      vendorID,
      vendorName,
      vendorEmail,
      vendorMobile,
      vendorCompany,
      vendorSlug,
    } = req.body;

    try {
      const apiRes = await fetch(`${process.env.VENDORS_API}${venID}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          ven_id: vendorID,
          ven_name: vendorName,
          ven_email: vendorEmail,
          ven_mobile: vendorMobile,
          ven_company: vendorCompany,
          ven_slug: vendorSlug,
        }),
      });

      const data = await apiRes.json();
      console.log(`APIRES ${data}`);

      if (apiRes.status === 200) {
        return res.status(200).json({
          message: "vendor Updated successfully.",
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
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).json({ error: `Method ${req.method} now allowed` });
  }
};
