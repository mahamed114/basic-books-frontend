import { parseCookies } from "../../../helpers";

export default async (req, res) => {
  const { access } = parseCookies(req);

  if (req.method === "POST") {
    const { finalnewMemberEmail, newMemberName } = req.body;

    try {
      const apiRes = await fetch(
        `${process.env.EMPLOYEES_API}?employee_email=${finalnewMemberEmail}&employee_name=${newMemberName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const data = await apiRes.json();
      console.log(data);

      if (apiRes.status === 200) {
        return res.status(200).json({
          message: "User invited successfully.",
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
