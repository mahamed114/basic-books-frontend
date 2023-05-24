import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");

  const [otpDisabled, setotpDisabled] = useState(true);
  const [showInfo, setshowInfo] = useState(false);

  const sendOTPMethod = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      email,
    });

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 200) {
        console.log("we've sent otp code to your email");
        setotpDisabled(false);
        setshowInfo(true);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

  const signInMethod = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      email,
      otp,
    });

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 200) {
        console.log("Logged in successfully");

        router.push("/");
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

  return (
    <>
      <Head>
        <title>Signin | Basic Books</title>
        <meta
          name="description"
          content="Basic Books let's you manage your business. add inventory and track income and expenses, work with your team and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Sign In</h1>
              <form onSubmit={otpDisabled ? sendOTPMethod : signInMethod}>
                <input
                  type="email"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="otp"
                  placeholder="OTP Code"
                  required
                  maxLength={4}
                  disabled={otpDisabled}
                  onChange={(e) => setOTP(e.target.value)}
                />

                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-[#F0FF42] font-bold text-black hover:bg-[#eaff08] my-1"
                >
                  {otpDisabled ? "Continue" : "Sign In"}
                </button>
              </form>

              <div className="text-grey-dark mt-6 text-base text-center">
                Don&apos;t have an account? &nbsp;
                <Link href="/signup" className="no-underline text-blue-700">
                  Create Now
                </Link>
              </div>

              <div
                className="text-center mt-6 ml-4 w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow space-x dark:bg-blue-800"
                style={{
                  display: showInfo ? "block" : "none",
                }}
                role="alert"
              >
                <div className=" text-sm font-bold text-white ">
                  We&apos;ve sent OTP Code to your email! Enter to sign in.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
