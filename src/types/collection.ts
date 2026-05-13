export interface CreateProps {
  table: string;
  data: Record<string, unknown>;
}

export interface UpdateProps extends CreateProps {
  id: string;
}

export interface DeleteProps extends Pick<UpdateProps, "id" | "table"> {}

export interface CollectionCallbacks {
  updateCollection: ({
    id,
    data,
  }: {
    id: string;
    data: Record<string, unknown>;
  }) => void;
  createCollection: (data: Record<string, unknown>) => void;
}
