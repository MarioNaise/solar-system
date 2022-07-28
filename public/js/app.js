import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { PointerLockControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/PointerLockControls.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
// import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js";

/////////////////////////////////////
//////  GET DATA FROM SERVER   //////
/////////////////////////////////////
const fetchData = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    return data;
};
let planetData = await fetchData("/api/planets");

const planetArr = [
    planetData.sun,
    planetData.mercury,
    planetData.venus,
    planetData.earth,
    planetData.mars,
    planetData.jupiter,
    planetData.saturn,
    planetData.uranus,
    planetData.neptun,
    planetData.pluto,
];

///////////////////////
//////  HTML  /////////
///////////////////////
const startOverlay = document.getElementById("startOverlay");
const next = document.getElementById("next");
const clickOverlay = document.getElementById("clickOverlay");
const planetInfo = document.getElementById("planetInfo");
const instructions = document.getElementById("instructions");

/////////////
/// BASICS //
/////////////

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/////////////////////
///    LIGHT     ////
/////////////////////

const pointlight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointlight);

/////////////////////
///  BACKGROUND  ////
/////////////////////

const loader = new THREE.CubeTextureLoader();
const space = loader.load([
    "./pictures/space/space_ft.png",
    "./pictures/space/space_bk.png",
    "./pictures/space/space_up.png",
    "./pictures/space/space_dn.png",
    "./pictures/space/space_rt.png",
    "./pictures/space/space_lf.png",
]);
scene.background = space;

/////////////////////
///    CAMERA    ////
/////////////////////

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.x = planetData.sun.positionX;
camera.position.y = planetData.sun.size / 10;
camera.position.z = planetData.sun.size * 2;

//see cam position and rotation
// window.addEventListener("keydown", (e) => {
//     if (e.key == ".") {
//         console.log([
//             camera.position.x,
//             camera.position.y,
//             camera.position.z,
//             camera.rotation.x,
//             camera.rotation.y,
//             camera.rotation.z,
//         ]);
//     }
// });

/////////////////////
///   CONTROLS   ////
/////////////////////
let controls;

let forwardMovement = 0;
let sideMovement = 0;
let upwardsMovement = 0;
let downwardsMovement = 0;
const speed = 0.03;
const boost = speed * 10;
let pointerLockOn = false;
let orbitOn = false;

// // orbit
// const setOrbitControls = () => {
//     controls = new OrbitControls(camera, renderer.domElement);
//     controls.update();
//     orbitOn = true;
//     pointerLockOn = false;
//     controls.minDistance = planetData.sun.size * 2;
//     controls.maxDistance = planetData.sun.size * 10;
// };

// pointerlock
const setPointerLockControls = () => {
    controls = new PointerLockControls(camera, renderer.domElement);
    pointerLockOn = true;
    orbitOn = false;
};

// const deleteControls = () => {
//     controls = null;
//     pointerLockOn = false;
//     orbitOn = false;
// };
const startMoving = (e) => {
    if (e.key == "w") {
        forwardMovement = speed;
    }
    if (e.key == "s") {
        forwardMovement = -speed;
    }
    if (e.key == "a") {
        sideMovement = -speed;
    }
    if (e.key == "d") {
        sideMovement = speed;
    }
    if (e.key == "r") {
        upwardsMovement = speed;
    }
    if (e.key == "f") {
        downwardsMovement = speed;
    }
    if (e.key == "Shift") {
        if (forwardMovement > 0) {
            forwardMovement = boost;
        }
    }
};

const stopMoving = (e) => {
    if (e.key == "w" || e.key == "s") {
        forwardMovement = 0;
    }
    if (e.key == "a" || e.key == "d") {
        sideMovement = 0;
    }
    if (e.key == "Shift") {
        forwardMovement = 0;
        sideMovement = 0;
        upwardsMovement = 0;
        downwardsMovement = 0;
    }
    if (e.key == "r") {
        upwardsMovement = 0;
    }
    if (e.key == "f") {
        downwardsMovement = 0;
    }
};

const moveCamera = (forwardMovement, sideMovement) => {
    if (pointerLockOn) {
        controls.moveForward(forwardMovement);
        controls.moveRight(sideMovement);
        camera.position.y += upwardsMovement;
        camera.position.y -= downwardsMovement;
    }
};

/////////////////////////////////////////////////
///////////////      EVENTS       ///////////////
/////////////////////////////////////////////////
document.addEventListener("keydown", startMoving);
document.addEventListener("keyup", stopMoving);

const updateInfo = (planet) => {
    planetInfo.innerHTML = `<h1>${planet.name}</h1>
                            <p>Description:<br> ${planet.description.info}</p>
                            <p>Day:<br> ${planet.description.day || "-"}</p>
                            <p>Year:<br> ${planet.description.year || "-"}</p>
                            <p>Distance from sun:<br> ${
                                planet.description["distance to sun"] || "-"
                            }</p>
                            <p>Diamter:<br> ${planet.description.diameter}</p>
                            <p>Volume:<br> ${planet.description.volume}</p>
                            <p>Mass:<br> ${planet.description.mass}</p>`;
};

// start with enter and switch planets afterwards
let planetCounter = -1;
const nextPlanet = (e) => {
    /////////////// start (first enter)
    if (planetCounter == -1) {
        planetCounter++;
        startOverlay.classList.add("hidden");
        next.classList.remove("hidden");
        planetInfo.classList.remove("hidden");
        updateInfo(planetData.sun);
        return;
    }

    //previous planet
    let planet = planetArr[planetCounter];

    if (e.key == "Enter" && planetCounter < planetArr.length - 1) {
        planet.rotateO = true;
        planetCounter++;
    } else if (e.key == "Enter" && planetCounter == planetArr.length - 1) {
        planet.rotateO = true;
        planetCounter = 0;

        // switch to fly mode
        document.removeEventListener("keydown", nextPlanet);
        next.classList.add("hidden");
        clickOverlay.classList.remove("hidden");
        planetInfo.classList.add("hidden");
        document.addEventListener("keydown", toggleRotation);
        return;
    }
    if (e.key == "Enter") {
        // new planet
        planet = planetArr[planetCounter];
        updateInfo(planet);

        // console.log(planetCounter, planet.name);
        camera.position.x = planet.positionX;
        camera.position.y = planet.size / 10;
        camera.position.z = planet.positionZ + planet.size * 2;
    }
};
document.addEventListener("keydown", nextPlanet);

clickOverlay.addEventListener("click", () => {
    clickOverlay.classList.add("hidden");
    instructions.classList.remove("hidden");
    setPointerLockControls();
    if (pointerLockOn) {
        controls.lock();
    }
});

document.addEventListener("click", () => {
    if (pointerLockOn) {
        controls.lock();
    }
});

const toggleRotation = (e) => {
    if (e.key == " ") {
        for (let i in planetArr) {
            planetArr[i].rotateO = !planetArr[i].rotateO;
        }
        e.preventDefault();
    }
};

//////////////////////
////   PLANETS    ////
/////////////////////

function createPlanet(element) {
    const geometry = new THREE.SphereGeometry(element.size, 100, 100);
    const texture = new THREE.TextureLoader().load(
        `./pictures/${element.name.toLowerCase()}.jpeg`
    );
    const material =
        (element.name === "Sun" &&
            new THREE.MeshBasicMaterial({
                map: texture,
                color: "white",
            })) ||
        (element.name !== "Sun" &&
            new THREE.MeshPhongMaterial({ map: texture, shininess: 0 }));
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = element.positionX || 0;
    mesh.position.y = element.positionY || 0;
    mesh.position.z = element.positionZ || 0;
    mesh.rotation.x = element.rotationX || 0;
    mesh.rotation.y = element.rotationY || 0;
    mesh.rotation.z = element.rotationZ || 0;

    if (element.name == "Sun") {
        scene.add(mesh);
    } else {
        sun.mesh.add(mesh);
    }

    const obj = new THREE.Object3D();
    obj.add(mesh);
    scene.add(obj);

    return { mesh, obj };
}

// sun & planets
const sun = createPlanet(planetData.sun);
const mercury = createPlanet(planetData.mercury);
const venus = createPlanet(planetData.venus);
const earth = createPlanet(planetData.earth);
const moon = createPlanet(planetData.moon);
const mars = createPlanet(planetData.mars);
const jupiter = createPlanet(planetData.jupiter);
const saturn = createPlanet(planetData.saturn);
const uranus = createPlanet(planetData.uranus);
const neptun = createPlanet(planetData.neptun);
const pluto = createPlanet(planetData.pluto);

// moon
earth.mesh.add(moon.obj);

// iss
const iss = createPlanet({
    name: "ISS",
    size: 0.008,
    positionZ: planetData.earth.size + 0.1,
});
earth.mesh.add(iss.obj);

// saturn ring
const ringGeometry = new THREE.RingGeometry(2.2, 3.5, 50, 50);
const ringTexture = new THREE.TextureLoader().load(
    "./pictures/saturnRing.jpeg"
);
const ringMaterial = new THREE.MeshBasicMaterial({
    map: ringTexture,
    side: THREE.DoubleSide,
    opacity: 0.5,
    transparent: true,
});
const saturnRing = new THREE.Mesh(ringGeometry, ringMaterial);

saturnRing.position.x = planetData.saturn.positionX;
saturnRing.position.y = planetData.saturn.positionY;
saturnRing.position.z = planetData.saturn.positionZ;
saturnRing.rotation.x = Math.PI / 2;
sun.mesh.add(saturnRing);
saturn.obj.add(saturnRing);

/////////////////
///  ANIMATE ////
/////////////////

function animate() {
    requestAnimationFrame(animate);
    ////////////////////////////////////////////////

    ////////////////// planet rotation
    sun.mesh.rotateY((planetData.sun.rotateP && planetData.sun.day) || 0);
    mercury.mesh.rotateY(
        (planetData.mercury.rotateP && planetData.mercury.day) || 0
    );
    venus.mesh.rotateY((planetData.venus.rotateP && planetData.venus.day) || 0);
    earth.mesh.rotateY((planetData.earth.rotateP && planetData.earth.day) || 0);
    moon.mesh.rotateY(planetData.moon.day);
    mars.mesh.rotateY((planetData.mars.rotateP && planetData.mars.day) || 0);
    jupiter.mesh.rotateY(
        (planetData.jupiter.rotateP && planetData.jupiter.day) || 0
    );
    saturn.mesh.rotateY(
        (planetData.saturn.rotateP && planetData.saturn.day) || 0
    );
    saturnRing.rotateZ(-planetData.saturn.day / 2);
    uranus.mesh.rotateY(
        (planetData.uranus.rotateP && planetData.uranus.day) || 0
    );
    neptun.mesh.rotateY(
        (planetData.neptun.rotateP && planetData.neptun.day) || 0
    );
    pluto.mesh.rotateY((planetData.pluto.rotateP && planetData.pluto.day) || 0);

    ////////////////// orbit rotation
    mercury.obj.rotateY(
        (planetData.mercury.rotateO && planetData.mercury.year) || 0
    );
    venus.obj.rotateY((planetData.venus.rotateO && planetData.venus.year) || 0);
    earth.obj.rotateY((planetData.earth.rotateO && planetData.earth.year) || 0);
    moon.obj.rotateY((planetData.moon.rotateO && planetData.moon.year) || 0);
    iss.obj.rotateY(0.002);
    iss.obj.rotateX(0.02);
    mars.obj.rotateY((planetData.mars.rotateO && planetData.mars.year) || 0);
    jupiter.obj.rotateY(
        (planetData.jupiter.rotateO && planetData.jupiter.year) || 0
    );
    saturn.obj.rotateY(
        (planetData.saturn.rotateO && planetData.saturn.year) || 0
    );

    uranus.obj.rotateY(
        (planetData.uranus.rotateO && planetData.uranus.year) || 0
    );
    neptun.obj.rotateY(
        (planetData.neptun.rotateO && planetData.neptun.year) || 0
    );
    pluto.obj.rotateY((planetData.pluto.rotateO && planetData.pluto.year) || 0);

    ///////////////////// movement
    moveCamera(forwardMovement, sideMovement);

    ////////////////////////////////////////////////
    renderer.render(scene, camera);
}
animate();

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
