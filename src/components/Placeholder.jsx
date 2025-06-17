import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

// Simple placeholder components to represent your future 3D models
const Placeholder = ({ section, position, color, scale, type }) => {
  const meshRef = useRef();
  const groupRef = useRef();
  
  // Animation for different sections
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    switch (section) {
      case 'intro':
        // Floating animation for intro
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.3;
        break;
      case 'projects':
        // Pulsing animation for projects
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        meshRef.current.scale.set(scale, scale, scale);
        meshRef.current.rotation.y += delta * 0.5;
        break;
      case 'skills':
        // Rotating animation for skills
        meshRef.current.rotation.x += delta * 0.3;
        meshRef.current.rotation.z += delta * 0.2;
        break;
      case 'about':
        // Wave-like animation for about
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
        meshRef.current.rotation.y += delta * 0.4;
        break;
      default:
        // Default gentle rotation
        meshRef.current.rotation.y += delta * 0.2;
    }
  });

  // Create different abstract shapes based on section
  const renderShape = () => {
    switch (section) {
      case 'intro':
        return (
          <group ref={groupRef}>
            {/* Main floating cube */}
            <mesh ref={meshRef} position={[0, 0, 0]}>
              <boxGeometry args={[2, 2, 2]} />
              <meshStandardMaterial color={color} transparent opacity={0.8} />
            </mesh>
            {/* Orbiting spheres */}
            {[...Array(3)].map((_, i) => (
              <mesh key={i} position={[
                Math.cos(Date.now() * 0.001 + i * Math.PI * 2 / 3) * 3,
                Math.sin(Date.now() * 0.001 + i * Math.PI * 2 / 3) * 3,
                0
              ]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color={color} transparent opacity={0.6} />
              </mesh>
            ))}
          </group>
        );
      
      case 'projects':
        return (
          <group ref={groupRef}>
            {/* Central torus */}
            <mesh ref={meshRef}>
              <torusGeometry args={[1.5, 0.4, 16, 100]} />
              <meshStandardMaterial color={color} transparent opacity={0.7} />
            </mesh>
            {/* Floating pabouticles */}
            {[...Array(5)].map((_, i) => (
              <mesh key={i} position={[
                Math.sin(Date.now() * 0.001 + i) * 2,
                Math.cos(Date.now() * 0.001 + i) * 2,
                Math.sin(Date.now() * 0.002 + i) * 2
              ]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color={color} transparent opacity={0.4} />
              </mesh>
            ))}
          </group>
        );
      
      case 'skills':
        return (
          <group ref={groupRef}>
            {/* Rotating octahedron */}
            <mesh ref={meshRef}>
              <octahedronGeometry args={[1.5]} />
              <meshStandardMaterial color={color} transparent opacity={0.7} />
            </mesh>
            {/* Orbiting rings */}
            {[...Array(2)].map((_, i) => (
              <mesh key={i} rotation={[Math.PI / 2 * i, 0, 0]}>
                <torusGeometry args={[2, 0.1, 16, 100]} />
                <meshStandardMaterial color={color} transparent opacity={0.4} />
              </mesh>
            ))}
          </group>
        );
      
      case 'about':
        return (
          <group ref={groupRef}>
            {/* Central sphere with pulsing effect */}
            <mesh ref={meshRef}>
              <sphereGeometry args={[1.5, 32, 32]} />
              <meshStandardMaterial 
                color={color} 
                transparent 
                opacity={0.7}
                wireframe
              />
            </mesh>
            {/* Orbiting cubes representing different aspects */}
            {[...Array(4)].map((_, i) => (
              <mesh 
                key={i} 
                position={[
                  Math.cos(Date.now() * 0.0005 + i * Math.PI / 2) * 3,
                  Math.sin(Date.now() * 0.0005 + i * Math.PI / 2) * 3,
                  Math.sin(Date.now() * 0.001 + i) * 2
                ]}
              >
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshStandardMaterial 
                  color={color} 
                  transparent 
                  opacity={0.5}
                />
              </mesh>
            ))}
            {/* Connecting lines */}
            {[...Array(4)].map((_, i) => (
              <mesh 
                key={`line-${i}`} 
                rotation={[0, 0, i * Math.PI / 2]}
              >
                <cylinderGeometry args={[0.02, 0.02, 6, 8]} />
                <meshStandardMaterial 
                  color={color} 
                  transparent 
                  opacity={0.3}
                />
              </mesh>
            ))}
          </group>
        );
      
      default:
        return (
          <mesh ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} transparent opacity={0.7} />
          </mesh>
        );
    }
  };

  return (
    <group position={position} scale={scale}>
      {renderShape()}
    </group>
  );
};

export default Placeholder;