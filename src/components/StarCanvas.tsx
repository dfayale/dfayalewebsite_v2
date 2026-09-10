import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Environment, useCursor } from "@react-three/drei";
import starOutline from "./starOutline";

/*
 * Liquid-chrome look comes from reflecting a smooth, high-contrast studio
 * gradient. Generating it on a canvas keeps the site free of runtime HDR
 * downloads.
 */
function makeEnvTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, "#17181a");
  grad.addColorStop(0.14, "#3f4347");
  grad.addColorStop(0.3, "#ffffff");
  grad.addColorStop(0.48, "#ffffff");
  grad.addColorStop(0.56, "#c2c5c9");
  grad.addColorStop(0.64, "#202124");
  grad.addColorStop(0.71, "#fdfdfd");
  grad.addColorStop(0.86, "#43474c");
  grad.addColorStop(1, "#0e0f10");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/*
 * Straight slab extrusion of the exact silhouette traced from
 * src/assets/star.png — flat faces, straight sides, small chamfered edge.
 */
function makeStarGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(starOutline[0][0], starOutline[0][1]);
  for (let i = 1; i < starOutline.length; i++) {
    shape.lineTo(starOutline[i][0], starOutline[i][1]);
  }
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.3,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.035,
    bevelSegments: 5,
  });
  geometry.center();
  return geometry;
}

function ChromeStar({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(makeStarGeometry, []);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  useCursor(hovered, dragging ? "grabbing" : "grab");

  const spin = useRef(0);
  const velocity = useRef(0);
  const tilt = useRef({ x: 0, y: 0 });
  const drag = useRef<{ pointerId: number | null; lastX: number }>({
    pointerId: null,
    lastX: 0,
  });

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    drag.current = { pointerId: e.pointerId, lastX: e.clientX };
    velocity.current = 0;
    setDragging(true);
  };

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (drag.current.pointerId !== e.pointerId) return;
    const dx = e.clientX - drag.current.lastX;
    drag.current.lastX = e.clientX;
    spin.current += dx * 0.008;
    velocity.current = dx * 0.35;
  };

  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    if (drag.current.pointerId !== e.pointerId) return;
    drag.current.pointerId = null;
    setDragging(false);
  };

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    if (drag.current.pointerId === null) {
      // Momentum from the last drag, decaying back to the idle spin
      spin.current += velocity.current * delta;
      velocity.current = THREE.MathUtils.damp(velocity.current, 0, 1.5, delta);
      if (!reducedMotion) spin.current += 0.25 * delta;
    }

    const target = reducedMotion
      ? { x: 0, y: 0 }
      : { x: state.pointer.y * -0.35, y: state.pointer.x * 0.45 };
    tilt.current.x = THREE.MathUtils.damp(tilt.current.x, target.x, 4, delta);
    tilt.current.y = THREE.MathUtils.damp(tilt.current.y, target.y, 4, delta);

    g.rotation.x = 0.16 + tilt.current.x;
    g.rotation.y = spin.current + tilt.current.y;
    g.position.y = reducedMotion
      ? 0
      : Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
  });

  return (
    <group ref={group}>
      <mesh
        geometry={geometry}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.13}
          envMapIntensity={1.25}
        />
      </mesh>
    </group>
  );
}

export default function StarCanvas() {
  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  const envMap = useMemo(makeEnvTexture, []);

  // The star stays pinned all the way down the page — stop rendering once the
  // sections scrolling over it have it fully covered.
  const [covered, setCovered] = useState(false);
  useEffect(() => {
    const onScroll = () => setCovered(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 4.6], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      frameloop={covered ? "never" : "always"}
    >
      <ChromeStar reducedMotion={reducedMotion} />
      <Environment map={envMap} />
    </Canvas>
  );
}
