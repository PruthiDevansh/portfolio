(function () {
  const root = document.documentElement;
  root.classList.add("js");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const rand = (min, max) => Math.random() * (max - min) + min;
  const randInt = (min, max) => Math.floor(rand(min, max + 1));
  const hex = (n) => Array.from({ length: n }, () => "0123456789abcdef"[randInt(0, 15)]).join("");

  // ---------- Hero: payment network ----------
  // Nodes drift slowly; glowing "payments" travel between nearby nodes.
  const hero = document.querySelector(".hero");
  const canvas = document.querySelector(".network");
  const ctx = canvas.getContext("2d");
  const LINK = 150;
  let w = 0;
  let h = 0;
  let nodes = [];
  let packets = [];
  let heroVisible = true;
  const mouse = { x: -9999, y: -9999 };

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(85, Math.floor((w * h) / 15000));
    nodes = Array.from({ length: count }, () => ({
      x: rand(0, w),
      y: rand(0, h),
      vx: rand(-0.25, 0.25),
      vy: rand(-0.25, 0.25),
      r: rand(0.8, 2),
      hub: Math.random() < 0.12,
      flash: 0,
    }));
    packets = [];
  }

  function spawnPacket() {
    const a = nodes[randInt(0, nodes.length - 1)];
    const near = nodes.filter((b) => b !== a && Math.hypot(a.x - b.x, a.y - b.y) < LINK);
    if (!near.length) return;
    packets.push({
      a: a,
      b: near[randInt(0, near.length - 1)],
      t: 0,
      speed: rand(0.008, 0.018),
      color: Math.random() < 0.65 ? "45, 212, 191" : "167, 139, 250",
    });
  }

  function drawFrame() {
    ctx.clearRect(0, 0, w, h);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }

    // Links between nearby nodes, and to the mouse
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) {
          ctx.strokeStyle = "rgba(148, 163, 184, " + (1 - d / LINK) * 0.16 + ")";
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (dm < 200) {
        ctx.strokeStyle = "rgba(45, 212, 191, " + (1 - dm / 200) * 0.45 + ")";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }

    // Nodes
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.hub ? n.r + 1.4 : n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.hub ? "rgba(45, 212, 191, 0.9)" : "rgba(203, 213, 225, 0.45)";
      ctx.fill();
      if (n.flash > 0) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4 + (1 - n.flash) * 16, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(45, 212, 191, " + n.flash * 0.7 + ")";
        ctx.stroke();
        n.flash -= 0.03;
      }
    }

    // Payments travelling along links
    if (Math.random() < 0.12 && packets.length < 18) spawnPacket();
    packets = packets.filter((p) => {
      p.t += p.speed;
      if (p.t >= 1) {
        p.b.flash = 1;
        return false;
      }
      const x = p.a.x + (p.b.x - p.a.x) * p.t;
      const y = p.a.y + (p.b.y - p.a.y) * p.t;
      const tail = Math.max(0, p.t - 0.35);
      const tx = p.a.x + (p.b.x - p.a.x) * tail;
      const ty = p.a.y + (p.b.y - p.a.y) * tail;
      const g = ctx.createLinearGradient(tx, ty, x, y);
      g.addColorStop(0, "rgba(" + p.color + ", 0)");
      g.addColorStop(1, "rgba(" + p.color + ", 0.9)");
      ctx.strokeStyle = g;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.shadowColor = "rgba(" + p.color + ", 1)";
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(x, y, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + p.color + ", 1)";
      ctx.fill();
      ctx.shadowBlur = 0;
      return true;
    });
  }

  function loop() {
    if (heroVisible && !document.hidden) drawFrame();
    requestAnimationFrame(loop);
  }

  resizeCanvas();
  if (reduceMotion) {
    drawFrame();
  } else {
    requestAnimationFrame(loop);
  }

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resizeCanvas();
      if (reduceMotion) drawFrame();
    }, 150);
  });

  hero.addEventListener("pointermove", function (e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  hero.addEventListener("pointerleave", function () {
    mouse.x = mouse.y = -9999;
  });

  // ---------- Hero: live payments terminal ----------
  const logBody = document.querySelector(".terminal-body");
  const p95 = document.querySelector(".p95");
  const inr = new Intl.NumberFormat("en-IN");
  const usd = new Intl.NumberFormat("en-US");
  const gateways = ["stripe", "razorpay", "authorize.net", "swirepay"];
  const logLines = [
    () => '<span class="m">POST</span> /v1/payments <span class="ok">201</span> <span class="dim">' + randInt(28, 64) + "ms · idempotency ✓</span>",
    () => '<span class="v">' + gateways[randInt(0, 3)] + '</span> charge ch_' + hex(5) + ' <span class="ok">captured</span>',
    () => '<span class="v">fx</span> USD→INR quote q_' + hex(4) + ' <span class="ok">locked</span>',
    () => '<span class="v">transfer</span> $' + usd.format(randInt(50, 9000)) + ' → ₹ <span class="ok">settled</span>',
    () => '<span class="v">webhook</span> ' + gateways[randInt(0, 3)] + ' evt_' + hex(4) + ' <span class="ok">verified ✓</span>',
    () => '<span class="m">POST</span> /v1/payments <span class="warn">409</span> <span class="dim">duplicate · replayed safely</span>',
    () => '<span class="v">payout</span> ₹' + inr.format(randInt(500, 250000)) + ' <span class="ok">settled</span>',
    () => '<span class="v">recon</span> batch_' + hex(4) + ' <span class="ok">0 mismatches</span>',
    () => '<span class="m">POST</span> /v1/refunds <span class="ok">200</span> <span class="dim">' + randInt(20, 50) + "ms</span>",
  ];

  function addLog(animate) {
    const now = new Date();
    const ts = [now.getHours(), now.getMinutes(), now.getSeconds()].map((n) => String(n).padStart(2, "0")).join(":");
    const li = document.createElement("li");
    li.innerHTML = '<span class="ts">' + ts + "</span>" + logLines[randInt(0, logLines.length - 1)]();
    if (!animate) li.style.animation = "none";
    logBody.appendChild(li);
    while (logBody.children.length > 14) logBody.firstElementChild.remove();
  }

  for (let i = 0; i < 10; i++) addLog(false);
  if (!reduceMotion) {
    setInterval(function () {
      if (document.hidden || !heroVisible) return;
      addLog(true);
      if (Math.random() < 0.3) p95.textContent = randInt(41, 58) + "ms";
    }, 1200);
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
    }).observe(hero);
  }

  // ---------- Hero: typing effect ----------
  const typed = document.querySelector(".typed");
  const phrases = [
    "payment APIs that never double-charge.",
    "React dashboards for fintech teams.",
    "full stack features, end to end.",
    "AI agents that actually ship.",
  ];

  if (reduceMotion) {
    typed.textContent = phrases[0];
  } else {
    let phrase = 0;
    let chars = 0;
    let deleting = false;
    (function type() {
      const text = phrases[phrase];
      chars += deleting ? -1 : 1;
      typed.textContent = text.slice(0, chars);
      let delay = deleting ? 28 : 55;
      if (!deleting && chars === text.length) {
        deleting = true;
        delay = 2000;
      } else if (deleting && chars === 0) {
        deleting = false;
        phrase = (phrase + 1) % phrases.length;
        delay = 350;
      }
      setTimeout(type, delay);
    })();
  }

  // ---------- India clock ----------
  const clock = document.querySelector(".clock");
  const clockFormat = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false });
  function tick() {
    clock.textContent = clockFormat.format(new Date());
  }
  tick();
  setInterval(tick, 15000);

  // ---------- Scroll: progress bar, nav, timeline ----------
  const progress = document.querySelector(".progress");
  const timeline = document.querySelector(".timeline");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = Array.from(navLinks).map((a) => document.querySelector(a.getAttribute("href")));

  function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.setProperty("--p", max > 0 ? window.scrollY / max : 0);
    document.body.classList.toggle("scrolled", window.scrollY > 40);

    let current = null;
    sections.forEach(function (s) {
      if (s.getBoundingClientRect().top <= window.innerHeight * 0.4) current = s.id;
    });
    if (document.getElementById("contact").getBoundingClientRect().top <= window.innerHeight * 0.5) current = null;
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });

    const t = timeline.getBoundingClientRect();
    const fill = (window.innerHeight * 0.6 - t.top) / t.height;
    timeline.style.setProperty("--fill", Math.min(1, Math.max(0, fill)));
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
    },
    { passive: true }
  );
  onScroll();

  // ---------- Reveal on scroll, counters, chat ----------
  function countUp(el) {
    const to = Number(el.dataset.to);
    if (reduceMotion) {
      el.textContent = to;
      return;
    }
    const start = performance.now();
    (function step(now) {
      const p = Math.min(1, (now - start) / 1200);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }

  const revealEls = document.querySelectorAll(".reveal");
  // Stagger items that sit next to each other
  revealEls.forEach(function (el) {
    const siblings = Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"));
    const i = siblings.indexOf(el);
    if (i > 0) {
      el.style.transitionDelay = Math.min(i, 5) * 90 + "ms";
      el.addEventListener("transitionend", () => (el.style.transitionDelay = ""), { once: true });
    }
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          entry.target.querySelectorAll(".count").forEach(countUp);
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    const phone = document.querySelector(".phone");
    const phoneObserver = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          phone.classList.add("play");
          phoneObserver.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    phoneObserver.observe(phone);
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
    document.querySelectorAll(".count").forEach(countUp);
    document.querySelector(".phone").classList.add("play");
  }

  // ---------- Pointer effects (desktop only) ----------
  if (finePointer && !reduceMotion) {
    // Light that follows the mouse inside cards
    document.querySelectorAll(".spot").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });

    // Buttons lean towards the cursor
    document.querySelectorAll(".magnetic").forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.25;
        const y = (e.clientY - r.top - r.height / 2) * 0.35;
        btn.style.transform = "translate(" + x + "px, " + y + "px)";
      });
      btn.addEventListener("pointerleave", function () {
        btn.style.transform = "";
      });
    });

    // 3D tilt on the phone mock
    document.querySelectorAll(".tilt").forEach(function (el) {
      const area = el.closest(".project") || el;
      area.addEventListener("pointermove", function (e) {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = "perspective(1000px) rotateY(" + x * 10 + "deg) rotateX(" + -y * 8 + "deg)";
      });
      area.addEventListener("pointerleave", function () {
        el.style.transform = "";
      });
    });
  }

  // ---------- Start screen: choose how to view ----------
  const gate = document.querySelector(".gate");
  function markGateSeen() {
    try {
      sessionStorage.setItem("gateSeen", "1");
    } catch (e) {
      /* storage blocked: the screen just shows again next visit */
    }
  }
  let gateSeen = false;
  try {
    gateSeen = sessionStorage.getItem("gateSeen") === "1";
  } catch (e) {}

  function closeGate(choice) {
    markGateSeen();
    gate.classList.add("closing");
    root.classList.remove("gated");
    setTimeout(() => (gate.hidden = true), 500);
    if (choice === "play") {
      document.getElementById("play").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
  }

  if (!gateSeen && !location.hash) {
    gate.hidden = false;
    root.classList.add("gated");
    gate.querySelector(".gate-main").focus({ preventScroll: true });
    gate.querySelectorAll("[data-choice]").forEach(function (b) {
      b.addEventListener("click", () => closeGate(b.dataset.choice));
    });
    gate.querySelector('a[href="resume.html"]').addEventListener("click", markGateSeen);
    gate.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeGate("interactive");
    });
  }

  // ---------- Project filters ----------
  const filters = document.querySelectorAll(".filter");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", b === btn);
      });
      const f = btn.dataset.filter;
      document.querySelectorAll(".work-grid > [data-cat]").forEach(function (card) {
        card.classList.toggle("is-hidden", f !== "all" && card.dataset.cat !== f);
      });
    });
  });

  // ---------- Project details popup ----------
  const modal = document.querySelector(".modal");
  document.querySelectorAll(".details-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const card = btn.closest(".card-work");
      modal.querySelector(".modal-title").textContent = card.querySelector("h3").textContent;
      modal.querySelector(".modal-body").innerHTML = card.querySelector(".details").innerHTML;
      modal.showModal();
    });
  });
  modal.querySelector(".modal-close").addEventListener("click", () => modal.close());
  modal.addEventListener("click", function (e) {
    if (e.target === modal) modal.close(); // click on the backdrop
  });

  // ---------- Confetti ----------
  const confetti = document.querySelector(".confetti");
  function burstConfetti() {
    if (reduceMotion) return;
    const c = confetti.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    confetti.width = window.innerWidth * dpr;
    confetti.height = window.innerHeight * dpr;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    const colors = ["#2dd4bf", "#38bdf8", "#a78bfa", "#f4f6fb", "#fbbf24"];
    const bits = Array.from({ length: 160 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: rand(-9, 9),
      vy: rand(-14, -4),
      size: rand(5, 10),
      rot: rand(0, Math.PI),
      spin: rand(-0.3, 0.3),
      color: colors[randInt(0, colors.length - 1)],
    }));
    const start = performance.now();
    (function step(now) {
      c.clearRect(0, 0, window.innerWidth, window.innerHeight);
      bits.forEach(function (b) {
        b.vy += 0.35;
        b.vx *= 0.99;
        b.x += b.vx;
        b.y += b.vy;
        b.rot += b.spin;
        c.save();
        c.translate(b.x, b.y);
        c.rotate(b.rot);
        c.fillStyle = b.color;
        c.fillRect(-b.size / 2, -b.size / 4, b.size, b.size / 2);
        c.restore();
      });
      if (now - start < 3200) requestAnimationFrame(step);
      else c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    })(start);
  }

  // ---------- Game 1: Payment Rush ----------
  // Move the .NET wallet to catch falling payments and dodge bugs.
  // Every 5 payments unlocks a fact about me.
  const FACTS = [
    "I'm a full stack engineer with 4+ years of experience.",
    "I work at Instarails, a fintech startup that moves money internationally.",
    "I've integrated Stripe, Razorpay, Authorize.Net and Swirepay in .NET.",
    "I shipped MetricHub to both the App Store and Google Play.",
    "On the frontend I build with React, React Native and Angular.",
    "I'm based in Mohali, India, and open to remote work.",
    "An AI agent drafts my LinkedIn posts. Nothing goes out until I approve it on Telegram.",
    "You unlocked everything. You clearly don't give up, and neither do I. Let's talk! 🎉",
  ];
  const PER_FACT = 5;
  const MAX_LIVES = 3;
  const CURRENCIES = ["$", "₹", "€", "£"];
  const EMOJI_FONT = "'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif";

  function escapeHtml(s) {
    return s.replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);
  }

  const rushStage = document.querySelector(".rush-stage");
  const rushCanvas = document.querySelector(".rush-canvas");
  const rctx = rushCanvas.getContext("2d");
  const rushOverlay = document.querySelector(".rush-overlay");
  const rushToast = document.querySelector(".rush-toast");
  const rushScore = document.querySelector(".rush-score");
  const rushBest = document.querySelector(".rush-best");
  const rushLives = document.querySelector(".rush-lives");
  const rushCount = document.querySelector(".rush-count");
  const rushFacts = document.querySelector(".rush-facts");

  let rw = 0;
  let rh = 0;
  let game = null; // set while a round is running
  let unlocked = 0; // facts stay unlocked across rounds
  let stageVisible = true;
  let toastTimer;
  const keys = { left: false, right: false };

  let best = 0;
  try {
    best = Number(localStorage.getItem("rushBest")) || 0;
  } catch (e) {}
  rushBest.textContent = best;

  const playerWidth = () => Math.max(74, rw * 0.17);
  const playerTop = () => rh - 34;

  function renderFacts() {
    rushFacts.innerHTML = FACTS.map(function (fact, i) {
      return i < unlocked
        ? '<li class="open"><span>' + String(i + 1).padStart(2, "0") + "</span>" + escapeHtml(fact) + "</li>"
        : '<li><span aria-hidden="true">🔒</span>Score ' + (i + 1) * PER_FACT + " to unlock</li>";
    }).join("");
    rushCount.textContent = unlocked + "/" + FACTS.length;
  }

  function updateHud() {
    rushScore.textContent = game.score;
    rushLives.textContent = "❤️".repeat(game.lives) + "🤍".repeat(MAX_LIVES - game.lives);
    rushLives.setAttribute("aria-label", game.lives + (game.lives === 1 ? " life" : " lives") + " left");
  }

  function showToast(fact) {
    rushToast.innerHTML = "<b>🔓 Fact unlocked</b>" + escapeHtml(fact);
    rushToast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => rushToast.classList.remove("show"), 3400);
  }

  function sizeRush() {
    const rect = rushCanvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    rw = rect.width;
    rh = rect.height;
    rushCanvas.width = rw * dpr;
    rushCanvas.height = rh * dpr;
    rctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (game) {
      game.px = Math.min(game.px, rw);
    } else {
      drawRush({ px: rw / 2, items: [], pops: [], shield: 0, demo: true });
    }
  }

  function startRush() {
    game = { score: 0, lives: MAX_LIVES, items: [], pops: [], spawnIn: 0.3, elapsed: 0, shield: 0, px: rw / 2, target: rw / 2, last: performance.now() };
    rushOverlay.hidden = true;
    rushStage.classList.add("playing");
    updateHud();
    requestAnimationFrame(rushTick);
  }

  function rushTick(now) {
    if (!game) return;
    const dt = Math.min(0.05, (now - game.last) / 1000);
    game.last = now;
    if (!document.hidden && stageVisible) {
      stepRush(dt);
      if (game) drawRush(game);
    }
    if (game) requestAnimationFrame(rushTick);
  }

  function stepRush(dt) {
    const g = game;
    g.elapsed += dt;
    const speedUp = 1 + g.elapsed / 25;
    const pw = playerWidth();

    // Move the wallet: keys move it directly, the pointer eases it towards the cursor
    if (keys.left || keys.right) {
      g.px += (Number(keys.right) - Number(keys.left)) * 560 * dt;
      g.target = g.px;
    } else {
      g.px += (g.target - g.px) * Math.min(1, dt * 16);
    }
    g.px = Math.max(pw / 2, Math.min(rw - pw / 2, g.px));

    // Spawn: faster over time
    g.spawnIn -= dt;
    if (g.spawnIn <= 0) {
      g.spawnIn = Math.max(0.3, 0.8 - g.elapsed * 0.012);
      const r = Math.random();
      const type = r < 0.06 && g.shield <= 0 ? "key" : r < 0.3 ? "bug" : "coin";
      g.items.push({ type: type, x: rand(18, rw - 18), y: -20, vy: rand(140, 190) * speedUp, sym: CURRENCIES[randInt(0, 3)], wobble: rand(0, 6) });
    }
    if (g.shield > 0) g.shield -= dt;

    const top = playerTop();
    g.items = g.items.filter(function (it) {
      it.y += it.vy * dt;
      it.wobble += dt * 4;
      const touches = it.y + 14 >= top && it.y - 14 <= top + 14 && Math.abs(it.x - g.px) <= pw / 2 + 12;
      if (touches) {
        catchItem(it);
        return false;
      }
      return it.y < rh + 30;
    });
    g.pops = g.pops.filter((p) => (p.t += dt) < 0.8);
  }

  function pop(text, x, color) {
    game.pops.push({ text: text, x: x, y: playerTop() - 16, color: color, t: 0 });
  }

  function catchItem(it) {
    const g = game;
    if (it.type === "coin") {
      g.score++;
      pop("+" + it.sym, it.x, "#2dd4bf");
      const earned = Math.min(FACTS.length, Math.floor(g.score / PER_FACT));
      if (earned > unlocked) {
        unlocked = earned;
        renderFacts();
        showToast(FACTS[unlocked - 1]);
        if (unlocked === FACTS.length) burstConfetti();
      }
    } else if (it.type === "key") {
      g.shield = 5;
      pop("Idempotency shield!", it.x, "#a78bfa");
    } else if (g.shield > 0) {
      pop("Blocked", it.x, "#a78bfa");
    } else {
      g.lives--;
      pop("Bug! −1 ❤", it.x, "#f87171");
      rushStage.classList.remove("hit");
      void rushStage.offsetWidth; // restart the flash animation
      rushStage.classList.add("hit");
    }
    updateHud();
    if (g.lives <= 0) endRush();
  }

  function endRush() {
    const score = game.score;
    const isBest = score > best;
    game = null;
    keys.left = keys.right = false;
    rushStage.classList.remove("playing");
    if (isBest) {
      best = score;
      rushBest.textContent = best;
      try {
        localStorage.setItem("rushBest", String(best));
      } catch (e) {}
    }
    rushOverlay.innerHTML =
      '<p class="rush-title">Game over</p>' +
      '<p class="rush-big">' + score + "</p>" +
      '<p class="rush-help">payments moved' + (isBest ? " · <b>new best!</b>" : "") + "<br>" + unlocked + " of " + FACTS.length + " facts unlocked</p>" +
      '<div class="rush-btns"><button type="button" class="btn btn-primary rush-start">Play again</button>' +
      '<a class="btn btn-ghost" href="#contact">Let\'s talk</a></div>';
    rushOverlay.hidden = false;
    rushOverlay.querySelector(".rush-start").addEventListener("click", startRush);
  }

  function drawRush(g) {
    rctx.clearRect(0, 0, rw, rh);

    // Faint grid
    rctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
    rctx.lineWidth = 1;
    for (let x = 40; x < rw; x += 40) {
      rctx.beginPath();
      rctx.moveTo(x, 0);
      rctx.lineTo(x, rh);
      rctx.stroke();
    }

    // Falling items
    rctx.textAlign = "center";
    rctx.textBaseline = "middle";
    for (const it of g.items) {
      if (it.type === "coin") {
        const grd = rctx.createRadialGradient(it.x - 4, it.y - 5, 2, it.x, it.y, 15);
        grd.addColorStop(0, "#c7fff6");
        grd.addColorStop(1, "#14b8a6");
        rctx.shadowColor = "rgba(45, 212, 191, 0.8)";
        rctx.shadowBlur = 14;
        rctx.fillStyle = grd;
        rctx.beginPath();
        rctx.arc(it.x, it.y, 14, 0, Math.PI * 2);
        rctx.fill();
        rctx.shadowBlur = 0;
        rctx.fillStyle = "#03302a";
        rctx.font = "700 15px Inter, sans-serif";
        rctx.fillText(it.sym, it.x, it.y + 1);
      } else {
        if (it.type === "key") {
          rctx.fillStyle = "rgba(167, 139, 250, 0.25)";
          rctx.beginPath();
          rctx.arc(it.x, it.y, 18 + Math.sin(it.wobble) * 3, 0, Math.PI * 2);
          rctx.fill();
        }
        rctx.font = "24px " + EMOJI_FONT;
        const wiggle = it.type === "bug" ? Math.sin(it.wobble) * 4 : 0;
        rctx.fillText(it.type === "bug" ? "🐞" : "🔑", it.x + wiggle, it.y);
      }
    }

    // Wallet (the player)
    const pw = playerWidth();
    const top = playerTop();
    if (g.shield > 0) {
      rctx.strokeStyle = "rgba(167, 139, 250, " + (0.5 + 0.3 * Math.sin(g.elapsed * 10)) + ")";
      rctx.lineWidth = 3;
      rctx.beginPath();
      rctx.ellipse(g.px, top + 8, pw / 2 + 16, 34, 0, Math.PI, Math.PI * 2);
      rctx.stroke();
    }
    const wallet = rctx.createLinearGradient(g.px - pw / 2, 0, g.px + pw / 2, 0);
    wallet.addColorStop(0, "#2dd4bf");
    wallet.addColorStop(0.5, "#38bdf8");
    wallet.addColorStop(1, "#a78bfa");
    rctx.shadowColor = "rgba(56, 189, 248, 0.7)";
    rctx.shadowBlur = 20;
    rctx.fillStyle = wallet;
    rctx.beginPath();
    if (rctx.roundRect) rctx.roundRect(g.px - pw / 2, top, pw, 16, 8);
    else rctx.rect(g.px - pw / 2, top, pw, 16);
    rctx.fill();
    rctx.shadowBlur = 0;
    rctx.fillStyle = "#04121a";
    rctx.font = "600 10px 'JetBrains Mono', monospace";
    rctx.fillText(".NET", g.px, top + 8.5);

    // Floating "+$" texts
    for (const p of g.pops) {
      rctx.globalAlpha = 1 - p.t / 0.8;
      rctx.fillStyle = p.color;
      rctx.font = "700 14px Inter, sans-serif";
      rctx.fillText(p.text, p.x, p.y - p.t * 50);
    }
    rctx.globalAlpha = 1;
  }

  // Controls
  function aim(e) {
    if (!game) return;
    const rect = rushCanvas.getBoundingClientRect();
    game.target = e.clientX - rect.left;
  }
  rushCanvas.addEventListener("pointermove", aim);
  rushCanvas.addEventListener("pointerdown", aim);

  window.addEventListener("keydown", function (e) {
    if (!game) return;
    const k = e.key.toLowerCase();
    if (k === "arrowleft" || k === "a") keys.left = true;
    else if (k === "arrowright" || k === "d") keys.right = true;
    else return;
    e.preventDefault();
  });
  window.addEventListener("keyup", function (e) {
    const k = e.key.toLowerCase();
    if (k === "arrowleft" || k === "a") keys.left = false;
    if (k === "arrowright" || k === "d") keys.right = false;
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      stageVisible = entries[0].isIntersecting;
    }).observe(rushStage);
  }

  rushOverlay.querySelector(".rush-start").addEventListener("click", startRush);
  window.addEventListener("resize", sizeRush);
  renderFacts();
  sizeRush();

  // ---------- Game 2: spot the bug ----------
  const BUG_LINES = [
    '<span class="k">public async</span> <span class="t">Task</span>&lt;<span class="t">Receipt</span>&gt; ChargeAsync(<span class="t">Order</span> order)',
    "{",
    '  <span class="k">var</span> request = <span class="k">new</span> <span class="t">ChargeRequest</span>(order.Amount);',
    '  <span class="k">for</span> (<span class="k">var</span> attempt = 1; attempt &lt;= 3; attempt++)',
    "  {",
    '    <span class="k">try</span>',
    "    {",
    '      <span class="k">return await</span> _gateway.ChargeAsync(request);',
    "    }",
    '    <span class="k">catch</span> (<span class="t">TimeoutException</span>)',
    "    {",
    '      <span class="k">await</span> <span class="t">Task</span>.Delay(attempt * 500); <span class="c">// try again</span>',
    "    }",
    "  }",
    '  <span class="k">throw new</span> <span class="t">PaymentFailedException</span>(order.Id);',
    "}",
  ];
  const FIXED_LINE =
    '  <span class="k">var</span> request = <span class="k">new</span> <span class="t">ChargeRequest</span>(order.Amount, key: order.Id);';
  const BUG_ANSWERS = [2, 7]; // 0-based: building the request, or sending it again
  const BUG_HINTS = {
    3: "Retrying on timeout is a good idea. The problem is <b>what</b> each retry sends.",
    9: "Catching timeouts is fine. But does a timeout really mean the charge failed?",
    11: "Waiting longer between retries is good practice.",
    14: "Giving up after 3 tries is fine.",
  };
  const bugCode = document.querySelector(".bug-code");
  const bugMsg = document.querySelector(".bug-msg");
  let bugTries = 3;

  function renderBug() {
    bugTries = 3;
    bugCode.innerHTML = BUG_LINES.map(
      (html, i) => '<button type="button" class="bug-line" data-i="' + i + '"><span class="ln">' + (i + 1) + "</span><span>" + html + "</span></button>"
    ).join("");
    bugMsg.innerHTML = "You have 3 tries.";
    bugCode.querySelectorAll(".bug-line").forEach(function (line) {
      line.addEventListener("click", () => pickLine(line, Number(line.dataset.i)));
    });
  }

  function revealBug(won) {
    const lines = bugCode.querySelectorAll(".bug-line");
    lines.forEach((l) => (l.disabled = true));
    const fixed = lines[2];
    fixed.classList.remove("miss");
    fixed.classList.add("hit");
    fixed.lastElementChild.innerHTML = FIXED_LINE;
    bugMsg.innerHTML =
      (won ? "<b>Found it! 🎯</b> " : "<b>Here's the bug:</b> ") +
      "the request has no idempotency key. If the gateway charges the card but the response times out, the retry charges it <b>again</b>. " +
      "The fix: send a stable key like <code>order.Id</code>, so the gateway ignores duplicates. I've fixed line 3 above." +
      ' <button type="button" class="bug-reset">Play again</button>';
    bugMsg.querySelector(".bug-reset").addEventListener("click", renderBug);
    if (won) burstConfetti();
  }

  function pickLine(line, i) {
    if (BUG_ANSWERS.includes(i)) {
      revealBug(true);
      return;
    }
    line.classList.add("miss");
    line.disabled = true;
    bugTries--;
    if (bugTries === 0) {
      revealBug(false);
      return;
    }
    const hint = BUG_HINTS[i] || "That line is fine. Think: what if the gateway charged the card, but the response never arrived?";
    bugMsg.innerHTML = hint + " <b>" + bugTries + (bugTries === 1 ? " try" : " tries") + " left.</b>";
  }

  renderBug();

  // ---------- Copy email ----------
  const copyBtn = document.querySelector(".copy-email");
  copyBtn.addEventListener("click", async function () {
    const label = copyBtn.querySelector("span");
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.email);
    } catch (e) {
      window.location.href = "mailto:" + copyBtn.dataset.email;
      return;
    }
    label.textContent = "Copied ✓";
    copyBtn.classList.add("copied");
    setTimeout(function () {
      label.textContent = "Copy";
      copyBtn.classList.remove("copied");
    }, 2000);
  });

  // ---------- Footer year ----------
  document.getElementById("year").textContent = new Date().getFullYear();
})();
