import { parseCookies } from "../../../helpers";

export default async (req, res) => {
  const { access } = parseCookies(req);

  if (req.method === "POST") {
    const {
      expensesID,
      expensesType,
      expensesQuantity,
      expensesVendor,
      expensesProduct,
      expensesAmount,
      expensesTax,
      expensesDate,
    } = req.body;

    try {
      const apiRes = await fetch(
        `${process.env.EXPENSES_ADD_API}${expensesProduct}&vendor=${expensesVendor}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
          body: JSON.stringify({
            expense_id: expensesID,
            expense_type: expensesType,
            quantity: expensesQuantity,
            expenses_vendor: expensesVendor,
            expenses_product: expensesProduct,
            amount: expensesAmount,
            tax: expensesTax,
            created_at: expensesDate,
          }),
        }
      );

      if (apiRes.status === 201) {
        return res.status(201).json({
          message: "added expenses successfully.",
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
