export const PlanetSimAddMenu = () => {
  return (
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

          <label htmlFor="init_vel">Planet initial velocity (in m/s): </label>
          <input type="number" id="init_vel" name="init_vel" value="15" />
          <br />

          <button type="submit" className="btn btn-primary">
            Add Planet
          </button>
        </form>
      </div>
    </div>
  );
};
