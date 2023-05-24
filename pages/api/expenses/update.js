import { parseCookies } from "../../../helpers";

export default async (req, res) => {
  const { access } = parseCookies(req);

  if (req.method === "PUT") {
    const {
      expensesUUID,
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
        `${process.env.EXPENSES_API}${expensesUUID}/`,
        {
          method: "PUT",
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

      if (apiRes.status === 200) {
        return res.status(200).json({
          message: "Expense Updated successfully.",
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
