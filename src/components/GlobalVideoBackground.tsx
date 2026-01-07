import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

function GlobalVideoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number>();
  const isMobileRef = useRef(window.innerWidth <= 768);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuración adaptativa para móviles y desktop
    const checkMobile = () => window.innerWidth <= 768;
    
    // Función para obtener configuración según el dispositivo
    const getConfig = () => {
      const mobile = checkMobile();
      isMobileRef.current = mobile;
      return {
        nodeCount: mobile ? 25 : 50,
        connectionDistance: mobile ? 200 : 350,
        nodeMinRadius: mobile ? 4 : 6,
        nodeMaxRadius: mobile ? 8 : 14,
        velocity: mobile ? 0.5 : 0.8,
        lineWidth: mobile ? 1.5 : 2.5,
        glowMultiplier: mobile ? 3 : 5,
      };
    };
    
    let config = getConfig();
    const nodeColor = 'rgba(13, 148, 136, 0.7)';

    // Ajustar tamaño del canvas al documento completo
    const resizeCanvas = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      canvas.width = window.innerWidth;
      canvas.height = docHeight;
    };

    // Inicializar nodos - Tamaño adaptativo
    const initNodes = () => {
      nodesRef.current = [];
      for (let i = 0; i < config.nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * config.velocity,
          vy: (Math.random() - 0.5) * config.velocity,
          radius: Math.random() * (config.nodeMaxRadius - config.nodeMinRadius) + config.nodeMinRadius,
        });
      }
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

      // Dibujar conexiones - Grosor adaptativo
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const nodeA = nodesRef.current[i];
          const nodeB = nodesRef.current[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.connectionDistance) {
            const opacity = 1 - distance / config.connectionDistance;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(13, 148, 136, ${opacity * 0.5})`;
            ctx.lineWidth = config.lineWidth;
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }

      // Dibujar nodos - Tamaño adaptativo con glow
      nodesRef.current.forEach((node) => {
        // Glow effect adaptativo
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * config.glowMultiplier
        );
        gradient.addColorStop(0, 'rgba(13, 148, 136, 0.4)');
        gradient.addColorStop(0.4, 'rgba(45, 212, 191, 0.2)');
        gradient.addColorStop(1, 'rgba(13, 148, 136, 0)');
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * config.glowMultiplier, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Nodo central
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initNodes();
    animate();

    const handleResize = () => {
      // Actualizar configuración si cambia el tipo de dispositivo
      config = getConfig();
      resizeCanvas();
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    // Observar cambios en el tamaño del documento
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(document.body);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="global-network-canvas"
    />
  );
}

export default GlobalVideoBackground;
