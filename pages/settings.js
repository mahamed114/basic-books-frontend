import { useState } from "react";
import { useRouter } from "next/router";

import { parseCookies } from "../helpers";
import Layout from "../components/Layout";

export default function Settings({ access, userData, membersData }) {
  const router = useRouter();

  const [name, setName] = useState(userData.organisation_name);
  const [country, setCountry] = useState(userData.organisation_country);
  const [address, setAddress] = useState(userData.organisation_address);
  const [phone, setPhone] = useState(userData.organisation_phone);
  const [email, setEmail] = useState(userData.organisation_email);
  const [currency, setCurrency] = useState(userData.default_currency);
  const [ownerName, setownerName] = useState(userData.owner_name);
  const [ownerEmail] = useState(userData.email);
  const [ownerMobile, setownerMobile] = useState(userData.owner_mobile);

  const [showBusiness, setshowBusiness] = useState(true);
  const [newMemberEmail, setnewMemberEmail] = useState("");
  const [newMemberName, setnewMemberName] = useState("");

  const updateOrg = async () => {
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          ownerEmail,
          ownerName,
          ownerMobile,
          name,
          country,
          address,
          phone,
          email,
          currency,
        }),
      });

      if (res.status === 200) {
        console.log("Updated Changes");

        router.push("/");
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

  const inviteMember = async () => {
    const finalnewMemberEmail = newMemberEmail.replaceAll(" ", "-");

    try {
      const res = await fetch("/api/auth/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          finalnewMemberEmail,
          newMemberName,
        }),
      });

      console.log(res.status);
      if (res.status === 200) {
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

  return (
    <Layout>
      <div className="flex">
        <button
          onClick={() => setshowBusiness(true)}
          className="ml-56 text-2xl text-blue-700 font-bold"
        >
          Account
        </button>
        <button
          onClick={() => setshowBusiness(false)}
          className="ml-8 text-2xl text-black-700 font-bold"
        >
          Members
        </button>
      </div>

      {showBusiness ? (
        <div className="flex">
          <div className="ml-6 mt-2">
            <h2 className="text-2xl mb-8">Account</h2>

            <label htmlFor="name">Business Name</label>
            <input
              id="name"
              type="text"
              className="block border border-grey-light w-64 p-1.5 rounded mb-4"
              name="name"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email">Business Email</label>
            <input
              id="email"
              type="email"
              className="block border border-grey-light w-64 p-1.5 rounded mb-4"
              name="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="country">Business Phone</label>
            <input
              id="country"
              type="phone"
              className="block border border-grey-light w-48 p-1.5 rounded mb-4"
              name="country"
              placeholder=""
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label htmlFor="country">Business Country</label>
            <input
              id="country"
              type="text"
              className="block border border-grey-light w-48 p-1.5 rounded mb-4"
              name="country"
              placeholder=""
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />

            <label htmlFor="address">Business Address</label>
            <input
              id="address"
              type="address"
              className="block border border-grey-light w-72 p-1.5 rounded mb-4"
              name="address"
              placeholder=""
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <label htmlFor="currency">Default Currency</label>
            <input
              id="currency"
              type="address"
              className="block border border-grey-light w-36 p-1.5 rounded"
              name="currency"
              placeholder="3 chars currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
          </div>
          <div className="ml-32 mt-16">
            <label htmlFor="ownername">Your Name</label>
            <input
              id="ownername"
              type="text"
              className="block border border-grey-light w-64 p-1.5 rounded mb-4"
              name="ownername"
              placeholder=""
              value={ownerName}
              onChange={(e) => setownerName(e.target.value)}
            />

            <label htmlFor="owneremail">Your Email</label>
            <input
              id="owneremail"
              type="email"
              className="block border border-grey-light w-64 p-1.5 rounded mb-4"
              name="owneremail"
              placeholder=""
              value={ownerEmail}
              readOnly
            />

            <label htmlFor="ownermobile">Your Mobile</label>
            <input
              id="ownermobile"
              type="phone"
              className="block border border-grey-light w-64 p-1.5 rounded mb-4"
              name="ownermobile"
              placeholder=""
              value={ownerMobile}
              onChange={(e) => setownerMobile(e.target.value)}
            />

            <button
              onClick={updateOrg}
              className="px-10 py-1.5 bg-[#57C4E5] text-white font-semibold text-lg"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="ml-6 mt-2">
          <div className="mb-8">
            <h1 className="text-2xl mb-1">Your Members</h1>
            {membersData.map((employee) => {
              return (
                <div
                  key={employee.id}
                  className="flex flex-col min-w-fit mb-4 mx-auto px-4 w-[1000px] text-[#57C4E5] font-bold"
                >
                  <h3>{employee.employee_user_email}</h3>
                  <h3 className="">{employee.employee_name}</h3>
                </div>
              );
            })}
          </div>

          <h2 className="text-2xl mb-1">Add new member</h2>
          <h4 className="mb-8 font-bold">
            We&apos;ll send invite email to your employee.
          </h4>

          <form onSubmit={inviteMember}>
            <input
              type="email"
              className="block border border-grey-light w-64 p-1.5 rounded mb-4"
              name="email"
              placeholder="New memeber email"
              value={newMemberEmail}
              required
              onChange={(e) => setnewMemberEmail(e.target.value)}
            />
            <input
              type="text"
              className="block border border-grey-light w-64 p-1.5 rounded mb-4"
              name="name"
              placeholder="New member name"
              value={newMemberName}
              required
              onChange={(e) => setnewMemberName(e.target.value)}
            />

            <button
              type="submit"
              className="px-10 py-1.5 bg-[#57C4E5] text-white font-semibold text-lg"
            >
              Invite
            </button>
          </form>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { access } = parseCookies(req);

  if (!access) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const userData = await fetch(process.env.PROFILE_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  const membersData = await fetch(process.env.EMPLOYEES_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  return {
    props: {
      access,
      userData,
      membersData,
    },
  };
}
