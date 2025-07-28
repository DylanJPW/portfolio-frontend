export const PlanetSimContextMenu = () => {

  return (
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
        <input type="number" id="orbitModifier" min="0" max="500" value="50" />
      </div>
      <div className="item">
        <label className="switch" htmlFor="labelToggle">
          Labels:
          <input type="checkbox" id="labelToggle" checked />
        </label>
      </div>
    </div>
  );
};
