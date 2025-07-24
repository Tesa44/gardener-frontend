import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
}

export default AppLayout;
