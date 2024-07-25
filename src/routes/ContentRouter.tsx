import { useContext, useState } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { ListaViajes } from "../page/ListaViajes";
import TonelMaterialHora from "../page/TonelMaterialHora";
import DiferenciaTonelaje from "../page/DiferenciaTonelaje";
import { NavBar } from "../components/navbar/NavBar";
import { SideBar } from "../components/sidebar/SideBar";
import TonelajeTurno from "../page/TonelajeTurno";

const Verified = () => {

  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);


  return (

    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh" }}>
      <div style={{ width: "100%", height: "3rem", position: "fixed" }}>
        <NavBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      </div>

      <div
        style={{
          display: "flex",
          overflow: "hidden",
          height: "94.5%",
          width: "100%",
          paddingTop: "3rem",
        }}
      >
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div
          style={{
            width: "100%",
            overflow: "hidden",
            backgroundColor: "#fff",
            height: "100%",
            overflowY:"scroll",
            overflowX:"scroll"
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>

  );
};

export const ContentRouter = () => {

  return (
    <>
      <Routes>
        <Route path="/home" element={<Verified />}>

          <Route path="viajes" element={<ListaViajes />} />
          <Route path="tonelajeByMaterial" element={<TonelMaterialHora />} />
          <Route path="DiferTonelaje" element={<DiferenciaTonelaje />} />
          <Route path="TonelajeTurno" element={<TonelajeTurno />} />

        </Route>
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </>
  );
};
