import { Header, Sidebar } from "alurkerja-ui";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Role, RoleContext } from "../context/RoleContext";
import { hrdMenuConfig, pegawaiMenuConfig } from "../menuConfig";

const storageRole = localStorage.getItem("role") || "Pegawai";

export function Layout() {
    const [role, setRole] = useState<Role>(storageRole as Role);
    const [toggled, setToggled] = useState(false);

    const menuConfig = role === "Pegawai" ? pegawaiMenuConfig : hrdMenuConfig;

    function handleClickAvatar() {
        const newRole = role === "Pegawai" ? "HRD" : "Pegawai";

        localStorage.setItem("role", newRole);
        setRole(newRole);
    }

    return (
        <RoleContext.Provider value={role as Role}>
            <div className="flex">
                <Sidebar
                    menuConfig={menuConfig}
                    toggled={toggled}
                    setToggled={setToggled}
                />
                <div className="flex-grow bg-slate-50 min-h-full">
                    <Header role={role} onClickAvatar={handleClickAvatar} />
                    <main className="p-4">
                        <Outlet />
                    </main>
                </div>
            </div>
        </RoleContext.Provider>
    );
}
