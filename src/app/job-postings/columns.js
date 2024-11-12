"use client";

import { ColumnDef } from "@tanstack/react-table";

// Define the column structure for the job postings table
export const columns = [
  {
    accessorKey: "title",
    header: "Job Title",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "datePosted",
    header: "Date Posted",
  },
];