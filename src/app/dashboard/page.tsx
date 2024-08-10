"use client";

import { columns, DataTable } from "./_components";

export default function Dashboard() {

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns}  />
    </div>
  );
}
