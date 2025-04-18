import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Box, useColorModeValue } from "@chakra-ui/react";
import type { Engine, ISourceOptions } from "tsparticles-engine";
import { useAppContext } from "../context/AppContext";

interface ParticleBackgroundProps {
  children?: React.ReactNode;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ children }) => {
  const { particlesEnabled } = useAppContext();
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particleColor = useColorModeValue("rgba(60, 60, 60, 0.8)", "rgba(255, 255, 255, 0.7)");
  const backgroundColor = useColorModeValue("#ffffff", "#18181b");
  
  // Adjust particle settings based on color mode
  const particleCount = useColorModeValue(80, 100); 
  const particleSize = useColorModeValue(3, 2.5);
  const particleSpeed = useColorModeValue(0.6, 0.5); 
  const connectDistance = useColorModeValue(150, 160); 
  const lineWidth = useColorModeValue(2, 1.8);

  // Configuration for particles
  const particlesConfig: ISourceOptions = {
    fullScreen: {
      enable: false
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: particleCount,
        density: {
          enable: true,
          value_area: 1000
        }
      },
      color: {
        value: particleColor
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.9,
        random: true,
        anim: {
          enable: true,
          speed: 0.3,
          opacity_min: 0.7,
          sync: false
        }
      },
      size: {
        value: particleSize,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      // disable links between particles
      links: {
        enable: false
      },
      move: {
        enable: true,
        speed: particleSpeed,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      },
      // Disable collisions
      collisions: {
        enable: false
      }
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: {
          enable: true,
          mode: "grab"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: connectDistance,
          links: {
            opacity: 0.7,
            color: particleColor,
            width: lineWidth
          }
        }
      }
    },
    retina_detect: true,
    background: {
      color: backgroundColor,
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover"
    }
  };

  if (!particlesEnabled) {
    return (
      <Box 
        className="particles-container"
        bg={backgroundColor}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box className="particles-container">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
        className="particles-canvas"
      />
      {children}
    </Box>
  );
};

export default ParticleBackground; 