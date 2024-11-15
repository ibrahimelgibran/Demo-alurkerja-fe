import { Button, Input } from "alurkerja-ui";
import { useForm } from "react-hook-form";
import { useArtikelCreate } from "../api/artikel";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

const artikelCreateFormSchema = z.object({
    name: z.string().min(1, { message: "Nama wajib diisi" }),
    description: z.string().min(1, { message: "Alasan wajib diisi" }),
});
type ArtikelCreateFormSchema = z.infer<typeof artikelCreateFormSchema>;

export function ArtikelCreate() {
    const { mutate, isPending, error } = useArtikelCreate();
    const { register, handleSubmit, formState } =
        useForm<ArtikelCreateFormSchema>({
            resolver: zodResolver(artikelCreateFormSchema),
        });

    const nameError = formState.errors["name"];
    const reasonError = formState.errors["description"];

    function handleCreateArtikel(values: ArtikelCreateFormSchema) {
        mutate(values);
    }

    return (
        <form
            onSubmit={handleSubmit(handleCreateArtikel)}
            className="flex flex-col gap-y-4"
        >
            <div>
                <label htmlFor="name">Nama</label>
                <Input id="name" {...register("name")} />
                {nameError && <p>{nameError.message}</p>}
            </div>

            <div>
                <label htmlFor="reason">Deskripsi</label>
                <Input id="reason" {...register("description")} textArea />
                {reasonError && <p>{reasonError.message}</p>}
            </div>

            <div>
                <Link to=".." className="w-fit">
                    Kembali
                </Link>
                <Button loading={isPending}>Kirim</Button>
            </div>

            {Boolean(error) && <p>Error</p>}
        </form>
    );
}
