/**
 * CONFIGURAÇÃO DOS LINKS EXTERNOS DA LOJA:
 * Se você tiver o link direto do perfil no iFood (com o UUID da loja), basta colar abaixo.
 * Caso contrário, o link padrão direciona para a busca oficial da loja no iFood.
 */
const CONFIG_LINKS = {
  // Link oficial e direto da loja no iFood com UUID verificado:
  ifoodUrl: 'https://www.ifood.com.br/delivery/rio-de-janeiro-rj/juliana-passos-bolo-caseiro-santissimo/9c33698d-069c-4eba-8e46-34d284d932b2',
  whatsappPhone: '5521972558199',
  instagramUser: 'julianapassos_bolocaseiro',
  // Link oficial do Google Maps da loja Juliana Passos Bolo Caseiro:
  mapsUrl: 'https://www.google.com/maps/place/Juliana+Passos+Bolo+Caseiro/@-22.8744722,-43.5296837,17z/data=!4m15!1m8!3m7!1s0x9be1adfcdc39af:0x16c41bec40064263!2sEstr.+do+Lameir%C3%A3o,+1447+-+Lj+D+-+Sant%C3%ADssimo,+Rio+de+Janeiro+-+RJ,+23092-031!3b1!8m2!3d-22.8744722!4d-43.5271034!16s%2Fg%2F11v44rs5d6!3m5!1s0x9be1695b0ba375:0x78b0a22354676479!8m2!3d-22.8745571!4d-43.5271192!16s%2Fg%2F11v6bkj5yf?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D',
  // Links diretos para cada publicação (cole a URL exata do post como https://www.instagram.com/p/.../):
  instagramPosts: {
    ninho: 'https://www.instagram.com/julianapassos_bolocaseiro/',
    chocolate: 'https://www.instagram.com/julianapassos_bolocaseiro/',
    churros: 'https://www.instagram.com/julianapassos_bolocaseiro/',
    cenoura: 'https://www.instagram.com/julianapassos_bolocaseiro/'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initExternalLinks();
  initParticles();
  init3DCake();
  initFlipCards();
  initMenuFilters();
  initStoreStatus();
  initMobileMenu();
  initHeaderScroll();
  initMenuModal();
  initInstagramModal();
});

function initExternalLinks() {
  if (CONFIG_LINKS.ifoodUrl) {
    const ifoodAnchors = document.querySelectorAll('a[href*="ifood.com.br"]');
    ifoodAnchors.forEach(a => {
      a.href = CONFIG_LINKS.ifoodUrl;
    });
  }

  // Atualiza os links para o Google Maps da loja
  if (CONFIG_LINKS.mapsUrl) {
    const mapsAnchors = document.querySelectorAll('a[href*="google.com/maps"]');
    mapsAnchors.forEach(a => {
      a.href = CONFIG_LINKS.mapsUrl;
    });
  }

  // Atualiza os links individuais para cada post do feed do Instagram
  if (CONFIG_LINKS.instagramPosts) {
    const postCards = document.querySelectorAll('.insta-post-card[data-post-id]');
    postCards.forEach(card => {
      const postId = card.getAttribute('data-post-id');
      if (CONFIG_LINKS.instagramPosts[postId]) {
        card.href = CONFIG_LINKS.instagramPosts[postId];
      }
    });
  }
}

/* ==========================================================================
   1. BOLO INTERATIVO 3D (THREE.JS)
   ========================================================================== */
function init3DCake() {
  const container = document.getElementById('hero-cake-canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth || 420;
  const height = container.clientHeight || 420;

  // Cena, Câmera e Renderizador
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
  camera.position.set(0, 4.2, 7.8);
  camera.lookAt(0, 0.5, 0);

  const isMobile = window.innerWidth < 768;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.6 : 2));
  renderer.shadowMap.enabled = !isMobile;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  container.appendChild(renderer.domElement);

  // Iluminação de Estúdio Confeitaria Gourmet (Contraste refinado para fundo escuro)
  const ambientLight = new THREE.AmbientLight(0xffe8fa, 1.4);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 2.2);
  mainLight.position.set(5, 10, 6);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 1024;
  mainLight.shadow.mapSize.height = 1024;
  scene.add(mainLight);

  const violetRimLight = new THREE.PointLight(0xd958ff, 2.0, 25);
  violetRimLight.position.set(-6, 3, -2);
  scene.add(violetRimLight);

  const warmRimLight = new THREE.PointLight(0xffd199, 1.3, 25);
  warmRimLight.position.set(2, 6, -6);
  scene.add(warmRimLight);

  // Grupo principal do bolo
  const cakeGroup = new THREE.Group();
  scene.add(cakeGroup);

  // Paleta de materiais para os sabores
  const flavorPalettes = {
    ninho: {
      spongeColor: 0xe8ba72,     // Massa fofinha dourada
      glazeColor: 0xfdfbf7,      // Calda aveludada de Leite Ninho (esbranquiçada cremosa)
      glazeRoughness: 0.18,
      glazeMetalness: 0.05,
      hasStrawberries: true,
      hasSprinkles: true,
      sprinkleColor: 0xe82c54
    },
    chocolate: {
      spongeColor: 0x3d1b11,     // Bolo de cacau intenso
      glazeColor: 0x240e07,      // Ganache de chocolate belga bem brilhante
      glazeRoughness: 0.1,
      glazeMetalness: 0.12,
      hasStrawberries: true,
      hasSprinkles: true,
      sprinkleColor: 0xc9933b
    },
    morango: {
      spongeColor: 0xdf8436,     // Massa de cenoura dourada
      glazeColor: 0x42130c,      // Calda vulcão de brigadeiro gourmet
      glazeRoughness: 0.12,
      glazeMetalness: 0.08,
      hasStrawberries: true,
      hasSprinkles: true,
      sprinkleColor: 0xff3b62
    }
  };

  // --- 1. Prato de Cerâmica Branco com Friso Dourado ---
  const plateGeo = new THREE.CylinderGeometry(3.6, 3.2, 0.22, 64);
  const plateMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.2,
    metalness: 0.1
  });
  const plate = new THREE.Mesh(plateGeo, plateMat);
  plate.position.y = -0.7;
  plate.receiveShadow = true;
  cakeGroup.add(plate);

  const goldRimGeo = new THREE.TorusGeometry(3.58, 0.035, 16, 64);
  const goldRimMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    roughness: 0.3,
    metalness: 0.8
  });
  const goldRim = new THREE.Mesh(goldRimGeo, goldRimMat);
  goldRim.rotation.x = Math.PI / 2;
  goldRim.position.y = -0.59;
  cakeGroup.add(goldRim);

  // --- 2. Massa do Bolo (Bundt com gomos artesanais) ---
  const spongeGeo = new THREE.CylinderGeometry(2.5, 2.75, 1.7, 48);
  const spongeMat = new THREE.MeshStandardMaterial({
    color: flavorPalettes.ninho.spongeColor,
    roughness: 0.85,
    metalness: 0.0
  });
  const cakeSponge = new THREE.Mesh(spongeGeo, spongeMat);
  cakeSponge.position.y = 0.25;
  cakeSponge.castShadow = true;
  cakeSponge.receiveShadow = true;
  cakeGroup.add(cakeSponge);

  // Furo central característico do bolo caseiro vulcão
  const holeGeo = new THREE.CylinderGeometry(0.75, 0.65, 1.8, 32);
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0xc49354,
    roughness: 0.85
  });
  const innerHole = new THREE.Mesh(holeGeo, holeMat);
  innerHole.position.y = 0.25;
  cakeGroup.add(innerHole);

  // --- 3. Calda Vulcão com Quedas / Drips ---
  const glazeTopGeo = new THREE.CylinderGeometry(2.54, 2.62, 0.45, 48);
  const glazeMat = new THREE.MeshStandardMaterial({
    color: flavorPalettes.ninho.glazeColor,
    roughness: flavorPalettes.ninho.glazeRoughness,
    metalness: flavorPalettes.ninho.glazeMetalness
  });
  const glazeTop = new THREE.Mesh(glazeTopGeo, glazeMat);
  glazeTop.position.y = 1.05;
  glazeTop.castShadow = true;
  cakeGroup.add(glazeTop);

  // Poça vulcão no centro
  const volcanoCenterGeo = new THREE.CylinderGeometry(0.72, 0.65, 0.3, 32);
  const volcanoCenter = new THREE.Mesh(volcanoCenterGeo, glazeMat);
  volcanoCenter.position.y = 1.0;
  cakeGroup.add(volcanoCenter);

  // Gotas / Drips escorrendo pelas laterais
  const dripsGroup = new THREE.Group();
  const dripCount = 14;
  for (let i = 0; i < dripCount; i++) {
    const angle = (i / dripCount) * Math.PI * 2;
    const dripLen = 0.5 + Math.sin(i * 3.4) * 0.35 + Math.cos(i * 1.8) * 0.2;
    const dripGeo = new THREE.ConeGeometry(0.24, dripLen, 16);
    const drip = new THREE.Mesh(dripGeo, glazeMat);
    
    const radius = 2.65;
    drip.position.x = Math.cos(angle) * radius;
    drip.position.z = Math.sin(angle) * radius;
    drip.position.y = 0.9 - (dripLen / 2);
    drip.rotation.x = Math.PI; // Apontando para baixo
    dripsGroup.add(drip);

    // Gotícula redonda na ponta
    const dropSphereGeo = new THREE.SphereGeometry(0.13, 16, 16);
    const dropSphere = new THREE.Mesh(dropSphereGeo, glazeMat);
    dropSphere.position.x = drip.position.x;
    dropSphere.position.z = drip.position.z;
    dropSphere.position.y = 0.9 - dripLen;
    dripsGroup.add(dropSphere);
  }
  cakeGroup.add(dripsGroup);

  // --- 4. Morangos Frescos Esculpidos no Topo (Design Orgânico Hiper-Apetitosa) ---
  const toppingsGroup = new THREE.Group();

  function createStrawberry(scale = 1.0) {
    const sGroup = new THREE.Group();

    // 1. Corpo sólido do morango (pontos ordenados de baixo para cima garantem normais 100% externas)
    const points = [
      new THREE.Vector2(0.0, -0.36 * scale),
      new THREE.Vector2(0.05 * scale, -0.34 * scale),
      new THREE.Vector2(0.14 * scale, -0.22 * scale),
      new THREE.Vector2(0.24 * scale, -0.06 * scale),
      new THREE.Vector2(0.32 * scale, 0.12 * scale),
      new THREE.Vector2(0.33 * scale, 0.25 * scale),
      new THREE.Vector2(0.26 * scale, 0.36 * scale),
      new THREE.Vector2(0.13 * scale, 0.41 * scale),
      new THREE.Vector2(0.0, 0.42 * scale)
    ];

    const berryGeo = new THREE.LatheGeometry(points, 32);
    berryGeo.computeVertexNormals();

    const berryMat = new THREE.MeshStandardMaterial({
      color: 0xc80d27,          // Vermelho rubi vivo de morango fresco
      roughness: 0.14,          // Brilho úmido apetitoso
      metalness: 0.04,
      emissive: 0x220005,       // Calor interno
      emissiveIntensity: 0.35,
      side: THREE.DoubleSide    // Garante solidez total sem recortes ou transparências
    });
    const berry = new THREE.Mesh(berryGeo, berryMat);
    berry.castShadow = true;
    sGroup.add(berry);

    // 2. Sementinhas douradas (aquênios) salpicadas no morango
    const seedMat = new THREE.MeshStandardMaterial({ color: 0xdfb445, roughness: 0.4 });
    const seedGeo = new THREE.SphereGeometry(0.016 * scale, 6, 6);
    for (let sd = 0; sd < 26; sd++) {
      const seed = new THREE.Mesh(seedGeo, seedMat);
      const u = Math.random();
      const v = Math.random() * Math.PI * 2;
      const radiusAtY = (0.30 - u * 0.24) * scale;
      const yPos = (0.33 - u * 0.58) * scale;
      seed.position.x = Math.cos(v) * (radiusAtY + 0.008);
      seed.position.z = Math.sin(v) * (radiusAtY + 0.008);
      seed.position.y = yPos;
      seed.scale.set(0.7, 1.4, 0.7);
      sGroup.add(seed);
    }

    // 3. Cálice e Sépalas (Cálice verde sólido que veda perfeitamente o topo do morango)
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x247530,
      roughness: 0.45,
      side: THREE.DoubleSide
    });

    // Disco base do cálice no topo (elimina qualquer possibilidade de buraco ou disco branco)
    const calyxBaseGeo = new THREE.CylinderGeometry(0.12 * scale, 0.14 * scale, 0.03 * scale, 16);
    const calyxBase = new THREE.Mesh(calyxBaseGeo, leafMat);
    calyxBase.position.y = 0.415 * scale;
    sGroup.add(calyxBase);

    // 6 Sépalas verdes desenhadas que abraçam o topo do morango
    const leafCount = 6;
    for (let l = 0; l < leafCount; l++) {
      const lAngle = (l / leafCount) * Math.PI * 2;
      const leafGeo = new THREE.ConeGeometry(0.075 * scale, 0.24 * scale, 4);
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      
      leaf.position.x = Math.cos(lAngle) * (0.13 * scale);
      leaf.position.z = Math.sin(lAngle) * (0.13 * scale);
      leaf.position.y = 0.395 * scale;
      
      leaf.rotation.y = lAngle;
      leaf.rotation.z = Math.cos(lAngle) * 0.38;
      leaf.rotation.x = Math.sin(lAngle) * 0.38;
      sGroup.add(leaf);
    }

    // Cabinho central realista
    const stemGeo = new THREE.CylinderGeometry(0.025 * scale, 0.035 * scale, 0.16 * scale, 8);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x1a5824, roughness: 0.6 });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.y = 0.48 * scale;
    stem.rotation.z = 0.12;
    sGroup.add(stem);

    return sGroup;
  }

  // Posicionar morangos em coroa harmônica no topo
  const strawberryCount = 7;
  for (let s = 0; s < strawberryCount; s++) {
    const angle = (s / strawberryCount) * Math.PI * 2;
    const sRadius = 1.65;
    const berryObj = createStrawberry(1.1);
    berryObj.position.x = Math.cos(angle) * sRadius;
    berryObj.position.z = Math.sin(angle) * sRadius;
    berryObj.position.y = 1.35;
    berryObj.rotation.y = angle;
    berryObj.rotation.z = 0.15;
    toppingsGroup.add(berryObj);
  }

  // Morango principal no centro
  const centerBerry = createStrawberry(1.3);
  centerBerry.position.set(0, 1.42, 0);
  toppingsGroup.add(centerBerry);

  // Confeitos / Granulados salpicados
  const sprinklesMat = new THREE.MeshStandardMaterial({
    color: flavorPalettes.ninho.sprinkleColor,
    roughness: 0.3
  });
  const sprinklesGroup = new THREE.Group();
  for (let sp = 0; sp < 40; sp++) {
    const spGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.14, 8);
    const sprinkle = new THREE.Mesh(spGeo, sprinklesMat);
    const spRadius = 0.9 + Math.random() * 1.5;
    const spAngle = Math.random() * Math.PI * 2;
    sprinkle.position.x = Math.cos(spAngle) * spRadius;
    sprinkle.position.z = Math.sin(spAngle) * spRadius;
    sprinkle.position.y = 1.28 + Math.random() * 0.05;
    sprinkle.rotation.x = Math.random() * Math.PI;
    sprinkle.rotation.y = Math.random() * Math.PI;
    sprinklesGroup.add(sprinkle);
  }
  toppingsGroup.add(sprinklesGroup);

  cakeGroup.add(toppingsGroup);

  // Leve inclinação para perspectiva apetitosa
  cakeGroup.rotation.x = 0.22;

  // --- Interatividade de Arrastar / Rotacionar Multiplataforma ---
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let touchStartPos = { x: 0, y: 0 };
  let isTouchGesture = false;
  let autoRotate = true;
  let autoRotateSpeed = 0.005;

  function onPointerDown(e) {
    isDragging = true;
    autoRotate = false;
    isTouchGesture = Boolean(e.touches);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    previousMousePosition = { x: clientX, y: clientY };
    touchStartPos = { x: clientX, y: clientY };
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - previousMousePosition.x;
    const deltaY = clientY - previousMousePosition.y;

    // Em celular/tablet: se o usuário estiver fazendo um movimento prioritariamente vertical,
    // permitimos a rolagem suave da página sem prender o dedo
    if (isTouchGesture) {
      const totalDx = Math.abs(clientX - touchStartPos.x);
      const totalDy = Math.abs(clientY - touchStartPos.y);

      if (totalDy > totalDx * 1.6 && totalDy > 15) {
        // Movimento vertical evidente: não bloqueia a rolagem do celular
        isDragging = false;
        return;
      }
    }

    // Rotação horizontal suave (360°) e inclinação sutil vertical
    cakeGroup.rotation.y += deltaX * 0.009;
    cakeGroup.rotation.x += deltaY * 0.004;

    // Trava para não virar de cabeça para baixo
    cakeGroup.rotation.x = Math.max(-0.2, Math.min(0.7, cakeGroup.rotation.x));

    previousMousePosition = { x: clientX, y: clientY };
  }

  function onPointerUp() {
    isDragging = false;
    setTimeout(() => {
      if (!isDragging) autoRotate = true;
    }, 3000);
  }

  const canvasEl = renderer.domElement;
  canvasEl.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  canvasEl.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp, { passive: true });

  // Botões de Troca de Sabor
  const flavorBtns = document.querySelectorAll('.flavor-btn');
  flavorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      flavorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const flavorKey = btn.getAttribute('data-flavor');
      const palette = flavorPalettes[flavorKey];
      if (!palette) return;

      spongeMat.color.setHex(palette.spongeColor);
      glazeMat.color.setHex(palette.glazeColor);
      glazeMat.roughness = palette.glazeRoughness;
      glazeMat.metalness = palette.glazeMetalness;
      sprinklesMat.color.setHex(palette.sprinkleColor);

      let pulseScale = 1.08;
      cakeGroup.scale.set(pulseScale, pulseScale, pulseScale);
      setTimeout(() => {
        cakeGroup.scale.set(1.0, 1.0, 1.0);
      }, 250);
    });
  });

  // Loop de Renderização com Otimização de Bateria e GPU (IntersectionObserver)
  let isCanvasInView = true;
  let animationFrameId = null;

  function animate() {
    if (!isCanvasInView) {
      animationFrameId = null;
      return;
    }

    if (autoRotate) {
      cakeGroup.rotation.y += autoRotateSpeed;
    }

    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(animate);
  }

  // Pausa a renderização 3D quando o bolo não estiver na tela (economiza até 90% de bateria no celular/tablet)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isCanvasInView = entry.isIntersecting;
        if (isCanvasInView && !animationFrameId) {
          animate();
        }
      });
    }, { threshold: 0.05 });
    observer.observe(container);
  } else {
    animate();
  }

  // Redimensionamento responsivo inteligente
  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth || 420;
    const newHeight = container.clientHeight || 420;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);

    const isNowMobile = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isNowMobile ? 1.6 : 2));
  });
}

/* ==========================================================================
   2. CARDS 3D DO CARDÁPIO (FLIP EM 3D & FICHA TÉCNICA)
   ========================================================================== */
function initFlipCards() {
  const flipCards = document.querySelectorAll('.cake-flip-card');

  flipCards.forEach(card => {
    const flipBtn = card.querySelector('.btn-flip-hint');
    const unflipBtn = card.querySelector('.btn-unflip');
    const inner = card.querySelector('.cake-flip-card-inner');

    function toggleCardFlip(forceState = null) {
      if (inner) {
        inner.style.transform = ''; // Limpa transform inline de parallax para rotação 3D limpa
      }
      if (forceState !== null) {
        if (forceState) {
          card.classList.add('is-flipped');
        } else {
          card.classList.remove('is-flipped');
        }
      } else {
        card.classList.toggle('is-flipped');
      }
    }

    if (flipBtn) {
      flipBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleCardFlip();
      });
    }

    if (unflipBtn) {
      unflipBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleCardFlip(false);
      });
    }

    // Permite tocar/clicar em qualquer área neutra do card para girar em 3D
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('.card-action-btns') || e.target.closest('.back-order-actions') || e.target.closest('button')) {
        return;
      }
      toggleCardFlip();
    });

    // Efeito de inclinação 3D no mousemove apenas quando o card NÃO estiver virado
    card.addEventListener('mousemove', (e) => {
      if (card.classList.contains('is-flipped')) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 10;
      const rotateY = (x / rect.width) * 10;

      if (inner) {
        inner.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (inner && !card.classList.contains('is-flipped')) {
        inner.style.transform = '';
      }
    });
  });
}

/* ==========================================================================
   3. FILTROS DO CARDÁPIO
   ========================================================================== */
function initMenuFilters() {
  const filterBtns = document.querySelectorAll('.menu-filter-btn');
  const cards = document.querySelectorAll('.cake-flip-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   4. STATUS EM TEMPO REAL DA CONFEITARIA
   ========================================================================== */
function initStoreStatus() {
  const statusEl = document.getElementById('live-store-status');
  if (!statusEl) return;

  const now = new Date();
  const currentHour = now.getHours();
  // Horário: 09:00 às 20:00
  const isOpen = currentHour >= 9 && currentHour < 20;

  if (isOpen) {
    statusEl.innerHTML = `
      <span class="status-indicator-dot"></span>
      Aberto agora • Fecha às 20:00
    `;
    statusEl.className = 'open-status-badge';
  } else {
    statusEl.innerHTML = `
      <span class="status-indicator-dot" style="background:#ea1d2c;"></span>
      Fechado agora • Abre às 09:00
    `;
    statusEl.className = 'open-status-badge';
    statusEl.style.background = 'rgba(234, 29, 44, 0.12)';
    statusEl.style.color = '#c01421';
  }
}

/* ==========================================================================
   5. MENU MOBILE RESPONSIVO
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const icon = toggleBtn.querySelector('i');
    if (navMenu.classList.contains('open')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const icon = toggleBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    });
  });
}

/* ==========================================================================
   6. HEADER SCROLL EFFECT
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   7. MODAL DE CARDÁPIO COMPLETO
   ========================================================================== */
function initMenuModal() {
  const openBtn = document.getElementById('btn-open-menu-modal');
  const modal = document.getElementById('full-menu-modal');
  const closeBtn = document.getElementById('btn-close-modal');

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   8. MODAL DE PRÉ-VISUALIZAÇÃO DO INSTAGRAM (FEED ARTESANAL)
   ========================================================================== */
function initInstagramModal() {
  const modal = document.getElementById('insta-post-modal');
  const closeBtn = document.getElementById('btn-close-insta-modal');
  const postCards = document.querySelectorAll('.insta-post-card');

  if (!modal) return;

  const modalImg = document.getElementById('insta-modal-img');
  const modalLikes = document.getElementById('insta-modal-likes-count');
  const modalCaption = document.getElementById('insta-modal-caption');
  const modalCommentUser = document.getElementById('insta-modal-comment-user');
  const modalCommentText = document.getElementById('insta-modal-comment-text');
  const modalWaBtn = document.getElementById('insta-modal-wa-btn');
  const likeBtn = document.getElementById('insta-modal-like-btn');

  postCards.forEach(card => {
    function openPost() {
      const cakeTitle = card.getAttribute('data-cake-title') || 'Bolo Caseiro';
      const cakeImg = card.getAttribute('data-cake-img') || (card.querySelector('img') ? card.querySelector('img').src : '');
      const likes = card.getAttribute('data-likes') || '412';
      const caption = card.getAttribute('data-caption') || '';
      const commentUser = card.getAttribute('data-comment-user') || '@cliente';
      const commentText = card.getAttribute('data-comment-text') || 'Delicioso!';

      if (modalImg) modalImg.src = cakeImg;
      if (modalLikes) modalLikes.textContent = `${likes} curtidas`;
      if (modalCaption) modalCaption.textContent = caption;
      if (modalCommentUser) modalCommentUser.textContent = commentUser;
      if (modalCommentText) modalCommentText.textContent = commentText;

      // WhatsApp com mensagem personalizada para pedir exatamente esse bolo
      if (modalWaBtn) {
        const text = encodeURIComponent(`Olá Juliana! Vi a foto do *${cakeTitle}* no site e gostaria de encomendar!`);
        modalWaBtn.href = `https://wa.me/5521972558199?text=${text}`;
      }

      // Resetar estado de like
      if (likeBtn) {
        likeBtn.classList.remove('liked');
        const heartIcon = likeBtn.querySelector('i');
        if (heartIcon) heartIcon.className = 'fa-regular fa-heart';
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    card.addEventListener('click', openPost);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPost();
      }
    });
  });

  // Interação de curtir no modal
  if (likeBtn) {
    likeBtn.addEventListener('click', () => {
      likeBtn.classList.toggle('liked');
      const heartIcon = likeBtn.querySelector('i');
      if (likeBtn.classList.contains('liked')) {
        heartIcon.className = 'fa-solid fa-heart';
      } else {
        heartIcon.className = 'fa-regular fa-heart';
      }
    });
  }

  // Fechar Modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   8. CHUVA GLOBAL DE PÉTALAS E CORAÇÕES VIOLETA GLOW (FIEL À IMAGEM)
   ========================================================================== */
function initParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;
  container.innerHTML = '';

  const screenWidth = window.innerWidth;
  const totalPetals = screenWidth < 768 ? 22 : (screenWidth <= 1024 ? 32 : 45);

  for (let i = 0; i < totalPetals; i++) {
    const el = document.createElement('div');
    el.className = 'petal-particle';

    const isHeart = Math.random() < 0.28; // 28% mini-corações, 72% pétalas de rosa
    const isBokeh = Math.random() < 0.25; // 25% com desfoque de profundidade (bokeh)

    if (isBokeh) {
      el.classList.add(Math.random() < 0.5 ? 'blurred' : 'medium-blur');
    }

    // Distribuição: concentração maior na lateral direita (65%), como na imagem de referência
    let leftPercent;
    if (Math.random() < 0.65) {
      leftPercent = 52 + Math.random() * 46; // 52% a 98%
    } else {
      leftPercent = 2 + Math.random() * 50;  // 2% a 52%
    }

    const duration = 10 + Math.random() * 14;     // 10s a 24s
    const delay = Math.random() * 20;             // até 20s de delay
    const driftX = -60 + Math.random() * 110;     // desvio lateral orgânico
    const rotX = 180 + Math.random() * 540;
    const rotY = 180 + Math.random() * 540;
    const rotZ = 90 + Math.random() * 360;
    const opacity = 0.45 + Math.random() * 0.45;

    el.style.left = `${leftPercent}%`;
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay = `-${delay}s`;
    el.style.setProperty('--drift-x', `${driftX}px`);
    el.style.setProperty('--rot-x', `${rotX}deg`);
    el.style.setProperty('--rot-y', `${rotY}deg`);
    el.style.setProperty('--rot-z', `${rotZ}deg`);
    el.style.setProperty('--particle-opacity', opacity);

    if (isHeart) {
      el.classList.add('heart');
      el.textContent = '♥';
      const size = 11 + Math.random() * 15;
      el.style.fontSize = `${size}px`;
    } else {
      const width = 16 + Math.random() * 26;
      const height = width * (1.15 + Math.random() * 0.35);
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;

      const innerShape = document.createElement('div');
      innerShape.className = 'petal-shape';
      innerShape.style.setProperty('--inner-rot', `${Math.random() * 360}deg`);
      el.appendChild(innerShape);
    }

    container.appendChild(el);
  }
}
