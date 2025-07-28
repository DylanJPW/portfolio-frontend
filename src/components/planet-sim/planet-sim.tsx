import React, { useEffect } from "react";
import { PlanetSimAddMenu } from "./planet-sim-add";
import { PlanetSimEditMenu } from "./planet-sim-edit";
import { PlanetSimContextMenu } from "./planet-sim-context";

export const PlanetSim = () => {
  useEffect(() => {
    // Dynamically load the script
    const script = document.createElement("script");
    script.src = "/script.js";
    script.type = "module";
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <section id="mainCanvas">
        <canvas id="canvas"></canvas>
      </section>

      <PlanetSimAddMenu />
			<PlanetSimEditMenu />
			<PlanetSimContextMenu />
    </>
  );
};

export default PlanetSim;
