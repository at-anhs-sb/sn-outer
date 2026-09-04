(() => {
"use strict";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const revealTargets = $$(".section-heading, .feature-card, .generation-card, .community-content, .quote-card, .join-content");

revealTargets.forEach((element, index) => {
    element.classList.add("js-reveal");
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
});

if (!reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealTargets.forEach(element => observer.observe(element));
} else {
    revealTargets.forEach(element => element.classList.add("is-visible"));
}

const heroVisual = $(".hero-visual");

if (heroVisual && !reduceMotion) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener("mousemove", event => {
        targetX = (event.clientX / window.innerWidth - 0.5) * 16;
        targetY = (event.clientY / window.innerHeight - 0.5) * 16;
    }, { passive: true });

    const animateParallax = () => {
        currentX += (targetX - currentX) * 0.07;
        currentY += (targetY - currentY) * 0.07;

        heroVisual.style.transform =
            `translate3d(${currentX}px, ${currentY}px, 0)`;

        requestAnimationFrame(animateParallax);
    };

    requestAnimationFrame(animateParallax);
}

if (!reduceMotion && window.matchMedia("(pointer:fine)").matches) {
    const cursor = document.createElement("div");
    cursor.className = "nexus-cursor";
    document.body.appendChild(cursor);

    let cursorX = -100;
    let cursorY = -100;
    let mouseX = -100;
    let mouseY = -100;

    window.addEventListener("mousemove", event => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    }, { passive: true });

    const moveCursor = () => {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        requestAnimationFrame(moveCursor);
    };

    requestAnimationFrame(moveCursor);

    $$("a, button").forEach(element => {
        element.addEventListener("mouseenter", () => {
            cursor.classList.add("cursor-active");
        });

        element.addEventListener("mouseleave", () => {
            cursor.classList.remove("cursor-active");
        });
    });
}

const spawnPetal = () => {
    if (reduceMotion || document.hidden) return;

    const petal = document.createElement("span");

    petal.className = "nexus-petal";
    petal.textContent = Math.random() > 0.5 ? "✦" : "◆";
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.setProperty("--drift", `${(Math.random() - 0.5) * 180}px`);
    petal.style.animationDuration = `${7 + Math.random() * 6}s`;
    petal.style.fontSize = `${8 + Math.random() * 8}px`;

    document.body.appendChild(petal);

    petal.addEventListener("animationend", () => {
        petal.remove();
    });
};

if (!reduceMotion) {
    setInterval(spawnPetal, 1100);
}

document.addEventListener("click", event => {
    if (reduceMotion) return;

    const burst = document.createElement("span");

    burst.className = "nexus-click";
    burst.style.left = `${event.clientX}px`;
    burst.style.top = `${event.clientY}px`;

    document.body.appendChild(burst);

    burst.addEventListener("animationend", () => {
        burst.remove();
    });

    const button = event.target.closest("a, button");

    if (button) {
        button.classList.remove("manga-flash");
        void button.offsetWidth;
        button.classList.add("manga-flash");
    }
});

const joinButton = $(".join-button");
const joinLabel = joinButton?.firstChild;

const joinLines = [
    "OPEN THE VILLAGE GATE",
    "JOIN THE QUEST",
    "ACCEPT YOUR ARC",
    "STOP LURKING",
    "FINE. JOIN US."
];

if (joinButton && joinLabel && !reduceMotion) {
    let lineIndex = 0;

    setInterval(() => {
        lineIndex = (lineIndex + 1) % joinLines.length;
        joinLabel.textContent = joinLines[lineIndex] + " ";
    }, 4200);
}

const infoButtons = $$(".info-button");

const infoContent = {
    rules: {
        eyebrow: "THE NEXUS GUIDE",
        title: "SO WHAT DO WE ACTUALLY DO?",
        body: `
            <p>We're not just an anime club with a name and a member list.</p>

            <p>We have <strong>forums, notes, Vote Chess, Daily Chess</strong> and regular community activities.</p>

            <p>We also host <strong>multi-club arena leagues</strong>, so the Nexus can go up against other communities instead of just fighting each other over who's stronger.</p>

            <p>We've also built our own <strong>currency and village system</strong>, giving members more things to work toward and ways to participate.</p>

            <p>And every month, we can switch into a different <strong>anime arc</strong>. New theme, new activities, new stuff to get involved in.</p>

            <p class="modal-final-line">As for the rules? They're there to keep the village fun, not make it feel like a prison.</p>
        `
    },

    owner: {
        eyebrow: "A MESSAGE FROM THE OWNER",
        title: "WHY I MADE THIS PLACE",
        body: `
            <p>Honestly, I originally made Shonen Nexus because I was bored.</p>

            <p>I wanted to become a club owner, and I kept looking at all the anime clubs on Chess.com thinking, <strong>"There are WAY too many of these."</strong></p>

            <p>But at the same time, I felt like something was missing.</p>

            <p>A lot of anime clubs were basically just "we like anime." Nothing wrong with that, but I wanted something that actually <strong>immersed itself in the anime</strong>.</p>

            <p>Not just talking about what anime is popular, but actually caring about the different worlds, characters, themes, arcs and what makes each series feel different.</p>

            <p>So I made Shonen Nexus.</p>

            <p>And then somehow <strong>23 people joined on the first day.</strong></p>

            <p>I genuinely did not expect that.</p>

            <p>Now we've grown by <strong>203 members in 15 days</strong>, which is honestly kind of crazy to me.</p>

            <p>I'm still figuring things out, still adding stuff, and still probably making decisions at completely unreasonable hours.</p>

            <p>But I'm really glad you're here.</p>

            <p class="modal-final-line">If you like what we're trying to build, I'd genuinely appreciate your support. Come hang out, participate, bring your favorite anime, and help make the Nexus something that actually feels like a community.</p>
        `
    }
};

const modal = document.createElement("div");
modal.className = "nexus-modal";
modal.setAttribute("aria-hidden", "true");

modal.innerHTML = `
    <div class="nexus-modal-backdrop"></div>

    <div
        class="nexus-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nexus-modal-title"
    >
        <button
            type="button"
            class="nexus-modal-close"
            aria-label="Close"
        >
            ×
        </button>

        <div class="section-tag" id="nexus-modal-eyebrow"></div>

        <h2 id="nexus-modal-title"></h2>

        <div class="nexus-modal-body"></div>
    </div>
`;

document.body.appendChild(modal);

const modalEyebrow = $("#nexus-modal-eyebrow", modal);
const modalTitle = $("#nexus-modal-title", modal);
const modalBody = $(".nexus-modal-body", modal);
const modalClose = $(".nexus-modal-close", modal);
const modalBackdrop = $(".nexus-modal-backdrop", modal);

let previousFocusedElement = null;

const openModal = type => {
    const content = infoContent[type];

    if (!content) return;

    previousFocusedElement = document.activeElement;

    modalEyebrow.textContent = content.eyebrow;
    modalTitle.textContent = content.title;
    modalBody.innerHTML = content.body;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    modalClose.focus();
};

const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (previousFocusedElement && typeof previousFocusedElement.focus === "function") {
        previousFocusedElement.focus();
    }
};

infoButtons.forEach(button => {
    button.addEventListener("click", () => {
        openModal(button.dataset.info);
    });
});

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
    }
});

const secret = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight"
];

let sequenceIndex = 0;

window.addEventListener("keydown", event => {
    if (event.key === secret[sequenceIndex]) {
        sequenceIndex++;

        if (sequenceIndex === secret.length) {
            document.body.classList.add("manga-flash");

            sequenceIndex = 0;

            const core = $(".core-inner span");

            if (core) {
                const original = core.textContent;

                core.textContent = "妖";

                setTimeout(() => {
                    core.textContent = original;
                }, 1400);
            }
        }
    } else {
        sequenceIndex = 0;
    }
});

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

})();