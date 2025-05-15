import { useCallback, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Box } from "@chakra-ui/react";
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

  // Cosmic theme configuration
  const blackBackground = "#000000"; // Pitch black background for particles ON
  const grayBackground = "#18181b"; // Gray background for particles OFF
  
  // Configuration for particles
  const particlesConfig: ISourceOptions = {
    fullScreen: {
      enable: false
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: 210, // More stars
        density: {
          enable: true,
          value_area: 1000
        }
      },
      color: {
        value: ["#ffffff", "#77ccff", "#ff88cc", "#ffcc66", "#88ff88", "#aa88ff"], // Multi-colored stars
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: true,
          speed: 0.02, // Even slower opacity animation
          opacity_min: 0.4, // Higher minimum opacity
          sync: false
        }
      },
      size: {
        value: 3,
        random: true
      },
      // Linking only near cursor
      links: {
        enable: true,
        distance: 160,
        color: "rgb(255, 255, 255)", // Very transparent lines
        opacity: 0.3,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.3,
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
          mode: "connect" // Connect lines on hover
        },
        onClick: {
          enable: false // Disable click interaction
        },
        resize: true
      },
      modes: {
        connect: {
          distance: 140,  // Distance to connect particles near cursor
          links: {
            opacity: 0.4 // Faint connections
          },
          radius: 130
        }
      }
    },
    retina_detect: true,
    background: {
      color: blackBackground,
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover"
    }
  };

  // Update document body background color based on particles state
  useEffect(() => {
    const documentBody = document.body;
    
    // Update background color with transition
    if (particlesEnabled) {
      // Transitioning to black
      documentBody.style.transition = "background-color 0.8s ease";
      documentBody.style.backgroundColor = blackBackground;
    } else {
      // Transitioning to gray
      documentBody.style.transition = "background-color 0.8s ease";
      documentBody.style.backgroundColor = grayBackground;
    }
  }, [particlesEnabled]);

  return (
    <Box 
      className="particles-container"
    >
      {particlesEnabled && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesConfig}
          className="particles-canvas"
        />
      )}
      {children}
    </Box>
  );
};

export default ParticleBackground; 