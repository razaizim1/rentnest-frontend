"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { IProperty } from "@/lib/types";
import { EditPropertyForm } from "./EditPropertyForm";

type Category = {
    id: string;
    name: string;
};

type EditPropertyDialogProps = {
    property: IProperty;
    categories: Category[];
};

export function EditPropertyDialog({
    property,
    categories,
}: EditPropertyDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>
                        Edit Property
                    </DialogTitle>
                </DialogHeader>

                <EditPropertyForm
                    property={property}
                    categories={categories}
                    onSuccess={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}