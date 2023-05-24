import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, otp } = req.body;

    const body = JSON.stringify({
      email,
      otp,
    });

    try {
      const apiRes = await fetch(process.env.VERIFY_API, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await apiRes.json();

      if (apiRes.status === 200) {
        res.setHeader("Set-Cookie", [
          cookie.serialize("access", data.data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 14,
            sameSite: "strict",
            path: "/",
          }),
        ]);

        return res.status(200).json({
          message: "Logged in successfully",
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
