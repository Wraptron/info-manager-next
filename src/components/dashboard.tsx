"use client";

import { useStore } from "@nanostores/react";
import { $infos, type Info } from "@/stores/infostore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  const infos = useStore($infos);
  const router = useRouter();

  // Type-safe states
  const [sortField, setSortField] = useState<keyof Info>("plannedDate");
  const [filterField, setFilterField] = useState<keyof Info>("status");
  const [filterValue, setFilterValue] = useState<string>("all");

  let data = [...infos];

  // Filtering
  if (filterValue !== "all") {
    data = data.filter((info) => info[filterField] === filterValue);
  }

  // Sorting
  data.sort((a, b) => {
    const valA = a[sortField] ?? "";
    const valB = b[sortField] ?? "";
    if (valA < valB) return -1;
    if (valA > valB) return 1;
    return 0;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Controls */}
      <div className="flex gap-4 items-center">
        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by:</span>
          <Select
            onValueChange={(val) => setSortField(val as keyof Info)}
            defaultValue="plannedDate"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="project">Project</SelectItem>
              <SelectItem value="type">Type</SelectItem>
              <SelectItem value="plannedDate">Planned Date</SelectItem>
              <SelectItem value="person">Person</SelectItem>
              <SelectItem value="actionItem">Action Item</SelectItem>
              <SelectItem value="estimatedTime">Estimated Time</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filter by:</span>
          <Select
            onValueChange={(val) => {
              setFilterField(val as keyof Info);
              setFilterValue("all"); // reset filter value
            }}
            defaultValue="status"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="project">Project</SelectItem>
              <SelectItem value="type">Type</SelectItem>
              <SelectItem value="plannedDate">Planned Date</SelectItem>
              <SelectItem value="person">Person</SelectItem>
              <SelectItem value="actionItem">Action Item</SelectItem>
              <SelectItem value="estimatedTime">Estimated Time</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter Value */}
          <Select
            onValueChange={(val) => setFilterValue(val)}
            value={filterValue}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {[...new Set(infos.map((i) => i[filterField]))].map((val) => (
                <SelectItem key={String(val)} value={String(val)}>
                  {String(val)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Planned Date</TableHead>
            <TableHead>Person</TableHead>
            <TableHead>Action Item</TableHead>
            <TableHead>Estimated Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((info) => (
            <TableRow
              key={info.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => router.push(`/add?id=${info.id}`)}
            >
              <TableCell>{info.name}</TableCell>
              <TableCell>{info.project}</TableCell>
              <TableCell>{info.type}</TableCell>
              <TableCell>{info.plannedDate}</TableCell>
              <TableCell>{info.person}</TableCell>
              <TableCell>{info.actionItem}</TableCell>
              <TableCell>{info.estimatedTime}</TableCell>
              <TableCell>{info.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
