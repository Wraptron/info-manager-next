"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { $infos, $currentEditInfo, Info } from "@/stores/infostore";
import { useStore } from "@nanostores/react";
import { v4 as uuidv4 } from "uuid";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddInfoPage() {
  const router = useRouter();
  const infos = useStore($infos);
  const editInfo = useStore($currentEditInfo);

  const [form, setForm] = useState<Partial<Info>>({
    type: "task",
    status: "backlog",
  });

  useEffect(() => {
    if (editInfo) {
      setForm(editInfo);
    }
  }, [editInfo]);

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.project)
      return alert("Name and Project are required!");

    if (editInfo) {
      // update existing
      const updated = infos.map((i) =>
        i.id === editInfo.id ? ({ ...editInfo, ...form } as Info) : i
      );
      $infos.set(updated);
      $currentEditInfo.set(null); // clear after update
    } else {
      // add new
      const newInfo: Info = {
        id: uuidv4(),
        name: form.name!,
        project: form.project!,
        type: form.type as Info["type"],
        plannedDate: form.plannedDate || "",
        person: form.person || "",
        actionItem: form.actionItem || "",
        estimatedTime: form.estimatedTime || "",
        status: form.status as Info["status"],
      };
      $infos.set([...infos, newInfo]);
    }

    setForm({ type: "task", status: "backlog" });
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{editInfo ? "Edit Info" : "Add Info"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <Input
              placeholder="Info Name"
              value={form.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
            <Input
              placeholder="Project"
              value={form.project || ""}
              onChange={(e) => handleChange("project", e.target.value)}
              required
            />

            <Select
              value={form.type}
              onValueChange={(val) => handleChange("type", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="task">Task</SelectItem>
                <SelectItem value="note">Note</SelectItem>
                <SelectItem value="event">Event</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
              value={form.plannedDate || ""}
              onChange={(e) => handleChange("plannedDate", e.target.value)}
            />
            <Input
              placeholder="Person"
              value={form.person || ""}
              onChange={(e) => handleChange("person", e.target.value)}
            />
            <Input
              placeholder="Action Item"
              value={form.actionItem || ""}
              onChange={(e) => handleChange("actionItem", e.target.value)}
            />
            <Input
              placeholder="Estimated Time"
              value={form.estimatedTime || ""}
              onChange={(e) => handleChange("estimatedTime", e.target.value)}
            />

            <Select
              value={form.status}
              onValueChange={(val) => handleChange("status", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="backlog">Backlog</SelectItem>
                <SelectItem value="todo">To-Do</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit" className="w-full">
              {editInfo ? "Update Info" : "Add Info"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
