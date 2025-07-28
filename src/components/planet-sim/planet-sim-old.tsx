import React, { useEffect } from "react";

const PlanetSim: React.FC = () => {
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
      {/* HTML body from index.html (JSX version) */}
      <section id="mainCanvas">
        <canvas id="canvas"></canvas>
      </section>

      <section>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="addMenu"
          aria-labelledby="addMenuLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="addMenuLabel">
              Add New Planet
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="addMenu"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body visible" id="addPlanetForm">
            <form id="newPlanet">
              <label htmlFor="name">Planet name: </label>
              <input type="text" id="name" name="name" value="Unnamed" />
              <br />

              <label htmlFor="colour">Planet colour: </label>
              <input type="color" id="colour" name="colour" value="#ffffff" />
              <br />

              <label htmlFor="mass">Mass (in kg): </label>
              <input type="number" id="mass" name="mass" value="1e24" />
              <br />

              <label htmlFor="radius">Radius (in pixels): </label>
              <input type="number" id="mass" name="radius" value="10" />
              <br />

              <label htmlFor="x">Distance from sun (in AU): </label>
              <input type="number" id="x" name="x" value="4" />
              <br />

              <label htmlFor="init_vel">
                Planet initial velocity (in m/s):{" "}
              </label>
              <input type="number" id="init_vel" name="init_vel" value="15" />
              <br />

              <button type="submit" className="btn btn-primary">
                Add Planet
              </button>
            </form>
          </div>
        </div>
      </section>

      <section>
        <div
          className="offcanvas offcanvas-start"
          tabIndex={-1}
          id="editMenu"
          aria-labelledby="editMenuLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="editMenuLabel">
              Edit Planet
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="editMenu"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body visible">
            <form id="editPlanethtmlForm">
              <label htmlFor="editName">Name: </label>
              <input type="text" id="editName" name="name" value="" />
              <br />
              <label htmlFor="editColour">Colour: </label>
              <input
                type="color"
                id="editColour"
                name="colour"
                value="#ffffff"
              />
              <br />
              <label htmlFor="editMass">Mass: </label>
              <input type="float" id="editMass" name="mass" value="" /> kg
              <br />
              <label htmlFor="editRadius">Radius: </label>
              <input type="float" id="editRadius" name="radius" value="" />{" "}
              pixels
              <br />
              {/* <label htmlFor="editX">Distance from sun: </label>
                      <input type="float" id="editX" name="x" value=""> AU<br>

                      <label htmlFor="editVel">Initial velocity: </label>
                      <input type="float" id="editVel" name="y_vel" value=""> m/s<br> */}
              <button type="submit" className="btn btn-primary">
                Update Planet
              </button>
            </form>
          </div>
        </div>
      </section>

      <section>
        <div className="container" id="contextMenu">
          <div className="item">
            <button
              className="btn btn-primary btn-sm"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#addMenu"
              aria-controls="addMenu"
            >
              Add New Planet
            </button>
          </div>
          <div className="item" id="editPlanet">
            <button
              className="btn btn-primary btn-sm"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#editMenu"
              aria-controls="editMenu"
              id="editButton"
            >
              Edit Planet
            </button>
          </div>
          <div className="item">
            <label htmlFor="timeModifier">Timestep: </label>
            <input type="number" id="timeModifier" min="0" max="10" value="1" />
          </div>
          <div className="item">
            <label htmlFor="zoomSlider">Zoom: </label>
            <input type="range" id="zoomSlider" min="0" max="500" value="100" />
          </div>
          <div className="item">
            <label htmlFor="orbitModifier">Orbit Length: </label>
            <input
              type="number"
              id="orbitModifier"
              min="0"
              max="500"
              value="50"
            />
          </div>
          <div className="item">
            <label className="switch" htmlFor="labelToggle">
              Labels:
              <input type="checkbox" id="labelToggle" checked />
            </label>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlanetSim;
