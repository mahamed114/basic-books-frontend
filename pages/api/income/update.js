import { parseCookies } from "../../../helpers";

export default async (req, res) => {
  const { access } = parseCookies(req);

  if (req.method === "PUT") {
    const {
      incomeUUID,
      incomeID,
      incomeType,
      incomeQuantity,
      incomeCustomer,
      incomeProduct,
      incomeAmount,
      incomeTax,
      incomeDate,
    } = req.body;

    try {
      const apiRes = await fetch(`${process.env.INCOME_API}${incomeUUID}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          income_id: incomeID,
          income_type: incomeType,
          quantity: incomeQuantity,
          income_customer: incomeCustomer,
          income_product: incomeProduct,
          amount: incomeAmount,
          tax: incomeTax,
          created_at: incomeDate,
        }),
      });

      const data = await apiRes.json();
      console.log(`APIRES ${data}`);

      if (apiRes.status === 200) {
        return res.status(200).json({
          message: "product Updated successfully.",
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
