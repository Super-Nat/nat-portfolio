"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export type ProjectColumn = {
  id: string;
  title: string;
  is_published: boolean;
};

export const projectColumns = (
  onDelete: (id: string) => void,
): ColumnDef<ProjectColumn>[] => [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "is_published",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.is_published ? "default" : "secondary"}>
        {row.original.is_published ? "Published" : "Draft"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button variant="ghost" size="icon">
          <Link href={`/admin/projects/${row.original.id}`}>
            <Pencil className="w-4 h-4" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(row.original.id)}
        >
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      </div>
    ),
  },
];
