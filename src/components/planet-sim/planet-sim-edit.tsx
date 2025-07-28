export const PlanetSimEditMenu = () => {
  return (
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
          <input type="color" id="editColour" name="colour" value="#ffffff" />
          <br />
          <label htmlFor="editMass">Mass: </label>
          <input type="float" id="editMass" name="mass" value="" /> kg
          <br />
          <label htmlFor="editRadius">Radius: </label>
          <input type="float" id="editRadius" name="radius" value="" /> pixels
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
  );
};
