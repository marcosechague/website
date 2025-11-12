// Alternativa con foto real

<div className={styles.avatarPhoto}>
  <img 
    src="/images/marcos-avatar.jpg" 
    alt="Marcos Echague"
    className={styles.photoImage}
  />
</div>

// CSS
.photoImage {
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 50%;
filter: brightness(1.1) contrast(1.1);
transition: all 0.3s ease;
}

.photoImage:hover {
transform: scale(1.05);
filter: brightness(1.2) contrast(1.2);
}

### **3. Avatar SVG Personalizado 🎨**

// Avatar vectorial personalizado
<svg className={styles.avatarSvg} viewBox="0 0 200 200">
{/_ Cara _/}
<circle cx="100" cy="100" r="80" fill="#FFD1A9"/>

{/_ Cabello _/}
<path d="M30 80 Q100 20 170 80 Q170 60 100 40 Q30 60 30 80" fill="#8B4513"/>

{/_ Ojos _/}
<circle cx="70" cy="85" r="8" fill="#000"/>
<circle cx="130" cy="85" r="8" fill="#000"/>

{/_ Sonrisa _/}
<path d="M70 120 Q100 140 130 120" stroke="#000" strokeWidth="3" fill="none"/>

{/_ Lentes (opcional) _/}
<circle cx="70" cy="85" r="20" fill="none" stroke="#000" strokeWidth="2"/>
<circle cx="130" cy="85" r="20" fill="none" stroke="#000" strokeWidth="2"/>
<path d="M90 85 L110 85" stroke="#000" strokeWidth="2"/>
</svg>

### **4. Avatar con Lottie Animation 🎬**

// Animación avanzada
import Lottie from 'lottie-react';
import avatarAnimation from './animations/avatar.json';

<Lottie 
  animationData={avatarAnimation}
  className={styles.lottieAvatar}
  loop={true}
  autoplay={true}
/>

### **5. Avatar con Three.js 🌐**

// Avatar 3D completo con Three.js
import { Canvas } from '@react-three-fiber';
import { useGLTF } from '@react-three-drei';

function AvatarModel() {
const { scene } = useGLTF('/models/avatar.glb');
return <primitive object={scene} scale={[2, 2, 2]} />;
}

<Canvas className={styles.threeAvatar}>
  <ambientLight intensity={0.5} />
  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
  <AvatarModel />
</Canvas>
