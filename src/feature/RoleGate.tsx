import { useContext } from "react";
import { Role, RoleContext } from "../context/RoleContext";

interface RoleGateProps {
    allowed: Role;
    children: React.ReactNode;
}
export function RoleGate({ allowed, children }: RoleGateProps) {
    const role = useContext(RoleContext);

    if (role !== allowed) {
        return <div>Dilarang Masuk</div>;
    }

    return <>{children}</>;
}
