import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
// import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
import { PointerLockControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/PointerLockControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js";

let planetData = {
    sun: {
        name: "Sun",
        size: 5,
        day: 0.002,
        year: 0,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        rotateP: true,
        rotateO: false,
        description: {
            info: "The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma,heated to incandescence by nuclear fusion reactions in its core, radiating the energy mainly as light, ultraviolet, and infrared radiation. It is the most important source of energy for life on Earth.",
            diameter: "1.39 million km",
            volume: "1.41×1018 km3 / 1,300,000 Earths",
            mass: "1.9885 × 10³⁰ kg",
        },
    },
    mercury: {
        name: "Mercury",
        size: 0.5,
        day: 0.0024,
        year: 0.0212,
        positionX: 10,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        rotateP: true,
        rotateO: false,
        description: {
            info: "Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets. It is named after the Roman god Mercurius (Mercury), god of commerce, messenger of the gods, and mediator between gods and mortals, corresponding to the Greek god Hermes (Ἑρμῆς). Like Venus, Mercury orbits the Sun within Earth's orbit as an inferior planet, and its apparent distance from the Sun as viewed from Earth never exceeds 28°.",
            diameter: "4,879 km",
            volume: "6.083×1010 km3 / 0.056 Earths",
            mass: "3.3011×1023 kg / 0.055 Earths",
            "distance to sun": "0.39 AU / 46,000,000 to 70,000,000 km",
            day: "1,408 hours",
            year: "88 days",
        },
    },
    venus: {
        name: "Venus",
        size: 0.7,
        day: -0.00453,
        year: 0.018,
        positionX: 20,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        rotateP: true,
        rotateO: false,
        description: {
            info: "Venus is the second planet from the Sun and is named after the Roman goddess of love and beauty. As the brightest natural object in Earth's night sky after the Moon, Venus can cast shadows and can be visible to the naked eye in broad daylight.[18][19] Venus's orbit is smaller than that of Earth, but its maximal elongation is 47°; thus, at latitudes with a day-night cycle, it is most readily visible for up to a few hours following the start of sunset or before sunrise. At times, it has been seen in a completely dark sky.",
            diameter: "12,104 km",
            volume: "9.2843×1011 km3 / 0.857 Earths",
            mass: "4.8675×1024 kg / 0.815 Earths",
            "distance to sun":
                "0.718 AU to 0.728 AU / 107,477,000 km to 108,939,000 km",
            day: "5.832 hours",
            year: "225 days",
        },
    },
    earth: {
        name: "Earth",
        size: 1.5,
        day: 0.01,
        year: 0.0025,
        positionX: 30,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        rotateP: true,
        rotateO: false,
        description: {
            info: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. While large volumes of water can be found throughout the Solar System, only Earth sustains liquid surface water. About 71% of Earth's surface is made up of the ocean, dwarfing Earth's polar ice, lakes, and rivers. The remaining 29% of Earth's surface is land, consisting of continents and islands. Earth's surface layer is formed of several slowly moving tectonic plates, interacting to produce mountain ranges, volcanoes, and earthquakes. Earth's liquid outer core generates the magnetic field that shapes Earth's magnetosphere, deflecting destructive solar winds.",
            diameter: "12,756 km",
            volume: "1.08321×1012 km3",
            mass: "5.97237×1024 kg",
            "distance to sun":
                "1 AU ≈ 149,598,000 km / 8 min 19 s at light speed",
            day: "24 hours",
            year: "365 days",
        },
    },
    moon: {
        name: "Moon",
        size: 0.2,
        day: 0,
        year: 0.02,
        positionX: 1.6,
        positionY: 0.5,
        positionZ: 2.5,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        rotateP: true,
        rotateO: true,
    },
    mars: {
        name: "Mars",
        size: 0.8,
        day: 0.008,
        year: 0.004,
        positionX: 40,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        rotateP: true,
        rotateO: false,
        description: {
            info: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In the English language, Mars is named for the Roman god of war. Mars is a terrestrial planet with a thin atmosphere, and has a crust primarily composed of elements similar to Earth's crust, as well as a core made of iron and nickel. Mars has surface features such as impact craters, valleys, dunes, and polar ice caps. It has two small and irregularly shaped moons: Phobos and Deimos.",
            diameter: "6792 km",
            volume: "1.63118×1011 km3 / 0.151 Earths",
            mass: "6.4171×1023 kg / 0.107 Earths",
            "distance to sun": "1.38 AU to 1.66 AU / 230,000,000 km",
            day: "25 hours",
            year: "687 days",
        },
    },
    jupiter: {
        name: "Jupiter",
        size: 3,
        day: 0.02,
        year: 0.0017,
        positionX: 50,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        rotateP: true,
        rotateO: false,
        description: {
            info: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, but slightly less than one-thousandth the mass of the Sun. Jupiter is the third brightest natural object in the Earth's night sky after the Moon and Venus, and it has been observed since prehistoric times. It was named after the Roman god Jupiter, the king of the gods.",
            diameter: "142,984 km",
            volume: "1.4313×1015 km3 / 1,321 Earths",
            mass: "1.8982×1027 kg / 317.8 Earths",
            "distance to sun": "4.95 AU to 5.46 AU / 778.547,200 km",
            day: "10 hours",
            year: "4,333 days",
        },
    },
    saturn: {
        name: "Saturn",
        size: 2,
        day: 0.02,
        year: 0.0022,
        positionX: 60,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        rotateP: true,
        rotateO: false,
        description: {
            info: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth.[23][24] It has only one-eighth the average density of Earth; however, with its larger volume, Saturn is over 95 times more massive.",
            diameter: "120,536 km",
            volume: "8.2713×1014 km3 / 763.59 Earths",
            mass: "5.6834×1026 kg /  95,159 Earths",
            "distance to sun": "9 AU to 10.1 AU / 1,433,449,370 km",
            day: "11 hours",
            year: "10,759 days",
        },
    },
    uranus: {
        name: "Uranus",
        size: 2.5,
        day: -0.02,
        year: 0.001,
        positionX: 70,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        rotateP: true,
        rotateO: false,
        description: {
            info: "Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus, who, according to Greek mythology, was the great-grandfather of Ares (Mars), grandfather of Zeus (Jupiter) and father of Cronus (Saturn). It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. Uranus is similar in composition to Neptune, and both have bulk chemical compositions which differ from that of the larger gas giants Jupiter and Saturn. For this reason, scientists often classify Uranus and Neptune as 'ice giants' to distinguish them from the other giant planets.",
            diameter: "51,118 km",
            volume: "6.833×1013 km3 / 63.086 Earths",
            mass: "(8.6810±0.0013)×1025 kg /  14,536 Earths",
            "distance to sun": "29.8 AU to 30.4 AU. / 4,503,443,661 km",
            day: "17 hours",
            year: "30,687 days",
        },
    },
    neptun: {
        name: "Neptun",
        size: 2,
        day: 0.02,
        year: 0.0023,
        positionX: 80,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        rotateP: true,
        rotateO: false,
        description: {
            info: "Neptune is the eighth planet from the Sun and the farthest known solar planet. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth, and slightly more massive than its near-twin Uranus.",
            diameter: "49,528 km",
            volume: "6.253×1013 km3 / 57.74 Earths",
            mass: "1.02413×1026 kg / 17,147 Earths",
            "distance to sun": "29.8 AU to 30.4 AU / 4,503,443,661 km",
            day: "16 hours",
            year: "60,190 days",
        },
    },
    pluto: {
        name: "Pluto",
        size: 0.6,
        day: 0.02,
        year: 0.0005,
        positionX: 150,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        rotateP: true,
        rotateO: false,
        description: {
            info: "Pluto is a dwarf planet in the Kuiper belt, a ring of bodies beyond the orbit of Neptune. It was the first object discovered in the Kuiper belt and remains the largest known body in that area. After Pluto was discovered in 1930, it was declared the ninth planet from the Sun. However, beginning in the 1990s, its status as a planet was questioned following the discovery of several objects of similar size in the Kuiper belt and the scattered disc, including the dwarf planet Eris, leading the International Astronomical Union in 2006 to define the term planet formally—excluding Pluto and reclassifying it as a dwarf planet.",
            diameter: "2,376 km",
            volume: "(7.057±0.004)×109 km3 / 0.00651 Earths",
            mass: "(1.303±0.003)×1022 kg / 0.00218 Earths / 0.177 Moons",
            "distance to sun":
                "29.7 AU to 49.3 AU / 4,436,820,000 km to 7,375,930,000 km",
            day: "153 hours",
            year: "89,560 days",
        },
    },
};

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
const buttonDiv = document.getElementById("buttons");
const clickOverlay = document.getElementById("clickOverlay");
const planetInfo = document.getElementById("planetInfo");
const instructions = document.getElementById("instructions");
const startButton = document.getElementById("startButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const switchModeButton = document.getElementById("switchModeButton");
const pressEnter = document.getElementById("pressEnter");

/////////////
/// BASICS //
/////////////

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/////////////////////
///    LIGHT     ////
/////////////////////

const pointlight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointlight);

/////////////////////
///  BACKGROUND  ////
/////////////////////

const CTloader = new THREE.CubeTextureLoader();
const space = CTloader.load([
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

const positionCam = (planet) => {
    camera.position.x = planet.positionX - planet.size;
    camera.position.y = planet.size / 2;
    camera.position.z = planet.size * 2;
    camera.rotation.x = -0.1394530751;
    camera.rotation.y = -0.70686165;
    camera.rotation.z = -0.08780873;
};
positionCam(planetData.sun);

// see cam position and rotation
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
const pointerlock = new PointerLockControls(camera, renderer.domElement);
const setPointerLockControls = () => {
    controls = pointerlock;
    pointerLockOn = true;
};

const deleteControls = () => {
    controls = null;
    pointerLockOn = false;
};
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
document.addEventListener("keydown", startMoving);
document.addEventListener("keyup", stopMoving);

/////////////////////////////////////////////////
///////////////      EVENTS       ///////////////
/////////////////////////////////////////////////

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
let planetCounter = 0;

const previousPlanet = () => {
    if (planetCounter > 0) {
        planetCounter--;
    } else if (planetCounter == 0) {
        planetCounter = planetArr.length - 1;
    }
    // new planet
    let planet = planetArr[planetCounter];
    updateInfo(planet);
    positionCam(planet);
};

const nextPlanet = () => {
    if (planetCounter < planetArr.length - 1) {
        planetCounter++;
    } else if (planetCounter == planetArr.length - 1) {
        planetCounter = 0;
    }
    // new planet
    let planet = planetArr[planetCounter];
    if (planet.name == "Sun") {
        pressEnter.classList.remove("hidden");
    }
    updateInfo(planet);
    positionCam(planet);
};

const switchPlanet = (e) => {
    if (e.key == "ArrowRight") {
        nextPlanet();
    } else if (e.key == "ArrowLeft") {
        previousPlanet();
    }
};

let discoveryMode = false;
const startJourney = () => {
    startOverlay.classList.add("hidden");
    buttonDiv.classList.remove("hidden");
    planetInfo.classList.remove("hidden");
    updateInfo(planetData.sun);
    document.addEventListener("keydown", switchPlanet);
    previousButton.addEventListener("click", previousPlanet);
    nextButton.addEventListener("click", nextPlanet);
    document.addEventListener("keydown", switchModeEnter);
    document.removeEventListener("keydown", firstEnter);
    startButton.removeEventListener("click", startJourney);
};
const firstEnter = (e) => {
    if (e.key == "Enter") {
        startJourney();
    }
};
document.addEventListener("keydown", firstEnter);
startButton.addEventListener("click", startJourney);

const switchMode = (e) => {
    if (!discoveryMode) {
        // switch to discoveryMode
        document.removeEventListener("keydown", switchPlanet);
        buttonDiv.classList.add("hidden");
        planetInfo.classList.add("hidden");
        clickOverlay.classList.remove("hidden");
        instructions.classList.remove("hidden");
        document.addEventListener("keydown", toggleRotation);
        setPointerLockControls();
    } else {
        controls.unlock();
        deleteControls();
        clickOverlay.classList.add("hidden");
        planetInfo.classList.remove("hidden");
        instructions.classList.add("hidden");
        buttonDiv.classList.remove("hidden");
        document.addEventListener("keydown", switchPlanet);
        document.removeEventListener("keydown", toggleRotation);
        let planet = planetArr[planetCounter];
        turnOffRotation();
        setPlanets();
        updateInfo(planet);
        positionCam(planet);
    }
    discoveryMode = !discoveryMode;
};

switchModeButton.addEventListener("click", (e) => {
    switchMode();
    e.stopPropagation();
});

const switchModeEnter = (e) => {
    if (e.key == "Enter") {
        switchMode();
        e.preventDefault();
    }
};

clickOverlay.addEventListener("click", () => {
    clickOverlay.classList.add("hidden");
    instructions.classList.remove("hidden");
    if (pointerLockOn) {
        controls.lock();
    }
});

document.addEventListener("click", () => {
    if (pointerLockOn) {
        controls.lock();
    }
});

instructions.addEventListener("click", (e) => {
    clickOverlay.click();
    e.stopPropagation();
});

const toggleRotation = (e) => {
    if (e.key == " ") {
        for (let i in planetArr) {
            planetArr[i].rotateO = !planetArr[i].rotateO;
        }
        e.preventDefault();
    }
};

const turnOffRotation = () => {
    for (let i in planetArr) {
        planetArr[i].rotateO = false;
    }
};
// const turnOnRotation = () => {
//     for (let i in planetArr) {
//         planetArr[i].rotateO = true;
//     }
// };

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
saturnRing.rotation.x = Math.PI / 2 + 0.01;
sun.mesh.add(saturnRing);
saturn.obj.add(saturnRing);

const setPlanets = () => {
    mercury.obj.rotation.x = 0;
    mercury.obj.rotation.y = 0;
    mercury.obj.rotation.z = 0;
    venus.obj.rotation.x = 0;
    venus.obj.rotation.y = 0;
    venus.obj.rotation.z = 0;
    earth.obj.rotation.x = 0;
    earth.obj.rotation.y = 0;
    earth.obj.rotation.z = 0;
    mars.obj.rotation.x = 0;
    mars.obj.rotation.y = 0;
    mars.obj.rotation.z = 0;
    jupiter.obj.rotation.x = 0;
    jupiter.obj.rotation.y = 0;
    jupiter.obj.rotation.z = 0;
    saturn.obj.rotation.x = 0;
    saturn.obj.rotation.y = 0;
    saturn.obj.rotation.z = 0;
    uranus.obj.rotation.x = 0;
    uranus.obj.rotation.y = 0;
    uranus.obj.rotation.z = 0;
    neptun.obj.rotation.x = 0;
    neptun.obj.rotation.y = 0;
    neptun.obj.rotation.z = 0;
    pluto.obj.rotation.x = 0;
    pluto.obj.rotation.y = 0;
    pluto.obj.rotation.z = 0;
};

/////////////////////
///    GLTFS     ////
/////////////////////
const gloader = new GLTFLoader();
// gloader.load("./models/rocket/scene.gltf", (gltf) => {
//     scene.add(gltf.scene);
//     gltf.scene.scale.set(0.1, 0.1, 0.1);
// });

const eastereggObj = new THREE.Object3D();
gloader.load("./models/easteregg/scene.gltf", (gltf) => {
    gltf.scene.scale.set(0.05, 0.05, 0.05);
    eastereggObj.add(gltf.scene);
    pluto.mesh.add(eastereggObj);
});

const issObj = new THREE.Object3D();
gloader.load("./models/iss/scene.gltf", (gltf) => {
    gltf.scene.scale.set(0.01, 0.01, 0.01);
    issObj.add(gltf.scene);
    gltf.scene.position.x = planetData.earth.size + 0.02;
    gltf.scene.rotation.z = 1.7;
    earth.mesh.add(issObj);
});

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
    issObj.rotateY(0.04);
    issObj.rotateZ(0.005);
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
    eastereggObj.rotateY(0.01);
    eastereggObj.rotateZ(0.005);

    ///////////////////// movement
    moveCamera(forwardMovement, sideMovement);

    ////////////////////////////////////////////////
    renderer.render(scene, camera);
}
animate();

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
