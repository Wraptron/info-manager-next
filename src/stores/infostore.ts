"use client";
import { atom } from "nanostores";

export type InfoType = "task" | "note" | "event";
export type StatusType =
  | "backlog"
  | "todo"
  | "inprogress"
  | "done"
  | "cancelled";

export interface Info {
  id: string;
  name: string;
  project: string;
  type: InfoType;
  plannedDate: string;
  person: string;
  actionItem: string;
  estimatedTime: string;
  status: StatusType;
}

export const $infos = atom<Info[]>([]);
export const $currentEditInfo = atom<Info | null>(null);
