"use client";

import { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";

export interface SignatureCanvasRef {
  clear: () => void;
  toDataURL: () => string;
  isEmpty: () => boolean;
}

interface SignatureCanvasProps {
  className?: string;
}

const SignatureCanvas = forwardRef<SignatureCanvasRef, SignatureCanvasProps>(
  ({ className = "" }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawing = useRef(false);
    const lastPos = useRef<{ x: number; y: number } | null>(null);
    const hasDrawn = useRef(false);

    useImperativeHandle(ref, () => ({
      clear() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hasDrawn.current = false;
      },
      toDataURL() {
        return canvasRef.current?.toDataURL("image/png") ?? "";
      },
      isEmpty() {
        return !hasDrawn.current;
      },
    }));

    const getPos = useCallback(
      (e: MouseEvent | TouchEvent): { x: number; y: number } | null => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        if (e instanceof TouchEvent) {
          const touch = e.touches[0];
          if (!touch) return null;
          return {
            x: (touch.clientX - rect.left) * scaleX,
            y: (touch.clientY - rect.top) * scaleY,
          };
        }
        return {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY,
        };
      },
      []
    );

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Set display size to match container while keeping internal resolution high
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio || rect.width;
      canvas.height = rect.height * window.devicePixelRatio || rect.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.strokeStyle = "#C9A84C";
      ctx.lineWidth = 2.5 * (window.devicePixelRatio || 1);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const start = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        isDrawing.current = true;
        lastPos.current = getPos(e);
      };

      const draw = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        if (!isDrawing.current) return;
        const pos = getPos(e);
        if (!pos || !lastPos.current) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        lastPos.current = pos;
        hasDrawn.current = true;
      };

      const stop = () => {
        isDrawing.current = false;
        lastPos.current = null;
      };

      canvas.addEventListener("mousedown", start);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", stop);
      canvas.addEventListener("mouseleave", stop);
      canvas.addEventListener("touchstart", start, { passive: false });
      canvas.addEventListener("touchmove", draw, { passive: false });
      canvas.addEventListener("touchend", stop);

      return () => {
        canvas.removeEventListener("mousedown", start);
        canvas.removeEventListener("mousemove", draw);
        canvas.removeEventListener("mouseup", stop);
        canvas.removeEventListener("mouseleave", stop);
        canvas.removeEventListener("touchstart", start);
        canvas.removeEventListener("touchmove", draw);
        canvas.removeEventListener("touchend", stop);
      };
    }, [getPos]);

    const handleClear = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hasDrawn.current = false;
    };

    return (
      <div className={`relative ${className}`}>
        <div className="relative rounded-lg overflow-hidden" style={{ background: "#0d1f3c", border: "1px solid #C9A84C" }}>
          <canvas
            ref={canvasRef}
            className="w-full h-32 md:h-40 block"
            style={{ touchAction: "none" }}
          />
          {/* Signature line */}
          <div className="absolute bottom-6 left-4 right-4 pointer-events-none" style={{ borderBottom: "1px solid rgba(201,168,76,0.3)" }} />
          <div className="absolute bottom-2 left-4 text-xs pointer-events-none select-none" style={{ color: "rgba(255,255,255,0.25)" }}>
            Sign above
          </div>
        </div>
        <button
          type="button"
          onClick={handleClear}
          className="mt-2 text-xs hover:text-[#C9A84C] transition-colors"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Clear signature
        </button>
      </div>
    );
  }
);

SignatureCanvas.displayName = "SignatureCanvas";

export default SignatureCanvas;
