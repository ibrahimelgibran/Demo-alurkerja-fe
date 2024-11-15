import { RouteObject } from "react-router-dom";
import { CutiTable } from "./feature/CutiTable";
// import { CutiCreate } from "./feature/CutiCreate";
import { RoleGate } from "./feature/RoleGate";
import { Layout } from "./feature/Layout";
// import { CutiDetail } from "./feature/CutiDetail";
// import { KonfirmasiCutiTable } from "./feature/KonfirmasiCutiTable";
// import { KonfirmasiCutiDetail } from "./feature/KonfirmasiCutiDetail";
// import { KonfirmasiCutiEdit } from "./feature/KonfirmasiCutiEdit";
import { ArtikelTable } from "./feature/ArtikelTable";
import { ArtikelCreate } from "./feature/ArtikelCreate";
import { ArtikelDetail } from "./feature/ArtikelDetail";
import { ArtikelEdit } from "./feature/ArtikelEdit";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        errorElement: <div>404</div>,
        children: [
            {
                index: true,
                element: <div>Selamat Datang</div>,
            },
            {
                path: "cuti",
                children: [
                    {
                        index: true,
                        element: (
                            <RoleGate allowed="Pegawai">
                                <CutiTable />
                            </RoleGate>
                        ),
                    },
                    // {
                    //     path: "create",
                    //     element: (
                    //         <RoleGate allowed="Pegawai">
                    //             <CutiCreate />
                    //         </RoleGate>
                    //     ),
                    // },
                    // {
                    //     path: ":id",
                    //     element: (
                    //         <RoleGate allowed="Pegawai">
                    //             <CutiDetail />
                    //         </RoleGate>
                    //     ),
                    // },
                ],
            },
            {
                path: "konfirmasi-cuti",
                children: [
                    // {
                    //     index: true,
                    //     element: (
                    //         <RoleGate allowed="HRD">
                    //             <KonfirmasiCutiTable />
                    //         </RoleGate>
                    //     ),
                    // },
                    // {
                    //     path: ":id",
                    //     element: (
                    //         <RoleGate allowed="HRD">
                    //             <KonfirmasiCutiDetail />
                    //         </RoleGate>
                    //     ),
                    // },
                    // {
                    //     path: ":id/edit",
                    //     element: (
                    //         <RoleGate allowed="HRD">
                    //             <KonfirmasiCutiEdit />
                    //         </RoleGate>
                    //     ),
                    // },
                ],
            },
            {
                path: "artikel",
                children: [
                    {
                        index: true,
                        element: <ArtikelTable />,
                    },
                    {
                        path: "create",
                        element: <ArtikelCreate />,
                    },
                    {
                        path: ":id",
                        element: <ArtikelDetail />,
                    },
                    {
                        path: ":id/edit",
                        element: <ArtikelEdit />,
                    },
                ],
            },
        ],
    },
];
