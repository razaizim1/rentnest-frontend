"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { CreatePropertyForm } from "./CreatePropertyForm";

type Category = {
    id: string;
    name: string;
};

type CreatePropertyDialogProps = {
    categories: Category[];
};

export function CreatePropertyDialog({
    categories,
}: CreatePropertyDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Property
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>
                        Add New Property
                    </DialogTitle>
                </DialogHeader>

                <CreatePropertyForm
                    categories={categories}
                    onSuccess={() => {
                        setOpen(false);
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}