import { Button, Input } from "alurkerja-ui";
import { useForm } from "react-hook-form";
import { useCutiCreate } from "../api/cuti";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

const cutiCreateFormSchema = z.object({
    name: z.string().min(1, { message: "Nama wajib diisi" }),
    reason: z.string().min(1, { message: "Alasan wajib diisi" }),
});
type CutiCreateFormSchema = z.infer<typeof cutiCreateFormSchema>;

export function CutiCreate() {
    const { mutate, isPending, error } = useCutiCreate();
    const { register, handleSubmit, formState } = useForm<CutiCreateFormSchema>({
        resolver: zodResolver(cutiCreateFormSchema),
    });

    const nameError = formState.errors["name"];
    const reasonError = formState.errors["reason"];

    function handleCreateCuti(values: CutiCreateFormSchema) {
        mutate(values);
    }

    return (
        <form
            onSubmit={handleSubmit(handleCreateCuti)}
            className="flex flex-col gap-y-4"
        >
            <div>
                <label htmlFor="name">Nama</label>
                <Input id="name" {...register("name")} />
                {nameError && <p>{nameError.message}</p>}
            </div>

            <div>
                <label htmlFor="reason">Alasan</label>
                <Input id="reason" {...register("reason")} />
                {reasonError && <p>{reasonError.message}</p>}
            </div>

            <div>
                <Link to=".." className="w-fit">Kembali</Link>
                <Button loading={isPending}>Kirim</Button>
            </div>

            {Boolean(error) && <p>Error</p>}
        </form>
    );
}