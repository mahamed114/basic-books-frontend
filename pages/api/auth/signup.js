export default async (req, res) => {
  if (req.method === "POST") {
    const { email, name } = req.body;

    try {
      const apiRes = await fetch(process.env.SIGNUP_API, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          organisation_name: name,
        }),
      });

      const data = await apiRes.json();

      if (apiRes.status === 201) {
        return res.status(201).json({
          message: "User Created successfully check email to signin.",
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
