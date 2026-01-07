import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

function NetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number>();
  const isInitializedRef = useRef(false);
  const lastWidthRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuración - menos nodos en móviles
    const isMobile = window.innerWidth <= 768;
    const nodeCount = isMobile ? 15 : 25;
    const connectionDistance = isMobile ? 100 : 150;
    const nodeColor = 'rgba(13, 148, 136, 0.6)';

    // Ajustar tamaño del canvas - solo si cambia significativamente
    const resizeCanvas = () => {
      const header = canvas.parentElement;
      if (header) {
        const newWidth = header.offsetWidth;
        // Solo redimensionar si el ancho cambió significativamente (evita cambios por barra de navegador móvil)
        if (Math.abs(newWidth - lastWidthRef.current) > 50 || !isInitializedRef.current) {
          canvas.width = newWidth;
          canvas.height = header.offsetHeight;
          lastWidthRef.current = newWidth;
          return true; // Indica que hubo cambio
        }
      }
      return false;
    };

    // Inicializar nodos
    const initNodes = () => {
      nodesRef.current = [];
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1.5,
        });
      }
      isInitializedRef.current = true;
    };

    // Animar
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Actualizar y dibujar nodos
      nodesRef.current.forEach((node) => {
        // Mover nodo
        node.x += node.vx;
        node.y += node.vy;

        // Rebotar en los bordes
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Mantener dentro del canvas
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
      });

      // Dibujar conexiones
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const nodeA = nodesRef.current[i];
          const nodeB = nodesRef.current[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(13, 148, 136, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }

      // Dibujar nodos
      nodesRef.current.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 3
        );
        gradient.addColorStop(0, 'rgba(13, 148, 136, 0.2)');
        gradient.addColorStop(1, 'rgba(13, 148, 136, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initNodes();
    animate();

    // Solo escuchar resize, no scroll
    const handleResize = () => {
      if (resizeCanvas()) {
        // Solo reinicializar nodos si hubo un cambio significativo de tamaño
        initNodes();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="network-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

export default NetworkAnimation;
