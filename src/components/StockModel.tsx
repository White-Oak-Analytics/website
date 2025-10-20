import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader, DRACOLoader } from 'three-stdlib'

function Model() {
    const [scene, setScene] = useState<THREE.Group | null>(null)
    const { gl } = useThree()

    useEffect(() => {
        const loader = new GLTFLoader()
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
        loader.setDRACOLoader(dracoLoader)

        loader.load(
            '/stocks/model.glb',
            (gltf) => {
                console.log('✅ GLTF Loaded:', gltf)
                const model = gltf.scene

                // Shadows and materials
                model.traverse((child: any) => {
                    if (child.isMesh) {
                        child.castShadow = true
                        child.receiveShadow = true
                        child.material.side = THREE.DoubleSide
                    }
                })

                // Center and scale
                const box = new THREE.Box3().setFromObject(model)
                const size = new THREE.Vector3()
                const center = new THREE.Vector3()
                box.getSize(size)
                box.getCenter(center)
                model.position.sub(center)

                const maxDim = Math.max(size.x, size.y, size.z)
                const scaleFactor = 2 / maxDim
                model.scale.setScalar(scaleFactor * 1.5)

                setScene(model)
            },
            undefined,
            (err) => {
                console.error('❌ Failed to load GLB:', err)
                setScene(null)
            }
        )

        return () => {
            dracoLoader.dispose()
        }
    }, [gl])

    if (!scene) {
        console.log('⚠️ Showing fallback cube.')
        return (
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="hotpink" />
            </mesh>
        )
    }

    return (
        <primitive
            object={scene}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]} // front view, lighting defines the feel
        />
    )
}

export default function StockModel() {
    return (
        <Canvas
            shadows
            camera={{
                position: [-158.18 / 50, 121.36 / 50, -70.2 / 50],
                fov: 45,
                near: 0.1,
                far: 1000,
            }}
            onCreated={({ camera }) => {
                camera.lookAt(new THREE.Vector3(-4.81 / 50, 29.87 / 50, 1.07 / 50))
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: '#E6E6E6', // plain backdrop like your WOMP setting
            }}
        >
            <Suspense
                fallback={
                    <mesh>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color="hotpink" />
                    </mesh>
                }
            >
                {/* Ambient + Directional lighting */}
                <ambientLight intensity={0.6} />
                <directionalLight
                    position={[5, 5, 10]}
                    intensity={1.5}
                    color={'#ffffff'}
                />
                <directionalLight
                    position={[-5, -3, -5]}
                    intensity={0.6}
                    color={'#c0b9a6'}
                />

                {/* Environment simulating WOMP lightmap rotation & warmth */}
                <Environment
                    files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/leadenhall_market_1k.hdr"
                    background={false}
                />

                <Model />

                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    zoomSpeed={0.6}
                    panSpeed={0.8}
                    rotateSpeed={0.8}
                    maxDistance={10}
                    minDistance={1}
                />
            </Suspense>
        </Canvas>
    )
}
