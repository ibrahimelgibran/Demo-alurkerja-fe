import { useForm } from "react-hook-form";
import { useArtikelDetail } from "../api/artikel";
import { Link, useParams } from "react-router-dom";
import { Input } from "alurkerja-ui";

export function ArtikelDetail() {
    const { id } = useParams();
    const { data, isPending, error } = useArtikelDetail(id, {
        enabled: Boolean(id),
    });
    const { register } = useForm({
        values: data,
    });

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    return (
        <div className="flex flex-col gap-y-4">
            <div>
                <label htmlFor="name">Nama</label>
                <Input id="name" {...register("name")} disabled />
            </div>

            <div>
                <label htmlFor="reason">Alasan</label>
                <Input id="reason" {...register("description")} textArea disabled />
            </div>

            <Link to=".." className="w-fit">
                Kembali
            </Link>
        </div>
    );
}
