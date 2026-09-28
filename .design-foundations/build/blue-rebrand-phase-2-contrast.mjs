// verify.mjs — builds the rndmatching cobalt ramp and checks every pair (WCAG 2.x).
// Math copied verbatim from design-for-ai palette.mjs (OKLab + WCAG luminance).
function oklchToSrgb(L,C,Hd){const h=Hd*Math.PI/180,a=C*Math.cos(h),b=C*Math.sin(h);const l_=L+0.3963377774*a+0.2158037573*b,m_=L-0.1055613458*a-0.0638541728*b,s_=L-0.0894841775*a-1.291485548*b;const l=l_**3,m=m_**3,s=s_**3;return[4.0767416621*l-3.3077115913*m+0.2309699292*s,-1.2684380046*l+2.6097574011*m-0.3413193965*s,-0.0041960863*l-0.7034186147*m+1.707614701*s].map(x=>x<=0.0031308?12.92*x:1.055*Math.pow(Math.max(x,0),1/2.4)-0.055)}
function srgbToOklch(r,g,b){const lin=[r,g,b].map(x=>x<=0.04045?x/12.92:Math.pow((x+0.055)/1.055,2.4));const l=0.4122214708*lin[0]+0.5363325363*lin[1]+0.0514459929*lin[2],m=0.2119034982*lin[0]+0.6806995451*lin[1]+0.1073969566*lin[2],s=0.0883024619*lin[0]+0.2817188376*lin[1]+0.6299787005*lin[2];const l_=Math.cbrt(l),m_=Math.cbrt(m),s_=Math.cbrt(s);const L=0.2104542553*l_+0.793617785*m_-0.0040720468*s_,a=1.9779984951*l_-2.428592205*m_+0.4505937099*s_,bb=0.0259040371*l_+0.7827717662*m_-0.808675766*s_;let H=Math.atan2(bb,a)*180/Math.PI;if(H<0)H+=360;return{L,C:Math.hypot(a,bb),H}}
const inG=rgb=>rgb.every(x=>x>=-1e-6&&x<=1+1e-6);
function toGamut(L,C,H){let rgb=oklchToSrgb(L,C,H);if(inG(rgb))return rgb;let lo=0,hi=C;for(let i=0;i<24;i++){const mid=(lo+hi)/2;inG(oklchToSrgb(L,mid,H))?lo=mid:hi=mid}return oklchToSrgb(L,lo,H)}
const hex=rgb=>"#"+rgb.map(x=>Math.round(Math.min(1,Math.max(0,x))*255).toString(16).padStart(2,"0")).join("");
const ph=s=>[0,2,4].map(i=>parseInt(s.replace('#','').slice(i,i+2),16)/255);
const lum=rgb=>{const[r,g,b]=rgb.map(c=>{c=Math.min(1,Math.max(0,c));return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4)});return .2126*r+.7152*g+.0722*b};
const cr=(a,b)=>{const[x,y]=[lum(ph(a)),lum(ph(b))].sort((p,q)=>q-p);return(x+.05)/(y+.05)};
const over=(fg,alpha,bg)=>hex(ph(fg).map((c,i)=>c*alpha+ph(bg)[i]*(1-alpha)));

const H=251.9; // seed #0176D3
// 50-400: palette.mjs --seed "#0176D3" --chroma vivid --harmony mono (accent-2,3,5,7,8) verbatim
// 500-950: solved at the same hue (palette.mjs's cusp solid can't carry white text)
const SHADES={500:[.62,.17],600:[.53,.158],700:[.46,.14],800:[.38,.12],900:[.30,.095],950:[.22,.065]};
const brand={50:"#f4f9ff",100:"#e6f2ff",200:"#c7e1ff",300:"#97c8ff",400:"#65afff"};
for(const[k,[L,C]]of Object.entries(SHADES))brand[k]=hex(toGamut(L,C,H));
const W="#ffffff",G50="#f9fafb",G500="#6b7280",G600="#4b5563",G900="#111827",G200="#e5e7eb";

console.log("/* ramp */");for(const[k,v]of Object.entries(brand)){const o=srgbToOklch(...ph(v));console.log(`--color-brand-${k}: ${v};  /* oklch ${o.L.toFixed(3)} ${o.C.toFixed(3)} ${o.H.toFixed(1)} */`)}
let fails=0;const rows=[];
const chk=(kind,label,fg,bg,t)=>{const r=cr(fg,bg);const p=r>=t;if(!p)fails++;rows.push(`${p?"PASS":"FAIL"}  [${kind}] ${label}: ${r.toFixed(2)}:1 (target ${t}:1)`)};
// TEXT — body 4.5
for(const t of[600,700,800,900,950])for(const[bn,bg]of[["white",W],["gray-50",G50],["brand-50",brand[50]],["brand-100",brand[100]]])chk("text",`brand-${t} on ${bn}`,brand[t],bg,4.5);
for(const b of[600,700,800,900,950])chk("text",`white on brand-${b}`,W,brand[b],4.5);
for(const b of[800,900,950]){chk("text",`white/80 on brand-${b} (composited ${over(W,.8,brand[b])})`,over(W,.8,brand[b]),brand[b],4.5);chk("text",`brand-100 on brand-${b}`,brand[100],brand[b],4.5);chk("text",`brand-200 on brand-${b}`,brand[200],brand[b],4.5)}
chk("text","brand-600 on white button (band CTA label)",brand[600],W,4.5);
for(const[bn,bg]of[["brand-50",brand[50]],["brand-100",brand[100]]]){chk("text",`gray-900 (ink) on ${bn}`,G900,bg,4.5);chk("text",`gray-600 on ${bn}`,G600,bg,4.5);if(bn==="brand-50")chk("text",`gray-500 on ${bn}`,G500,bg,4.5)}
// FORBIDDEN pairs — asserted to stay illegal; DESIGN.md Never bans them (target is NOT lowered)
const forb=[["gray-500 on brand-100 (use gray-600)",G500,brand[100]],["gray-500 on brand-200",G500,brand[200]],["white on brand-500 (500 is non-text only)",W,brand[500]],["white on brand-400",W,brand[400]]];
// NON-TEXT — 3:1 (WCAG 1.4.11), shade difference only
for(const[bn,bg]of[["white",W],["gray-50",G50],["brand-50",brand[50]],["brand-100",brand[100]]]){chk("non-text",`CTA brand-600 vs ${bn}`,brand[600],bg,3);chk("non-text",`CTA hover brand-700 vs ${bn}`,brand[700],bg,3)}
chk("non-text","data bar / dot brand-500 vs white",brand[500],W,3);
chk("non-text","data bar brand-500 vs gray-100 track (#f3f4f6)",brand[500],"#f3f4f6",3);
chk("non-text","toggle-on brand-600 vs gray-200 toggle-off",brand[600],G200,3);
chk("non-text","focus ring brand-600 vs white",brand[600],W,3);
chk("non-text","selected-row inset bar brand-600 vs brand-50 row",brand[600],brand[50],3);
chk("non-text","white CTA button vs brand-800 band",W,brand[800],3);
chk("non-text",`ghost button border white/50 on brand-800 (composited ${over(W,.5,brand[800])})`,over(W,.5,brand[800]),brand[800],3);
chk("non-text","outline button border brand-600 vs white",brand[600],W,3);
for(const r of rows)console.log(r);
for(const[l,f,b]of forb){const r=cr(f,b);console.log(`BANNED [forbidden] ${l}: ${r.toFixed(2)}:1 — below 4.5, never shipped`);if(r>=4.5){fails++;console.log("  ^ unexpected: pair is legal, remove from ban list")}}
console.log(`\ninfo (decorative, no 3:1 requirement — badge is identified by its text): brand-200 border vs white ${cr(brand[200],W).toFixed(2)}:1, brand-200 vs brand-50 ${cr(brand[200],brand[50]).toFixed(2)}:1`);
console.log(`info: link brand-600 vs body ink gray-900 ${cr(brand[600],G900).toFixed(2)}:1 · link brand-600 vs non-link navy brand-800 ${cr(brand[600],brand[800]).toFixed(2)}:1 · OKLab ΔL ${(srgbToOklch(...ph(brand[600])).L-srgbToOklch(...ph(brand[800])).L).toFixed(3)}`);
console.log(`\n${rows.length-fails}/${rows.length} pairs pass`);process.exit(fails?2:0);
