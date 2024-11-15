import { TableLowcode } from "alurkerja-ui";
import { useState } from "react";
import { useCutiList } from "../api/cuti";

export function CutiTable() {
    const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 });
    const [renderState, setRenderState] = useState(0);
    const [search, setSearch] = useState<string | undefined>("tes");

    const { data, isPending } = useCutiList();

    if (isPending) {
        return <div>Loading...</div>;
    }

    return (
        <TableLowcode
            baseUrl="https://alurkerja-starter.alurkerja.com"
            spec={{
                show_as_menu: false,
                base_url: "", // Hapus jika tidak diperlukan
                name: "Cuti",
                can_bulk: true,
                can_create: true,
                can_delete: true,
                can_edit: true,
                can_detail: true,
                path: "/bpmn/Cuti",
                is_bpmn: true,
                is_usertask: false,
                label: "Cuti Table",
                description: "Daftar Pengajuan Cuti",
                header_action: [
                    {
                        label: "Tambah",
                        action_label: "Tambah",
                        method: "post",
                        form_type: "new_page",
                        path: "/cuti/create",
                        icon: "plus",
                        type: "primary",
                    },
                ],
                field_action: [
                    {
                        label: "Detail",
                        action_label: "Detail",
                        method: "get",
                        form_type: "new_page",
                        path: "/cuti/{id}",
                        icon: "eye",
                        type: "primary",
                    },
                    {
                        label: "Edit",
                        action_label: "Edit",
                        method: "put",
                        form_type: "new_page",
                        path: `/cuti/{id}/edit`,
                        icon: "edit",
                        type: "primary",
                    },
                    {
                        label: "Hapus",
                        action_label: "Hapus",
                        method: "delete",
                        form_type: "confirm_modal",
                        confirm: {
                            title: "Hapus",
                            message: "Apakah anda yakin ingin menghapus data ini?",
                            confirm_text: "Ya",
                            cancel_text: "Tidak",
                        },
                        path: `/bpmn/Cuti/{id}`,
                        icon: "trash",
                        type: "danger",
                    },
                ],
                fields: {}, // Sesuaikan jika ada field tambahan yang diperlukan
            }}
            column={[
                {
                    label: "Name",
                    key: "name",
                },
                {
                    label: "Reason",
                    key: "reason",
                },
            ]}
            data={data.content} // Pastikan data.content sesuai dengan format yang dibutuhkan
            renderState={renderState}
            setRenderState={setRenderState}
            pageConfig={pageConfig}
            setPageConfig={setPageConfig}
            search={search}
            setSearch={setSearch}
            canFilter={false}
        />
    );
}

export function CutiCreate() {
    return <div>Tambah Cuti</div>;
}
