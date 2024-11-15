import { TableLowcode } from "alurkerja-ui";
import { useState } from "react";
import { useArtikelList } from "../api/artikel";

export function ArtikelTable() {
    const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 });
    const [renderState, setRenderState] = useState(0);
    const [search, setSearch] = useState<string | undefined>("tes");

    const { data, isPending } = useArtikelList();

    if (isPending) {
        return <div>Loading...</div>;
    }

    return (
        <TableLowcode
            baseUrl="https://alurkerja-starter.alurkerja.com"
            spec={{
                show_as_menu: false,
                base_url: "",
                name: "",
                can_bulk: false,
                can_create: true,
                can_delete: true,
                can_edit: true,
                can_detail: true,
                path: "/crud/artikel",
                is_bpmn: false,
                is_usertask: false,
                label: "",
                description: "",
                header_action: [
                    {
                        label: "Tambah",
                        action_label: "Tambah",
                        method: "post",
                        form_type: "new_page",
                        path: "/artikel/create",
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
                        path: "/artikel/{id}",
                        icon: "eye",
                        type: "primary",
                    },
                    {
                        label: "Edit",
                        action_label: "Edit",
                        method: "put",
                        form_type: "new_page",
                        path: `/artikel/{id}/edit`,
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
                        path: `/crud/artikel/{id}`,
                        icon: "trash",
                        type: "danger",
                    },
                ],
                fields: {},
            }}
            column={[
                {
                    label: "Name",
                    key: "name",
                },
                {
                    label: "Deskripsi",
                    key: "description",
                },
            ]}
            data={data.content}
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
