const THRESHOLD = 3;


// --- //


const TLOF_BOTW = document.querySelector(".TLOF-BOTW");

function TLOF_BOTW_handleHover(e) {
    const { clientX, clientY, currentTarget } = e;
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = ((clientY + document.body.scrollTop) - offsetTop) / clientHeight;

    const rotateX = -((THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2));
    const rotateY = (THRESHOLD / 2 - vertical * THRESHOLD).toFixed(2);

    TLOF_BOTW.style.transform =
        `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale(1.075) scale3d(1, 1, 1)`;
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
    const { clientX, clientY, currentTarget } = e;
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = ((clientY + document.body.scrollTop) - offsetTop) / clientHeight;

    const rotateX = -(THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
    const rotateY = (THRESHOLD / 2 - vertical * THRESHOLD).toFixed(2);

    SW_JFO.style.transform =
        `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale(1.075) scale3d(1, 1, 1)`;
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
    const { clientX, clientY, currentTarget } = e;
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = ((clientY + document.body.scrollTop) - offsetTop) / clientHeight;

    const rotateX = -(THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
    const rotateY = (THRESHOLD / 2 - vertical * THRESHOLD).toFixed(2);

    P_LA.style.transform =
        `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale(1.075) scale3d(1, 1, 1)`;
}

function P_LA_resetStyles(e) {
	P_LA.style.transform =
        `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
}

P_LA.addEventListener("mousemove", P_LA_handleHover);
P_LA.addEventListener("mouseleave", P_LA_resetStyles);


// --- //

