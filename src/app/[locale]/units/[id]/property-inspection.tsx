"use client";
import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { Unit as TUnit } from "@/services/types";

type Room = {
  room_type: string;
  room_score: string;
  inspections: Record<
    string,
    {
      status: string;
    }
  >;
};

type PropertyInspectionProps = {
  inspection?: {
    unit: TUnit;
    total_score: string;
    rooms: Array<Room>;
  } | null;
};

function getRoomType(roomType: string) {
  const formatted = roomType.toLowerCase().replaceAll(/[0-9]/g, "");
  switch (formatted) {
    case "kitchen": {
      return "kitchen";
    }
    case "bedroom": {
      return "bedroom";
    }
    case "bathroom": {
      return "bathroom";
    }
    default: {
      throw new Error(`Invalid room type: ${roomType}`);
    }
  }
}

type RoomStatus = "very-good" | "good" | "bad";

function getRoomStats(room: Room) {
  const inspections = Object.values(room.inspections);
  const totalCount = inspections.length;
  const goodCount = inspections.filter(
    (inspection) => inspection.status === "Good",
  ).length;

  const ratio = goodCount / totalCount;

  const status: RoomStatus =
    ratio > 0.9 ? "very-good" : ratio > 0.5 ? "good" : "bad";

  return {
    totalCount,
    goodCount,
    status,
    ratio,
  };
}

export function PropertyInspection({ inspection }: PropertyInspectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("");

  if (!inspection) {
    return (
      <div className="mt-6">
        <p className="text-2xl">
          This property has not been inspected by Rentak
        </p>
      </div>
    );
  }
  return (
    <div className="mt-4 flex max-w-lg flex-col gap-2 rounded-md border-2 border-slate-200 p-4">
      {inspection.rooms.map((room) => (
        <div
          key={room.room_type}
          className="mb-2 flex items-center justify-between"
        >
          <span className="flex items-center gap-2 text-2xl font-medium">
            <RoomIcon type={getRoomType(room.room_type)} /> {room.room_type}
          </span>

          <button
            className={cn(
              "inline-flex items-center gap-1 text-lg tabular-nums",
              getRoomStats(room).status === "very-good" && "text-green-600",
              getRoomStats(room).status === "good" && "text-amber-600",
              getRoomStats(room).status === "bad" && "text-red-600",
            )}
            type="button"
            onClick={() => {
              setCurrentTab(room.room_type);
              setModalOpen(true);
            }}
          >
            <span>
              {getRoomStats(room).goodCount}/
              {getRoomStats(room).totalCount}{" "}
            </span>
            <ChevronRightIcon />
          </button>
        </div>
      ))}
      <UnitInspectionModal
        rooms={inspection.rooms}
        open={modalOpen}
        onOpenChange={setModalOpen}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />
    </div>
  );
}

type UnitInspectionModalProps = {
  rooms: Array<Room>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTab: string;
  onTabChange: (tab: string) => void;
};

function UnitInspectionModal({
  rooms,
  open,
  onOpenChange,
  currentTab,
  onTabChange,
}: UnitInspectionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Unit Inspection</DialogTitle>
          <DialogDescription className="mt-2">
            <Tabs value={currentTab} onValueChange={onTabChange}>
              <TabsList>
                {rooms.map((room) => (
                  <TabsTrigger
                    value={room.room_type}
                    key={room.room_type}
                    className="inline-flex items-center gap-2"
                  >
                    <RoomIcon type={getRoomType(room.room_type)} />
                    {room.room_type}
                  </TabsTrigger>
                ))}
              </TabsList>
              {rooms.map((room) => (
                <TabsContent value={room.room_type} key={room.room_type}>
                  {Object.entries(room.inspections).map(
                    ([name, inspection]) => (
                      <div
                        key={inspection.status}
                        className="mb-2 flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2 text-xl font-medium text-slate-700">
                          {name}
                        </span>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 text-lg tabular-nums",
                            inspection.status === "Good" && "text-green-600",
                            inspection.status === "N/A" && "text-red-600",
                          )}
                        >
                          {inspection.status}
                        </span>
                      </div>
                    ),
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function RoomIcon({ type }: { type: "kitchen" | "bedroom" | "bathroom" }) {
  switch (type) {
    case "kitchen": {
      return <KitchenIcon className="w-5" />;
    }
    case "bedroom": {
      return <BedroomIcon className="w-5" />;
    }
    case "bathroom": {
      return <BathroomIcon className="w-5" />;
    }
  }
}

function KitchenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 39 39"
      {...props}
    >
      <path
        fill="#001A33"
        d="M8.313 23.566h1.173c0-.467-.276-.89-.704-1.076l-.47 1.076Zm21.904 0-.47-1.076a1.173 1.173 0 0 0-.703 1.076h1.173ZM25.132 11.7a1.173 1.173 0 1 0 2.347 0h-2.347Zm-14.081 0a1.174 1.174 0 0 0 2.347 0H11.05Zm.39-4.303a8.996 8.996 0 0 0-8.996 8.996h2.347a6.65 6.65 0 0 1 6.65-6.65V7.398Zm15.647 2.347a6.65 6.65 0 0 1 6.65 6.65h2.346a8.997 8.997 0 0 0-8.996-8.997v2.347Zm-3.13 24.251h-9.387v2.347h9.388v-2.347Zm-9.387 0c-1.508 0-2.521-.002-3.277-.104-.722-.097-1.031-.265-1.235-.469l-1.66 1.66c.713.712 1.6 1.003 2.582 1.135.949.128 2.148.125 3.59.125v-2.347ZM7.139 28.91c0 1.442-.002 2.642.125 3.59.132.983.423 1.87 1.135 2.582l1.66-1.66c-.204-.203-.372-.512-.469-1.234-.101-.756-.104-1.77-.104-3.278H7.139Zm21.905 0c0 1.509-.003 2.522-.104 3.277-.098.723-.265 1.032-.47 1.235l1.66 1.66c.713-.713 1.003-1.6 1.136-2.582.127-.948.125-2.148.125-3.59h-2.347Zm-5.085 7.432c1.442 0 2.641.003 3.59-.125.982-.132 1.869-.422 2.581-1.135l-1.66-1.66c-.203.204-.512.372-1.234.47-.756.1-1.77.103-3.277.103v2.347ZM11.442 9.744c.334 0 .662.024.982.072l.343-2.322a9.064 9.064 0 0 0-1.325-.097v2.347Zm7.823-7.04a8.217 8.217 0 0 0-7.78 5.574l2.222.754a5.87 5.87 0 0 1 5.558-3.982V2.703Zm-7.78 5.574a8.206 8.206 0 0 0-.434 2.64h2.347c0-.662.109-1.296.309-1.886l-2.223-.754Zm15.603-.881c-.45 0-.892.033-1.325.097l.343 2.322c.32-.048.647-.072.982-.072V7.397ZM19.265 5.05a5.87 5.87 0 0 1 5.558 3.982l2.222-.754a8.217 8.217 0 0 0-7.78-5.575V5.05Zm5.558 3.982c.2.59.31 1.224.31 1.885h2.346c0-.921-.152-1.81-.434-2.639l-2.222.754ZM9.486 28.91v-5.344H7.139v5.344h2.347Zm-.704-6.42a6.651 6.651 0 0 1-3.99-6.097H2.445c0 3.691 2.223 6.86 5.398 8.248l.94-2.15Zm20.262 1.076v5.344h2.346v-5.344h-2.346Zm4.693-7.173c0 2.725-1.639 5.07-3.99 6.097l.94 2.15a8.998 8.998 0 0 0 5.397-8.247h-2.347Zm-8.605-5.476v.783h2.347v-.783h-2.347Zm-14.081 0v.783h2.347v-.783H11.05Z"
      />
      <path
        stroke="#001A33"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.878"
        d="M14.57 28.91h9.388"
        opacity=".5"
      />
    </svg>
  );
}

function BathroomIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 38 39"
      {...props}
    >
      <g fill="#001A33" clip-path="url(#a)">
        <path d="M36.267 18.167H5.14V6.366a2.58 2.58 0 0 1 1.596-2.39 2.58 2.58 0 0 1 2.82.559l.036.035c.021.02.045.033.067.05a5.11 5.11 0 0 0-.065 5.217 1.047 1.047 0 0 0 1.648.215l5.543-5.544a1.047 1.047 0 0 0-.215-1.646 5.108 5.108 0 0 0-5.338.143c-.022-.027-.04-.055-.064-.08l-.025-.023a4.85 4.85 0 0 0-5.279-1.03 4.85 4.85 0 0 0-3.002 4.494v11.801h-1.58a1.139 1.139 0 0 0 0 2.278h1.58v4.822c0 3.798 2.525 7.017 5.985 8.068l-2.547 2.548a1.139 1.139 0 1 0 1.61 1.61l3.796-3.796H26.05l3.796 3.796a1.136 1.136 0 0 0 1.61 0 1.139 1.139 0 0 0 0-1.61l-2.598-2.599c3.378-1.099 5.828-4.276 5.828-8.017v-4.822h1.58a1.139 1.139 0 1 0 0-2.278Zm-3.858 7.1a6.16 6.16 0 0 1-6.152 6.153H11.293a6.16 6.16 0 0 1-6.152-6.153v-4.304c0-.286.232-.518.518-.518H31.89c.286 0 .518.232.518.518v4.304Z" />
        <path d="M14.916 8.989a.757.757 0 0 0 .759-.76c0-.2-.08-.394-.223-.536a.784.784 0 0 0-1.073 0 .758.758 0 0 0 .537 1.296ZM17.515 11.909a.767.767 0 0 0 1.075 0 .762.762 0 0 0 0-1.076.762.762 0 0 0-1.075 0 .763.763 0 0 0 0 1.076ZM17.022 10.338a.759.759 0 1 0-1.074-1.073.759.759 0 0 0 1.074 1.073ZM18.867 12.94a.763.763 0 0 0 .76.76.759.759 0 0 0 .536-1.296.783.783 0 0 0-1.073 0 .763.763 0 0 0-.223.537ZM12.978 9.336a.77.77 0 0 0-.22.536c0 .2.08.395.22.537a.773.773 0 0 0 .54.223.763.763 0 0 0 .76-.76c-.002-.2-.083-.395-.224-.536a.786.786 0 0 0-1.076 0ZM14.075 12.604a.76.76 0 0 0 .731-.97.759.759 0 0 0-.939-.518.756.756 0 0 0-.52.936.76.76 0 0 0 .728.552ZM14.642 14.575a.762.762 0 0 0 .732-.97.76.76 0 1 0-.732.97ZM15.209 16.545a.763.763 0 0 0 .759-.76c0-.2-.081-.395-.223-.536a.786.786 0 0 0-1.073 0 .758.758 0 0 0 .537 1.296ZM16.082 6.373a.759.759 0 1 0 1.073 0 .783.783 0 0 0-1.073 0ZM20.264 8.937a.764.764 0 0 0 .962-.478.76.76 0 1 0-.962.478ZM18.319 8.28a.758.758 0 1 0 .483-1.438.758.758 0 1 0-.483 1.439ZM22.447 9.63a.763.763 0 0 0 .76-.762.768.768 0 0 0-.223-.536.789.789 0 0 0-1.074 0 .768.768 0 0 0-.223.536.763.763 0 0 0 .76.762Z" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 .889h37.55v37.55H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

function BedroomIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 39 39"
      {...props}
    >
      <path
        fill="#181A20"
        d="m35.378 22.085-.253-.126V10.977c0-1.515-.547-2.84-1.64-3.977-1.095-1.136-2.4-1.704-3.914-1.704H9.374c-1.515 0-2.82.568-3.913 1.704C4.367 8.136 3.82 9.462 3.82 10.977v10.982l-.127.126c-.673.673-1.01 1.473-1.01 2.398v8.963c0 .252.106.505.316.757.21.253.484.379.82.379h5.555c.42 0 .715-.168.883-.505l2.02-2.903h14.517l1.893 2.903c.169.337.463.505.884.505h5.68c.253 0 .484-.126.695-.379.21-.252.315-.505.315-.757v-8.962c0-.926-.294-1.726-.883-2.399ZM9.374 7.568H29.57c.926 0 1.725.337 2.398 1.01.674.674 1.01 1.473 1.01 2.399v6.69a5.749 5.749 0 0 0-1.956-1.641 4.556 4.556 0 0 0-2.588-.505H10.51c-1.599-.084-2.903.42-3.913 1.515l-.631.757v-6.816c0-.926.336-1.726 1.01-2.399.673-.673 1.472-1.01 2.398-1.01Zm22.47 13.507H7.101c0-.925.336-1.725 1.01-2.398.673-.673 1.472-1.01 2.398-1.01h17.925c.926 0 1.725.337 2.398 1.01.674.673 1.01 1.473 1.01 2.398Zm2.271 11.235h-3.913l-1.893-2.904a1.2 1.2 0 0 0-1.01-.504H11.646a1.2 1.2 0 0 0-1.01.505L8.743 32.31H4.83v-7.827c0-.336.126-.61.378-.82.253-.21.505-.316.758-.316h27.013c.253 0 .505.106.758.316.252.21.378.484.378.82v7.827Z"
      />
    </svg>
  );
}
