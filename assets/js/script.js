// Gem Universe - THREE.js Gem Rendering Engine
// Referenced instructions from .github/instructions/project.instructions.md

console.log('Script loaded, waiting for THREE.js');

// Scene configuration
let scene, camera, renderer, gem, controls;
const gemProperties = {
  color: '#FF6B6B',
  roughness: 0.1,
  metalness: 0.0,
  shape: 'diamond'
};

// Initialize the THREE.js scene
function initScene() {
  const container = document.getElementById('gemCanvasContainer');
  if (!container) {
    console.error('Canvas container not found!');
    return;
  }
  
  // Get container dimensions
  const width = container.clientWidth;
  const height = container.clientHeight;
  
  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a2e);
  console.log('Scene created with background color');
  
  // Setup camera with correct aspect ratio
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 2;
  console.log('Camera positioned at:', camera.position);
  
  // Setup renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  container.appendChild(renderer.domElement);
  console.log('Renderer initialized and added to container, size:', width, 'x', height);
  
  // Add lighting - realistic gem lighting setup
  addLighting();
  
  // Setup smooth environment for clean reflections
  setupEnvironment(renderer, scene);
  
  // Create initial gem
  createGem();
  
  // Setup animation loop
  animate();
  console.log('Animation loop started');
  
  // Handle window resize
  window.addEventListener('resize', onWindowResize);
}

// Add realistic lighting for gemstone rendering
function addLighting() {
  // Main directional light (key light)
  const keyLight = new THREE.DirectionalLight(0xffffff, .6);
  keyLight.position.set(5, 5, 5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  scene.add(keyLight);
  
  // Fill light to reduce harsh shadows
  const fillLight = new THREE.DirectionalLight(0x7f7fff, 0.6);
  fillLight.position.set(-5, 3, -5);
  scene.add(fillLight);
  
  // Rim light for dramatic effect
  const rimLight = new THREE.DirectionalLight(0xff00ff, 0.4);
  rimLight.position.set(-3, 0, 5);
  scene.add(rimLight);
  
  // Ambient light for base illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambientLight);
}

// Create a smooth environment map for gemstone reflections
function setupEnvironment(renderer, scene) {
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;

  const ctx = canvas.getContext('2d');

  // Dark background
  ctx.fillStyle = '#050510';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Soft radial light source
  const glow = ctx.createRadialGradient(
    canvas.width * 0.5,
    canvas.height * 0.3,
    10,
    canvas.width * 0.5,
    canvas.height * 0.3,
    180
  );

glow.addColorStop(0.0, '#ffffff');
glow.addColorStop(0.15, '#bbbbff');
glow.addColorStop(0.4, '#333366');
glow.addColorStop(1.0, '#050510');

  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Convert canvas to texture
  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;

  // Generate PMREM for high quality reflections
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const envMap = pmremGenerator.fromEquirectangular(texture).texture;

  // Apply environment
  scene.environment = envMap;

  // Keep background dark
  scene.background = new THREE.Color(0x050510);

  // Cleanup
  texture.dispose();
  pmremGenerator.dispose();
}

// Create gem geometry with realistic diamond cut
function createGemGeometry(shape = 'diamond') {
  let geometry;
  
  if (shape === 'diamond') {
    // Create angular diamond/brilliant cut gem - tall pyramid-like shape
    geometry = new THREE.ConeGeometry(0.7, 1.4, 8, 4);
  } else if (shape === 'cube') {
    // Rectangular cushion cut
    geometry = new THREE.BoxGeometry(0.6, 0.9, 0.45, 8, 8, 8);
  } else if (shape === 'sphere') {
    // Round brilliant cut
    geometry = new THREE.SphereGeometry(0.8, 48, 48);
  } else if (shape === 'fancy') {
    // Elongated diamond shape - almond/eye shape
    const points = [];
    for (let i = 0; i < 48; i++) {
      const angle = (i / 48) * Math.PI * 2;
      // Create an almond/marquise curve using sine wave
      const curve = 0.3 + 0.5 * Math.cos(angle);
      const x = Math.cos(angle) * curve * 1.2;
      const y = Math.sin(angle) * 0.8;
      points.push(new THREE.Vector2(x, y));
    }
    geometry = new THREE.LatheGeometry(points, 48);
  } else {
    // Fallback to octahedron (also angular)
    geometry = new THREE.OctahedronGeometry(0.8, 5);
  }
  
  return geometry;
}

// Create the gem with realistic material properties
function createGem() {
  // Remove existing gem
  if (gem) {
    scene.remove(gem);
  }
  
  console.log('Creating gem with properties:', gemProperties);
  const geometry = createGemGeometry(gemProperties.shape);
  console.log('Geometry created');
  
const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(gemProperties.color),

    transmission: 0.85,
    thickness: 0.4,

    roughness: 0.02,
    metalness: 0.0,

    clearcoat: 0.5,
    clearcoatRoughness: 0.02,

    ior: 2.42,

    envMapIntensity: 1.0,

    side: THREE.FrontSide
});
  
  gem = new THREE.Mesh(geometry, material);
  gem.castShadow = true;
  gem.receiveShadow = true;
  scene.add(gem);
  console.log('Gem added to scene');
}

// Parse gem description and update properties
function parseGemDescription(description) {
  console.log('=== PARSING GEM DESCRIPTION ===');
  console.log('Description:', description);
  const desc = description.toLowerCase();
  
  // Color detection
  if (desc.includes('red') || desc.includes('ruby')) {
    gemProperties.color = '#E71930';
  } else if (desc.includes('blue') || desc.includes('sapphire')) {
    gemProperties.color = '#0047AB';
  } else if (desc.includes('green') || desc.includes('emerald')) {
    gemProperties.color = '#50C878';
  } else if (desc.includes('yellow') || desc.includes('gold')) {
    gemProperties.color = '#FFD700';
  } else if (desc.includes('purple') || desc.includes('amethyst')) {
    gemProperties.color = '#9966CC';
  } else if (desc.includes('pink')) {
    gemProperties.color = '#FF69B4';
  } else if (desc.includes('white') || desc.includes('clear') || desc.includes('diamond')) {
    gemProperties.color = '#FFFFFF';
  }
  
  // Shape detection
  if (desc.includes('round') || desc.includes('brilliant') || desc.includes('sphere') || desc.includes('ball')) {
    gemProperties.shape = 'sphere';
  } else if (desc.includes('emerald') || desc.includes('asscher') || desc.includes('cushion') || desc.includes('square')) {
    gemProperties.shape = 'cube';
  } else if (desc.includes('marquise') || desc.includes('oval') || desc.includes('pear') || desc.includes('fancy') || desc.includes('almond')) {
    gemProperties.shape = 'fancy';
  } else {
    // Default to diamond/cone for classic cuts
    gemProperties.shape = 'diamond';
  }

  
  // Clarity/Transparency detection
  if (desc.includes('opaque') || desc.includes('cloudy')) {
    gemProperties.roughness = 0.06;
    gemProperties.metalness = 0.3;
  } else if (desc.includes('clear') || desc.includes('transparent')) {
    gemProperties.roughness = 0.005;
    gemProperties.metalness = 0.0;
  }
  
  console.log('Final gem properties:', gemProperties);
  createGem();
  console.log('=== GEM DESCRIPTION PARSING COMPLETE ===');
}

// Animation loop with gem rotation
function animate() {
  requestAnimationFrame(animate);
  
  if (gem) {
    // Smooth rotation for visual appeal
    gem.rotation.x += 0.003;
    gem.rotation.y += 0.005;
  }
  
  renderer.render(scene, camera);
  
  // Log render info every 60 frames (about once per second at 60fps)
  if (!window.renderCount) window.renderCount = 0;
  if (++window.renderCount % 60 === 0) {
    console.log('Rendering..., gem visible:', !!gem, 'at position:', gem ? gem.position : 'no gem');
  }
}

// Handle window resize responsively
function onWindowResize() {
  const container = document.getElementById('gemCanvasContainer');
  if (!container || !camera || !renderer) return;
  
  const width = container.clientWidth;
  const height = container.clientHeight;
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// Setup form event listeners
function setupFormListener() {
  const form = document.getElementById('gemForm');
  const submitBtn = document.getElementById('submitBtn');
  const resultContainer = document.getElementById('resultContainer');
  const errorContainer = document.getElementById('errorContainer');
  
  console.log('Setting up form listener, form element:', form);
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Form submitted');
      
      const description = document.getElementById('gemDescription').value.trim();
      console.log('Description:', description);
      
      if (!description) {
        console.log('No description provided');
        return;
      }
      
      // Hide previous results
      resultContainer.classList.add('hidden');
      errorContainer.classList.add('hidden');
      
      // Show loading state
      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.innerHTML = '<span class="loading-spinner"></span>Rendering...';
      
      // Small delay to show loading state and ensure animation frame
      setTimeout(() => {
        try {
          console.log('Parsing gem description');
          parseGemDescription(description);
          console.log('Gem description parsed');
          
          // Show success result
          resultContainer.classList.remove('hidden');
          
          // Restore button
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        } catch (error) {
          console.error('Error rendering gem:', error);
          // Show error
          document.getElementById('errorContent').textContent = `Error: ${error.message}`;
          errorContainer.classList.remove('hidden');
          
          // Restore button
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }, 300);
    });
  } else {
    console.error('Form element not found!');
  }
}

// Wait for THREE.js to be available
function waitForTHREE(attempts = 0) {
  if (typeof THREE === 'undefined') {
    if (attempts > 50) {
      const errorMsg = 'THREE.js failed to load. Check CDN connection.';
      console.error(errorMsg);
      // Show error on page
      const errorContainer = document.getElementById('errorContainer');
      if (errorContainer) {
        errorContainer.classList.remove('hidden');
        document.getElementById('errorContent').textContent = errorMsg;
      }
      return;
    }
    if (attempts % 10 === 0) {
      console.log('Waiting for THREE.js... attempt', attempts);
    }
    setTimeout(() => waitForTHREE(attempts + 1), 100);
    return;
  }
  console.log('THREE.js loaded successfully after', attempts, 'attempts');
  initializeApp();
}

// Initialize after THREE is available
function initializeApp() {
  console.log('Initializing app');
  try {
    initScene();
    console.log('Scene initialized');
    setupFormListener();
    console.log('Form listener setup complete');
  } catch (error) {
    console.error('Initialization error:', error);
  }
}

// Initialize on page load - handle both DOMContentLoaded and already-loaded cases
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired');
    waitForTHREE();
  });
} else {
  console.log('DOM already loaded, initializing directly');
  waitForTHREE();
}
