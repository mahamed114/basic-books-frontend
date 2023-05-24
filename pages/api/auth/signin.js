export default async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;

    const body = JSON.stringify({
      email,
    });

    try {
      const apiRes = await fetch(process.env.SIGNIN_API, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await apiRes.json();

      if (apiRes.status === 200) {
        return res.status(200).json({
          message: "OTP sent successfully check email!",
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
