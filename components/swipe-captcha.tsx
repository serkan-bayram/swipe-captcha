"use client";

import { useState } from "react";

export function SwipeCaptcha({
  base64Image,
  answer,
  yPos,
}: {
  base64Image: string;
  answer: number;
  yPos: string;
}) {
  const [swipePos, setSwipePos] = useState<number>(0);

  return (
    <div className="h-36 w-48 mx-auto overflow-hidden flex flex-col border">
      <div className="img flex-1 relative">
        <div
          style={{ left: `${swipePos}px`, top: `${yPos}px` }}
          className="absolute top-4 left-4  bg-black h-8 w-8"
        ></div>

        <img src={`data:image/jpeg;base64,${base64Image}`} />
      </div>

      <div className="border h-8 bg-gray-200">
        <input name="answer" defaultValue={answer} className="hidden" />
        <input
          type="range"
          min="1"
          max="160"
          name="xPos"
          defaultValue={"0"}
          onChange={(e) => setSwipePos(parseInt(e.target.value))}
          className="w-full h-full appearance-none"
        />
      </div>
    </div>
  );
}
