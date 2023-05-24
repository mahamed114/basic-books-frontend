import { parseCookies } from "../../../helpers";

export default async (req, res) => {
  const { access } = parseCookies(req);

  if (req.method === "POST") {
    const {
      incomeCustomer,
      incomeProduct,
      incomeID,
      incomeType,
      incomeQuantity,
      incomeAmount,
      incomeTax,
      incomeDate,
    } = req.body;

    try {
      const apiRes = await fetch(
        `${process.env.INCOME_ADD_API}${incomeProduct}&customer=${incomeCustomer}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
          body: JSON.stringify({
            income_customer: incomeCustomer,
            income_product: incomeProduct,
            income_id: incomeID,
            created_at: incomeDate,
            income_type: incomeType,
            quantity: incomeQuantity,
            amount: incomeAmount,
            tax: incomeTax,
          }),
        }
      );

      const data = await apiRes.json();
      console.log(`APIRES ${data}`);

      if (apiRes.status === 201) {
        return res.status(201).json({
          message: "added income successfully.",
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
