/**
 * Interactive 3D Digital Marketing & Performance Engine
 * Represents: Ad Campaigns, Multi-Channel Orbits, Conversion Funnel & Revenue Scaling
 */

(function () {
  const container = document.getElementById('marketing-3d-scene');
  const canvas = document.getElementById('marketing-canvas');
  if (!container || !canvas) return;

  let width = container.clientWidth || 480;
  let height = container.clientHeight || 460;

  // Track mouse coordinates for interactive parallax
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let isHovered = false;

  window.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    if (
      e.clientX >= rect.left - 150 &&
      e.clientX <= rect.right + 150 &&
      e.clientY >= rect.top - 150 &&
      e.clientY <= rect.bottom + 150
    ) {
      isHovered = true;
      mouse.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    } else {
      isHovered = false;
      mouse.targetX = 0;
      mouse.targetY = 0;
    }
  });

  // Check if THREE is available
  if (typeof THREE !== 'undefined') {
    initThreeJS();
  } else {
    // If Three.js CDN isn't loaded yet or offline, init standalone canvas 3D simulation
    initCanvasFallback();
  }

  /* -------------------------------------------------------------
     THREE.JS IMPLEMENTATION
     ------------------------------------------------------------- */
  function initThreeJS() {
    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 26;
      camera.position.y = 0;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Master 3D Group
      const masterGroup = new THREE.Group();
      masterGroup.scale.set(0.85, 0.85, 0.85);
      scene.add(masterGroup);

      // 1. Central Performance Node
      const innerGeo = new THREE.OctahedronGeometry(2.6, 0);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        wireframe: false,
        transparent: true,
        opacity: 0.85
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      masterGroup.add(innerMesh);

      // 2. Three Tilted Orbital Marketing Rings
      // Ring A: Google Ads Orbit (Emerald)
      const ringAGeo = new THREE.TorusGeometry(7.2, 0.05, 16, 100);
      const ringAMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.7 });
      const ringA = new THREE.Mesh(ringAGeo, ringAMat);
      ringA.rotation.x = Math.PI / 3;
      ringA.rotation.y = Math.PI / 6;
      masterGroup.add(ringA);

      // Ring B: Meta Ads Orbit (Teal / Cyan)
      const ringBGeo = new THREE.TorusGeometry(8.6, 0.05, 16, 100);
      const ringBMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.6 });
      const ringB = new THREE.Mesh(ringBGeo, ringBMat);
      ringB.rotation.x = -Math.PI / 3.5;
      ringB.rotation.y = -Math.PI / 4;
      masterGroup.add(ringB);

      // Ring C: GA4 Conversion Tracking Orbit (White / Accent)
      const ringCGeo = new THREE.TorusGeometry(6.0, 0.04, 16, 100);
      const ringCMat = new THREE.MeshBasicMaterial({ color: 0xe5e7eb, transparent: true, opacity: 0.4 });
      const ringC = new THREE.Mesh(ringCGeo, ringCMat);
      ringC.rotation.x = Math.PI / 2.2;
      masterGroup.add(ringC);

      // 3. Orbiting Data Beads (Moving Leads/Traffic across the orbits)
      const beadGeo = new THREE.SphereGeometry(0.32, 12, 12);
      const beadMatA = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      const beadA = new THREE.Mesh(beadGeo, beadMatA);
      ringA.add(beadA);

      const beadMatB = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const beadB = new THREE.Mesh(beadGeo, beadMatB);
      ringB.add(beadB);

      const beadMatC = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const beadC = new THREE.Mesh(beadGeo, beadMatC);
      ringC.add(beadC);

      // 4. 3D Growth Pillar Chart (5 Bars Ascending representing ROAS & Scaling)
      const barsGroup = new THREE.Group();
      const barCount = 5;
      const barMeshes = [];
      const heights = [1.8, 2.6, 3.4, 4.5, 5.8];

      for (let i = 0; i < barCount; i++) {
        const h = heights[i];
        const barGeo = new THREE.BoxGeometry(0.6, h, 0.6);
        const barMat = new THREE.MeshBasicMaterial({
          color: i === 4 ? 0x10b981 : 0x059669,
          transparent: true,
          opacity: 0.65 + i * 0.07,
          wireframe: false
        });
        const bar = new THREE.Mesh(barGeo, barMat);
        const angle = (i / (barCount - 1) - 0.5) * 1.6;
        bar.position.x = Math.sin(angle) * 6.2;
        bar.position.z = Math.cos(angle) * 2.8 - 2;
        bar.position.y = -4 + h / 2;
        barsGroup.add(bar);
        barMeshes.push(bar);
      }
      masterGroup.add(barsGroup);

      // 5. Cloud of 400 Marketing Particle Nodes (Impression -> Lead Stream)
      const particleCount = 360;
      const particleGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        const radius = 5 + Math.random() * 8.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i + 2] = radius * Math.cos(phi);
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particleMat = new THREE.PointsMaterial({
        size: 0.12,
        color: 0x10b981,
        transparent: true,
        opacity: 0.5
      });
      const particleSystem = new THREE.Points(particleGeo, particleMat);
      masterGroup.add(particleSystem);

      // Animation Loop
      let clock = new THREE.Clock();
      function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Rotate Inner Performance Node
        innerMesh.rotation.y = -elapsedTime * 0.45;
        innerMesh.rotation.z = elapsedTime * 0.35;

        // Move Data Beads on Orbits
        beadA.position.x = Math.cos(elapsedTime * 1.8) * 7.2;
        beadA.position.y = Math.sin(elapsedTime * 1.8) * 7.2;

        beadB.position.x = Math.cos(-elapsedTime * 1.4 + 1) * 8.6;
        beadB.position.y = Math.sin(-elapsedTime * 1.4 + 1) * 8.6;

        beadC.position.x = Math.cos(elapsedTime * 2.2 + 2) * 6.0;
        beadC.position.y = Math.sin(elapsedTime * 2.2 + 2) * 6.0;

        // Dynamic Growth Bar Pulsing
        barMeshes.forEach((bar, idx) => {
          const scaleY = 1 + Math.sin(elapsedTime * 2.5 + idx * 0.6) * 0.12;
          bar.scale.y = scaleY;
        });

        // Orbit ring subtle wobble
        ringA.rotation.z = Math.sin(elapsedTime * 0.5) * 0.15;
        ringB.rotation.z = Math.cos(elapsedTime * 0.6) * 0.15;

        // Particle field slow swirl
        particleSystem.rotation.y = elapsedTime * 0.08;

        // Smooth Mouse Parallax
        mouse.x += (mouse.targetX - mouse.x) * 0.06;
        mouse.y += (mouse.targetY - mouse.y) * 0.06;

        masterGroup.rotation.y = mouse.x * 0.45;
        masterGroup.rotation.x = -mouse.y * 0.35;
        masterGroup.position.x = mouse.x * 0.7;
        masterGroup.position.y = 0.6 + mouse.y * 0.6;

        renderer.render(scene, camera);
      }
      animate();

      // Responsive resize handler with dynamic scale for mobile
      function handleResize() {
        width = container.clientWidth || 360;
        height = container.clientHeight || 300;
        camera.aspect = width / height;
        if (width < 480) {
          masterGroup.scale.set(0.65, 0.65, 0.65);
          camera.position.z = 29;
        } else if (width < 768) {
          masterGroup.scale.set(0.74, 0.74, 0.74);
          camera.position.z = 28;
        } else {
          masterGroup.scale.set(0.85, 0.85, 0.85);
          camera.position.z = 26;
        }
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
      window.addEventListener('resize', handleResize);
      handleResize();
    } catch (e) {
      console.warn("ThreeJS initialization failed, using Canvas fallback", e);
      initCanvasFallback();
    }
  }

  /* -------------------------------------------------------------
     HIGH-TECH CANVAS 2D/3D FALLBACK ENGINE
     ------------------------------------------------------------- */
  function initCanvasFallback() {
    const ctx = canvas.getContext('2d');
    function resizeFallback() {
      width = container.clientWidth || 360;
      height = container.clientHeight || 300;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', resizeFallback);
    resizeFallback();

    let angle = 0;
    const nodes = [];
    const count = 45;

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * 260,
        y: (Math.random() - 0.5) * 260,
        z: (Math.random() - 0.5) * 260,
        radius: Math.random() * 2.5 + 1.5,
        speed: Math.random() * 0.015 + 0.005
      });
    }

    function renderFallback() {
      requestAnimationFrame(renderFallback);
      angle += 0.012;

      ctx.clearRect(0, 0, width, height);
      const cx = width / 2 + mouse.x * 20;
      const cy = height / 2 - 35 - mouse.y * 20;

      // Draw Orbit Rings
      ctx.save();
      ctx.translate(cx, cy);

      // Ring 1 (Emerald)
      ctx.beginPath();
      ctx.ellipse(0, 0, 140, 50, Math.PI / 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Ring 2 (Cyan)
      ctx.beginPath();
      ctx.ellipse(0, 0, 160, 55, -Math.PI / 3.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();



      // Orbiting Bead A
      const bx = Math.cos(angle * 1.8) * 140 * Math.cos(Math.PI / 4) - Math.sin(angle * 1.8) * 50 * Math.sin(Math.PI / 4);
      const by = Math.cos(angle * 1.8) * 140 * Math.sin(Math.PI / 4) + Math.sin(angle * 1.8) * 50 * Math.cos(Math.PI / 4);
      ctx.beginPath();
      ctx.arc(bx, by, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Nodes
      nodes.forEach((n) => {
        const rad = angle + n.speed * 20;
        const rx = n.x * Math.cos(rad) - n.z * Math.sin(rad);
        const rz = n.x * Math.sin(rad) + n.z * Math.cos(rad);
        const scale = 300 / (300 + rz);

        ctx.beginPath();
        ctx.arc(rx * scale, n.y * scale, n.radius * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${0.3 + scale * 0.4})`;
        ctx.fill();
      });

      ctx.restore();

      // Smooth mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
    }
    renderFallback();
  }
})();
