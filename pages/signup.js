import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");

  const [otpDisabled, setotpDisabled] = useState(true);
  const [showInfo, setshowInfo] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      email,
      name,
    });

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 201) {
        console.log("user created successfuly check your email");
        setotpDisabled(false);
        setshowInfo(true);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

  const signUpVerify = async (e) => {
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
        <title>Signup | Basic Books</title>
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
              <h1 className="mb-8 text-3xl text-center">Create Account</h1>
              <form
                id="form"
                onSubmit={otpDisabled ? handleSignUp : signUpVerify}
              >
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="name"
                  placeholder="Business Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  value={email}
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
                  value={otp}
                  maxLength={4}
                  disabled={otpDisabled}
                  onChange={(e) => setOTP(e.target.value)}
                />

                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-[#F0FF42] font-bold text-black hover:bg-[#eaff08] my-1"
                >
                  {otpDisabled ? "Continue" : "Sign UP"}
                </button>
              </form>
              <div className="mt-8"></div>

              <div className="text-grey-dark mt-6 text-base text-center">
                Already have an account? &nbsp;
                <Link href="/signin" className="no-underline text-blue-700">
                  Sign In
                </Link>
              </div>

              <div
                style={{
                  display: showInfo ? "block" : "none",
                }}
                className="flex mt-6 ml-4 justify-center items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow space-x dark:bg-blue-800"
                role="alert"
              >
                <div className=" text-sm font-bold text-white">
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
