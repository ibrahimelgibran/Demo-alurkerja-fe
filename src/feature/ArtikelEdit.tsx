import { useForm } from "react-hook-form";
import { useArtikelDetail, useArtikelEdit } from "../api/artikel";
import { Link, useParams } from "react-router-dom";
import { Button, Input } from "alurkerja-ui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const artikelEditFormSchema = z.object({
    name: z.string().min(1, { message: "Nama wajib diisi" }),
    description: z.string().min(1, { message: "Alasan wajib diisi" }),
});
type ArtikelEditFormSchema = z.infer<typeof artikelEditFormSchema>;

export function ArtikelEdit() {
    const { id } = useParams();
    const {
        data,
        isPending: isFetchingArtikel,
        error: detailError,
    } = useArtikelDetail(id, {
        enabled: Boolean(id),
    });
    const {
        mutate,
        isPending: isSubmitting,
        error: submitError,
    } = useArtikelEdit();

    const { register, handleSubmit } = useForm({
        resolver: zodResolver(artikelEditFormSchema),
        values: data,
    });

    function handleEdit(values: ArtikelEditFormSchema) {
        mutate(id!, values);
    }

    if (isFetchingArtikel) {
        return <div>Loading...</div>;
    }

    if (detailError || submitError) {
        return <div>Error</div>;
    }

    return (
        <div className="flex flex-col gap-y-4" onClick={handleSubmit(handleEdit)}>
            <div>
                <label htmlFor="name">Nama</label>
                <Input id="name" {...register("name")} />
            </div>

            <div>
                <label htmlFor="reason">Alasan</label>
                <Input id="reason" {...register("description")} textArea />
            </div>

            <div>
                <Link to=".." className="w-fit">
                    Kembali
                </Link>
                <Button loading={isSubmitting}>Kirim</Button>
            </div>

            {Boolean(submitError) && <p>Error</p>}
        </div>
    );
}
