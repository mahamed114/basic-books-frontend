import { parseCookies } from "../helpers";
import HeaderComponent from "../components/HeaderComponent";
import SidebarComponent from "../components/SidebarComponent";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="flex">
        <SidebarComponent />
        <div className="grid grid-rows-2 gap-6">
          <HeaderComponent />
          <div style={{ marginLeft: "220px", marginTop: "60px" }}>
            <h2 className="font-bold text-3xl text-blue-900">
              Coming Features:
            </h2>
            <h3 className="font-bold text-2xl">1. Invoices</h3>
            <h3 className="font-bold text-2xl">2. Reports</h3>
            <h3 className="font-bold text-2xl">3. Much More</h3>

            <h4 className="mt-10 font-bold">
              To request a feature or send bug contact us at:
              <Link
                href="mailto:support@basicbooks.com"
                className="text-blue-900"
              >
                &nbsp; Support@basicbooks.com
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </>
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

  return {
    props: {},
  };
}
