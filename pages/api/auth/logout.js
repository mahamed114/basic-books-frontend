export default async (req, res) => {
  if (req.method === "POST") {
    await res.setHeader(
      "Set-Cookie",
      "access=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );

    return res.status(200).json({
      success: "Successfully logged out",
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      error: `Method ${req.method} now allowed`,
    });
  }
};
