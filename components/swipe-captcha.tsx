"use client";

import { useEffect, useLayoutEffect, useState } from "react";

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

  const [isJSEnabled, setIsJSEnabled] = useState(false);

  useEffect(() => {
    setIsJSEnabled(true);
  }, []);

  return (
    <div className="h-36 w-48 mx-auto overflow-hidden flex flex-col border">
      <div className="img flex-1 relative">
        {isJSEnabled && (
          <div
            style={{ left: `${swipePos}px`, top: `${yPos}px` }}
            className="absolute top-4 left-4 bg-black h-8 w-8"
          ></div>
        )}

        <img src={`data:image/jpeg;base64,${base64Image}`} />
      </div>

      <div className="border h-8 bg-gray-200">
        <input name="answer" defaultValue={answer} className="hidden" />
        <label className="container-label">
          <input
            className="slider"
            type="range"
            min="1"
            max="160"
            name="xPos"
            defaultValue={"0"}
            onChange={(e) => setSwipePos(parseInt(e.target.value))}
            id="one"
          />
          <noscript>
            <output
              htmlFor="one"
              style={{
                /* @ts-ignore */
                "--min": 1,
                "--max": 160,
                // 87 bir tık deneme yanılma
                bottom: `${87 - parseInt(yPos)}px`,
              }}
            ></output>
          </noscript>
        </label>
      </div>
    </div>
  );
}
