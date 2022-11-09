const THRESHOLD = 1.5;
let screenSize = window.innerHeight;

function updateScreenSize(){
        screenSize = window.innerHeight;
}

function calcPerspectivesValues(element){
        // clientX & Y are the coords of the mouse on the screen
        // the current target is the element get by the event
        const { clientX, clientY, currentTarget } = element;

        // clientWidth & Height are the size of the element catched
        // offsetLeft & Top are the position of the element on the page
        const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

        const horizontal = (clientX - offsetLeft) / clientWidth;
        const vertical = ((clientY + screenSize) - offsetTop) / clientHeight;

        var rotateX = -((THRESHOLD - (horizontal * THRESHOLD)).toFixed(2));
        var rotateY = (THRESHOLD - (vertical * THRESHOLD)).toFixed(2);

        return [clientWidth,rotateX,rotateY];
}

// --- // --      -- // --- //
// --- // Personnels // --- //
// --- // --      -- // --- //

const MC_WT = document.querySelector(".MC-WT");

function MC_WT_handleHover(e) {
        var result_array = calcPerspectivesValues(e);

        MC_WT.style.transform =
        `perspective(${result_array[0]}px) rotateX(${result_array[2]}deg) rotateY(${result_array[1]}deg) scale(1.075) scale3d(1, 1, 1)`;
}

function MC_WT_resetStyles(e) {
        MC_WT.style.transform =
        `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
}

MC_WT.addEventListener("mousemove", MC_WT_handleHover);
MC_WT.addEventListener("mouseleave", MC_WT_resetStyles);


// --- //


const UE_TileBase = document.querySelector(".UE-TileBase");

function UE_TileBase_handleHover(e) {
        var result_array = calcPerspectivesValues(e);

        UE_TileBase.style.transform =
        `perspective(${result_array[0]}px) rotateX(${result_array[2]}deg) rotateY(${result_array[1]}deg) scale(1.075) scale3d(1, 1, 1)`;
}

function UE_TileBase_resetStyles(e) {
        UE_TileBase.style.transform =
        `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
}

UE_TileBase.addEventListener("mousemove", UE_TileBase_handleHover);
UE_TileBase.addEventListener("mouseleave", UE_TileBase_resetStyles);


        // --- //

// --- // --    -- // --- //
// --- // Encadres // --- //
// --- // --    -- // --- //

const SI_QT = document.querySelector(".SI-QT");

function SI_QT_handleHover(e) {
        var result_array = calcPerspectivesValues(e);

        SI_QT.style.transform =
        `perspective(${result_array[0]}px) rotateX(${result_array[2]}deg) rotateY(${result_array[1]}deg) scale(1.075) scale3d(1, 1, 1)`;
}

function SI_QT_resetStyles(e) {
        SI_QT.style.transform =
        `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
}

SI_QT.addEventListener("mousemove", SI_QT_handleHover);
SI_QT.addEventListener("mouseleave", SI_QT_resetStyles);


       // --- //


const PY_PARS = document.querySelector(".PY-PARS");

function PY_PARS_handleHover(e) {
        var result_array = calcPerspectivesValues(e);

        PY_PARS.style.transform =
        `perspective(${result_array[0]}px) rotateX(${result_array[2]}deg) rotateY(${result_array[1]}deg) scale(1.075) scale3d(1, 1, 1)`;
}

function PY_PARS_resetStyles(e) {
        PY_PARS.style.transform =
        `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
}

PY_PARS.addEventListener("mousemove", PY_PARS_handleHover);
PY_PARS.addEventListener("mouseleave", PY_PARS_resetStyles);


// --- //


const JAVAGOTCHI = document.querySelector(".JAVAGOTCHI");

function JAVAGOTCHI_handleHover(e) {
        var result_array = calcPerspectivesValues(e);

        JAVAGOTCHI.style.transform =
        `perspective(${result_array[0]}px) rotateX(${result_array[2]}deg) rotateY(${result_array[1]}deg) scale(1.075) scale3d(1, 1, 1)`;
}

function JAVAGOTCHI_resetStyles(e) {
        JAVAGOTCHI.style.transform =
        `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
}

JAVAGOTCHI.addEventListener("mousemove", JAVAGOTCHI_handleHover);
JAVAGOTCHI.addEventListener("mouseleave", JAVAGOTCHI_resetStyles);


// --- //


const LABY = document.querySelector(".LABY");

function LABY_handleHover(e) {
        var result_array = calcPerspectivesValues(e);

        LABY.style.transform =
        `perspective(${result_array[0]}px) rotateX(${result_array[2]}deg) rotateY(${result_array[1]}deg) scale(1.075) scale3d(1, 1, 1)`;
}

function LABY_resetStyles(e) {
        LABY.style.transform =
        `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
}

LABY.addEventListener("mousemove", LABY_handleHover);
LABY.addEventListener("mouseleave", LABY_resetStyles);


// --- // --   -- // --- //
// --- // Reviews // --- //
// --- // --   -- // --- //

const TLOF_BOTW = document.querySelector(".TLOF-BOTW");

function TLOF_BOTW_handleHover(e) {
        const { clientX, clientY, currentTarget } = e;
        const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

        const horizontal = (clientX - offsetLeft) / clientWidth;
        const vertical = ((clientY + document.body.scrollTop) - offsetTop) / clientHeight;

        var result_array = calcPerspectivesValues(horizontal, vertical)

        TLOF_BOTW.style.transform =
        `perspective(${result_array[0]}px) rotateX(${result_array[2]}deg) rotateY(${result_array[1]}deg) scale(1.075) scale3d(1, 1, 1)`;
}

function TLOF_BOTW_resetStyles(e) {
	TLOF_BOTW.style.transform =
        `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
}

TLOF_BOTW.addEventListener("mousemove", TLOF_BOTW_handleHover);
TLOF_BOTW.addEventListener("mouseleave", TLOF_BOTW_resetStyles);


// --- //


const SW_JFO = document.querySelector(".SW-JFO");

function SW_JFO_handleHover(e) {
        var result_array = calcPerspectivesValues(e);

        SW_JFO.style.transform =
        `perspective(${result_array[0]}px) rotateX(${result_array[2]}deg) rotateY(${result_array[1]}deg) scale(1.075) scale3d(1, 1, 1)`;
}

function SW_JFO_resetStyles(e) {
	SW_JFO.style.transform =
        `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
}

SW_JFO.addEventListener("mousemove", SW_JFO_handleHover);
SW_JFO.addEventListener("mouseleave", SW_JFO_resetStyles);


// --- //


const P_LA = document.querySelector(".P-LA");

function P_LA_handleHover(e) {
        var result_array = calcPerspectivesValues(e);

        P_LA.style.transform =
        `perspective(${result_array[0]}px) rotateX(${result_array[2]}deg) rotateY(${result_array[1]}deg) scale(1.075) scale3d(1, 1, 1)`;
}

function P_LA_resetStyles(e) {
	P_LA.style.transform =
        `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
}

P_LA.addEventListener("mousemove", P_LA_handleHover);
P_LA.addEventListener("mouseleave", P_LA_resetStyles);


// --- // --  -- // --- //
// --- // Others // --- //
// --- // --  -- // --- //

window.addEventListener("resize",updateScreenSize,false);