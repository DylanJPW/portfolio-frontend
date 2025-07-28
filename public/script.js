// import Planet from './planet.js';

// Get the canvas and its context
const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

var camera_vxl = 0;
var camera_vxr = 0;
var camera_vy = 0;

var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

var centered = false;

const G = 6.67e-11;
const au = 1.5e11;

var timestep = 1;
var scale = 100 / au;
var max_orbit_length = 50;

const timeModifier = document.getElementById("timeModifier");

timeModifier.addEventListener("input", (e) => {
    timestep = e.target.value;
})

const zoomSlider = document.getElementById("zoomSlider");

zoomSlider.addEventListener("input", (e) => {
    scale = e.target.value / au;
})

const orbitModifier = document.getElementById("orbitModifier");

orbitModifier.addEventListener("input", (e) => {
    max_orbit_length = e.target.value;
})

class Planet {
    static id = 0;

    constructor(x = 4, y = 0, name = "Unnamed", colour = "white", mass = 1e24, radius = 10, init_vel = 16, sun = false) {

        this.id = Planet.id++;

        this.x = (x * au);
        this.y = (y * au);
        this.name = name;
        this.colour = colour;
        this.mass = mass;
        this.radius = radius * (au / 100);

        this.orbit = [x, y];
        this.sun = sun;
        this.distance_to_sun = 0;

        this.x_vel = 0;
        this.y_vel = init_vel * 1000;

        this.time = 86400;

    };

    Draw() {

        const planet_x = (this.x * scale) + centerX;
        const planet_y = (this.y * scale) + centerY;

        // Draw the planet
        ctx.beginPath();
        ctx.arc(planet_x, planet_y, this.radius * scale, 0, 2 * Math.PI);
        ctx.fillStyle = this.colour;
        ctx.fill();

        this.Orbit();
    }

    Orbit() {

        const orbit_x = (this.orbit[0][0] * scale) + centerX;
        const orbit_y = (this.orbit[0][1] * scale) + centerY;

        ctx.beginPath();
        ctx.moveTo(orbit_x, orbit_y);
        for (let i = 1; i < this.orbit.length; i++) {
            const point = this.orbit[i];
            ctx.lineTo(point[0] * scale + centerX, point[1] * scale + centerY);
        }
        ctx.strokeStyle = this.colour;
        ctx.lineWidth = 2;
        ctx.stroke();

        while (this.orbit.length > max_orbit_length * this.distance_to_sun / au) {
            this.orbit.shift();
        };
    }

    Attraction(other_body) {

        const other_x = other_body.x;
        const other_y = other_body.y;
        const distance_x = other_x - this.x;
        const distance_y = other_y - this.y;
        const distance = Math.sqrt((distance_x ** 2) + (distance_y ** 2));

        if (other_body.sun) {
            this.distance_to_sun = distance;
        };

        const theta = Math.atan2(distance_y, distance_x);
        const force = (G * this.mass * other_body.mass) / (distance ** 2);
        const force_x = Math.cos(theta) * force;
        const force_y = Math.sin(theta) * force;

        return [force_x, force_y];
    }

    UpdatePosition(planets) {

        let total_fx = 0;
        let total_fy = 0;

        for (let p in planets) {
            if (this.id == planets[p].id) {
                continue;
            };

            const [fx, fy] = this.Attraction(planets[p]);
            total_fx += fx;
            total_fy += fy;
        };

        this.x_vel += (total_fx / this.mass) * this.time * timestep;
        this.y_vel += (total_fy / this.mass) * this.time * timestep;

        this.x += this.x_vel * this.time * timestep;
        this.y += this.y_vel * this.time * timestep;
        this.orbit.push([this.x, this.y]);
        
    }

    CollisionDetection(other_body) {
        const dx = ((this.x * scale) + centerX) - ((other_body.x * scale) + centerX);
        const dy = ((this.y * scale) + centerY) - ((other_body.y * scale) + centerY);

        const distance = Math.sqrt((dx ** 2 + dy ** 2))

        const collided = distance < this.radius * scale + other_body.radius * scale;
        if (collided) {
            return true;
        } else {
            return false;
        };
    }

    Collision(planets) {

        for (let p in planets) {
            if (this.id == planets[p].id) {
                continue;
            };

            if (this.CollisionDetection(planets[p])) {
                if (this.mass >= planets[p].mass) {
                    this.mass = planets[p].mass + this.mass;

                    // radius + forces

                    return false;
                } else {
                    return true;
                }
            };
        };
    }
};

var planets = [];

const url = 'planets.json';

fetch(url)
    .then(response => response.json())
    .then(response => readPlanets(response))
    .catch(error => {
        console.error('Error loading JSON data:', error);
    });

// Function to draw the bodies
function draw() {

    // Clear the canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let p in planets) {

        // Update the planet's position
        planets[p].UpdatePosition(planets);

        // Draw Orbit
        planets[p].Draw();

        if (labelToggle.checked) {
            toggleLabels(planets[p]);
        }

        if (planets[p].Collision(planets)) {
            if(p == planets.length - 1) {
                planets.splice(-1);
            } else {
                planets.splice(p, 1);
            }
        }

        if(centered){
            if(planets[p].name == planets[centered_planet].name){
                centerX = -planets[p].x * scale + canvas.width / 2;
                centerY = -planets[p].y * scale + canvas.height / 2;
            };
        } else if(!centered) {
            centerX += camera_vxl;
            centerX += camera_vxr;
            centerY += camera_vy;
        };
    };

    // Request the next animation frame
    requestAnimationFrame(draw);
}

// Start the animation
draw();

var selected_planet = null;
var centered_planet = null;

function isPlanet(mouseX, mouseY, right_clicked=false) {

    for (let i = 0; i < planets.length; i++) {

        const dx = mouseX - ((planets[i].x * scale) + centerX);
        const dy = mouseY - ((planets[i].y * scale) + centerY);

        const distance = Math.sqrt(dx ** 2 + dy ** 2);

        const isPlanet = distance < planets[i].radius * scale;

        if (isPlanet) {
            if(right_clicked) {
                selected_planet = i;
            } else {
                centered_planet = i;
            };
            return true;
        };
    };
    return false;
}

function handleMouseDown(e) {

    if (e.target.offsetParent != contextMenu) {
        contextMenu.classList.remove("visible");
    };
}

canvas.addEventListener("click", handleMouseDown);
canvas.addEventListener("mousedown", handleMouseDown);

const labelToggle = document.getElementById("labelToggle");

function toggleLabels(planet) {

    const offset = planet.radius * scale;
    const labelX = (planet.x * scale) + centerX + offset;
    const labelY = (planet.y * scale) + centerY - offset;

    ctx.font = "15px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(planet.name, labelX, labelY);

}

const contextMenu = document.getElementById("contextMenu");
const editPlanet = document.getElementById("editPlanet");
const editPlanetForm = document.getElementById("editPlanetForm");

canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    const { clientX: mouseX, clientY: mouseY } = e;

    contextMenu.style.top = `${mouseY}px`;
    contextMenu.style.left = `${mouseX}px`;

    if (isPlanet(mouseX, mouseY, true)) {

        editPlanetForm.editName.value = planets[selected_planet].name;
        editPlanetForm.editColour.value = planets[selected_planet].colour;
        editPlanetForm.editMass.value = planets[selected_planet].mass;
        editPlanetForm.editRadius.value = planets[selected_planet].radius / (au / 100);
        // editPlanetForm.editX.value = planets[selected_planet].x / au;
        // editPlanetForm.editVel.value = planets[selected_planet].y_vel / 1000;

        editPlanet.classList.add("visible");

    } else {
        editPlanet.classList.remove("visible");
    }

    contextMenu.classList.add("visible");
});

function readPlanets(planet_data) {
    planets = planet_data.map(planet_data => {
        return new Planet(planet_data.x, planet_data.y, planet_data.name, planet_data.colour, planet_data.mass, planet_data.radius, planet_data.init_vel, planet_data.sun);
    });
};

function updatePlanet(form) {
    const updated_name = form[0].value;
    const updated_colour = form[1].value;
    const updated_mass = form[2].value;
    const updated_radius = form[3].value * (au / 100);
    // const updated_x = form[4].value * au;
    // const updated_init_vel = form[5].value * 1000;

    planets[selected_planet].name = updated_name;
    planets[selected_planet].colour = updated_colour;
    planets[selected_planet].mass = updated_mass;
    planets[selected_planet].radius = updated_radius;
    // planets[selected_planet].x = updated_x;
    // planets[selected_planet].init_vel = updated_init_vel;

}

function addPlanet(form) {

    const new_name = form[0].value
    const new_colour = form[1].value
    const new_mass = form[2].value
    const new_radius = form[3].value
    const new_x = form[4].value
    const new_init_vel = form[5].value

    const new_y = 0;

    planets.push(new Planet(new_x, new_y, new_name, new_colour, new_mass, new_radius, new_init_vel))
};

editPlanetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    updatePlanet(editPlanetForm.elements);
})

const newPlanetForm = document.getElementById('newPlanet');

newPlanetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addPlanet(newPlanetForm.elements);
});

document.addEventListener('keydown', (e) => {

    centered = false;

    var move_rate;

    if (e.shiftKey) {
        move_rate = 5;
    } else {
        move_rate = 2;
    };

    if (e.code == "KeyA" || e.code == "ArrowLeft") camera_vxl = move_rate;
    if (e.code == "KeyD" || e.code == "ArrowRight") camera_vxr = -move_rate;

    if (e.code == "KeyW" || e.code == "ArrowUp") camera_vy = move_rate;
    if (e.code == "KeyS" || e.code == "ArrowDown") camera_vy = -move_rate;

}, false);

document.addEventListener('keyup', (e) => {

    if (e.code == "KeyD" || e.code == "ArrowRight") camera_vxr = 0;
    if (e.code == "KeyA" || e.code == "ArrowLeft") camera_vxl = 0;

    if (e.code == "KeyW" || e.code == "ArrowUp") camera_vy = 0;
    if (e.code == "KeyS" || e.code == "ArrowDown") camera_vy = 0;

}, false);

var zoom = 100;

canvas.addEventListener('wheel', (e) => {

    var zoom_rate;

    if(e.ctrlKey){
        e.preventDefault();
        zoom_rate = 100;
    } else if(e.shiftKey){
        zoom_rate = 2;
    } else {
        zoom_rate = 10;
    };

    zoom -= e.deltaY / zoom_rate;

    zoom = Math.max(zoom, 1);
    scale = zoom / au;

    centerX += ((e.clientX - centerX)/zoom_rate) * (e.deltaY / (Math.sqrt(e.deltaY ** 2)));
    centerY += ((e.clientY - centerY)/zoom_rate) * (e.deltaY / (Math.sqrt(e.deltaY ** 2)));

});

document.addEventListener("dblclick", (e) => {

    const { clientX: mouseX, clientY: mouseY } = e;

    if(isPlanet(mouseX, mouseY)) {
        centered = true;
    } else {
        centered = false;
    }

});