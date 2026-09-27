// Starforge: Void Run — campaign, ship hangar, weapons, forge and roguelite rooms.
const container = document.getElementById('game-container');
const canvas = document.createElement('canvas');
container.appendChild(canvas);
const ctx = canvas.getContext('2d');
let W = 0, H = 0, S = 1;
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth; H = window.innerHeight;
  canvas.width = W * dpr; canvas.height = H * dpr;
  canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;
  S = Math.min(W / 400, H / 720);
}
window.addEventListener('resize', resize); resize();
function image(src) { const img = new Image(); img.src = src; return img; }
function inlineSvg(svg) { return `data:image/svg+xml;base64,${btoa(svg)}`; }
const IMG = {
  alien: image('assets/images/enemy-alien.webp'), drone: image('assets/images/enemy-drone.webp'),
  rock: image('assets/images/enemy-asteroid.webp'), boss: image('assets/images/boss-ship.webp'), bg: image('assets/images/space-bg.webp'),
  hangarBg: image('assets/images/hangar-space-wide.webp'),
  credits: image('assets/images/06.png'), gems: image('assets/images/02.png'), fragments: image('assets/images/03.png'), repair: image('assets/images/04.png'), xp: image('assets/images/05.png'),
  allyDrone: image('assets/images/8slyt-removebg-preview.png'), attackDrone: image('assets/images/001.png'), defenseDrone: image('assets/images/002.png'), homingMissile: image('assets/images/s88km-removebg-preview.png'),
  tx9Raider: image('assets/images/enemy-tx9-raider.webp'), sporewing: image('assets/images/enemy-nebula-sporewing.webp'),
  voidWisp: image('assets/images/enemy-void-wisp.webp'), omegaLancer: image('assets/images/enemy-omega-lancer.webp'),
  greenShip: image('assets/images/twnua-removebg-preview.png'), redPixelShip: image('assets/images/ogauv-removebg-preview.png'), purpleShip: image('assets/images/nszg4-removebg-preview.png'),
  glaciaStalker: image('assets/images/enemy-glacia-stalker.webp'), pyraWraith: image('assets/images/enemy-pyra-wraith.webp'),
  nexusSentinel: image('assets/images/enemy-nexus-sentinel.webp'), abyssLeviathan: image('assets/images/enemy-abyss-leviathan.webp'),
  chronosPhantom: image('assets/images/enemy-chronos-phantom.webp'), singularityTyrant: image('assets/images/enemy-singularity-tyrant.webp'),
};
const SHIP_ART = {
  aegis: image(inlineSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 340"><defs><linearGradient id="h" x2="0" y2="1"><stop stop-color="#eaf8ff"/><stop offset=".35" stop-color="#397caa"/><stop offset="1" stop-color="#101c39"/></linearGradient><linearGradient id="w" x2="1" y2="1"><stop stop-color="#16365c"/><stop offset=".55" stop-color="#527b9c"/><stop offset="1" stop-color="#10172b"/></linearGradient><linearGradient id="c" x2="0" y2="1"><stop stop-color="#8fffff"/><stop offset="1" stop-color="#00a9db"/></linearGradient><filter id="g"><feGaussianBlur stdDeviation="3"/></filter></defs><path d="M128 13 151 70 179 108 247 161 226 226 178 214 157 283 128 329 99 283 78 214 30 226 9 161 77 108 105 70Z" fill="url(#w)" stroke="#a9daf0" stroke-width="4" stroke-linejoin="round"/><path d="m105 94-25 31-52 39 35 10 48-39Zm46 0 25 31 52 39-35 10-48-39Z" fill="#13233e" stroke="#edc66a" stroke-width="3"/><path d="M128 22 146 79 151 243 128 316 105 243 110 79Z" fill="url(#h)" stroke="#d4eaf2" stroke-width="3"/><path d="M117 49h22l8 72h-38Z" fill="#06233c" stroke="#65eaff" stroke-width="3"/><path d="M119 56h18l5 52h-28Z" fill="url(#c)"/><path d="m86 145 20-8v79l-29-13Zm84 0-20-8v79l29-13Z" fill="#253e59" stroke="#d7e2e4" stroke-width="3"/><path d="M45 177 88 153v14l-34 28Zm166 0-43-24v14l34 28Z" fill="#f0c45c"/><path d="m91 245 20 8-6 29-27-28Zm74 0-20 8 6 29 27-28Z" fill="#04c9ef" stroke="#a2f5ff" stroke-width="3"/><path d="M117 273h22l-11 56Z" fill="#0b263b" stroke="#96d9ee" stroke-width="3"/><path d="M115 315h9l4 20-14-8Zm26 0h-9l-4 20 14-8Z" fill="#4deaff" filter="url(#g)"/><path d="M115 315h9l4 20-14-8Zm26 0h-9l-4 20 14-8Z" fill="#73f4ff"/><circle cx="93" cy="185" r="7" fill="#51ecff"/><circle cx="163" cy="185" r="7" fill="#51ecff"/></svg>`)),
  phantom: image(inlineSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 340"><defs><linearGradient id="h" x2="0" y2="1"><stop stop-color="#6e7f9e"/><stop offset=".4" stop-color="#202b48"/><stop offset="1" stop-color="#090d1b"/></linearGradient><linearGradient id="w" x2="1" y2="1"><stop stop-color="#11172b"/><stop offset=".5" stop-color="#303959"/><stop offset="1" stop-color="#111126"/></linearGradient><linearGradient id="c" x2="0" y2="1"><stop stop-color="#b4faff"/><stop offset="1" stop-color="#a34dff"/></linearGradient><filter id="g"><feGaussianBlur stdDeviation="3"/></filter></defs><path d="M128 12 148 94 247 238 187 215 156 275 128 328 100 275 69 215 9 238 108 94Z" fill="url(#w)" stroke="#9ca7c7" stroke-width="4" stroke-linejoin="round"/><path d="m111 91-41 108-39 27 61 4 31-93Zm34 0 41 108 39 27-61 4-31-93Z" fill="#18203a" stroke="#52617e" stroke-width="3"/><path d="M128 22 143 95 148 244 128 319 108 244 113 95Z" fill="url(#h)" stroke="#c1c9dd" stroke-width="3"/><path d="M119 49h18l8 57h-34Z" fill="#09182b" stroke="#8873ff" stroke-width="3"/><path d="m122 57 6-3 6 3 5 42h-22Z" fill="url(#c)"/><path d="m97 149-17 53 25 6 10-51Zm62 0 17 53-25 6-10-51Z" fill="#11182d" stroke="#697493" stroke-width="3"/><path d="m39 221 65-39-10 26-46 28Zm178 0-65-39 10 26 46 28Z" fill="#a04cff"/><path d="m80 237 22 1-11 39-19-24Zm96 0-22 1 11 39 19-24Z" fill="#3feaff"/><path d="M115 268h26l-13 61Z" fill="#0b1429" stroke="#746ca5" stroke-width="3"/><path d="M117 302h9l2 34-13-9Zm22 0h-9l-2 34 13-9Z" fill="#9b4fff" filter="url(#g)"/><path d="M117 302h9l2 34-13-9Zm22 0h-9l-2 34 13-9Z" fill="#77eeff"/><path d="m77 179 25-18m77 18-25-18" stroke="#62e9ff" stroke-width="5" stroke-linecap="round"/><circle cx="128" cy="132" r="5" fill="#ec73ff"/></svg>`)),
  nova: image(inlineSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 340"><defs><linearGradient id="h" x2="0" y2="1"><stop stop-color="#fff4dd"/><stop offset=".4" stop-color="#b9c8d7"/><stop offset="1" stop-color="#56657e"/></linearGradient><linearGradient id="w" x2="0" y2="1"><stop stop-color="#f4f1e9"/><stop offset=".55" stop-color="#b6c6d5"/><stop offset="1" stop-color="#283a59"/></linearGradient><linearGradient id="r" x2="0" y2="1"><stop stop-color="#ff786e"/><stop offset="1" stop-color="#a32039"/></linearGradient><filter id="g"><feGaussianBlur stdDeviation="3"/></filter></defs><path d="M128 11 149 73 170 98 247 181 220 238 173 215 158 279 128 330 98 279 83 215 36 238 9 181 86 98 107 73Z" fill="url(#w)" stroke="#fff0db" stroke-width="4" stroke-linejoin="round"/><path d="m104 83-18 15-63 82 48-13 39-44Zm48 0 18 15 63 82-48-13-39-44Z" fill="url(#r)" stroke="#7e1c36" stroke-width="3"/><path d="M128 20 145 77 151 251 128 319 105 251 111 77Z" fill="url(#h)" stroke="#fff8ec" stroke-width="3"/><path d="M118 47h20l9 65h-38Z" fill="#652537" stroke="#ff9b79" stroke-width="3"/><path d="M120 54h16l6 49h-28Z" fill="#8cecff"/><path d="M102 137h18v102h-28l-8-44Zm52 0h-18v102h28l8-44Z" fill="#8c203b" stroke="#f7d8c5" stroke-width="3"/><path d="m38 190 48-20-16 35-43 20Zm180 0-48-20 16 35 43 20Z" fill="#ff644f"/><path d="m93 252 21 3-10 31-26-22Zm70 0-21 3 10 31 26-22Z" fill="#f7e5c8" stroke="#a53043" stroke-width="3"/><path d="M117 277h22l-11 52Z" fill="#293950" stroke="#c8d5df" stroke-width="3"/><path d="M115 306h10l3 30-15-9Zm26 0h-10l-3 30 15-9Z" fill="#ffe28a"/><path d="m78 169 24 17m76-17-24 17" stroke="#ffba72" stroke-width="6" stroke-linecap="round"/><circle cx="128" cy="174" r="8" fill="#ffcf65" stroke="#fff4d7" stroke-width="3"/></svg>`)),
  leviathan: image(inlineSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 340"><defs><linearGradient id="h" x2="0" y2="1"><stop stop-color="#9ba5bc"/><stop offset=".35" stop-color="#45455f"/><stop offset="1" stop-color="#1c1c32"/></linearGradient><linearGradient id="w" x2="1" y2="1"><stop stop-color="#29253c"/><stop offset=".5" stop-color="#59516b"/><stop offset="1" stop-color="#211e37"/></linearGradient><filter id="g"><feGaussianBlur stdDeviation="3"/></filter></defs><path d="M128 14 153 67 177 93 252 135 237 223 194 244 163 225 157 282 128 328 99 282 93 225 62 244 19 223 4 135 79 93 103 67Z" fill="url(#w)" stroke="#bdb3d2" stroke-width="4" stroke-linejoin="round"/><path d="m101 88-20 29-66 26 13 66 41-11 38-64Zm54 0 20 29 66 26-13 66-41-11-38-64Z" fill="#302d48" stroke="#736d8a" stroke-width="3"/><path d="M128 23 147 78 152 249 128 317 104 249 109 78Z" fill="url(#h)" stroke="#d1c6dc" stroke-width="3"/><path d="M117 48h22l7 58h-36Z" fill="#171c31" stroke="#c35be6" stroke-width="3"/><path d="m121 57 7-4 7 4 4 40h-22Z" fill="#73eaff"/><path d="M72 143h22v93H62Zm112 0h-22v93h32Z" fill="#3c354f" stroke="#a79ab8" stroke-width="3"/><rect x="53" y="154" width="18" height="56" rx="5" fill="#24283a" stroke="#d3a8e6" stroke-width="3"/><rect x="185" y="154" width="18" height="56" rx="5" fill="#24283a" stroke="#d3a8e6" stroke-width="3"/><path d="m27 201 55-28-8 39-38 18Zm202 0-55-28 8 39 38 18Z" fill="#bc3fe1"/><path d="m86 244 20 7-12 39-22-31Zm84 0-20 7 12 39 22-31Z" fill="#d33ce9" stroke="#ffc0f7" stroke-width="3"/><path d="M113 270h30l-15 58Z" fill="#171b30" stroke="#9886b4" stroke-width="3"/><path d="M115 303h10l3 34-15-8Zm26 0h-10l-3 34 15-8Z" fill="#ff91ee"/><path d="M79 128h13v13H79Zm85 0h13v13h-13Z" fill="#6aefff"/><path d="M72 113 95 98m89 15-23-15" stroke="#f281f4" stroke-width="4"/></svg>`)),
  omegaPrime: image(inlineSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 340"><defs><linearGradient id="h" x2="0" y2="1"><stop stop-color="#fffdf0"/><stop offset=".38" stop-color="#bfd8e5"/><stop offset="1" stop-color="#253856"/></linearGradient><linearGradient id="w" x2="1" y2="1"><stop stop-color="#173356"/><stop offset=".5" stop-color="#d4e5ee"/><stop offset="1" stop-color="#142b4b"/></linearGradient><radialGradient id="c"><stop stop-color="#eaffff"/><stop offset=".5" stop-color="#58e7ff"/><stop offset="1" stop-color="#0876c6"/></radialGradient></defs><path d="M128 9 150 66 178 96 248 147 231 215 185 235 164 209 153 277 128 331 103 277 92 209 71 235 25 215 8 147 78 96 106 66Z" fill="url(#w)" stroke="#edf8ff" stroke-width="4" stroke-linejoin="round"/><path d="m106 83-26 23-53 38 45 8 44-31Zm44 0 26 23 53 38-45 8-44-31Z" fill="#112b4a" stroke="#e5c36a" stroke-width="3"/><path d="M128 18 147 75 151 248 128 319 105 248 109 75Z" fill="url(#h)" stroke="#fff9db" stroke-width="3"/><path d="M117 44h22l8 66h-38Z" fill="#092444" stroke="#66eaff" stroke-width="3"/><path d="m122 53 6-5 6 5 5 47h-22Z" fill="#56eaff"/><path d="m84 133 25-12v101H90l-20-43Zm88 0-25-12v101h19l20-43Z" fill="#213958" stroke="#8cdffc" stroke-width="3"/><path d="M128 139 113 159l15 19 15-19Z" fill="url(#c)" stroke="#fff4bc" stroke-width="3"/><path d="m34 170 50-25-13 27-38 17Zm188 0-50-25 13 27 38 17Z" fill="#e7c663"/><path d="m89 236 23 7-11 42-25-30Zm78 0-23 7 11 42-25-30Z" fill="#2fcce9" stroke="#d4fcff" stroke-width="3"/><path d="M115 270h26l-13 60Z" fill="#102848" stroke="#d8ebef" stroke-width="3"/><path d="M115 306h10l3 31-15-9Zm26 0h-10l-3 31 15-9Z" fill="#90f8ff"/><path d="m79 197 27-15m71 15-27-15" stroke="#53e9ff" stroke-width="5" stroke-linecap="round"/><circle cx="128" cy="120" r="6" fill="#ffe48b"/><path d="m106 65 22 8 22-8" fill="none" stroke="#e8c871" stroke-width="3"/></svg>`)),
};
const PLANETS = [
  { id:0, name:'TX-9', subtitle:'DESERTO ESPACIAL', difficulty:'FÁCIL', levelRange:'1–10', minLevel:1, background:image('assets/images/planet-tx9-desert.webp'), tint:'rgba(166,105,46,.10)', accent:'#e9b66b', enemyType:'raider' },
  { id:1, name:'NEBULA-7', subtitle:'NEBULOSAS TÓXICAS', difficulty:'MÉDIO', levelRange:'11–20', minLevel:11, background:image('assets/images/planet-nebula7-toxic.webp'), tint:'rgba(24,118,132,.10)', accent:'#62e7d1', enemyType:'spore' },
  { id:2, name:'VOID-3', subtitle:'GRAVIDADE INSTÁVEL', difficulty:'DIFÍCIL', levelRange:'21–30', minLevel:21, background:image('assets/images/planet-void3-gravity.webp'), tint:'rgba(74,42,130,.12)', accent:'#bd8cff', enemyType:'wisp' },
  { id:3, name:'OMEGA', subtitle:'DIMENSÃO ALIENÍGENA', difficulty:'EXTREMO', levelRange:'31–40', minLevel:31, background:image('assets/images/planet-omega-alien.webp'), tint:'rgba(128,24,69,.12)', accent:'#ff6685', enemyType:'lancer' },
  { id:4, name:'GLACIA-5', subtitle:'FRONTEIRA GLACIAL', difficulty:'EXTREMO+', levelRange:'41–50', minLevel:41, background:image('assets/images/planet-glacia5-ice.webp'), tint:'rgba(68,196,231,.11)', accent:'#83f0ff', enemyType:'glacia' },
  { id:5, name:'PYRA-9', subtitle:'MAR DE MAGMA', difficulty:'LETAL', levelRange:'51–60', minLevel:51, background:image('assets/images/planet-pyra9-volcanic.webp'), tint:'rgba(244,73,39,.12)', accent:'#ff8b55', enemyType:'pyra' },
  { id:6, name:'NEXUS-12', subtitle:'MUNDO-MÁQUINA', difficulty:'LETAL+', levelRange:'61–70', minLevel:61, background:image('assets/images/planet-nexus12-machine.webp'), tint:'rgba(48,115,255,.12)', accent:'#6aaeff', enemyType:'nexus' },
  { id:7, name:'ABYSS-4', subtitle:'OCEANO ABISSAL', difficulty:'INSANO', levelRange:'71–80', minLevel:71, background:image('assets/images/planet-abyss4-ocean.webp'), tint:'rgba(24,196,173,.12)', accent:'#69ffe1', enemyType:'abyss' },
  { id:8, name:'CHRONOS-6', subtitle:'FENDA TEMPORAL', difficulty:'INSANO+', levelRange:'81–90', minLevel:81, background:image('assets/images/planet-chronos6-time.webp'), tint:'rgba(153,78,255,.13)', accent:'#cf9aff', enemyType:'chronos' },
  { id:9, name:'SINGULARITY', subtitle:'FIM DO COSMOS', difficulty:'APOCALÍPTICO', levelRange:'91–100', minLevel:91, background:image('assets/images/planet-singularity-void.webp'), tint:'rgba(229,43,183,.14)', accent:'#ff72e5', enemyType:'singularity' },
];
const SHIPS = [
  { id:'vanguard', name:'VANGUARD', role:'Interceptor verde', image:IMG.greenShip, src:'assets/images/twnua-removebg-preview.png', stats:'Alta velocidade · dano +5%', hp:.92, speed:1.2, damage:1.05 },
  { id:'reaper', name:'REAPER', role:'Caça de ataque pesado', image:IMG.redPixelShip, src:'assets/images/ogauv-removebg-preview.png', stats:'Dano +30% · motor reforçado', hp:.92, speed:1.08, damage:1.3 },
  { id:'bulwark', name:'BASTION', role:'Couraçado roxo', image:IMG.purpleShip, src:'assets/images/nszg4-removebg-preview.png', stats:'Casco +40% · canhões pesados', hp:1.4, speed:.82, damage:1.15 },
  { id:'aegis', name:'AEGIS', role:'Interceptor de elite', image:SHIP_ART.aegis, src:SHIP_ART.aegis.src, stats:'Casco +58% · dano +48%', hp:1.58, speed:1.03, damage:1.48, unlockMission:'kills' },
  { id:'phantom', name:'PHANTOM', role:'Caça furtivo', image:SHIP_ART.phantom, src:SHIP_ART.phantom.src, stats:'Velocidade +55% · dano +55%', hp:1.08, speed:1.55, damage:1.55, unlockMission:'rooms' },
  { id:'nova', name:'NOVA STRIKE', role:'Caça de assalto orbital', image:SHIP_ART.nova, src:SHIP_ART.nova.src, stats:'Casco +52% · dano +72%', hp:1.52, speed:1.26, damage:1.72, unlockMission:'bosses' },
  { id:'leviathan', name:'LEVIATHAN', role:'Couraçado de cerco', image:SHIP_ART.leviathan, src:SHIP_ART.leviathan.src, stats:'Casco +115% · dano +82%', hp:2.15, speed:.98, damage:1.82, unlockMission:'level' },
  { id:'omega-prime', name:'OMEGA PRIME', role:'Nave suprema de campanha', image:SHIP_ART.omegaPrime, src:SHIP_ART.omegaPrime.src, stats:'Casco +82% · velocidade +40% · dano +105%', hp:1.82, speed:1.4, damage:2.05, unlockMission:'planets' },
];
const SHIP_MAX_RANK = 10;
const SHIP_MISSIONS = [
  { id:'kills', shipId:'aegis', title:'Contrato de extermínio', desc:'Elimine 300 inimigos no total.', target:300 },
  { id:'rooms', shipId:'phantom', title:'Fantasma da fronteira', desc:'Conclua 35 salas atravessando seus portais.', target:35 },
  { id:'bosses', shipId:'nova', title:'Caçador de titãs', desc:'Derrote 5 chefes de planeta.', target:5 },
  { id:'level', shipId:'leviathan', title:'Lenda viva', desc:'Suba 15 níveis de piloto no total.', target:15 },
  { id:'planets', shipId:'omega-prime', title:'Domínio galáctico', desc:'Conquiste qualquer planeta 4 vezes.', target:4 },
];
const RARITIES = [
  { id:'common', name:'COMUM', color:'#e7edf5', tier:0 },
  { id:'uncommon', name:'INCOMUM', color:'#66e28c', tier:1 },
  { id:'rare', name:'RARO', color:'#63aaff', tier:2 },
  { id:'epic', name:'ÉPICO', color:'#d28bff', tier:3 },
  { id:'legendary', name:'LENDÁRIO', color:'#ff9e42', tier:4 },
];
const WEAPON_TYPES = [
  { id:'pulse', name:'Canhão Pulse', desc:'Tiros precisos e equilibrados.', damage:1, rate:1, color:'#79d9ff' },
  { id:'scatter', name:'Canhão Scatter', desc:'Projéteis laterais em leque.', damage:.78, rate:1.08, color:'#f6d478' },
  { id:'rail', name:'Lança-Rail', desc:'Disparo lento de alto impacto.', damage:1.85, rate:.68, color:'#ff8f69' },
  { id:'seeker', name:'Míssil Seeker', desc:'Projéteis perseguidores.', damage:1.15, rate:.86, color:'#c394ff' },
];
const PERMANENT = [
  { id:'hull', name:'Casco', desc:'+15 vida máxima por nível', base:70 },
  { id:'engine', name:'Motor', desc:'+6% velocidade por nível', base:65 },
  { id:'energy', name:'Energia', desc:'+8% dano por nível', base:80 },
  { id:'shield', name:'Escudo', desc:'+1 carga de escudo inicial', base:95 },
];
const ATTRIBUTE_UPGRADES = [
  {id:'shield',name:'Escudo',icon:'⬡',desc:'+1 carga de escudo no início de cada run.',base:75},
  {id:'life',name:'Vida',icon:'✚',desc:'+25 de vida máxima e cura completa na próxima decolagem.',base:65},
  {id:'speed',name:'Velocidade',icon:'➤',desc:'+5% de velocidade da nave permanentemente.',base:80},
  {id:'power',name:'Poder',icon:'✦',desc:'+9% de dano dos canhões permanentemente.',base:95},
];
const DRONE_CATALOG = [
  {id:'attack',name:'Drone de Ataque',image:IMG.attackDrone,description:'+12% de dano por drone em todos os modos.',base:170,bonus:'ATAQUE +12%'},
  {id:'defense',name:'Drone de Defesa',image:IMG.defenseDrone,description:'Reduz em 10% o dano recebido por drone.',base:190,bonus:'DEFESA +10%'},
];
const DRONE_MAX_LEVEL = 3;
const UPGRADES = [
  { id:'triple', name:'Tiro Triplo', desc:'+2 projéteis em leque', apply:p=>{p.spread+=2;} },
  { id:'homing', name:'Mísseis Teleguiados', desc:'Lança os mísseis da sua imagem que perseguem inimigos', apply:p=>{p.missiles++;} },
  { id:'shield', name:'Escudo de Energia', desc:'Bloqueia 1 golpe extra', apply:p=>{p.shieldMax++;p.shield=p.shieldMax;} },
  { id:'speed', name:'Propulsores', desc:'+20% velocidade nesta run', apply:p=>{p.speed*=1.2;} },
  { id:'rate', name:'Laser Rápido', desc:'+30% cadência de tiro', apply:p=>{p.fireRate*=.7;} },
  { id:'drone', name:'Drone Aliado', desc:'Adiciona um drone que usa a nave aliada e ataca os inimigos', apply:p=>{p.drones++;p.droneCooldowns.push(0.25);} },
  { id:'boom', name:'Explosão Fatal', desc:'Inimigos explodem ao morrer', apply:p=>{p.boom++;} },
  { id:'steal', name:'Roubo de Vida', desc:'Recupere vida a cada abate', apply:p=>{p.steal+=2;} },
  { id:'crit', name:'Crítico Espacial', desc:'+20% chance de dano crítico', apply:p=>{p.crit+=.2;} },
  { id:'dmg', name:'Canhão Pesado', desc:'+35% dano nesta run', apply:p=>{p.dmg*=1.35;} },
  { id:'hp', name:'Casco Reforçado', desc:'+40 vida máxima e cura', apply:p=>{p.maxHp+=40;p.hp=p.maxHp;} },
];
const PROFILE_KEY = 'starforgeVoidProfileV1';
const ACCOUNT_KEY = 'starforgeVoidAccountsV1';
let profileStorageKey = PROFILE_KEY;
let currentAccount = null;
function profileKeyFor(username) { return `${PROFILE_KEY}:${encodeURIComponent(username)}`; }
function defaultProfile() {
  return { coins:120, gems:8, shards:4, unlockedPlanet:0, selectedPlanet:0, dailyDungeon:{playedDate:'',highest:0,pending:{xp:0,coins:0,gems:0,shards:0}}, shipId:'vanguard', shipRank:0,
    unlockedShips:['vanguard','reaper','bulwark'], shipInventory:[
      {uid:'ship-vanguard-1',shipId:'vanguard',rank:0}, {uid:'ship-reaper-1',shipId:'reaper',rank:0}, {uid:'ship-bulwark-1',shipId:'bulwark',rank:0}
    ], activeShipUid:'ship-vanguard-1', shipSerial:4, shipMissionVersion:2,
    clearedPlanets:[], missions:{kills:0,rooms:0,bosses:0,level:0,planets:0},
    permanent:{hull:0,engine:0,energy:0,shield:0}, attributes:{shield:0,life:0,speed:0,power:0}, drones:{attack:0,defense:0}, inventory:[
      {uid:'starter-pulse',type:'pulse',rarity:'common'}, {uid:'starter-scatter',type:'scatter',rarity:'common'}
    ], equipped:{primary:'starter-pulse',secondary:'starter-scatter'}, level:1, xp:0, best:0, weaponSerial:1 };
}
function loadProfile(storageKey=profileStorageKey) {
  try {
    const raw = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (!raw || typeof raw !== 'object') return defaultProfile();
    const base = defaultProfile();
    const merged = {...base,...raw, permanent:{...base.permanent,...(raw.permanent||{})}, attributes:{...base.attributes,...(raw.attributes||{})}, drones:{...base.drones,...(raw.drones||{})}, equipped:{...base.equipped,...(raw.equipped||{})}, missions:{...base.missions,...(raw.missions||{})}, dailyDungeon:{...base.dailyDungeon,...(raw.dailyDungeon||{}),pending:{...base.dailyDungeon.pending,...(raw.dailyDungeon?.pending||{})}}};
    if (!Array.isArray(merged.inventory) || !merged.inventory.length) merged.inventory=base.inventory;
    merged.unlockedPlanet=Math.max(0,Math.min(PLANETS.length-1,Number(merged.unlockedPlanet)||0));
    merged.selectedPlanet=Math.max(0,Math.min(merged.unlockedPlanet,Number(merged.selectedPlanet)||0));
    merged.dailyDungeon.playedDate=typeof merged.dailyDungeon.playedDate==='string'?merged.dailyDungeon.playedDate:'';
    merged.dailyDungeon.highest=Math.max(0,Math.min(100,Math.floor(Number(merged.dailyDungeon.highest)||0)));
    for(const key of ['xp','coins','gems','shards'])merged.dailyDungeon.pending[key]=Math.max(0,Math.floor(Number(merged.dailyDungeon.pending[key])||0));
    merged.level=Math.max(1,Math.floor(Number(merged.level)||1));
    for(const key of ['shield','life','speed','power'])merged.attributes[key]=Math.max(0,Math.floor(Number(merged.attributes[key])||0));
    for(const key of ['attack','defense'])merged.drones[key]=Math.max(0,Math.min(DRONE_MAX_LEVEL,Math.floor(Number(merged.drones[key])||0)));
    merged.xp=Math.max(0,Number(merged.xp)||0);
    for (const k of ['coins','gems','shards','best','weaponSerial','shipSerial']) merged[k]=Math.max(0,Number(merged[k])||0);
    const inferredClears=Array.from({length:merged.unlockedPlanet},(_,i)=>i);
    const savedClears=Array.isArray(raw.clearedPlanets)?raw.clearedPlanets.map(Number).filter(id=>Number.isInteger(id)&&id>=0&&id<PLANETS.length):[];
    merged.clearedPlanets=[...new Set([...inferredClears,...savedClears])];
    const validShipIds=SHIPS.map(ship=>ship.id);
    merged.unlockedShips=[...new Set([...(Array.isArray(raw.unlockedShips)?raw.unlockedShips:[]),...base.unlockedShips])].filter(id=>validShipIds.includes(id));
    const legacyInventory=merged.unlockedShips.map((shipId,index)=>({uid:`ship-migrated-${shipId}-${index+1}`,shipId,rank:0}));
    const seenShipUids=new Set();
    const savedShips=Array.isArray(raw.shipInventory)?raw.shipInventory:legacyInventory;
    merged.shipInventory=savedShips.filter(item=>item&&validShipIds.includes(item.shipId)).map((item,index)=>{
      const rank=Math.max(0,Math.min(SHIP_MAX_RANK,Math.floor(Number(item.rank)||0)));
      let uid=String(item.uid||`ship-migrated-${item.shipId}-${index+1}`);
      if(seenShipUids.has(uid))uid=`${uid}-${index+1}`;
      seenShipUids.add(uid);
      return {uid,shipId:item.shipId,rank};
    });
    if(!merged.shipInventory.length)merged.shipInventory=[{uid:'ship-vanguard-recovery',shipId:'vanguard',rank:0}];
    for(const item of merged.shipInventory)if(!merged.unlockedShips.includes(item.shipId))merged.unlockedShips.push(item.shipId);
    for(const mission of SHIP_MISSIONS)merged.missions[mission.id]=Math.max(0,Math.floor(Number(merged.missions[mission.id])||0));
    if(!Object.hasOwn(raw.missions||{},'planets'))merged.missions.planets=merged.clearedPlanets.length;
    if(Number(raw.shipMissionVersion||0)<2){
      for(const mission of SHIP_MISSIONS){
        if(mission.id==='level')merged.missions.level=0;
        else if(merged.unlockedShips.includes(mission.shipId)&&merged.missions[mission.id]>=mission.target)merged.missions[mission.id]%=mission.target;
      }
    }
    merged.shipMissionVersion=2;
    const active=merged.shipInventory.find(item=>item.uid===raw.activeShipUid)
      ||merged.shipInventory.find(item=>item.shipId===merged.shipId&&item.rank===Math.max(0,Number(raw.shipRank)||0))
      ||merged.shipInventory[0];
    merged.activeShipUid=active.uid;merged.shipId=active.shipId;merged.shipRank=active.rank;
    return merged;
  } catch { return defaultProfile(); }
}
let profile = defaultProfile();
function saveProfile() { try { localStorage.setItem(profileStorageKey,JSON.stringify(profile)); } catch {} }
function localDayKey(date=new Date()) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
function emptyDungeonRewards() { return {xp:0,coins:0,gems:0,shards:0}; }
function rewardsExist(rewards) { return !!rewards&&Object.values(rewards).some(value=>Number(value)>0); }
function applyDungeonRewards(rewards) {
  if(!rewardsExist(rewards))return;
  profile.coins+=Math.max(0,Math.floor(rewards.coins||0));profile.gems+=Math.max(0,Math.floor(rewards.gems||0));profile.shards+=Math.max(0,Math.floor(rewards.shards||0));
  gainExperience(Math.max(0,Math.floor(rewards.xp||0)));saveProfile();
}
function recoverPendingDungeon() {
  const pending={...(profile.dailyDungeon?.pending||{})};
  if(!rewardsExist(pending))return false;
  profile.dailyDungeon.pending=emptyDungeonRewards();applyDungeonRewards(pending);saveProfile();
  toast('Recompensas pendentes da Dungeon foram recuperadas.');return true;
}
function shipById(id) { return SHIPS.find(s=>s.id===id)||SHIPS[0]; }
function shipByUid(uid) { return profile.shipInventory.find(item=>item.uid===uid)||null; }
function activeShipItem() { return shipByUid(profile.activeShipUid)||profile.shipInventory.find(item=>item.shipId===profile.shipId&&item.rank===profile.shipRank)||profile.shipInventory[0]; }
function shipStatsFor(item) { const base=shipById(item?.shipId||profile.shipId),rank=Math.max(0,Math.floor(Number(item?.rank)||0)),boost=1+rank*.18;return {...base,hp:base.hp*boost,damage:base.damage*boost,speed:base.speed*(1+rank*.04),rank}; }
function setActiveShip(item) { if(!item)return;profile.activeShipUid=item.uid;profile.shipId=item.shipId;profile.shipRank=item.rank; }
function addShipCopy(shipId,rank=0) { const item={uid:`ship-${Date.now()}-${profile.shipSerial++}`,shipId,rank:Math.max(0,Math.min(SHIP_MAX_RANK,rank))};profile.shipInventory.push(item);if(!profile.unlockedShips.includes(shipId))profile.unlockedShips.push(shipId);return item; }
function shipSellPrice(item) { const index=Math.max(0,SHIPS.findIndex(ship=>ship.id===item.shipId));return Math.round(75+index*85+item.rank*135+item.rank*item.rank*18); }
function rarityById(id) { return RARITIES.find(r=>r.id===id)||RARITIES[0]; }
function typeById(id) { return WEAPON_TYPES.find(w=>w.id===id)||WEAPON_TYPES[0]; }
function weaponByUid(uid) { return profile.inventory.find(w=>w.uid===uid)||null; }
function weaponLabel(w) { const r=rarityById(w.rarity);return `${r.name} ${typeById(w.type).name}`; }
function weaponDamageFactor(w) { return (1+rarityById(w.rarity).tier*.27)*typeById(w.type).damage; }
function weaponRateFactor(w) { return typeById(w.type).rate; }
function newWeapon(rarityId='common') {
  const type=WEAPON_TYPES[Math.floor(Math.random()*WEAPON_TYPES.length)];
  return {uid:`weapon-${Date.now()}-${profile.weaponSerial++}`,type:type.id,rarity:rarityId};
}
function rollRarity(minTier=0) {
  const weights=[.55,.25,.13,.055,.015];
  let roll=Math.random(),tier=0;
  for(let i=0;i<weights.length;i++){roll-=weights[i];if(roll<=0){tier=i;break;}}
  tier=Math.max(tier,minTier);
  return RARITIES[Math.min(4,tier)].id;
}
function rarityPrice(rarityId) { return [70,120,210,380,680][rarityById(rarityId).tier]; }

// Audio starts only after a user gesture.
const music=new Audio('assets/audio/space-music.mp3');music.loop=true;music.volume=.34;
let muted=false,audioCtx=null;
function unlockAudio(){if(!audioCtx){audioCtx=new(window.AudioContext||window.webkitAudioContext)();if(!muted)music.play().catch(()=>{});}}
function playClip(src,vol=.55){if(muted)return;const a=new Audio(src);a.volume=Math.max(0,Math.min(1,vol));a.play().catch(()=>{});}
function beep(freq,dur,vol=.035){if(muted||!audioCtx)return;const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='square';o.frequency.setValueAtTime(freq,audioCtx.currentTime);o.frequency.exponentialRampToValueAtTime(freq/3,audioCtx.currentTime+dur);g.gain.setValueAtTime(vol,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+dur);o.connect(g).connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+dur);}
document.getElementById('mute').addEventListener('pointerdown',e=>{e.stopPropagation();unlockAudio();muted=!muted;e.currentTarget.textContent=muted?'🔇':'🔊';if(muted)music.pause();else music.play().catch(()=>{});});
const fullscreenBtn=document.getElementById('fullscreenBtn');
fullscreenBtn.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen({navigationUI:'hide'});else toast('Tela cheia não é compatível com este navegador.');}catch{toast('Não foi possível ativar a tela cheia.');}});
document.addEventListener('fullscreenchange',()=>{fullscreenBtn.textContent=document.fullscreenElement?'⊡':'⛶';fullscreenBtn.setAttribute('aria-label',document.fullscreenElement?'Sair da tela cheia':'Ativar tela cheia');});

// DOM / screen helpers
const screens=[...document.querySelectorAll('.screen')];
function showScreen(id){screens.forEach(s=>s.classList.toggle('active',s.id===id));document.getElementById('upgradeOverlay').classList.remove('active');document.getElementById('clearOverlay').classList.remove('active');document.getElementById('deadOverlay').classList.remove('active');}
function toast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2200);}
const afkBtn=document.getElementById('afkBtn');
function updateAfkButton(){const visible=(state==='play'&&gameMode!=='pvp')||state==='choose'||(state==='clear'&&gameMode==='campaign'&&activePlanet<PLANETS.length-1);afkBtn.hidden=!visible;afkBtn.textContent=afkMode?'🤖 AFK · ON':'🤖 AFK · OFF';afkBtn.classList.toggle('active',afkMode);afkBtn.setAttribute('aria-pressed',String(afkMode));afkBtn.setAttribute('aria-label',afkMode?'Desativar piloto automático':'Ativar piloto automático');}
function setAfkMode(enabled){
  afkMode=!!enabled;
  if(!afkMode){afkUpgradeTimer=0;afkClearDelay=0;afkNextPlanet=null;}
  else{
    if(state==='choose')afkUpgradeTimer=.65;
    if(state==='clear'&&gameMode==='campaign'&&activePlanet<PLANETS.length-1){afkNextPlanet=profile.selectedPlanet;afkClearDelay=1;}
  }
  updateAfkButton();toast(afkMode?'PILOTO AUTOMÁTICO ATIVADO · PORTAIS E UPGRADES AUTOMÁTICOS':'PILOTO AUTOMÁTICO DESATIVADO');
}
afkBtn.addEventListener('click',()=>setAfkMode(!afkMode));
function readAccounts(){try{const saved=JSON.parse(localStorage.getItem(ACCOUNT_KEY)||'[]');return Array.isArray(saved)?saved.filter(item=>item&&typeof item.username==='string'&&typeof item.salt==='string'&&typeof item.verifier==='string'):[];}catch{return[];}}
function authMessage(text,success=false){const message=document.getElementById('authMessage');message.textContent=text;message.classList.toggle('success',success);}
function setAuthMode(mode){const registering=mode==='register';document.getElementById('authLoginTab').classList.toggle('active',!registering);document.getElementById('authRegisterTab').classList.toggle('active',registering);document.getElementById('authLoginTab').setAttribute('aria-selected',String(!registering));document.getElementById('authRegisterTab').setAttribute('aria-selected',String(registering));document.getElementById('authConfirmField').hidden=!registering;document.getElementById('authConfirm').required=registering;document.getElementById('authPassword').autocomplete=registering?'new-password':'current-password';document.getElementById('authSubmit').textContent=registering?'CRIAR CONTA E ENTRAR':'ENTRAR NO HANGAR';authMessage('',false);}
function encodeBase64(bytes){let binary='';for(const byte of bytes)binary+=String.fromCharCode(byte);return btoa(binary);}
async function passwordVerifier(password,saltBase64){const cryptoApi=globalThis.crypto;if(!cryptoApi?.subtle)throw new Error('Este navegador não oferece criptografia segura para criar a conta. Abra o jogo em uma conexão segura (HTTPS).');const salt=Uint8Array.from(atob(saltBase64),char=>char.charCodeAt(0));const key=await cryptoApi.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);const bits=await cryptoApi.subtle.deriveBits({name:'PBKDF2',salt,iterations:160000,hash:'SHA-256'},key,256);return Array.from(new Uint8Array(bits),byte=>byte.toString(16).padStart(2,'0')).join('');}
function sameVerifier(a,b){if(typeof a!=='string'||typeof b!=='string'||a.length!==b.length)return false;let diff=0;for(let i=0;i<a.length;i++)diff|=a.charCodeAt(i)^b.charCodeAt(i);return diff===0;}
function activateAccount(account){currentAccount={username:account.username,displayName:account.displayName||account.username};profileStorageKey=profileKeyFor(account.username);profile=loadProfile(profileStorageKey);recoverPendingDungeon();checkShipMissionUnlocks(false);saveProfile();document.getElementById('accountName').textContent=`PILOTO · ${currentAccount.displayName}`;showHome();}
function showAuth(){state='menu';document.getElementById('homeBtn').style.display='none';showScreen('authScreen');document.getElementById('authPassword').value='';document.getElementById('authConfirm').value='';}
function logout(){saveProfile();currentAccount=null;profile=defaultProfile();profileStorageKey=PROFILE_KEY;selectedForge.clear();selectedShipForge.clear();shopStock=[];clearControls();showAuth();setAuthMode(readAccounts().length?'login':'register');}
function missionProgress(mission){return Math.max(0,Math.floor(Number(profile.missions[mission.id])||0));}
function checkShipMissionUnlocks(announce=true){let rewards=0;for(const mission of SHIP_MISSIONS){while(missionProgress(mission)>=mission.target){profile.missions[mission.id]-=mission.target;addShipCopy(mission.shipId);rewards++;if(announce)toast(`MISSÃO CONCLUÍDA · ${shipById(mission.shipId).name} +1 · MISSÃO REINICIADA!`);}}if(rewards)saveProfile();return rewards;}
function recordMissionProgress(id,amount=1){if(!Object.hasOwn(profile.missions,id))return;const gain=Math.max(0,Math.floor(Number(amount)||0));if(!gain)return;profile.missions[id]=(Number(profile.missions[id])||0)+gain;checkShipMissionUnlocks();saveProfile();}
function walletMarkup(){return `<span class="currency"><img src="assets/images/01.png" alt=""> ${profile.coins} CR</span><span class="currency"><img src="assets/images/02.png" alt=""> ${profile.gems} GEMAS</span><span class="currency"><img src="assets/images/03.png" alt=""> ${profile.shards} FRAG.</span>`;}
function updateWallets(){const html=walletMarkup();document.getElementById('homeWallet').innerHTML=`${html}<span class="currency">LVL ${profile.level}</span>`;document.getElementById('shopWallet').innerHTML=html;const marketWallet=document.getElementById('marketWallet');if(marketWallet)marketWallet.innerHTML=html;}
function renderHomeDashboard(){
  const planets=document.getElementById('homePlanets');planets.innerHTML='';
  PLANETS.forEach(pl=>{const unlocked=pl.id<=profile.unlockedPlanet;const card=document.createElement('button');card.className=`home-planet${profile.selectedPlanet===pl.id?' selected':''}${unlocked?' unlocked':' locked'}`;card.setAttribute('aria-pressed',profile.selectedPlanet===pl.id?'true':'false');card.innerHTML=`<span class="planet-orb" aria-hidden="true"></span><span class="home-planet-copy"><strong>${unlocked?'':'🔒 '}${pl.name}</strong><small>${pl.subtitle} · ${pl.difficulty}</small><small>LVL RECOMENDADO ${pl.levelRange}</small><span class="planet-stage-dots" aria-label="10 fases e chefe">${Array.from({length:11},(_,i)=>`<i${i===10?' class="boss-dot"':''}></i>`).join('')}</span></span>`;card.addEventListener('click',()=>{if(!unlocked){toast('Derrote o chefe do planeta anterior para desbloquear.');return;}profile.selectedPlanet=pl.id;saveProfile();renderHomeDashboard();});planets.appendChild(card);});
  const ship=shipStatsFor(activeShipItem()),primary=weaponByUid(profile.equipped.primary),secondary=weaponByUid(profile.equipped.secondary),perm=profile.permanent;
  const attrs=profile.attributes||{shield:0,life:0,speed:0,power:0};
  const hull=Math.round((100+(profile.level-1)*50+(perm.hull||0)*15+(attrs.life||0)*25)*ship.hp),shield=(perm.shield||0)+(attrs.shield||0),energy=(perm.energy||0)+(attrs.power||0);
  document.getElementById('homeShipName').textContent=`${ship.name}${ship.rank?` · MK ${ship.rank+1}`:''}`;
  document.getElementById('homeHullValue').textContent=`${hull} / ${hull}`;
  document.getElementById('homeShieldValue').textContent=`${shield} CARGAS`;
  document.getElementById('homeEnergyValue').textContent=`NV ${energy} · VEL. ${attrs.speed||0}`;
  document.getElementById('homeHullBar').style.width='100%';
  document.getElementById('homeShieldBar').style.width=`${Math.min(100,Math.max(14,shield*22))}%`;
  document.getElementById('homeEnergyBar').style.width=`${Math.min(100,45+energy*10)}%`;
  const planet=PLANETS[profile.selectedPlanet];
  document.getElementById('homePlanetLabel').textContent=`${planet.name} · FASE 1`;
  const primaryType=primary?typeById(primary.type):null,primaryRarity=primary?rarityById(primary.rarity):null;
  const secondaryType=secondary?typeById(secondary.type):null,secondaryRarity=secondary?rarityById(secondary.rarity):null;
  const primaryName=document.getElementById('homePrimaryWeapon'),primaryTier=document.getElementById('homePrimaryRarity');
  primaryName.textContent=primaryType?primaryType.name:'SEM ARMA';primaryTier.textContent=primaryRarity?`${primaryRarity.name} · EQUIPADO`:'EQUIPE NO ARSENAL';primaryName.style.color=primaryRarity?.color||'';
  const secondaryName=document.getElementById('homeSecondaryWeapon'),secondaryTier=document.getElementById('homeSecondaryRarity');
  secondaryName.textContent=secondaryType?secondaryType.name:'SEM ARMA';secondaryTier.textContent=secondaryRarity?`${secondaryRarity.name} · EQUIPADO`:'EQUIPE NO ARSENAL';secondaryName.style.color=secondaryRarity?.color||'';
  document.getElementById('homeShieldUpgrade').textContent=`ESCUDO · NV ${shield}`;
  document.getElementById('homeShieldUpgradeLevel').textContent=`CASCO · NV ${perm.hull||0}  /  ENERGIA · NV ${energy}`;
  document.getElementById('homeShardCount').textContent=`${profile.shards} FRAGMENTOS`;
  updateDungeonButton();
}
function updateDungeonButton(){const today=localDayKey(),used=profile.dailyDungeon?.playedDate===today,button=document.getElementById('dungeonBtn'),status=document.getElementById('dungeonStatus');button.disabled=used;button.textContent=used?'DUNGEON DIÁRIA · CONCLUÍDA':'DUNGEON DIÁRIA · 100 NÍVEIS';status.textContent=used?`Tentativa de hoje encerrada · recorde: nível ${profile.dailyDungeon.highest||0}`:'Uma tentativa por dia · recompensas creditadas ao morrer ou concluir';}
function updateHomeShipPreview(){const item=activeShipItem(),ship=shipById(item?.shipId||profile.shipId),homeShip=document.getElementById('homeShip');homeShip.src=ship.src;homeShip.alt=`Nave ${ship.name}${item?.rank?` Mk ${item.rank+1}`:''}`;}
function showHome(){if(pvpMatch&&!pvpMatch.active)cancelPvPRoom();afkMode=false;afkUpgradeTimer=0;afkClearDelay=0;afkNextPlanet=null;state='menu';touch.active=false;showScreen('homeScreen');document.getElementById('homeBtn').style.display='none';updateAfkButton();updateHomeShipPreview();renderHomeDashboard();updateWallets();}
document.getElementById('authLoginTab').addEventListener('click',()=>setAuthMode('login'));
document.getElementById('authRegisterTab').addEventListener('click',()=>setAuthMode('register'));
document.getElementById('authForm').addEventListener('submit',async event=>{
  event.preventDefault();
  const submit=document.getElementById('authSubmit'),registering=!document.getElementById('authConfirmField').hidden;
  const displayName=document.getElementById('authUsername').value.trim(),username=displayName.toLowerCase(),password=document.getElementById('authPassword').value;
  const confirmation=document.getElementById('authConfirm').value;
  if(!/^[a-z0-9._-]{3,20}$/.test(username)){authMessage('Use um nome de piloto de 3 a 20 caracteres: letras, números, ponto, hífen ou _.');return;}
  if(registering&&(password.length<8||password!==confirmation)){authMessage(password.length<8?'A senha precisa ter pelo menos 8 caracteres.':'As senhas não coincidem.');return;}
  if(!registering&&!password){authMessage('Digite sua senha para continuar.');return;}
  submit.disabled=true;submit.textContent=registering?'CRIANDO CONTA…':'VALIDANDO…';
  try{
    const accounts=readAccounts();
    if(registering){
      if(accounts.some(account=>account.username.toLowerCase()===username)){authMessage('Esse nome de piloto já está cadastrado neste navegador.');return;}
      if(!globalThis.crypto?.getRandomValues)throw new Error('A criação de contas exige um navegador com criptografia segura, normalmente disponível em HTTPS.');
      const saltBytes=new Uint8Array(16);globalThis.crypto.getRandomValues(saltBytes);const salt=encodeBase64(saltBytes),verifier=await passwordVerifier(password,salt);
      const account={username,displayName,salt,verifier,createdAt:Date.now()};
      const accountProfileKey=profileKeyFor(username);
      // Every newly created account starts with a clean profile, never the legacy save.
      localStorage.setItem(accountProfileKey,JSON.stringify(defaultProfile()));
      localStorage.setItem(ACCOUNT_KEY,JSON.stringify([...accounts,account]));
      activateAccount(account);
    }else{
      const account=accounts.find(item=>item.username.toLowerCase()===username);
      if(!account){authMessage('Nome de piloto ou senha inválidos.');return;}
      const candidate=await passwordVerifier(password,account.salt);
      if(!sameVerifier(candidate,account.verifier)){authMessage('Nome de piloto ou senha inválidos.');return;}
      activateAccount(account);
    }
  }catch(error){authMessage(error?.message||'Não foi possível acessar os dados da conta neste navegador.');}
  finally{submit.disabled=false;submit.textContent=registering?'CRIAR CONTA E ENTRAR':'ENTRAR NO HANGAR';}
});
document.getElementById('logoutBtn').addEventListener('click',logout);
function bindScreenButtons(){document.querySelectorAll('[data-screen]').forEach(b=>b.addEventListener('click',()=>{renderMenu(b.dataset.screen);showScreen(b.dataset.screen);}));document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',showHome));}
bindScreenButtons();
let selectedForge=new Set(),selectedShipForge=new Set(),shopStock=[];

function renderCampaign(){const grid=document.getElementById('planetGrid');grid.innerHTML='';PLANETS.forEach(pl=>{const unlocked=pl.id<=profile.unlockedPlanet;const card=document.createElement('button');card.className=`planet-card${profile.selectedPlanet===pl.id?' selected':''}${unlocked?'':' locked'}`;card.innerHTML=`<span class="planet-name">${unlocked?'':'🔒 '}${pl.name}</span><span class="planet-meta">${pl.subtitle}<br>${pl.difficulty}<br>LVL RECOMENDADO ${pl.levelRange}<br>${unlocked?'10 FASES + CHEFE':'Derrote o chefe anterior'}</span>`;card.addEventListener('click',()=>{if(!unlocked){toast('Derrote o chefe do planeta anterior para desbloquear.');return;}profile.selectedPlanet=pl.id;saveProfile();renderCampaign();showHome();showScreen('campaignScreen');});grid.appendChild(card);});document.getElementById('planetProgress').textContent=`PLANETA DESBLOQUEADO: ${PLANETS[profile.unlockedPlanet].name}`;}
function renderHangar(){
  const missionList=document.getElementById('missionList');missionList.innerHTML='';
  for(const mission of SHIP_MISSIONS){const ship=shipById(mission.shipId),progress=missionProgress(mission),unlocked=profile.unlockedShips.includes(ship.id),copies=profile.shipInventory.filter(item=>item.shipId===ship.id).length,percent=Math.min(100,progress/mission.target*100);const item=document.createElement('div');item.className=`mission-entry${unlocked?' complete':''}`;item.innerHTML=`<div class="mission-heading"><strong>${unlocked?'✓':'◆'} ${mission.title}</strong><span>${progress} / ${mission.target}</span></div><div class="mission-desc">${mission.desc}</div><div class="mission-track"><i style="width:${percent}%"></i></div><div class="mission-reward">RECOMPENSA: ${ship.name} · ${copies} NO HANGAR${unlocked?' · MISSÃO REPETÍVEL':''}</div>`;missionList.appendChild(item);}
  const grid=document.getElementById('shipGrid');grid.innerHTML='';
  for(const ship of SHIPS){
    const mission=SHIP_MISSIONS.find(m=>m.shipId===ship.id),copies=profile.shipInventory.filter(item=>item.shipId===ship.id);
    if(copies.length){for(const owned of copies){const stats=shipStatsFor(owned),active=profile.activeShipUid===owned.uid,card=document.createElement('div');card.className=`ship-card${active?' selected':''}`;card.innerHTML=`<div class="ship-art"><img src="${ship.src}" alt="${ship.name}"></div><span class="ship-title">${ship.name} · MK ${owned.rank+1}${active?' · ATIVA':''}</span><span class="ship-stats">${ship.role}<br>CASCO ×${stats.hp.toFixed(2)} · DANO ×${stats.damage.toFixed(2)} · VEL. ×${stats.speed.toFixed(2)}</span><button class="tiny-btn ship-select-btn" data-select-ship="${owned.uid}">${active?'NAVE ATIVA':'EQUIPAR NAVE'}</button>`;card.querySelector('[data-select-ship]').addEventListener('click',()=>{setActiveShip(owned);saveProfile();updateHomeShipPreview();renderHomeDashboard();renderHangar();toast(`${ship.name}${owned.rank?` MK ${owned.rank+1}`:''} pronta para decolar.`);});grid.appendChild(card);}}
    else{const progress=mission?missionProgress(mission):0,card=document.createElement('div');card.className='ship-card locked';card.innerHTML=`<div class="ship-art"><img src="${ship.src}" alt="${ship.name}"></div><span class="ship-title">${ship.name}</span><span class="ship-stats">${ship.role}<br>${ship.stats}</span><span class="ship-lock">${mission?`🔒 ${progress}/${mission.target} · ${mission.title}`:'SEM CÓPIAS NO HANGAR'}</span>`;grid.appendChild(card);}
  }
  const upgradeBox=document.getElementById('permanentUpgrades');upgradeBox.innerHTML='';for(const up of PERMANENT){const level=profile.permanent[up.id]||0,cost=up.base*(level+1);const row=document.createElement('div');row.className='upgrade-row';row.innerHTML=`<div><div class="upgrade-name">${up.name} · NV ${level}</div><div class="upgrade-desc">${up.desc}</div></div><button class="tiny-btn">MELHORAR · ${cost} CR</button>`;row.querySelector('button').addEventListener('click',()=>{if(profile.coins<cost){toast('Créditos insuficientes.');return;}profile.coins-=cost;profile.permanent[up.id]=level+1;saveProfile();renderHangar();updateWallets();toast(`${up.name} melhorado permanentemente!`);});upgradeBox.appendChild(row);}
}
function renderAttributes(){
  const list=document.getElementById('attributeList');list.innerHTML='';
  document.getElementById('attributeWallet').innerHTML=walletMarkup();
  for(const attribute of ATTRIBUTE_UPGRADES){
    const level=profile.attributes[attribute.id]||0,cost=Math.round(attribute.base*Math.pow(level+1,1.35));
    const card=document.createElement('article');card.className='attribute-card';
    card.innerHTML=`<span class="attribute-icon">${attribute.icon}</span><div><strong>${attribute.name} · NV ${level}</strong><small>${attribute.desc}</small></div><button class="tiny-btn">MELHORAR · ${cost} CR</button>`;
    card.querySelector('button').addEventListener('click',()=>{if(profile.coins<cost){toast('Créditos insuficientes para esse atributo.');return;}profile.coins-=cost;profile.attributes[attribute.id]=level+1;saveProfile();renderAttributes();renderHomeDashboard();updateWallets();toast(`${attribute.name} · nível ${level+1} instalado.`);});
    list.appendChild(card);
  }
}
function renderDrones(){
  const list=document.getElementById('droneShopList');list.innerHTML='';document.getElementById('droneWallet').innerHTML=walletMarkup();
  for(const drone of DRONE_CATALOG){
    const level=profile.drones[drone.id]||0,cost=Math.round(drone.base*Math.pow(level+1,1.45)),card=document.createElement('article');
    card.className=`drone-shop-card ${drone.id}`;
    card.innerHTML=`<img src="${drone.image.src}" alt="${drone.name}"><div class="drone-shop-copy"><strong>${drone.name} · NV ${level}/${DRONE_MAX_LEVEL}</strong><small>${drone.description}</small><small>${drone.bonus} · ${level} instalado(s) na nave</small></div><button class="tiny-btn" ${level>=DRONE_MAX_LEVEL?'disabled':''}>${level>=DRONE_MAX_LEVEL?'LIMITE ATINGIDO':`COMPRAR · ${cost} CR`}</button>`;
    card.querySelector('button').addEventListener('click',()=>{if(level>=DRONE_MAX_LEVEL)return;if(profile.coins<cost){toast('Créditos insuficientes para comprar este drone.');return;}profile.coins-=cost;profile.drones[drone.id]=level+1;saveProfile();renderDrones();updateWallets();renderHomeDashboard();toast(`${drone.name} instalado permanentemente na nave!`);});
    list.appendChild(card);
  }
}
function renderInventory(){const list=document.getElementById('weaponList');list.innerHTML='';const primary=weaponByUid(profile.equipped.primary),secondary=weaponByUid(profile.equipped.secondary);document.getElementById('equippedSummary').textContent=`PRINCIPAL: ${primary?weaponLabel(primary):'—'}   ·   SECUNDÁRIA: ${secondary?weaponLabel(secondary):'—'}`;for(const w of profile.inventory){const r=rarityById(w.rarity),type=typeById(w.type);const card=document.createElement('div');card.className='weapon-card';card.innerHTML=`<div><div class="weapon-name" style="color:${r.color}">${type.name}</div><div class="rarity" style="color:${r.color}">${r.name} · PODER ${Math.round(weaponDamageFactor(w)*100)}%</div><div class="weapon-desc">${type.desc}</div></div><div class="weapon-actions"><button class="tiny-btn" data-equip="primary">${profile.equipped.primary===w.uid?'✓ PRINCIPAL':'PRINCIPAL'}</button><button class="tiny-btn" data-equip="secondary">${profile.equipped.secondary===w.uid?'✓ SEC.':'SECUNDÁRIA'}</button></div>`;card.querySelectorAll('[data-equip]').forEach(btn=>btn.addEventListener('click',()=>{const slot=btn.dataset.equip;profile.equipped[slot]=w.uid;saveProfile();renderInventory();toast(`${type.name} equipada como ${slot==='primary'?'arma principal':'arma secundária'}.`);}));list.appendChild(card);}}
function renderForge(){const list=document.getElementById('forgeList');list.innerHTML='';document.getElementById('forgeWallet').textContent=`FRAGMENTOS DISPONÍVEIS: ⬡ ${profile.shards}`;selectedForge=new Set([...selectedForge].filter(id=>profile.inventory.some(w=>w.uid===id)));for(const w of profile.inventory){const r=rarityById(w.rarity);const card=document.createElement('button');card.className='weapon-card';card.style.width='100%';card.style.textAlign='left';card.style.borderColor=selectedForge.has(w.uid)?r.color:'';card.innerHTML=`<div><div class="weapon-name" style="color:${r.color}">${typeById(w.type).name}</div><div class="rarity" style="color:${r.color}">${r.name}</div></div><span>${selectedForge.has(w.uid)?'✓ SELECIONADA':'TOQUE PARA SELECIONAR'}</span>`;card.addEventListener('click',()=>{if(selectedForge.has(w.uid))selectedForge.delete(w.uid);else if(selectedForge.size<2)selectedForge.add(w.uid);else toast('Selecione exatamente duas armas.');renderForge();});list.appendChild(card);}const btn=document.getElementById('forgeBtn'),picked=[...selectedForge].map(weaponByUid).filter(Boolean);const valid=picked.length===2&&picked[0].rarity===picked[1].rarity&&rarityById(picked[0].rarity).tier<4;const cost=picked.length?4+rarityById(picked[0].rarity).tier*3:0;btn.disabled=!valid||profile.shards<cost;btn.textContent=picked.length===2?`FORJAR · ⬡ ${cost}`:'SELECIONE 2 ARMAS';btn.onclick=()=>{if(!valid||profile.shards<cost)return;const rarity=rarityById(picked[0].rarity),upgraded=RARITIES[rarity.tier+1];const types=picked.map(w=>w.type);const mainConsumed=profile.equipped.primary&&selectedForge.has(profile.equipped.primary),secConsumed=profile.equipped.secondary&&selectedForge.has(profile.equipped.secondary);profile.inventory=profile.inventory.filter(w=>!selectedForge.has(w.uid));profile.shards-=cost;const forged={uid:`weapon-${Date.now()}-${profile.weaponSerial++}`,type:types[Math.floor(Math.random()*types.length)],rarity:upgraded.id};profile.inventory.push(forged);if(mainConsumed)profile.equipped.primary=forged.uid;if(secConsumed)profile.equipped.secondary=forged.uid;selectedForge.clear();saveProfile();renderForge();toast(`${upgraded.name}: ${typeById(forged.type).name} criada!`);};}
function renderShipForge(){
  const list=document.getElementById('shipForgeList'),wallet=document.getElementById('shipForgeWallet');
  selectedShipForge=new Set([...selectedShipForge].filter(uid=>shipByUid(uid)));
  wallet.textContent=`FRAGMENTOS DISPONÍVEIS: ⬡ ${profile.shards} · FUSÃO CONSOME 2 NAVES DO MESMO MODELO E MK`;
  list.innerHTML='';
  for(const owned of profile.shipInventory){const ship=shipById(owned.shipId),active=profile.activeShipUid===owned.uid,selected=selectedShipForge.has(owned.uid),card=document.createElement('button');card.className='weapon-card ship-forge-card';card.style.borderColor=selected?'#70ddff':'';card.innerHTML=`<div class="ship-forge-info"><img src="${ship.src}" alt=""><span><strong>${ship.name} · MK ${owned.rank+1}${active?' · ATIVA':''}</strong><small>${selected?'✓ SELECIONADA':'TOQUE PARA SELECIONAR'}${owned.rank>=SHIP_MAX_RANK?' · RANK MÁXIMO':''}</small></span></div>`;card.addEventListener('click',()=>{if(selectedShipForge.has(owned.uid))selectedShipForge.delete(owned.uid);else if(selectedShipForge.size<2)selectedShipForge.add(owned.uid);else toast('Selecione somente duas naves.');renderShipForge();});list.appendChild(card);}
  const btn=document.getElementById('shipForgeBtn'),picked=[...selectedShipForge].map(shipByUid).filter(Boolean),valid=picked.length===2&&picked[0].shipId===picked[1].shipId&&picked[0].rank===picked[1].rank&&picked[0].rank<SHIP_MAX_RANK,cost=picked.length?3+picked[0].rank*2:0;
  btn.disabled=!valid||profile.shards<cost;
  btn.textContent=picked.length===2?(valid?`FUNDIR NAVES · ⬡ ${cost}`:'ESCOLHA 2 CÓPIAS IGUAIS'):'SELECIONE 2 NAVES';
  btn.onclick=()=>{if(!valid||profile.shards<cost)return;const {shipId,rank}=picked[0],consumedActive=picked.some(item=>item.uid===profile.activeShipUid);profile.shipInventory=profile.shipInventory.filter(item=>!selectedShipForge.has(item.uid));profile.shards-=cost;const fused=addShipCopy(shipId,rank+1);if(consumedActive)setActiveShip(fused);selectedShipForge.clear();saveProfile();updateHomeShipPreview();renderHomeDashboard();renderShipForge();toast(`${shipById(shipId).name} MK ${rank+2} forjada!`);};
}
function renderMarket(){
  updateWallets();const list=document.getElementById('shipMarketList');list.innerHTML='';
  if(!profile.shipInventory.length){list.innerHTML='<p class="section-sub">Nenhuma nave disponível no mercado.</p>';return;}
  const stock=[...profile.shipInventory].sort((a,b)=>SHIPS.findIndex(ship=>ship.id===a.shipId)-SHIPS.findIndex(ship=>ship.id===b.shipId)||a.rank-b.rank);
  for(const owned of stock){const ship=shipById(owned.shipId),stats=shipStatsFor(owned),count=profile.shipInventory.filter(item=>item.shipId===owned.shipId).length,protectedCopy=count<=1,price=shipSellPrice(owned),card=document.createElement('div');card.className='shop-card ship-market-card';card.innerHTML=`<img src="${ship.src}" alt="${ship.name}"><div class="ship-market-copy"><strong>${ship.name} · MK ${owned.rank+1}${profile.activeShipUid===owned.uid?' · ATIVA':''}</strong><small>CASCO ×${stats.hp.toFixed(2)} · DANO ×${stats.damage.toFixed(2)} · VEL. ×${stats.speed.toFixed(2)}</small><small>${protectedCopy?'ÚLTIMA CÓPIA · PROTEGIDA':'Valor de revenda · '+price+' CR'}</small></div><button class="tiny-btn" ${protectedCopy?'disabled':''}>${protectedCopy?'PROTEGIDA':`VENDER · ${price} CR`}</button>`;
    card.querySelector('button').addEventListener('click',()=>{if(protectedCopy)return;const current=shipByUid(owned.uid);if(!current)return;profile.coins+=price;profile.shipInventory=profile.shipInventory.filter(item=>item.uid!==owned.uid);if(profile.activeShipUid===owned.uid)setActiveShip(profile.shipInventory.find(item=>item.shipId===owned.shipId)||profile.shipInventory[0]);saveProfile();renderMarket();renderHomeDashboard();updateHomeShipPreview();toast(`${ship.name} vendida por ${price} créditos.`);});list.appendChild(card);
  }
}
function renderShop(){updateWallets();const stock=document.getElementById('shopStock');stock.innerHTML='';shopStock.forEach((item,index)=>{const card=document.createElement('div');card.className='shop-card';const rarity=rarityById(item.weapon.rarity);card.innerHTML=`<div><div class="shop-title" style="color:${rarity.color}">${typeById(item.weapon.type).name} · ${rarity.name}</div><div class="shop-desc">Arma aleatória · ${item.price} créditos</div></div><button class="tiny-btn">COMPRAR</button>`;card.querySelector('button').addEventListener('click',()=>{if(profile.coins<item.price){toast('Créditos insuficientes.');return;}profile.coins-=item.price;profile.inventory.push({...item.weapon,uid:`weapon-${Date.now()}-${profile.weaponSerial++}`});shopStock.splice(index,1);saveProfile();renderShop();toast('Nova arma adicionada ao arsenal!');});stock.appendChild(card);});const services=document.getElementById('shopServices');services.innerHTML='';const offers=[
    {title:'Pacote de Fragmentos',desc:'5 fragmentos espaciais para a forja',price:'80 CR',buy:()=>{if(profile.coins<80)return false;profile.coins-=80;profile.shards+=5;return true;}},
    {title:'Caixa de Armas',desc:'Uma arma aleatória garantida incomum ou melhor',price:'150 CR',buy:()=>{if(profile.coins<150)return false;profile.coins-=150;profile.inventory.push(newWeapon(rollRarity(1)));return true;}},
    {title:'Núcleo de Gema',desc:'Troque 20 gemas por 180 créditos',price:'20 GEMAS',buy:()=>{if(profile.gems<20)return false;profile.gems-=20;profile.coins+=180;return true;}},
  ];for(const offer of offers){const card=document.createElement('div');card.className='shop-card';card.innerHTML=`<div><div class="shop-title">${offer.title}</div><div class="shop-desc">${offer.desc}</div></div><button class="tiny-btn">${offer.price}</button>`;card.querySelector('button').addEventListener('click',()=>{if(!offer.buy()){toast('Recursos insuficientes.');return;}saveProfile();renderShop();toast(`${offer.title} adquirido.`);});services.appendChild(card);}document.getElementById('refreshShopBtn').onclick=()=>{if(profile.coins<25){toast('Você precisa de 25 créditos.');return;}profile.coins-=25;makeShopStock();saveProfile();renderShop();};}
function makeShopStock(){shopStock=Array.from({length:3},()=>{const weapon=newWeapon(rollRarity(0));return{weapon,price:rarityPrice(weapon.rarity)};});}
function renderMenu(id){if(id==='campaignScreen')renderCampaign();if(id==='hangarScreen')renderHangar();if(id==='inventoryScreen')renderInventory();if(id==='forgeScreen'){renderForge();renderShipForge();}if(id==='marketScreen')renderMarket();if(id==='shopScreen'){if(!shopStock.length)makeShopStock();renderShop();}if(id==='attributesScreen')renderAttributes();if(id==='dronesScreen')renderDrones();if(id==='pvpScreen')renderPvPScreen();}
document.querySelectorAll('[data-screen]').forEach(b=>b.addEventListener('click',()=>{}));
document.getElementById('launchPlanetBtn').addEventListener('click',()=>{if(profile.selectedPlanet>profile.unlockedPlanet){toast('Planeta ainda bloqueado.');return;}newRun(profile.selectedPlanet);});
document.getElementById('startBtn').addEventListener('click',()=>newRun(profile.selectedPlanet));
document.getElementById('dungeonBtn').addEventListener('click',()=>newRun(profile.selectedPlanet,'dungeon'));
document.getElementById('continueHomeBtn').addEventListener('click',showHome);
document.getElementById('deadHomeBtn').addEventListener('click',showHome);
document.getElementById('retryBtn').addEventListener('click',()=>newRun(activePlanet));

// Gameplay state
let state='menu',player=null,activePlanet=profile.selectedPlanet,stage=1,enemies=[],bullets=[],eBullets=[],pickups=[],particles=[],texts=[],portal=null,shake=0,bgY=0,roomPaid=false,pendingPlanetComplete=false,gameMode='campaign';
let afkMode=false,afkUpgradeTimer=0,afkClearDelay=0,afkNextPlanet=null,currentUpgradePicks=[];
let dungeonRun={active:false,level:0,day:'',pending:emptyDungeonRewards()};
let pvpMatch=null,pvpMode='loot',pvpRefreshTimer=0;
const PVP_LOBBY_KEY='starforgeVoidPvPLobbiesV1';
const pvpPeerId=`pilot-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`;
const pvpBus=typeof BroadcastChannel==='function'?new BroadcastChannel('starforgeVoidPvPBusV1'):null;
let touch={active:false,id:null,sx:0,sy:0,x:0,y:0};
const movementKeys=new Set(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight']);
const pressedKeys=new Set();
function postPvP(message){if(!pvpBus)return;pvpBus.postMessage({...message,sender:pvpPeerId});}
function readPvPRooms(){try{const saved=JSON.parse(localStorage.getItem(PVP_LOBBY_KEY)||'[]');return Array.isArray(saved)?saved.filter(room=>room&&room.status==='open'&&room.hostPeer!==pvpPeerId&&Date.now()-room.createdAt<600000):[];}catch{return[];}}
function writePvPRoom(room){try{const saved=JSON.parse(localStorage.getItem(PVP_LOBBY_KEY)||'[]'),rooms=(Array.isArray(saved)?saved:[]).filter(item=>item&&item.id!==room.id&&Date.now()-item.createdAt<600000);rooms.push(room);localStorage.setItem(PVP_LOBBY_KEY,JSON.stringify(rooms));}catch{}}
function removePvPRoom(roomId){try{const saved=JSON.parse(localStorage.getItem(PVP_LOBBY_KEY)||'[]');localStorage.setItem(PVP_LOBBY_KEY,JSON.stringify((Array.isArray(saved)?saved:[]).filter(room=>room?.id!==roomId)));}catch{}}
function makePvPPilot(){const owned=activeShipItem(),ship=shipStatsFor(owned),attrs=profile.attributes||{},perm=profile.permanent||{},drones=profile.drones||{},primary=weaponByUid(profile.equipped.primary);return{peerId:pvpPeerId,name:currentAccount?.displayName||'Piloto',shipId:ship.id,shipRank:ship.rank||0,hp:Math.round((400+profile.level*40+(perm.hull||0)*25+(attrs.life||0)*45)*ship.hp),damage:ship.damage*(1+(perm.energy||0)*.08+(attrs.power||0)*.09)*(primary?weaponDamageFactor(primary):1)*(1+(drones.attack||0)*.12),damageReduction:Math.min(.3,(drones.defense||0)*.1),droneAttack:drones.attack||0,droneDefense:drones.defense||0,speed:ship.speed*(1+(perm.engine||0)*.06+(attrs.speed||0)*.05),shield:(perm.shield||0)+(attrs.shield||0)};}
function stakeName(stake){if(!stake)return'Recompensa aleatória';if(stake.kind==='ship')return`1× ${shipById(stake.shipId).name} MK ${stake.rank+1}`;return`${stake.amount} ${({coins:'créditos',gems:'gemas',shards:'fragmentos'})[stake.kind]||stake.kind}`;}
function canPayPvPStake(stake){if(!stake)return true;if(stake.kind==='ship')return profile.shipInventory.some(item=>item.shipId===stake.shipId&&item.rank===stake.rank);return Number(profile[stake.kind]||0)>=stake.amount;}
function debitPvPStake(){const stake=pvpMatch?.room?.stake;if(!stake)return true;if(stake.kind==='ship'){const index=profile.shipInventory.findIndex(item=>item.shipId===stake.shipId&&item.rank===stake.rank);if(index<0)return false;const [removed]=profile.shipInventory.splice(index,1);if(removed.uid===profile.activeShipUid){const replacement=profile.shipInventory[0];if(replacement)setActiveShip(replacement);}if(!profile.shipInventory.length){const fallback=addShipCopy('vanguard');setActiveShip(fallback);}}else{if(!canPayPvPStake(stake))return false;profile[stake.kind]-=stake.amount;}pvpMatch.paid=true;saveProfile();updateWallets();updateHomeShipPreview();return true;}
function creditPvPStake(copies=1){const stake=pvpMatch?.room?.stake;if(!stake)return;if(stake.kind==='ship'){for(let i=0;i<copies;i++)addShipCopy(stake.shipId,stake.rank);}else profile[stake.kind]+=stake.amount*copies;}
function refundPvPStake(){if(!pvpMatch?.paid)return;creditPvPStake(1);pvpMatch.paid=false;saveProfile();updateWallets();updateHomeShipPreview();}
function awardRandomPvPReward(){const roll=Math.random();if(roll<.43){const amount=120+Math.floor(Math.random()*181);profile.coins+=amount;return`+${amount} créditos`;}if(roll<.68){const amount=4+Math.floor(Math.random()*7);profile.gems+=amount;return`+${amount} gemas`;}if(roll<.9){const amount=4+Math.floor(Math.random()*8);profile.shards+=amount;return`+${amount} fragmentos`;}const ship=SHIPS[Math.floor(Math.random()*SHIPS.length)];addShipCopy(ship.id);return`nave ${ship.name}`;}
function settlePvPResult(winnerId,draw=false,aborted=false){if(!pvpMatch||pvpMatch.settled)return'';pvpMatch.settled=true;let reward='';if(aborted||draw)refundPvPStake();else if(winnerId===pvpPeerId){if(pvpMatch.room.mode==='stake'){creditPvPStake(2);reward='aposta dobrada';}else reward=awardRandomPvPReward();saveProfile();updateWallets();updateHomeShipPreview();}return reward;}
function setPvPStatus(text,showCancel=true){const box=document.getElementById('pvpRoomStatus');if(!box)return;box.hidden=!text;if(!text)return;box.innerHTML=`<strong>${text}</strong>${showCancel?'<button id="pvpCancelBtn" class="tiny-btn">CANCELAR SALA</button>':''}`;box.querySelector('#pvpCancelBtn')?.addEventListener('click',cancelPvPRoom);}
function renderPvPRoomList(){const list=document.getElementById('pvpRoomList');if(!list)return;const rooms=readPvPRooms();list.innerHTML='';if(!rooms.length){list.innerHTML='<div class="pvp-empty">Nenhuma sala aberta agora. Crie uma e abra outra aba para entrar com outro piloto.</div>';return;}for(const room of rooms){const card=document.createElement('div');card.className='pvp-room-card';card.innerHTML=`<div><strong>${room.hostName} · SALA ${room.id}</strong><small>${room.mode==='stake'?`Aposta igual: ${stakeName(room.stake)}`:'Vitória: recompensa aleatória'} · Nave ${shipById(room.hostShipId).name}</small></div><button class="tiny-btn">ACEITAR</button>`;card.querySelector('button').addEventListener('click',()=>joinPvPRoom(room));list.appendChild(card);}}
function refreshPvPShipOptions(){const select=document.getElementById('pvpStakeShip'),items=[];for(const owned of profile.shipInventory){const key=`${owned.shipId}|${owned.rank}`;if(!items.some(item=>item.key===key))items.push({key,shipId:owned.shipId,rank:owned.rank,count:profile.shipInventory.filter(copy=>copy.shipId===owned.shipId&&copy.rank===owned.rank).length});}select.innerHTML=items.map(item=>`<option value="${item.key}">${shipById(item.shipId).name} · MK ${item.rank+1} · ${item.count} cópias</option>`).join('');}
function updatePvPStakeFields(){const kind=document.getElementById('pvpStakeKind').value,isShip=kind==='ship';document.getElementById('pvpStakeAmountWrap').hidden=isShip;document.getElementById('pvpStakeShipWrap').hidden=!isShip;}
function renderPvPScreen(){document.getElementById('pvpWallet').innerHTML=walletMarkup();refreshPvPShipOptions();document.getElementById('pvpLootMode').classList.toggle('active',pvpMode==='loot');document.getElementById('pvpStakeMode').classList.toggle('active',pvpMode==='stake');document.getElementById('pvpStakeFields').hidden=pvpMode!=='stake';updatePvPStakeFields();const create=document.getElementById('pvpCreateRoomBtn');create.disabled=!!pvpMatch||!pvpBus;create.textContent=pvpMatch?'SALA EM ANDAMENTO':'CRIAR SALA PvP';if(!pvpBus)create.textContent='NAVEGADOR SEM SUPORTE PvP';if(!pvpMatch)setPvPStatus('',false);else if(pvpMatch.role==='host')setPvPStatus(pvpMatch.status==='waiting'?`SALA ${pvpMatch.room.id} · aguardando rival · aposta: ${stakeName(pvpMatch.room.stake)}`:pvpMatch.status==='payment'?`Rival conectado · aguardando confirmação da aposta ${stakeName(pvpMatch.room.stake)}…`:'Duelo conectado');else setPvPStatus(pvpMatch.status==='connecting'?`Conectando à sala ${pvpMatch.room.id}…`:`Sala ${pvpMatch.room.id} aceita · preparando nave…`);renderPvPRoomList();}
function selectedPvPStake(){const kind=document.getElementById('pvpStakeKind').value;if(kind==='ship'){const [shipId,rank]=document.getElementById('pvpStakeShip').value.split('|');return{kind,amount:1,shipId,rank:Number(rank)||0};}return{kind,amount:Math.max(1,Math.min(999999,Math.floor(Number(document.getElementById('pvpStakeAmount').value)||1)))};}
function createPvPRoom(){if(!pvpBus){toast('Este navegador não suporta salas PvP entre abas.');return;}if(pvpMatch){toast('Você já está em uma sala PvP.');return;}const roomId=Math.random().toString(36).slice(2,8).toUpperCase(),mode=pvpMode==='stake'?'stake':'loot',stake=mode==='stake'?selectedPvPStake():null;if(stake&&!canPayPvPStake(stake)){toast('Você não possui esse item ou quantidade para apostar.');return;}const pilot=makePvPPilot(),room={id:roomId,hostPeer:pvpPeerId,hostName:pilot.name,hostShipId:pilot.shipId,mode,stake,status:'open',createdAt:Date.now()};pvpMatch={role:'host',room,status:'waiting',selfPilot:pilot,opponentPilot:null,opponentId:null,paid:false,active:false,settled:false};writePvPRoom(room);renderPvPScreen();toast(`Sala ${roomId} aberta para outro piloto neste navegador.`);}
function joinPvPRoom(room){if(!pvpBus||pvpMatch){toast('Você já está em uma sala ou o navegador não suporta PvP.');return;}if(room.mode==='stake'&&!canPayPvPStake(room.stake)){toast(`A aposta exige exatamente ${stakeName(room.stake)}.`);return;}const pilot=makePvPPilot();pvpMatch={role:'guest',room,status:'connecting',selfPilot:pilot,opponentPilot:null,opponentId:room.hostPeer,paid:false,active:false,settled:false,lastHostBeat:performance.now()};postPvP({type:'join-request',roomId:room.id,pilot});renderPvPScreen();setTimeout(()=>{if(pvpMatch?.role==='guest'&&!pvpMatch.active&&pvpMatch.room.id===room.id)abortPvP('A sala não respondeu. Tente entrar novamente.',true);},15000);}
function cancelPvPRoom(){if(!pvpMatch||pvpMatch.active)return;const match=pvpMatch;if(match.role==='host'){postPvP({type:'cancel',roomId:match.room.id,reason:'O anfitrião fechou a sala.'});removePvPRoom(match.room.id);}else postPvP({type:'leave',roomId:match.room.id});refundPvPStake();pvpMatch=null;state='menu';clearControls();renderPvPScreen();toast('Sala PvP encerrada.');}
function abortPvP(reason,broadcast=true){if(!pvpMatch)return;const match=pvpMatch;if(broadcast&&match.role==='host')postPvP({type:'cancel',roomId:match.room.id,reason});if(match.role==='host')removePvPRoom(match.room.id);refundPvPStake();pvpMatch=null;state='menu';clearControls();if(document.getElementById('pvpScreen').classList.contains('active'))renderPvPScreen();toast(reason);}
function startPvPHost(){if(!pvpMatch||pvpMatch.role!=='host'||!pvpMatch.opponentPilot)return;const match=pvpMatch,guest=match.opponentPilot,host=match.selfPilot,actors=[{...host,x:W*.5,y:H*.76,maxHp:host.hp,fireCd:.7,move:{x:0,y:0},shield:host.shield},{...guest,x:W*.5,y:H*.24,maxHp:guest.hp,fireCd:.7,move:{x:0,y:0},shield:guest.shield}];match.actors=actors;match.bullets=[];match.timeLeft=60;match.syncTimer=0;match.heartbeatTimer=0;match.inputTimer=0;match.lastOpponentBeat=performance.now();match.active=true;match.status='active';match.isHost=true;gameMode='pvp';state='play';clearControls();showScreen('');document.getElementById('homeBtn').style.display='block';document.getElementById('homeBtn').textContent='⚑ RENDER-SE';updateAfkButton();removePvPRoom(match.room.id);postPvP({type:'go',roomId:match.room.id,actors:actors.map(actor=>({...actor,x:actor.x/W,y:actor.y/H,move:{x:0,y:0}})),timeLeft:match.timeLeft});}
function startPvPGuest(message){if(!pvpMatch||pvpMatch.role!=='guest'||pvpMatch.active)return;const match=pvpMatch;match.actors=message.actors.map(actor=>({...actor,x:actor.x*W,y:actor.y*H,move:{x:0,y:0}}));match.bullets=[];match.timeLeft=message.timeLeft;match.active=true;match.isHost=false;match.status='active';match.lastHostBeat=performance.now();gameMode='pvp';state='play';clearControls();showScreen('');document.getElementById('homeBtn').style.display='block';document.getElementById('homeBtn').textContent='⚑ RENDER-SE';updateAfkButton();}
function pvpSnapshot(){if(!pvpMatch?.isHost)return;postPvP({type:'snapshot',roomId:pvpMatch.room.id,timeLeft:pvpMatch.timeLeft,actors:pvpMatch.actors.map(actor=>({peerId:actor.peerId,name:actor.name,shipId:actor.shipId,hp:actor.hp,maxHp:actor.maxHp,shield:actor.shield,damageReduction:actor.damageReduction,droneAttack:actor.droneAttack,droneDefense:actor.droneDefense,x:actor.x/W,y:actor.y/H})),bullets:pvpMatch.bullets.map(b=>({x:b.x/W,y:b.y/H,vx:b.vx/W,vy:b.vy/H,owner:b.owner,color:b.color}))});}
function finishPvP(winnerId,reason,sendResult=true){if(!pvpMatch||!pvpMatch.active)return;const match=pvpMatch,draw=winnerId==='draw',winner=match.actors.find(actor=>actor.peerId===winnerId),reward=settlePvPResult(winnerId,draw,false);if(sendResult&&match.isHost)postPvP({type:'result',roomId:match.room.id,winnerId,reason,draw});if(match.isHost)removePvPRoom(match.room.id);pvpMatch=null;state='clear';clearControls();document.getElementById('homeBtn').style.display='none';updateAfkButton();document.getElementById('clearTitle').textContent=draw?'DUELO EMPATADO':winnerId===pvpPeerId?'VITÓRIA PvP!':'DERROTA PvP';document.getElementById('clearCopy').textContent=draw?`O tempo acabou em empate. Sua aposta foi devolvida.`:winnerId===pvpPeerId?`Você venceu ${winner?.name||'o rival'}${reward?` e recebeu ${reward}`:''}.`: `${winner?.name||'O rival'} venceu o duelo. ${match.room.mode==='stake'?'A aposta foi perdida.':'Não houve prêmio nesta partida.'}`;document.getElementById('continueHomeBtn').textContent='VOLTAR AO HANGAR';document.getElementById('clearOverlay').classList.add('active');}
function pvpAxes(){let x=(pressedKeys.has('ArrowRight')?1:0)-(pressedKeys.has('ArrowLeft')?1:0),y=(pressedKeys.has('ArrowDown')?1:0)-(pressedKeys.has('ArrowUp')?1:0);if(touch.active){const dx=touch.x-touch.sx,dy=touch.y-touch.sy,length=Math.hypot(dx,dy);if(length>8){const strength=Math.min(1,length/52);x+=dx/length*strength;y+=dy/length*strength;}}const length=Math.hypot(x,y);return length>1?{x:x/length,y:y/length}:{x,y};}
function updatePvP(dt){const match=pvpMatch;if(!match?.active)return;if(!match.isHost){match.inputTimer-=dt;match.heartbeatTimer-=dt;if(match.inputTimer<=0){match.inputTimer=.07;postPvP({type:'input',roomId:match.room.id,move:pvpAxes()});}if(match.heartbeatTimer<=0){match.heartbeatTimer=.6;postPvP({type:'beat',roomId:match.room.id});}if(performance.now()-match.lastHostBeat>10000)finishPvP(pvpPeerId,'rival desconectado',false);return;}
  match.heartbeatTimer-=dt;match.syncTimer-=dt;const own=match.actors.find(actor=>actor.peerId===pvpPeerId);if(own)own.move=pvpAxes();for(const actor of match.actors){const move=actor.move||{},isHostActor=actor.peerId===match.selfPilot.peerId,moveX=move.x||0,moveY=(move.y||0)*(isHostActor?1:-1),length=Math.hypot(moveX,moveY),factor=Math.min(1,length),speed=250*S*actor.speed;if(factor>.02){actor.x+=(moveX/length)*speed*factor*dt;actor.y+=(moveY/length)*speed*factor*dt;}actor.x=Math.max(W*.08,Math.min(W*.92,actor.x));actor.y=isHostActor?Math.max(H*.53,Math.min(H*.88,actor.y)):Math.max(H*.12,Math.min(H*.47,actor.y));actor.fireCd-=dt;if(actor.fireCd<=0){const target=match.actors.find(other=>other!==actor),angle=Math.atan2(target.y-actor.y,target.x-actor.x),velocity=500*S;actor.fireCd=.48/Math.max(.65,actor.damage);match.bullets.push({x:actor.x,y:actor.y,vx:Math.cos(angle)*velocity,vy:Math.sin(angle)*velocity,owner:actor.peerId,color:actor.peerId===pvpPeerId?'#71eaff':'#ff7da6',damage:38*actor.damage,r:5*S});}}
  for(const bullet of match.bullets){bullet.x+=bullet.vx*dt;bullet.y+=bullet.vy*dt;const target=match.actors.find(actor=>actor.peerId!==bullet.owner);if(target&&Math.hypot(target.x-bullet.x,target.y-bullet.y)<23*S+bullet.r&&!bullet.dead){bullet.dead=true;if(target.shield>0)target.shield--;else target.hp=Math.max(0,target.hp-bullet.damage*(1-(target.damageReduction||0)));}}
  match.bullets=match.bullets.filter(b=>!b.dead&&b.x>-25&&b.x<W+25&&b.y>-25&&b.y<H+25);match.timeLeft-=dt;if(performance.now()-match.lastOpponentBeat>10000){finishPvP(pvpPeerId,'rival desconectado');return;}if(match.heartbeatTimer<=0){match.heartbeatTimer=.6;postPvP({type:'beat',roomId:match.room.id});}if(match.syncTimer<=0){match.syncTimer=.07;pvpSnapshot();}const defeated=match.actors.find(actor=>actor.hp<=0);if(defeated){finishPvP(match.actors.find(actor=>actor!==defeated).peerId,'casco destruído');return;}if(match.timeLeft<=0){const [a,b]=match.actors,draw=Math.abs(a.hp/a.maxHp-b.hp/b.maxHp)<.015;finishPvP(draw?'draw':a.hp/a.maxHp>b.hp/b.maxHp?a.peerId:b.peerId,'tempo esgotado');}}
function handlePvPMessage(message){if(!message||message.sender===pvpPeerId)return;if(!pvpMatch||message.roomId!==pvpMatch.room.id)return;const match=pvpMatch;match.lastOpponentBeat=performance.now();if(message.type==='join-request'&&match.role==='host'&&match.status==='waiting'){if(!canPayPvPStake(match.room.stake)){postPvP({type:'cancel',roomId:match.room.id,reason:'O anfitrião já não possui a aposta.'});abortPvP('Você já não possui a aposta anunciada.',false);return;}match.opponentId=message.sender;match.opponentPilot=message.pilot;match.status='payment';const paired={...match.room,status:'paired'};writePvPRoom(paired);postPvP({type:'join-accepted',roomId:match.room.id,hostPilot:match.selfPilot,room:match.room});renderPvPScreen();if(match.room.mode==='stake'){postPvP({type:'stake-request',roomId:match.room.id,stake:match.room.stake});setTimeout(()=>{if(pvpMatch===match&&!match.active)abortPvP('A confirmação da aposta expirou; nenhuma disputa foi iniciada.',true);},16000);}else startPvPHost();return;}
  if(message.type==='join-accepted'&&match.role==='guest'){match.opponentPilot=message.hostPilot;match.room=message.room||match.room;match.status='ready';renderPvPScreen();return;}
  if(message.type==='stake-request'&&match.role==='guest'){if(!canPayPvPStake(match.room.stake)||!debitPvPStake()){postPvP({type:'payment-failed',roomId:match.room.id});abortPvP('Você não possui exatamente a aposta solicitada.',false);return;}match.status='payment';postPvP({type:'paid',roomId:match.room.id});return;}
  if(message.type==='paid'&&match.role==='host'&&match.status==='payment'){if(!canPayPvPStake(match.room.stake)||!debitPvPStake()){postPvP({type:'cancel',roomId:match.room.id,reason:'O anfitrião não conseguiu confirmar a aposta.'});abortPvP('A aposta do anfitrião não pôde ser confirmada.',false);return;}startPvPHost();return;}
  if(message.type==='payment-failed'&&match.role==='host'){abortPvP('O rival não possui a aposta anunciada.',true);return;}
  if(message.type==='go'&&match.role==='guest'){startPvPGuest(message);return;}
  if(message.type==='input'&&match.isHost&&match.active){const actor=match.actors.find(item=>item.peerId===message.sender);if(actor&&message.move)actor.move=message.move;return;}
  if(message.type==='snapshot'&&!match.isHost&&match.active){match.lastHostBeat=performance.now();match.timeLeft=message.timeLeft;match.actors=message.actors.map(actor=>({...actor,x:actor.x*W,y:actor.y*H}));match.bullets=message.bullets.map(b=>({...b,x:b.x*W,y:b.y*H,vx:b.vx*W,vy:b.vy*H,r:5*S}));return;}
  if(message.type==='beat'){if(!match.isHost)match.lastHostBeat=performance.now();return;}
  if(message.type==='forfeit'&&match.isHost&&match.active){finishPvP(pvpPeerId,'rival se rendeu');return;}
  if(message.type==='result'&&match.role==='guest'&&match.active){finishPvP(message.winnerId,message.reason,false);return;}
  if((message.type==='cancel'||message.type==='leave')&&!match.active){abortPvP(message.reason||'O rival saiu da sala.',false);}}
function initPvP(){if(pvpBus)pvpBus.addEventListener('message',event=>handlePvPMessage(event.data));document.getElementById('pvpLootMode').addEventListener('click',()=>{pvpMode='loot';renderPvPScreen();});document.getElementById('pvpStakeMode').addEventListener('click',()=>{pvpMode='stake';renderPvPScreen();});document.getElementById('pvpStakeKind').addEventListener('change',updatePvPStakeFields);document.getElementById('pvpCreateRoomBtn').addEventListener('click',createPvPRoom);refreshPvPShipOptions();setInterval(()=>{if(document.getElementById('pvpScreen').classList.contains('active'))renderPvPRoomList();},1200);}
function clearControls(){touch.active=false;pressedKeys.clear();}
canvas.addEventListener('pointerdown',e=>{unlockAudio();if(state!=='play')return;touch.active=true;touch.id=e.pointerId;touch.sx=touch.x=e.clientX;touch.sy=touch.y=e.clientY;});
canvas.addEventListener('pointermove',e=>{if(touch.active&&e.pointerId===touch.id){touch.x=e.clientX;touch.y=e.clientY;}});
function endTouch(e){if(e.pointerId===touch.id)touch.active=false;}
canvas.addEventListener('pointerup',endTouch);canvas.addEventListener('pointercancel',endTouch);
window.addEventListener('keydown',e=>{if(!movementKeys.has(e.key)||state!=='play')return;e.preventDefault();unlockAudio();pressedKeys.add(e.key);});
window.addEventListener('keyup',e=>{if(!movementKeys.has(e.key))return;pressedKeys.delete(e.key);if(state==='play')e.preventDefault();});
window.addEventListener('blur',clearControls);
document.getElementById('homeBtn').addEventListener('click',()=>{
  if(gameMode==='pvp'&&pvpMatch?.active){if(pvpMatch.isHost)finishPvP(pvpMatch.opponentId,'você se rendeu');else{postPvP({type:'forfeit',roomId:pvpMatch.room.id});toast('Rendição enviada ao rival.');}return;}
  if((state==='play'||state==='choose')&&gameMode==='dungeon'){  
    const rewards=bankDungeonRewards();state='menu';clearControls();showHome();
    toast(`DUNGEON ENCERRADA · NV ${profile.dailyDungeon.highest} · +${rewards.coins} CR · +${rewards.gems} GEMAS · +${rewards.shards} FRAG.`);return;
  }
  if(state==='play'||state==='dead'){state='menu';clearControls();showHome();}
});
function newRun(planetId=profile.selectedPlanet,mode='campaign'){
  const daily=mode==='dungeon',today=localDayKey();
  if(daily&&profile.dailyDungeon.playedDate===today){toast('Você já usou sua tentativa diária. Volte amanhã!');updateDungeonButton();return;}
  clearControls();afkUpgradeTimer=0;afkClearDelay=0;afkNextPlanet=null;pendingPlanetComplete=false;gameMode=daily?'dungeon':'campaign';
  if(daily){profile.dailyDungeon.playedDate=today;profile.dailyDungeon.highest=0;profile.dailyDungeon.pending=emptyDungeonRewards();dungeonRun={active:true,level:1,day:today,pending:emptyDungeonRewards()};activePlanet=0;}
  else{dungeonRun={active:false,level:0,day:'',pending:emptyDungeonRewards()};activePlanet=Math.max(0,Math.min(PLANETS.length-1,Number(planetId)||0));profile.selectedPlanet=activePlanet;}
  saveProfile();stage=1;const ownedShip=activeShipItem(),ship=shipStatsFor(ownedShip),perm=profile.permanent,attrs=profile.attributes||{shield:0,life:0,speed:0,power:0},droneStats=profile.drones||{attack:0,defense:0};const primary=weaponByUid(profile.equipped.primary),secondary=weaponByUid(profile.equipped.secondary);const dmg=10*(1+(perm.energy||0)*.08+(attrs.power||0)*.09)*(1+(droneStats.attack||0)*.12)*ship.damage*(primary?weaponDamageFactor(primary):1);const fireRate=.4*(primary?weaponRateFactor(primary):1);const hp=(100+(profile.level-1)*50+(perm.hull||0)*15+(attrs.life||0)*25)*ship.hp;player={x:W/2,y:H*.82,r:16*S,hp,maxHp:hp,speed:260*(1+(perm.engine||0)*.06+(attrs.speed||0)*.05)*ship.speed,fireRate,cd:0,dmg,spread:0,missiles:0,shieldMax:(perm.shield||0)+(attrs.shield||0),shield:(perm.shield||0)+(attrs.shield||0),shieldCd:0,drones:0,droneCooldowns:[],boom:0,steal:0,crit:.05,inv:0,mcd:0,weaponColor:primary?typeById(primary.type).color:'#79d9ff',secondary,primary,shipId:ship.id,droneAttack:droneStats.attack||0,droneDefense:Math.min(.3,(droneStats.defense||0)*.1),hullLevel:perm.hull||0,engineLevel:perm.engine||0};
  state='play';updateAfkButton();document.getElementById('homeBtn').style.display='block';document.getElementById('homeBtn').textContent=daily?'✕ ENCERRAR DUNGEON':'⌂ HANGAR';document.getElementById('retryBtn').style.display='';document.getElementById('deadHomeBtn').textContent='VOLTAR AO HANGAR';showScreen('');document.getElementById('deadOverlay').classList.remove('active');document.getElementById('clearOverlay').classList.remove('active');document.getElementById('upgradeOverlay').classList.remove('active');nextRoom();
}
function xpForNext(level=profile.level){return Math.ceil(255*Math.pow(1.3,Math.max(0,level-1)));}
function gainExperience(amount){profile.xp+=amount;let levels=0;while(profile.xp>=xpForNext(profile.level)){profile.xp-=xpForNext(profile.level);profile.level++;levels++;if(player){player.maxHp+=50;player.hp+=50;texts.push({x:player.x,y:player.y-42*S,text:`NÍVEL ${profile.level} · +50 VIDA`,life:1.7,color:'#64f2ff'});}}if(levels)recordMissionProgress('level',levels);if(amount>0)saveProfile();return levels;}
function spawnEnemy(type,x,y,opts={}){const pl=PLANETS[activePlanet];const defs={
  drone:{img:IMG.drone,r:16,hp:22,spd:105,fire:0,behavior:'chase'},
  alien:{img:IMG.alien,r:20,hp:36,spd:43,fire:1.75,behavior:'float'},
  rock:{img:IMG.rock,r:23,hp:58,spd:66,fire:0,behavior:'chase'},
  raider:{img:IMG.tx9Raider,r:21,hp:42,spd:76,fire:0,behavior:'chase'},
  spore:{img:IMG.sporewing,r:25,hp:78,spd:35,fire:1.6,shots:3,behavior:'sine'},
  wisp:{img:IMG.voidWisp,r:20,hp:48,spd:92,fire:1.35,behavior:'weave'},
  lancer:{img:IMG.omegaLancer,r:25,hp:100,spd:52,fire:1.15,shots:3,behavior:'weave'},
  glacia:{img:IMG.glaciaStalker,r:23,hp:125,spd:82,fire:1.25,shots:2,behavior:'weave'},
  pyra:{img:IMG.pyraWraith,r:24,hp:155,spd:69,fire:1.05,shots:3,behavior:'chase'},
  nexus:{img:IMG.nexusSentinel,r:24,hp:170,spd:43,fire:.95,shots:4,behavior:'float'},
  abyss:{img:IMG.abyssLeviathan,r:25,hp:180,spd:58,fire:1.1,shots:3,behavior:'sine'},
  chronos:{img:IMG.chronosPhantom,r:23,hp:165,spd:105,fire:.9,shots:2,behavior:'weave'},
  singularity:{img:IMG.singularityTyrant,r:27,hp:230,spd:62,fire:.75,shots:5,behavior:'weave'},
  boss:{img:IMG.boss,r:58,hp:720,spd:36,fire:.85,shots:10,behavior:'float'}
};
  // Progressão de dificuldade: mais forte a cada planeta E a cada nível/fase dentro da run.
  const d=defs[type]||defs.drone,levelScale=1+Math.min(1.1,Math.max(0,profile.level-pl.minLevel)*.005),planetScale=1+activePlanet*.30;
  const stageScale=gameMode==='dungeon'?Math.pow(1.021,stage-1):1+(stage-1)*.07;
  const bossPlanetBoost=1+activePlanet*.18;
  const maxHp=type==='boss'?d.hp*planetScale*levelScale*bossPlanetBoost*(gameMode==='dungeon'?stageScale:1.5):d.hp*planetScale*levelScale*stageScale;
  const levelDiff=Math.max(0,profile.level-pl.minLevel),dungeonStrength=gameMode==='dungeon'?Math.pow(1.009,stage-1):1;
  enemies.push({type,x,y,img:d.img,r:d.r*S,hp:maxHp,maxHp,spd:d.spd*S*(1+activePlanet*.045+Math.min(.32,levelDiff*.0012))*dungeonStrength,fire:d.fire?d.fire/(1+activePlanet*.035+Math.min(.28,levelDiff*.0012)+(gameMode==='dungeon'?Math.pow(1.006,stage-1)-1:0)):0,shots:d.shots||1,behavior:d.behavior,cd:1+Math.random(),t:Math.random()*6,flash:0});
}
function nextRoom(){
  enemies=[];bullets=[];eBullets=[];pickups=[];portal=null;roomPaid=false;player.x=W/2;player.y=H*.82;player.shield=player.shieldMax;player.inv=.8;
  if(gameMode==='dungeon')activePlanet=Math.min(PLANETS.length-1,Math.floor((stage-1)/10));
  const isBoss=gameMode==='dungeon'?stage%10===0:stage===11;
  if(isBoss){spawnEnemy('boss',W/2,H*.22);return;}
  // Mais inimigos por sala conforme a run e o planeta avançam.
  const count=gameMode==='dungeon'?Math.min(18,4+Math.floor(Math.min(stage,70)*.22)+Math.floor(activePlanet*.9)):Math.min(18,3+Math.floor(stage*.85)+Math.floor(activePlanet*1.3));
  const planetEnemy=PLANETS[activePlanet].enemyType;
  for(let i=0;i<count;i++){const pool=stage<3?['drone','alien',planetEnemy]:['drone','alien','rock',planetEnemy];spawnEnemy(pool[Math.floor(Math.random()*pool.length)],W*(.1+Math.random()*.8),H*(.12+Math.random()*.42));}
}
function nearestEnemy(x,y){let found=null,dist=Infinity;for(const e of enemies){const d=(e.x-x)**2+(e.y-y)**2;if(d<dist){dist=d;found=e;}}return found;}
function burst(x,y,color,n=14){for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,v=55+Math.random()*210;particles.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:.42+Math.random()*.5,color});}}
function fireBullet(x,y,a,opts={}){const v=(opts.homing?360:620)*S;bullets.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,homing:!!opts.homing,image:opts.homing?IMG.homingMissile:null,size:(opts.homing?28:9)*S,dmgMul:opts.dmgMul||1,r:(opts.homing?7:4.5)*S,color:opts.color||player.weaponColor});}
function dropPickup(x,y,type){const kinds=['repair','xp','shield','credits'];const chosen=type||kinds[Math.floor(Math.random()*kinds.length)];const colors={repair:'#68ff83',xp:'#67e4ff',shield:'#82a7ff',credits:'#ffd46b'};pickups.push({type:chosen,x,y,r:13*S,t:Math.random()*Math.PI*2,life:22,amount:chosen==='xp'?90+activePlanet*30:10+activePlanet*4,color:colors[chosen]});}
function collectPickup(item){let message='';if(item.type==='repair'){const restored=Math.min(player.maxHp-player.hp,Math.max(70,player.maxHp*.15));player.hp+=restored;message=`+${Math.round(restored)} VIDA`;}else if(item.type==='xp'){gainExperience(item.amount);message=`+${item.amount} XP`;}else if(item.type==='shield'){player.shieldMax=Math.max(1,player.shieldMax+1);player.shield=Math.min(player.shieldMax,player.shield+1);message='+1 ESCUDO';}else{profile.coins+=item.amount;saveProfile();message=`+${item.amount} CR`;}texts.push({x:player.x,y:player.y-30*S,text:message,life:1,color:item.color});}
function damageEnemy(e,base){const crit=Math.random()<player.crit,dmg=base*(crit?2.5:1)*(e.type==='boss'?2:1);e.hp=Math.max(0,e.hp-dmg);e.flash=.12;texts.push({x:e.x,y:e.y-e.r,text:`-${Math.round(dmg)}${crit?'!':''}`,life:.65,color:crit?'#ffd24a':'#fff'});}
function weaponFire(target){const p=player,angle=Math.atan2(target.y-p.y,target.x-p.x);const primary=p.primary,type=primary?typeById(primary.type):WEAPON_TYPES[0];const power=primary?weaponDamageFactor(primary):1;fireBullet(p.x,p.y,angle,{dmgMul:power,color:type.color});if(type.id==='scatter'){fireBullet(p.x,p.y,angle-.22,{dmgMul:power*.72,color:type.color});fireBullet(p.x,p.y,angle+.22,{dmgMul:power*.72,color:type.color});}for(let i=1;i<=p.spread/2;i++){fireBullet(p.x,p.y,angle+i*.19,{dmgMul:power,color:type.color});fireBullet(p.x,p.y,angle-i*.19,{dmgMul:power,color:type.color});}if(p.secondary){const secType=typeById(p.secondary.type),secAngle=angle+(Math.random()-.5)*.12;fireBullet(p.x,p.y,secAngle,{dmgMul:weaponDamageFactor(p.secondary)*.48,color:secType.color,homing:secType.id==='seeker'});}beep(type.id==='rail'?450:880,.075);}
function giveRoomRewards(){
  if(roomPaid)return;roomPaid=true;recordMissionProgress('rooms');
  if(gameMode==='dungeon'){
    const level=stage,boss=level%10===0;
    const earned={xp:100+level*12+(boss?level*20:0),coins:25+level*8+(boss?level*30:0),gems:1+Math.floor((level-1)/10)+(boss?3:0),shards:1+Math.floor((level-1)/20)+(boss?5:0)};
    for(const key of ['xp','coins','gems','shards'])dungeonRun.pending[key]+=earned[key];
    dungeonRun.level=level;profile.dailyDungeon.highest=Math.max(profile.dailyDungeon.highest,level);profile.dailyDungeon.pending={...dungeonRun.pending};saveProfile();
    toast(`DUNGEON NV ${level} · +${earned.xp} XP · +${earned.coins} CR · +${earned.gems} GEMAS · +${earned.shards} FRAG. (ACUMULADO)`);return;
  }
  const boss=stage===11,coins=20+activePlanet*14+stage*6+(boss?180+activePlanet*80:0),xp=350+activePlanet*180+stage*35+(boss?900+activePlanet*300:0);
  profile.coins+=coins;profile.shards+=boss?5+activePlanet:1+(stage%4===0?1:0);if(Math.random()<.035||boss&&Math.random()<.38)profile.gems+=boss?5:1;gainExperience(xp);
  let loot=null;if(boss){loot=newWeapon(rollRarity(Math.min(3,1+Math.floor(activePlanet/2))));}else if(Math.random()<.17+activePlanet*.025){loot=newWeapon(rollRarity());}
  const rewards=`+${coins} CR · +${xp} XP · LVL ${profile.level}`;if(loot){profile.inventory.push(loot);toast(`${rewards} · ${weaponLabel(loot)}`);}else toast(`${rewards} · fragmentos recolhidos`);saveProfile();
}
function bankDungeonRewards(){
  if(!dungeonRun.active)return emptyDungeonRewards();
  const earned={...dungeonRun.pending};dungeonRun.active=false;dungeonRun.pending=emptyDungeonRewards();profile.dailyDungeon.pending=emptyDungeonRewards();
  applyDungeonRewards(earned);updateDungeonButton();return earned;
}
function finishDungeon(){
  const earned=bankDungeonRewards(),highest=profile.dailyDungeon.highest;state='clear';clearControls();document.getElementById('homeBtn').style.display='none';updateAfkButton();
  document.getElementById('clearTitle').textContent='DUNGEON CONCLUÍDA!';document.getElementById('clearCopy').textContent=`Você venceu os 100 níveis da Dungeon diária! Recorde: ${highest}/100. Recompensas coletadas: ${earned.xp} XP · ${earned.coins} créditos · ${earned.gems} gemas · ${earned.shards} fragmentos.`;
  document.getElementById('continueHomeBtn').textContent='VOLTAR AO HANGAR';document.getElementById('clearOverlay').classList.add('active');
}
function chooseUpgrade(up){
  if(state!=='choose'||!up)return;
  up.apply(player);afkUpgradeTimer=0;document.getElementById('upgradeOverlay').classList.remove('active');
  if(pendingPlanetComplete){pendingPlanetComplete=false;completePlanet();return;}
  stage++;if(gameMode==='dungeon')dungeonRun.level=stage;state='play';updateAfkButton();nextRoom();
}
function chooseAfkUpgrade(){
  if(!currentUpgradePicks.length||state!=='choose')return;
  const missing=1-player.hp/player.maxHp;
  const score=up=>({drone:5.6,dmg:5.1,rate:4.9,homing:4.6,triple:4.2,steal:3.1+missing*4,hp:3.2+missing*6,shield:3.5+(player.shield<1?1.5:0),crit:3.7,boom:3.2,speed:2.3}[up.id]||1)+Math.random()*.25;
  const chosen=currentUpgradePicks.reduce((best,up)=>score(up)>score(best)?up:best,currentUpgradePicks[0]);
  chooseUpgrade(chosen);toast(`AFK · ${chosen.name} instalado automaticamente`);
}
function showUpgrades(){
  clearControls();state='choose';afkUpgradeTimer=afkMode?.65:0;updateAfkButton();playClip('assets/audio/upgrade.mp3',.5);
  const box=document.getElementById('cards');box.innerHTML='';currentUpgradePicks=[...UPGRADES].sort(()=>Math.random()-.5).slice(0,3);
  for(const up of currentUpgradePicks){const el=document.createElement('button');el.className='card';el.innerHTML=`<b>${up.name}</b><span>${up.desc}</span>`;el.addEventListener('pointerdown',e=>{e.stopPropagation();chooseUpgrade(up);});box.appendChild(el);}
  document.getElementById('upgradeOverlay').classList.add('active');
}
function enterPortal(){
  if(!portal||state!=='play')return;portal=null;giveRoomRewards();
  if(gameMode==='dungeon'){
    if(stage>=100){finishDungeon();return;}
    if(stage%5===0){pendingPlanetComplete=false;showUpgrades();return;}
    stage++;dungeonRun.level=stage;state='play';nextRoom();return;
  }
  pendingPlanetComplete=stage===11;showUpgrades();
}
function completePlanet(){
  const cleared=activePlanet,lastPlanet=PLANETS.length-1;pendingPlanetComplete=false;recordMissionProgress('planets');if(!profile.clearedPlanets.includes(cleared))profile.clearedPlanets.push(cleared);
  profile.unlockedPlanet=Math.max(profile.unlockedPlanet,Math.min(lastPlanet,cleared+1));profile.selectedPlanet=Math.min(lastPlanet,cleared+1);saveProfile();state='clear';document.getElementById('homeBtn').style.display='none';
  const final=cleared===lastPlanet;document.getElementById('clearTitle').textContent=final?'CAMPANHA CONCLUÍDA!':'PLANETA CONQUISTADO!';
  document.getElementById('clearCopy').textContent=final?`Você derrotou o chefe de ${PLANETS[cleared].name} e concluiu a campanha galáctica!`:`Chefe de ${PLANETS[cleared].name} derrotado! ${PLANETS[cleared+1].name} foi desbloqueado. Sua nave, armas e créditos foram salvos.`;
  document.getElementById('continueHomeBtn').textContent=final?'VER HANGAR':'IR PARA O PRÓXIMO PLANETA';document.getElementById('clearOverlay').classList.add('active');updateAfkButton();
  if(afkMode&&!final){afkNextPlanet=cleared+1;afkClearDelay=1.1;toast(`AFK · seguindo para ${PLANETS[cleared+1].name}`);}
}
function killEnemy(e){recordMissionProgress('kills');if(e.type==='boss')recordMissionProgress('bosses');burst(e.x,e.y,e.type==='boss'?'#ff4a6a':'#ffb347',e.type==='boss'?62:16);playClip('assets/audio/explosion.mp3',e.type==='boss'?.7:.25);shake=e.type==='boss'?18:4;if(player.steal)player.hp=Math.min(player.maxHp,player.hp+player.steal);if(player.boom){burst(e.x,e.y,'#b06bff',20);for(const other of enemies)if(other!==e&&other!==null&&Math.hypot(other.x-e.x,other.y-e.y)<90*S)damageEnemy(other,player.dmg*player.boom);}if(e.type==='rock'){for(let i=0;i<2;i++)spawnEnemy('drone',e.x+(i?14:-14),e.y);}if(e.type==='boss'){dropPickup(e.x-24*S,e.y,'repair');dropPickup(e.x,e.y,'xp');dropPickup(e.x+24*S,e.y,'shield');}else if(Math.random()<.28)dropPickup(e.x,e.y);}
function hurtPlayer(amount){if(player.inv>0||state!=='play')return;if(player.shield>0){player.shield--;player.shieldCd=5;player.inv=.6;burst(player.x,player.y,'#6ab8ff',14);return;}player.hp-=amount*(1-(player.droneDefense||0));player.inv=.8;shake=8;burst(player.x,player.y,'#ff4a4a',10);if(player.hp<=0){state='dead';updateAfkButton();if(gameMode==='campaign')profile.best=Math.max(profile.best,stage);saveProfile();document.getElementById('homeBtn').style.display='none';document.getElementById('retryBtn').style.display=gameMode==='dungeon'?'none':'';document.getElementById('deadHomeBtn').textContent=gameMode==='dungeon'?'VER RECOMPENSAS':'VOLTAR AO HANGAR';if(gameMode==='dungeon'){const earned=bankDungeonRewards();document.getElementById('deadCopy').textContent=`${PLANETS[activePlanet].name} · Dungeon nível ${stage}/100. Você morreu, mas levou tudo que acumulou: ${earned.xp} XP · ${earned.coins} créditos · ${earned.gems} gemas · ${earned.shards} fragmentos.`;}else{document.getElementById('deadCopy').textContent=`${PLANETS[activePlanet].name} · Fase ${stage} · Recorde: ${profile.best}. Os créditos, armas e melhorias permanentes foram preservados.`;}document.getElementById('deadOverlay').classList.add('active');playClip('assets/audio/explosion.mp3',.8);}}
function update(dt){bgY=(bgY+dt*18)%Math.max(1,H);for(const p of particles){p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;}particles=particles.filter(p=>p.life>0);for(const t of texts){t.y-=38*dt;t.life-=dt;}texts=texts.filter(t=>t.life>0);shake=Math.max(0,shake-40*dt);if(state==='choose'&&afkMode){afkUpgradeTimer-=dt;if(afkUpgradeTimer<=0)chooseAfkUpgrade();}if(state==='clear'&&afkMode&&afkNextPlanet!==null){afkClearDelay-=dt;if(afkClearDelay<=0){const next=afkNextPlanet;afkNextPlanet=null;afkClearDelay=0;newRun(next);}}if(state!=='play')return;if(gameMode==='pvp'){updatePvP(dt);return;}const p=player;p.inv-=dt;let moveX=(pressedKeys.has('ArrowRight')?1:0)-(pressedKeys.has('ArrowLeft')?1:0),moveY=(pressedKeys.has('ArrowDown')?1:0)-(pressedKeys.has('ArrowUp')?1:0);if(touch.active){const dx=touch.x-touch.sx,dy=touch.y-touch.sy,len=Math.hypot(dx,dy);if(len>8){const strength=Math.min(1,len/52);moveX+=dx/len*strength;moveY+=dy/len*strength;}}const manualLength=Math.hypot(moveX,moveY);if(afkMode&&manualLength<.001){if(portal){const dx=portal.x-p.x,dy=portal.y-p.y,len=Math.hypot(dx,dy);if(len>portal.r*.28){moveX=dx/len;moveY=dy/len;}}else{let dodgeX=0,dodgeY=0;for(const b of eBullets){const speedSq=b.vx*b.vx+b.vy*b.vy;if(!speedSq)continue;const t=((p.x-b.x)*b.vx+(p.y-b.y)*b.vy)/speedSq;if(t<=0||t>.85)continue;const nearX=b.x+b.vx*t,nearY=b.y+b.vy*t,dx=p.x-nearX,dy=p.y-nearY,dist=Math.hypot(dx,dy),danger=(p.r+18*S)*1.8;if(dist<danger){const push=(danger-dist)/danger;dodgeX+=(dist>1?dx/dist:1)*push;dodgeY+=(dist>1?dy/dist:0)*push;}}const threat=nearestEnemy(p.x,p.y);if(threat){const dx=p.x-threat.x,dy=p.y-threat.y,dist=Math.hypot(dx,dy),danger=threat.r+p.r+95*S;if(dist<danger){const push=(danger-dist)/danger;dodgeX+=(dist>1?dx/dist:1)*push*1.4;dodgeY+=(dist>1?dy/dist:0)*push*1.4;}}const dodgeLength=Math.hypot(dodgeX,dodgeY);if(dodgeLength>.08){moveX=dodgeX/dodgeLength;moveY=dodgeY/dodgeLength;}}}const moveLength=Math.hypot(moveX,moveY);const moving=moveLength>0;if(moving){const strength=Math.min(1,moveLength);p.x+=moveX/moveLength*p.speed*S*strength*dt;p.y+=moveY/moveLength*p.speed*S*strength*dt;}p.x=Math.max(p.r,Math.min(W-p.r,p.x));p.y=Math.max(H*.075,Math.min(H*.95,p.y));if(p.shieldMax&&p.shield<p.shieldMax){p.shieldCd-=dt;if(p.shieldCd<=0){p.shield++;p.shieldCd=5;}}p.cd-=dt;p.mcd-=dt;const target=nearestEnemy(p.x,p.y);if(target&&(!moving||afkMode)&&p.cd<=0){p.cd=p.fireRate;weaponFire(target);}if(target&&p.missiles&&p.mcd<=0){p.mcd=1.25;for(let i=0;i<p.missiles;i++)fireBullet(p.x,p.y,-Math.PI/2+(i-(p.missiles-1)/2)*.55,{homing:true,dmgMul:1.5,color:'#ffb347'});}const now=performance.now()/1000;for(let i=0;i<p.drones;i++){const a=now*2+i*Math.PI*2/p.drones,dx=p.x+Math.cos(a)*40*S,dy=p.y+Math.sin(a)*40*S,droneTarget=nearestEnemy(dx,dy);p.droneCooldowns[i]-=dt;if(droneTarget&&p.droneCooldowns[i]<=0){p.droneCooldowns[i]=.68;fireBullet(dx,dy,Math.atan2(droneTarget.y-dy,droneTarget.x-dx),{dmgMul:.72,color:'#64eaff'});}}
  for(const b of bullets){if(b.homing){const t=nearestEnemy(b.x,b.y);if(t){const desired=Math.atan2(t.y-b.y,t.x-b.x),cur=Math.atan2(b.vy,b.vx);let diff=((desired-cur+Math.PI*3)%(Math.PI*2))-Math.PI;const a=cur+Math.max(-6*dt,Math.min(6*dt,diff)),v=360*S;b.vx=Math.cos(a)*v;b.vy=Math.sin(a)*v;}}b.x+=b.vx*dt;b.y+=b.vy*dt;for(const e of enemies)if(!b.dead&&Math.hypot(e.x-b.x,e.y-b.y)<e.r+b.r){b.dead=true;damageEnemy(e,p.dmg*b.dmgMul);}}
  bullets=bullets.filter(b=>!b.dead&&b.x>-25&&b.x<W+25&&b.y>-25&&b.y<H+25);
  for(const e of enemies){e.t+=dt;e.flash-=dt;const aim=Math.atan2(p.y-e.y,p.x-e.x);if(e.behavior==='chase'){e.x+=Math.cos(aim)*e.spd*dt;e.y+=Math.sin(aim)*e.spd*dt;}else if(e.behavior==='sine'){e.x+=Math.sin(e.t*1.5)*e.spd*dt;e.y+=Math.cos(e.t*.8)*e.spd*.12*dt;}else if(e.behavior==='weave'){e.x+=Math.sin(e.t*1.8)*e.spd*dt;e.y+=Math.cos(e.t*1.1)*e.spd*.22*dt;}else{e.x+=Math.cos(e.t*.8)*e.spd*dt;}e.x=Math.max(e.r,Math.min(W-e.r,e.x));if(e.fire){e.cd-=dt;if(e.cd<=0){e.cd=e.fire;const shots=e.type==='boss'?10:e.shots||1;for(let i=0;i<shots;i++){const shotAngle=e.type==='boss'?e.t+i*Math.PI*2/shots:aim+(i-(shots-1)/2)*.22,v=(e.type==='boss'?150:190)*(1+activePlanet*.04+Math.max(0,profile.level-PLANETS[activePlanet].minLevel)*.001+(gameMode==='dungeon'?(stage-1)*.009:0))*S;eBullets.push({x:e.x,y:e.y,vx:Math.cos(shotAngle)*v,vy:Math.sin(shotAngle)*v,damage:9+activePlanet*2+Math.floor(stage/4)+(gameMode==='dungeon'?Math.floor(stage*.12):0)});}}}if(Math.hypot(e.x-p.x,e.y-p.y)<e.r+p.r*.7)hurtPlayer(e.type==='boss'?30:15);}
  for(const e of enemies)if(e.hp<=0&&!e.dead){e.dead=true;killEnemy(e);}enemies=enemies.filter(e=>!e.dead);
  for(const b of eBullets){b.x+=b.vx*dt;b.y+=b.vy*dt;if(Math.hypot(b.x-p.x,b.y-p.y)<p.r*.7+5*S){b.dead=true;hurtPlayer(b.damage||9+activePlanet*2+Math.floor(stage/4));}}eBullets=eBullets.filter(b=>!b.dead&&b.x>-20&&b.x<W+20&&b.y>-20&&b.y<H+20);
  for(const item of pickups){item.t+=dt;item.life-=dt;item.y+=10*S*dt;item.x+=Math.sin(item.t*2)*7*S*dt;if(state==='play'&&Math.hypot(item.x-p.x,item.y-p.y)<p.r+item.r+6*S){item.dead=true;collectPickup(item);}}pickups=pickups.filter(item=>!item.dead&&item.life>0&&item.y<H+30);
  if(enemies.length===0&&!portal){portal={x:W/2,y:H*.13,r:34*S};eBullets=[];}
  if(portal&&Math.hypot(portal.x-p.x,portal.y-p.y)<portal.r+p.r)enterPortal();
}
function drawSprite(img,x,y,size,rot=0){if(!img.complete||!img.naturalWidth){ctx.fillStyle='#c9a24a';ctx.beginPath();ctx.arc(x,y,size/2,0,Math.PI*2);ctx.fill();return;}const ar=img.naturalWidth/img.naturalHeight;ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.drawImage(img,-size*ar/2,-size/2,size*ar,size);ctx.restore();}
function drawPlayerShip(p){const ship=shipById(p.shipId);ctx.save();ctx.shadowColor=ship.id==='reaper'?'#ff394e':ship.id==='bulwark'?'#c25bff':'#72ff47';ctx.shadowBlur=10*S;drawSprite(ship.image,p.x,p.y,p.r*3.8);ctx.restore();}
function bar(x,y,w,h,frac,color){ctx.fillStyle='#130e08';ctx.fillRect(x-2,y-2,w+4,h+4);ctx.strokeStyle='#bd9141';ctx.lineWidth=1.5;ctx.strokeRect(x-2,y-2,w+4,h+4);ctx.fillStyle='#101726';ctx.fillRect(x,y,w,h);ctx.fillStyle=color;ctx.fillRect(x,y,w*Math.max(0,Math.min(1,frac)),h);}
function renderPvPArena(){
  const match=pvpMatch;if(!match?.actors?.length)return;
  const screenY=y=>match.isHost?y:H-y;
  ctx.fillStyle='rgba(2,8,18,.5)';ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='rgba(84,220,255,.5)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(W*.08,H*.5);ctx.lineTo(W*.92,H*.5);ctx.stroke();
  for(const bullet of match.bullets||[]){const y=screenY(bullet.y);ctx.fillStyle=bullet.color||'#fff';ctx.shadowColor=bullet.color||'#fff';ctx.shadowBlur=12*S;ctx.beginPath();ctx.arc(bullet.x,y,5*S,0,Math.PI*2);ctx.fill();}
  ctx.shadowBlur=0;
  for(const actor of match.actors){
    const ship=shipById(actor.shipId),y=screenY(actor.y),angle=actor.peerId===pvpPeerId?0:Math.PI;
    ctx.save();ctx.shadowColor=actor.peerId===pvpPeerId?'#53eaff':'#ff638f';ctx.shadowBlur=18*S;drawSprite(ship.image,actor.x,y,74*S,angle);ctx.restore();
    let droneSlot=0;for(const [type,count] of [['attack',actor.droneAttack||0],['defense',actor.droneDefense||0]])for(let i=0;i<count;i++){const side=droneSlot++%2===0?-1:1,offset=Math.floor((droneSlot-1)/2);ctx.save();ctx.shadowColor=type==='attack'?'#ff5268':'#58dfff';ctx.shadowBlur=8*S;drawSprite(type==='attack'?IMG.attackDrone:IMG.defenseDrone,actor.x+side*(32+offset*8)*S,y+((droneSlot%2)?-1:1)*8*S,18*S);ctx.restore();}
    const barWidth=Math.min(W*.35,170*S),barX=Math.max(8,Math.min(W-barWidth-8,actor.x-barWidth/2));bar(barX,y-53*S,barWidth,9*S,actor.hp/actor.maxHp,actor.peerId===pvpPeerId?'#32d9ff':'#ff527d');ctx.fillStyle='#f0f8ff';ctx.font=`bold ${Math.max(9,10*S)}px Orbitron`;ctx.textAlign='center';ctx.fillText(`${actor.name} · ${Math.max(0,Math.ceil(actor.hp))} HP${actor.shield?` · ⬡${actor.shield}`:''}`,actor.x,y-60*S);
    ctx.fillStyle=actor.peerId===pvpPeerId?'#83efff':'#ff9db5';ctx.font=`bold ${Math.max(9,11*S)}px Orbitron`;ctx.textAlign='center';ctx.fillText(actor.peerId===pvpPeerId?'SUA NAVE':'RIVAL',actor.x,y+58*S);
  }
  ctx.fillStyle='#f5e3a3';ctx.font=`bold ${Math.max(12,16*S)}px Orbitron`;ctx.textAlign='center';ctx.fillText(`DUELO PvP · ${Math.max(0,Math.ceil(match.timeLeft))}s`,W/2,H*.09);
  if(touch.active){ctx.strokeStyle='rgba(243,210,122,.5)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(touch.sx,touch.sy,50,0,Math.PI*2);ctx.stroke();ctx.fillStyle='rgba(243,210,122,.6)';ctx.beginPath();ctx.arc(touch.x,touch.y,18,0,Math.PI*2);ctx.fill();}
  ctx.fillStyle='rgba(205,228,244,.84)';ctx.font=`${Math.max(8,10*S)}px Orbitron`;ctx.textAlign='center';ctx.fillText('ARRASTE / USE AS SETAS PARA DESVIAR · CANHÕES AUTOMÁTICOS',W/2,H*.96);
}
function render(){ctx.save();if(shake)ctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);ctx.fillStyle='#040913';ctx.fillRect(-20,-20,W+40,H+40);const planet=PLANETS[activePlanet];const background=state==='menu'?IMG.hangarBg:planet.background;if(background.complete&&background.naturalWidth){const scale=Math.max(W/background.naturalWidth,H/background.naturalHeight),bw=background.naturalWidth*scale,bh=background.naturalHeight*scale;ctx.drawImage(background,(W-bw)/2,(H-bh)/2,bw,bh);}if(state!=='menu'){ctx.fillStyle=planet.tint;ctx.fillRect(0,0,W,H);ctx.strokeStyle='#c9a24a';ctx.lineWidth=3;ctx.strokeRect(W*.02,H*.055,W*.96,H*.91);}
  if(state==='play'&&gameMode==='pvp'&&pvpMatch?.active){renderPvPArena();ctx.restore();return;}
  if(state==='play'&&portal){const t=performance.now()/300,g=ctx.createRadialGradient(portal.x,portal.y,2,portal.x,portal.y,portal.r*1.4);g.addColorStop(0,'#fff');g.addColorStop(.38,planet.accent);g.addColorStop(1,'rgba(60,20,160,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(portal.x,portal.y,portal.r*(1.3+Math.sin(t)*.1),0,Math.PI*2);ctx.fill();ctx.strokeStyle='#f3d27a';ctx.beginPath();ctx.arc(portal.x,portal.y,portal.r,t,t+Math.PI*1.5);ctx.stroke();}
  for(const e of enemies){if(e.flash>0)ctx.filter='brightness(3)';drawSprite(e.img,e.x,e.y,e.r*2.4,e.type==='rock'?e.t:0);ctx.filter='none';if(e.type!=='boss')bar(e.x-e.r,e.y-e.r*1.4,e.r*2,3*S,e.hp/e.maxHp,'#d33');}
  for(const item of pickups){const bob=Math.sin(item.t*5)*3*S;const pickupImage=item.type==='repair'?IMG.repair:item.type==='xp'?IMG.xp:item.type==='credits'?IMG.credits:null;if(pickupImage?.complete&&pickupImage.naturalWidth){ctx.save();ctx.shadowColor=item.color;ctx.shadowBlur=14*S;drawSprite(pickupImage,item.x,item.y+bob,34*S);ctx.restore();}else{ctx.save();ctx.translate(item.x,item.y+bob);ctx.rotate(Math.PI/4);ctx.shadowColor=item.color;ctx.shadowBlur=14*S;ctx.fillStyle=item.color;const size=10*S*(1+Math.sin(item.t*5)*.08);ctx.fillRect(-size/2,-size/2,size,size);ctx.restore();ctx.fillStyle='#06111c';ctx.font=`bold ${10*S}px Orbitron`;ctx.textAlign='center';ctx.fillText(({repair:'+',xp:'✦',shield:'⬡',credits:'◈'})[item.type],item.x,item.y+bob+4*S);}}
  for(const b of bullets){if(b.homing&&b.image&&b.image.complete&&b.image.naturalWidth){ctx.save();ctx.shadowColor=b.color||'#ffb347';ctx.shadowBlur=9*S;drawSprite(b.image,b.x,b.y,b.size,Math.atan2(b.vy,b.vx)+Math.PI/2);ctx.restore();}else{ctx.fillStyle=b.color||'#9fe0ff';ctx.shadowBlur=9;ctx.shadowColor=b.color||'#9fe0ff';ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.fill();}}ctx.shadowBlur=0;for(const b of eBullets){ctx.fillStyle='#ff3d7f';ctx.beginPath();ctx.arc(b.x,b.y,5*S,0,Math.PI*2);ctx.fill();}
  if(player&&state!=='menu'){const p=player;if(!(p.inv>0&&Math.floor(p.inv*20)%2))drawPlayerShip(p);if(p.shield>0){ctx.strokeStyle='rgba(106,184,255,.8)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(p.x,p.y,p.r*1.9,0,Math.PI*2);ctx.stroke();}const now=performance.now()/1000;for(let i=0;i<p.drones;i++){const a=now*2+i*Math.PI*2/p.drones,dx=p.x+Math.cos(a)*40*S,dy=p.y+Math.sin(a)*40*S;ctx.save();ctx.shadowColor='#54eaff';ctx.shadowBlur=11*S;drawSprite(IMG.allyDrone,dx,dy,32*S);ctx.restore();}const droneCount=(p.droneAttack||0)+(p.droneDefense||0);let droneIndex=0;for(const type of ['attack','defense']){const count=type==='attack'?p.droneAttack||0:p.droneDefense||0;for(let i=0;i<count;i++){const a=now*1.35+droneIndex*Math.PI*2/Math.max(1,droneCount),dx=p.x+Math.cos(a)*54*S,dy=p.y+Math.sin(a)*54*S;ctx.save();ctx.shadowColor=type==='attack'?'#ff5268':'#58dfff';ctx.shadowBlur=10*S;drawSprite(type==='attack'?IMG.attackDrone:IMG.defenseDrone,dx,dy,22*S);ctx.restore();droneIndex++;}}}
  for(const pt of particles){ctx.globalAlpha=Math.min(1,pt.life*2);ctx.fillStyle=pt.color;ctx.fillRect(pt.x-2,pt.y-2,4,4);}ctx.globalAlpha=1;ctx.font=`bold ${14*S}px Orbitron`;ctx.textAlign='center';for(const t of texts){ctx.globalAlpha=Math.min(1,t.life*2);ctx.fillStyle=t.color;ctx.fillText(t.text,t.x,t.y);}ctx.globalAlpha=1;ctx.restore();
  if(touch.active&&state==='play'){ctx.strokeStyle='rgba(243,210,122,.5)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(touch.sx,touch.sy,50,0,Math.PI*2);ctx.stroke();ctx.fillStyle='rgba(243,210,122,.6)';ctx.beginPath();ctx.arc(touch.x,touch.y,18,0,Math.PI*2);ctx.fill();}
  if(player&&state!=='menu'){const top=H*.065;bar(W*.06,top,W*.45,12*S,player.hp/player.maxHp,'#c23232');ctx.fillStyle='#fff';ctx.font=`bold ${10*S}px Orbitron`;ctx.textAlign='left';ctx.fillText(`${Math.ceil(Math.max(0,player.hp))}/${Math.ceil(player.maxHp)}`,W*.08,top+10*S);bar(W*.59,top,W*.35,8*S,profile.xp/xpForNext(profile.level),'#54dfff');ctx.fillStyle='#d8f8ff';ctx.font=`bold ${Math.max(8,8*S)}px Orbitron`;ctx.textAlign='right';ctx.fillText(`LVL ${profile.level} · XP ${Math.floor(profile.xp)}/${xpForNext(profile.level)}`,W*.94,top+20*S);ctx.fillStyle=planet.accent;ctx.font=`bold ${Math.max(10,14*S)}px Orbitron`;ctx.textAlign='center';const bossRoom=gameMode==='dungeon'?stage%10===0:stage===11;ctx.fillText(gameMode==='dungeon'?`${planet.name} · DUNGEON ${stage}/100${bossRoom?' · CHEFE':''}`:`${planet.name} · ${bossRoom?'CHEFE':`FASE ${stage}/10`}`,W/2,top+35*S);const boss=enemies.find(e=>e.type==='boss');if(boss){bar(W*.1,H*.93,W*.8,10*S,boss.hp/boss.maxHp,'#c34dff');ctx.fillStyle='#fff';ctx.font=`bold ${Math.max(8,9*S)}px Orbitron`;ctx.fillText(`CHEFE · ${Math.ceil(boss.hp)} / ${Math.ceil(boss.maxHp)} HP`,W/2,H*.918);}if(portal&&state==='play'){ctx.fillStyle='#d7d4ff';ctx.font=`${11*S}px Orbitron`;ctx.fillText('PORTAL ABERTO!',W/2,portal.y+portal.r+22*S);}}
  if(state==='play'){ctx.fillStyle='rgba(196,221,243,.78)';ctx.font=`${Math.max(8,10*S)}px Orbitron`;ctx.textAlign='center';ctx.fillText(afkMode?'AFK ATIVO · PORTAIS E UPGRADES AUTOMÁTICOS':'SETAS / ARRASTE: MOVER · PARE: ATIRAR',W/2,H*.985);}
}
let last=performance.now();function loop(now){const dt=Math.min(.033,(now-last)/1000);last=now;update(dt);render();requestAnimationFrame(loop);}setAuthMode(readAccounts().length?'login':'register');initPvP();showAuth();requestAnimationFrame(loop);
