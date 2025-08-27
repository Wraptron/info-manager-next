"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import Dashboard from "@/components/dashboard";

export default function Home() {
  const router = useRouter();
  const handleItemClick = (href: string) => {
    router.push(href);
  };

  return (
    <div>
      <div>
        <Dashboard />
      </div>
      <div className="flex m-4 gap-4">
        <Input
          className="h-16 text-lg px-4"
          type="Info"
          placeholder="Create an Info"
        />
        <Button
          className="h-16 w-16 px-6 text-lg"
          variant="outline"
          onClick={() => handleItemClick("/add")}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
