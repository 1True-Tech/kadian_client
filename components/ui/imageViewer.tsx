"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageViewerProps = {
  src: string;
  alt: string;
  preview?: {
    width: number;
    height: number;
    className?: string;
  };
  modal?: {
    width: number;
    height: number;
    className?: string;
  };
};

export function ImageViewer({ preview, modal, alt, src }: ImageViewerProps) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [errorPreview, setErrorPreview] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prev) => Math.max(0.5, prev + (e.deltaY > 0 ? -0.1 : 0.1)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    setStart({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPos({ x: e.clientX - start.x, y: e.clientY - start.y });
  };

  const handleMouseUp = () => setDragging(false);

  const resetView = () => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {errorPreview ? (
          <div className="flex flex-col items-center justify-center w-[200px] h-[200px] border rounded-md bg-gray-100 text-gray-500 cursor-pointer">
            <ImageIcon className="w-10 h-10 mb-2" />
            <span>No Preview</span>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={4000}
            height={4000}
            style={{
              width: preview?.width,
              height: preview?.height,
            }}
            quality={100}
            onError={() => setErrorPreview(true)}
            className={cn(
              "cursor-pointer rounded-md w-[200px] h-[200px]",
              preview?.className
            )}
          />
        )}
      </DialogTrigger>

      <DialogContent className="max-w-4xl w-full h-[80vh] flex items-center justify-center">
        <div className="flex flex-col w-full h-full">
          <div className="flex gap-2 mb-2 self-center">
            <button
              onClick={() => setScale((s) => s + 0.2)}
              className="px-3 py-1 bg-gray-800 text-white rounded"
            >
              Zoom In
            </button>
            <button
              onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}
              className="px-3 py-1 bg-gray-800 text-white rounded"
            >
              Zoom Out
            </button>
            <button
              onClick={resetView}
              className="px-3 py-1 bg-gray-800 text-white rounded"
            >
              Reset
            </button>
          </div>

          <div
            ref={containerRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="flex-1 overflow-hidden bg-black rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            {errorModal ? (
              <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                <ImageIcon className="w-16 h-16 mb-2" />
                <span>Image not available</span>
              </div>
            ) : (
              <Image
                src={src}
                alt={alt}
                width={4000}
                height={4000}
                quality={100}
                onError={() => setErrorModal(true)}
                className={cn("object-contain select-none", modal?.className)}
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                  transition: dragging ? "none" : "transform 0.1s ease-out",
                  width: modal?.width,
                  height: modal?.height,
                }}
                draggable={false}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
