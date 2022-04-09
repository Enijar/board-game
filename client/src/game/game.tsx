import React from "react";
import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import Board from "@/game/components/board/board";
import Camera from "@/game/components/camera";
import tiles from "@/game/config/tiles";

export default function Game() {
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    const svg = svgRef.current;
    if (svg === null) return;
    svg.style.cssText = `
      max-width: 100%;
      max-height: 100%;
    `;

    function onResize() {
      if (svg === null) return;
      const { width, height } = svg.getBoundingClientRect();
      const map = {
        width,
        height,
        x: (window.innerWidth - width) * 0.5,
        y: (window.innerHeight - height) * 0.5,
      };
      console.log(map);
    }

    onResize();

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <svg ref={svgRef} viewBox="0 0 1200 800">
        <path d="m412.5 234.8 33-34h50.5l14.5 47-31 36-73 24z" />
        <path d="m496.5 188.8 21 60-33 39 44 52 58-24 20-37 14-60 17-23-72-18z" />
        <path d="m393.5 322.8 82-29 51 58 61-25 36.5 13 13.5 51.5-51 55.5-128 10.5-61-92.5z" />
        <path d="m648.5 389.8-17-59-32-13 19-33 13-64 15.5-20 31.5 9 67.5-9 28.5-15 37 9 6 42-15 40-18.5 31-.5 42 21 21 34 24 8 57-35 45-58 39-62 8h-48.5l-49-20.5-5-66 35.5-39.5" />
        <path d="m602.5 537.8 14.5 6 20.5 5.5v34l-48.5 30-73.5 4-87-22.5 11.5-57.8-11.5-36.8 20-32.5 129-11 5.5 66.5" />
      </svg>
      <Canvas
        flat
        linear
        dpr={1}
        style={{ position: "absolute", inset: 0, zIndex: 1 }}
      >
        <React.Suspense fallback={<Text>Loading...</Text>}>
          <Board tiles={tiles} />
          <Camera />
        </React.Suspense>
      </Canvas>
    </>
  );
}
