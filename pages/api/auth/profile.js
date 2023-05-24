import { parseCookies } from "../../../helpers";

export default async (req, res) => {
  const { access } = parseCookies(req);

  if (req.method === "PUT") {
    const {
      ownerEmail,
      ownerName,
      ownerMobile,
      name,
      country,
      address,
      phone,
      email,
      currency,
    } = req.body;

    try {
      const apiRes = await fetch(process.env.PROFILE_API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          email: ownerEmail,
          owner_name: ownerName,
          owner_mobile: ownerMobile,
          organisation_name: name,
          organisation_country: country,
          organisation_address: address,
          organisation_phone: phone,
          organisation_email: email,
          default_currency: currency,
        }),
      });

      const data = await apiRes.json();

      if (apiRes.status === 200) {
        return res.status(200).json({
          message: "User Updated Changes successfully.",
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
