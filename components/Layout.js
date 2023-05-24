import HeaderComponent from "./HeaderComponent";
import SidebarComponent from "./SidebarComponent";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <SidebarComponent />
      <div className="grid grid-rows-2 gap-6">
        <HeaderComponent />
        <div style={{ marginLeft: "202px", marginTop: "50px" }}>{children}</div>
      </div>
    </div>
  );
}
