'use strict';
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(pointer: fine)');
  document.getElementById('year').textContent = new Date().getFullYear();

  const rain = document.querySelector('.binary-rain');
  const streams = document.createDocumentFragment();
  for (let index = 0; index < 36; index++) {
    const column = document.createElement('span');
    const position = (index + .5) / 36;
    const edge = Math.abs(position - .5) * 2;
    const duration = 9 + Math.random() * 12;
    const length = 10 + Math.floor(Math.random() * 10);
    column.style.left = `${position * 100}%`;
    column.style.animationDuration = `${duration}s`;
    column.style.animationDelay = `-${Math.random() * duration}s`;
    column.style.opacity = String(.12 + .34 * edge ** 1.65);
    column.textContent = Array.from({ length }, () => Math.random() < .5 ? '0' : '1').join('\n');
    streams.append(column);
  }
  rain.append(streams);

  // Keep the page readable when JavaScript or animation APIs are unavailable.
  const reveals = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window && !reduced.matches) {
    document.documentElement.classList.add('js-motion');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    reveals.forEach(element => observer.observe(element));
  }
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.navlinks a')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    }), { rootMargin: '-15% 0px -55% 0px' });
    sections.forEach(element => sectionObserver.observe(element));
  }
  let scrollFrame = 0;
  const progress = document.querySelector('.scroll-progress');
  function updateProgress() {
    scrollFrame = 0;
    const distance = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${distance > 0 ? scrollY / distance : 0})`;
  }
  addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress); }, { passive: true });
  updateProgress();

  const projects = [...document.querySelectorAll('.project')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  filters.forEach(button => {
    button.disabled = false;
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      projects.forEach(project => { project.hidden = filter !== 'all' && project.dataset.category !== filter; });
      const count = projects.filter(project => !project.hidden).length;
      document.getElementById('filter-status').textContent = `Showing ${count} ${filter === 'all' ? '' : filter === 'ml' ? 'machine learning ' : 'software '}project${count === 1 ? '' : 's'}`;
      // Revealed items stay visible when category changes reflow the grid.
      projects.filter(project => !project.hidden).forEach(project => project.classList.add('visible'));
      updateProgress();
    });
  });

  const dialog = document.getElementById('image-dialog');
  const dialogImage = document.getElementById('dialog-image');
  let imageOpener = null;
  if (typeof dialog.showModal === 'function') {
    document.querySelectorAll('.image-button').forEach(link => {
      link.setAttribute('aria-haspopup', 'dialog');
      link.addEventListener('click', event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        imageOpener = link;
        dialogImage.src = link.href;
        dialogImage.alt = link.querySelector('img').alt;
        document.getElementById('dialog-title').textContent = link.dataset.title;
        dialog.showModal();
        document.documentElement.classList.add('scroll-lock');
      });
    });
    document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
      if (dialog.open) return;
      document.documentElement.classList.remove('scroll-lock');
      imageOpener.focus({ preventScroll: true });
      dialogImage.removeAttribute('src');
    });
  }

  // A lightweight 3D renderer with a perspective-projected wireframe.
  const canvas = document.getElementById('geometry');
  const ctx = canvas.getContext('2d');
  const scene = document.getElementById('scene');
  const motion = document.getElementById('motion');
  if (!ctx) {
    canvas.setAttribute('aria-label', 'Geometric illustration unavailable');
    document.getElementById('scene-hint').textContent = 'Geometric illustration unavailable';
    return;
  }
  const normalize = v => { const length = Math.hypot(...v); return v.map(n => n / length); };
  function coreMesh() {
    const t = (1 + Math.sqrt(5)) / 2;
    const vertices = [[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]].map(normalize);
    const triangles = [[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];
    const cache = new Map();
    function midpoint(a,b) {
      const key = [a,b].sort((x,y) => x-y).join(':');
      if (cache.has(key)) return cache.get(key);
      const index = vertices.length;
      vertices.push(normalize(vertices[a].map((value,i) => (value + vertices[b][i]) / 2)));
      cache.set(key,index); return index;
    }
    const faces = [];
    triangles.forEach(([a,b,c]) => { const ab=midpoint(a,b),bc=midpoint(b,c),ca=midpoint(c,a);faces.push([a,ab,ca],[b,bc,ab],[c,ca,bc],[ab,bc,ca]); });
    return { vertices, faces };
  }
  const skills = [
    'Python', 'Java', 'C++', 'TypeScript', 'Next.js', 'FastAPI',
    'PostgreSQL', 'Spring Boot', 'scikit-learn', 'Docker Compose', 'Git', 'GitHub Actions',
  ];
  const mesh = coreMesh();
  const uniqueEdges = new Map();
  for (const face of mesh.faces) {
    face.forEach((a, index) => {
      const b = face[(index + 1) % face.length];
      const key = a < b ? `${a}:${b}` : `${b}:${a}`;
      uniqueEdges.set(key, [a, b]);
    });
  }
  const edges = [...uniqueEdges.values()];
  let paused = false, sceneVisible = true, frame = 0, lastTime = 0, spin = .45, width = 0, height = 0;
  let rotationX=-.3,rotationY=.45,targetX=-.3,targetY=.45,activePointer=null,startX=0,startY=0;
  function rotate([x,y,z],rx,ry,rz=0) {
    let ay=y*Math.cos(rx)-z*Math.sin(rx),az=y*Math.sin(rx)+z*Math.cos(rx);
    let ax=x*Math.cos(ry)+az*Math.sin(ry);az=-x*Math.sin(ry)+az*Math.cos(ry);
    return [ax*Math.cos(rz)-ay*Math.sin(rz),ax*Math.sin(rz)+ay*Math.cos(rz),az];
  }
  function project([x,y,z]) {
    const scale = 4.8 / (4.8 + z),size=Math.min(width,height)*(width < 400 ? .24 : .28);
    return [width*.5 + x*size*scale,height*.47 + y*size*scale,z];
  }
  function drawSkillNodes(points) {
    const nodes = skills.map((skill, index) => ({
      point: points[index],
      skill,
    }));
    const fontSize = width < 400 ? 10 : 12;
    const labelHeight = fontSize + 4;
    ctx.font = `600 ${fontSize}px "DM Sans", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const labels = [];
    // Place the lowest nodes first so colliding labels can move up in the same column.
    nodes.sort((a, b) => b.point[1] - a.point[1]);
    for (const { point: [x, y, depth], skill } of nodes) {
      const halfWidth = Math.ceil(ctx.measureText(skill).width / 2) + 4;
      const left = x - halfWidth;
      const right = x + halfWidth;
      let top = y - labelHeight - 6;
      for (const placed of labels) {
        if (left < placed.right + 2 && right > placed.left - 2 &&
            top < placed.top + labelHeight + 2 && top + labelHeight + 2 > placed.top) {
          top = placed.top - labelHeight - 2;
        }
      }
      labels.push({ left, right, top });
      labels.sort((a, b) => b.top - a.top);
      ctx.beginPath();
      ctx.roundRect(left, top, halfWidth * 2, labelHeight, 4);
      ctx.fillStyle = '#080d1bee';
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(skill, x, top + labelHeight / 2);

      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = depth < 0 ? '#ffffff' : '#b8b8b8';
      ctx.fill();
    }
  }

  function draw() {
    if(!width||!height)return;
    ctx.clearRect(0,0,width,height);
    const points = mesh.vertices.map(vertex => project(rotate(vertex, rotationX, rotationY + spin, .12)));
    ctx.lineWidth = .9;
    for (const [a, b] of edges) {
      const [x1, y1, z1] = points[a];
      const [x2, y2, z2] = points[b];
      const opacity = .48 - .38 * (z1 + z2) / 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.stroke();
    }
    drawSkillNodes(points);
  }
  function canAnimate(){return !paused&&!reduced.matches&&sceneVisible&&!document.hidden;}
  function tick(now){frame=0;if(!canAnimate()){draw();return;}const delta=Math.min((now-lastTime)/1000,.05);lastTime=now;spin+=delta*.14;rotationX+=(targetX-rotationX)*.06;rotationY+=(targetY-rotationY)*.06;draw();frame=requestAnimationFrame(tick);}
  function start(){if(!frame&&canAnimate()){lastTime=performance.now();frame=requestAnimationFrame(tick);}else draw();}
  function updateMotion(){document.body.classList.toggle('motion-paused',paused||reduced.matches);motion.setAttribute('aria-pressed',String(paused||reduced.matches));motion.setAttribute('aria-label',paused||reduced.matches?'Resume animations':'Pause animations');motion.querySelector('span').textContent=paused||reduced.matches?'▷':'Ⅱ';motion.disabled=reduced.matches;document.getElementById('scene-hint').textContent=reduced.matches?'Reduced motion enabled':'Drag to rotate';if(!canAnimate()&&frame){cancelAnimationFrame(frame);frame=0;}start();}
  motion.addEventListener('click',()=>{paused=!paused;updateMotion();});
  function resize(){const bounds=canvas.getBoundingClientRect();width=bounds.width;height=bounds.height;const dpr=Math.min(devicePixelRatio||1,1.75);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
  if('ResizeObserver'in window)new ResizeObserver(resize).observe(canvas);else addEventListener('resize',resize);
  canvas.addEventListener('pointerdown', event => {
    if (reduced.matches || !event.isPrimary || event.button !== 0) return;
    activePointer = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', event => {
    if (reduced.matches || !width || !height) return;
    if (activePointer !== null) {
      if (event.pointerId !== activePointer) return;
      targetY += (event.clientX - startX) * .009;
      targetX += (event.clientY - startY) * .009;
      startX = event.clientX;
      startY = event.clientY;
    } else {
      if (!finePointer.matches || event.pointerType === 'touch') return;
      const bounds = canvas.getBoundingClientRect();
      targetX = -.3 + (event.clientY - bounds.top - height / 2) / height * .5;
      targetY = .45 + (event.clientX - bounds.left - width / 2) / width * .65;
    }
    if (paused) {
      rotationX = targetX;
      rotationY = targetY;
      draw();
    }
  });
  function endDrag(event) {
    if (event.pointerId !== activePointer) return;
    activePointer = null;
  }
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  canvas.addEventListener('lostpointercapture', endDrag);
  canvas.addEventListener('pointerleave', () => {
    if (activePointer === null && finePointer.matches) {
      targetX = -.3;
      targetY = .45;
    }
  });
  if('IntersectionObserver'in window){new IntersectionObserver(entries=>{sceneVisible=entries[0].isIntersecting;if(!sceneVisible&&frame){cancelAnimationFrame(frame);frame=0;}start();},{threshold:.01}).observe(scene);}
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0;}start();});
  reduced.addEventListener('change',()=>{paused=reduced.matches;document.documentElement.classList.toggle('js-motion',!reduced.matches);reveals.forEach(element=>element.classList.add('visible'));updateMotion();});
  resize();updateMotion();document.documentElement.dataset.ready='true';
})();
