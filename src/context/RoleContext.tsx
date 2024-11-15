import { createContext } from "react";

export type Role = "Pegawai" | "HRD";
export const RoleContext = createContext<Role>("Pegawai");
