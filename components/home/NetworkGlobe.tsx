import {useEffect,useRef,useState} from 'react';

// Longitude/latitude outlines for a stylized particle globe, not a coverage map.
const land=[
  [[-168,65],[-140,70],[-120,72],[-100,60],[-80,55],[-55,48],[-65,30],[-85,10],[-105,20],[-125,45],[-165,55]],
  [[-80,10],[-50,5],[-35,-8],[-45,-25],[-65,-55],[-75,-35]],
  [[-18,35],[10,38],[35,30],[50,10],[38,-12],[20,-35],[5,-30],[-12,5]],
  [[-10,36],[-10,60],[25,72],[65,72],[100,60],[150,60],[175,48],[140,35],[120,10],[105,-5],[95,5],[78,8],[65,25],[40,30]],
  [[112,-12],[135,-10],[154,-22],[148,-39],[115,-35]],
  [[-55,60],[-25,68],[-40,82],[-65,78]],
  [[46,-13],[50,-15],[48,-26],[44,-24]],
] as number[][][];
function onLand(lon:number,lat:number){return land.some(poly=>{let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const[x,y]=poly[i], [u,v]=poly[j];if((y>lat)!==(v>lat)&&lon<(u-x)*(lat-y)/(v-y)+x)inside=!inside;}return inside;});}
function xyz(lon:number,lat:number){const a=lon*Math.PI/180,b=lat*Math.PI/180;return [Math.cos(b)*Math.sin(a),-Math.sin(b),Math.cos(b)*Math.cos(a)];}
const dots:Array<{p:number[];land:boolean}>=[];
for(let lat=-78;lat<=80;lat+=3.2)for(let lon=-180;lon<180;lon+=3.2/Math.max(.25,Math.cos(lat*Math.PI/180)))dots.push({p:xyz(lon,lat),land:onLand(lon,lat)});
const cities=[[72.83,21.13],[77.2,28.6],[55.3,25.2],[103.8,1.3],[139.7,35.7],[-.1,51.5],[-74,40.7],[151.2,-33.8],[18.4,-33.9],[2.3,48.8],[13.4,52.5],[100.5,13.7],[121.5,31.2]];
const routes=cities.slice(1).map((city,i)=>{const start=xyz(...cities[i%3] as [number,number]),end=xyz(...city as [number,number]);return Array.from({length:65},(_,j)=>{const t=j/64,p=start.map((v,k)=>v*(1-t)+end[k]*t),n=Math.hypot(...p),height=1+.22*Math.sin(t*Math.PI);return p.map(v=>v/n*height);});});

export function NetworkGlobe(){
  const canvas=useRef<HTMLCanvasElement>(null);
  const [paused,setPaused]=useState(false);
  const pauseRef=useRef(false);
  useEffect(()=>{pauseRef.current=paused;},[paused]);
  useEffect(()=>{
    const el=canvas.current;if(!el)return;const ctx=el.getContext('2d');if(!ctx)return;
    let frame=0,last=0,elapsed=0,visible=true,width=1000,height=570;
    function resize(){const rect=el!.getBoundingClientRect();width=rect.width;height=rect.height;const dpr=Math.min(window.devicePixelRatio||1,1.5);el!.width=width*dpr;el!.height=height*dpr;ctx!.setTransform(dpr,0,0,dpr,0,0);}
    const observer=new ResizeObserver(resize);observer.observe(el);
    const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});intersection.observe(el);
    function draw(time:number){
      frame=requestAnimationFrame(draw);if(time-last<33)return;
      const delta=Math.min((time-last)/1000,.1);last=time;if(!visible||document.hidden)return;
      if(!pauseRef.current)elapsed+=delta;
      const seconds=elapsed,rotation=-.85+seconds*.14,r=Math.min(width*.33,height*.37),cx=width/2,cy=height/2;
      const project=(p:number[])=>{const x=p[0]*Math.cos(rotation)+p[2]*Math.sin(rotation),z=-p[0]*Math.sin(rotation)+p[2]*Math.cos(rotation);return {x:cx+x*r,y:cy+p[1]*r,z};};
      ctx!.clearRect(0,0,width,height);
      const halo=ctx!.createRadialGradient(cx,cy,r*.6,cx,cy,r*1.5);halo.addColorStop(0,'rgba(14,165,233,.12)');halo.addColorStop(.7,'rgba(14,165,233,.08)');halo.addColorStop(1,'rgba(14,165,233,0)');ctx!.fillStyle=halo;ctx!.fillRect(0,0,width,height);
      ctx!.save();ctx!.translate(cx,cy);ctx!.rotate(-.23);ctx!.strokeStyle='rgba(56,189,248,.16)';ctx!.lineWidth=1;ctx!.beginPath();ctx!.ellipse(0,0,r*1.39,r*.35,0,0,Math.PI*2);ctx!.stroke();ctx!.restore();
      const ocean=ctx!.createRadialGradient(cx-r*.3,cy-r*.4,0,cx,cy,r);ocean.addColorStop(0,'#0c3151');ocean.addColorStop(.8,'#06192e');ocean.addColorStop(1,'#03101f');ctx!.fillStyle=ocean;ctx!.beginPath();ctx!.arc(cx,cy,r,0,Math.PI*2);ctx!.fill();ctx!.strokeStyle='rgba(56,189,248,.35)';ctx!.stroke();
      for(const dot of dots){const p=project(dot.p);if(p.z<0)continue;ctx!.fillStyle=dot.land?`rgba(125,225,255,${.3+p.z*.65})`:`rgba(44,133,192,${.06+p.z*.14})`;ctx!.beginPath();ctx!.arc(p.x,p.y,dot.land?1.25: .7,0,Math.PI*2);ctx!.fill();}
      routes.forEach((route,i)=>{
        ctx!.beginPath();let connected=false;route.forEach(v=>{const p=project(v);if(p.z<-.05){connected=false;return;}if(connected)ctx!.lineTo(p.x,p.y);else ctx!.moveTo(p.x,p.y);connected=true;});ctx!.strokeStyle=i%3===0?'rgba(255,190,98,.55)':'rgba(56,189,248,.46)';ctx!.lineWidth=.8;ctx!.stroke();
        // Two bright packets with fading trails make data transfer clearly visible.
        for(let packet=0;packet<2;packet++){
          const head=Math.floor((seconds*.28+i*.11+packet*.5)%1*64);
          for(let trail=10;trail>=0;trail--){const point=project(route[(head-trail+65)%65]);if(point.z<0)continue;ctx!.shadowBlur=trail===0?16:0;ctx!.shadowColor='#7dd3fc';ctx!.fillStyle=`rgba(175,240,255,${1-trail/11})`;ctx!.beginPath();ctx!.arc(point.x,point.y,trail===0?3:1.8,0,Math.PI*2);ctx!.fill();}
          ctx!.shadowBlur=0;
        }
      });
      cities.forEach(([lon,lat],i)=>{const p=project(xyz(lon,lat));if(p.z<.03)return;const pulse=(seconds*.45+i*.17)%1;ctx!.strokeStyle=`rgba(125,211,252,${(1-pulse)*.65})`;ctx!.beginPath();ctx!.arc(p.x,p.y,3+pulse*13,0,Math.PI*2);ctx!.stroke();ctx!.shadowBlur=14;ctx!.shadowColor='#38bdf8';ctx!.fillStyle=i===0?'#fbbf24':'#e0faff';ctx!.beginPath();ctx!.arc(p.x,p.y,i===0?3.5:2,0,Math.PI*2);ctx!.fill();ctx!.shadowBlur=0;});
    }
    resize();frame=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();};
  },[]);
  return <figure className="network-globe relative mt-10 overflow-hidden rounded-[2rem] border border-sky-300/25 bg-[#031021] shadow-[0_24px_80px_rgba(10,51,100,.2)]">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,.12),transparent_65%)]"/>
    <div className="absolute left-6 top-6 z-10 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] text-sky-200 sm:left-9 sm:top-8"><span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_#38bdf8]"/>The world, connected</div>
    <button type="button" onClick={()=>setPaused(!paused)} aria-pressed={paused} className="focus-ring absolute right-5 top-5 z-10 rounded-full border border-sky-200/25 bg-blue-950/70 px-3 py-2 text-xs text-sky-100">{paused?'Play globe':'Pause globe'}</button>
    <canvas ref={canvas} role="img" aria-label="Animated blue Earth with glowing fiber-network connections and travelling signals" className="block h-[360px] w-full sm:h-[510px] lg:h-[570px]">A connected Earth with glowing fiber-network routes.</canvas>
    <figcaption className="relative flex flex-col gap-2 border-t border-sky-200/10 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-9"><span className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Local roots. A world of possibilities.</span><span className="text-sm text-sky-200/70">Fiber broadband · Homes · Businesses</span></figcaption>
  </figure>;
}
