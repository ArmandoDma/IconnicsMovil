// components/ThreeDRender.tsx
import { GLView } from "expo-gl";
import { Renderer, loadAsync } from "expo-three";
import React, { useRef } from "react";
import { PanResponder } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import * as THREE from "three";

export default function ThreeDRender() {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const lastRotation = useRef({ x: 0, y: 0 });

  // Zoom con SharedValue
  const zoom = useSharedValue(10);
  const initialZoom = useRef<number>(10);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const glRef = useRef<any>(null);

  // PanResponder para rotación
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      if (modelRef.current) {
        lastRotation.current = {
          x: modelRef.current.rotation.x,
          y: modelRef.current.rotation.y,
        };
      }
    },
    onPanResponderMove: (_, gestureState) => {
      if (modelRef.current) {
        const deltaX = gestureState.dy * 0.01; // vertical → rotación X
        const deltaY = gestureState.dx * 0.01; // horizontal → rotación Y
        modelRef.current.rotation.x = lastRotation.current.x + deltaX;
        modelRef.current.rotation.y = lastRotation.current.y + deltaY;
      }
    },
  });

  // Pinch para zoom
  const pinch = Gesture.Pinch()
    .onBegin(() => {
      initialZoom.current = zoom.value;
    })
    .onUpdate((event) => {
      zoom.value = Math.max(2, initialZoom.current / event.scale);
    });

  return (
    <GestureDetector gesture={pinch}>
      <GLView
        {...panResponder.panHandlers}
        style={{ width: "100%", height: 400, borderRadius: 12 }}
        onContextCreate={async (gl) => {
          glRef.current = gl;

          const renderer = new Renderer({ gl }) as THREE.WebGLRenderer;
          renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

          const scene = new THREE.Scene();
          scene.background = new THREE.Color("#e5e5e5");
          sceneRef.current = scene;

          const camera = new THREE.PerspectiveCamera(
            60,
            gl.drawingBufferWidth / gl.drawingBufferHeight,
            0.1,
            5000
          );
          camera.position.set(0, 0, 10);
          camera.lookAt(0, 0, 0);
          cameraRef.current = camera;
          zoom.value = camera.position.z;

          // Luces
          const ambient = new THREE.AmbientLight(0xffffff, 0.4);
          scene.add(ambient);

          const hemi = new THREE.HemisphereLight(0xffe0e0, 0x080820, 0.6);
          scene.add(hemi);

          const dir = new THREE.DirectionalLight(0xffffff, 0.5);
          dir.position.set(5, 10, 7.5);
          scene.add(dir);

          try {
            const model = await loadAsync(
              "https://raw.githubusercontent.com/ArmandoDma/3D_Render/main/scene.glb"
            );

            // Mantener materiales originales
            model.scene.traverse((child: any) => {
              if (child?.isMesh) {
                child.material = child.material;
              }
            });

            scene.add(model.scene);
            modelRef.current = model.scene;

            // Ajustar cámara al modelo
            const box = new THREE.Box3().setFromObject(model.scene);
            const center = box.getCenter(new THREE.Vector3());
            const sizeVec = box.getSize(new THREE.Vector3());
            const boxSize = Math.max(sizeVec.x, sizeVec.y, sizeVec.z);

            model.scene.position.sub(center);

            const fov = (camera.fov * Math.PI) / 180;
            const distance = boxSize / (2 * Math.tan(fov / 2));
            camera.position.set(0, 0, distance * 50);
            camera.lookAt(0, 0, 0);
            zoom.value = camera.position.z;

            const targetSize = 4;
            const scale = boxSize > 0 ? targetSize / boxSize : 1;
            model.scene.scale.set(scale, scale, scale);
          } catch (error) {
            console.error("Error cargando modelo:", error);
          }

          const animate = () => {
            requestAnimationFrame(animate);

            // Aplicar zoom desde SharedValue
            if (cameraRef.current) {
              cameraRef.current.position.z = zoom.value || 10;
            }

            renderer.render(scene, camera);
            gl.endFrameEXP();
          };
          animate();
        }}
      />
    </GestureDetector>
  );
}