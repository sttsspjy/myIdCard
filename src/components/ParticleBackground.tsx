import { useCallback, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Box, useMediaQuery } from "@chakra-ui/react";
import type { Engine, ISourceOptions } from "tsparticles-engine";
import { useAppContext } from "../context/AppContext";

interface ParticleBackgroundProps {
  children?: React.ReactNode;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ children }) => {
  const { particlesEnabled } = useAppContext();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const cosmicGradientBackground = `
    radial-gradient(ellipse at top,rgb(19, 11, 34) 0%,rgb(12, 4, 20) 40%, transparent 90%),
    radial-gradient(ellipse at left,rgb(6, 27, 31) 0%, transparent 75%),
    radial-gradient(ellipse at bottom,rgb(29, 5, 5) 0%, transparent 75%),
    radial-gradient(ellipse at right,rgb(20, 31, 5) 0%, transparent 75%),
    linear-gradient(135deg, #000000 0%,rgb(9, 0, 17) 50%,rgb(0, 4, 14) 100%)
  `;

  // Configuration for particles
  const particlesConfig: ISourceOptions = {
    fullScreen: {
      enable: false
    },
    fpsLimit: 30, 
    particles: {
      number: {
        value: isMobile ? 80 : 120, 
        density: {
          enable: true,
          value_area: 1200
        }
      },
      color: {
        value: ["#ffffff", "#77ccff", "#ff88cc", "#ffcc66", "#88ff88", "#aa88ff"],
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.8, 
        random: false, 
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false
        }
      },
      links: {
        enable: true,
        distance: 120,
        color: "rgba(255, 255, 255, 0.2)",
        opacity: 0.4,
        width: 0.8
      },
      move: {
        enable: true,
        speed: 0.2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
      collisions: {
        enable: false
      }
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: {
          enable: false,
        },
        onClick: {
          enable: false
        },
        resize: true
      }
    },
    retina_detect: false,
    background: {
      color: "transparent",
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover"
    }
  };

  useEffect(() => {
    const documentBody = document.body;
    documentBody.style.transition = "background 0.8s ease";
    setTimeout(() => {
      documentBody.style.background = cosmicGradientBackground;
    }, 10);
    
  }, []);

  return (
    <>
      <Box 
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
        background={cosmicGradientBackground}
        zIndex="-1"
      />
      
      {/* Particles layer with fade animation */}
      <Box 
        className="particles-container"
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex="0"
        pointerEvents="none"
        opacity={particlesEnabled ? 1 : 0}
        transition="opacity 0.8s ease"
      >
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesConfig}
          className="particles-canvas"
        />
        {children}
      </Box>
    </>
  );
};

export default ParticleBackground; 