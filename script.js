// Para cada jogo, troque url:"#" pelo link real de download.
// Defina image com um caminho local (ex.: "images/celeste.jpg") ou uma URL da capa.
const GAMES=[
{n:"Celeste",d:"O jogo acompanha a jornada de Madeline, uma jovem que decide escalar a perigosa e mística Montanha Celeste",g:"Plataforma",s:"1,40 GB",p:"Android 11+",h1:290,h2:200,image:"src/celeste.png",url:"https://github.com/zsnoow-ports/zporthubgameslist/releases/download/Games/Celeste.Mobile.v1.0.0.By.zSnoow.apk"},
{n:"Zombotron",d:"O mercenário Blaze Rush cai no planeta após rastrear uma transmissão antiga de socorro.",g:"Tiro",s:"120 MB",p:"Android 11+",h1:130,h2:60,image:"src/zombotron.png",url:"https://github.com/zsnoow-ports/zporthubgameslist/releases/download/Games/Zombotron.Mobile.v1.0.By.zSnoow.apk"}
];
const $=id=>document.getElementById(id),grid=$("grid"),empty=$("empty");
let cat="Todos";

const cats=["Todos",...new Set(GAMES.map(x=>x.g))];
$("chips").innerHTML=cats.map(c=>`<button class="btn chip${c===cat?" on":""}" data-c="${c}">${c}</button>`).join("");
function render(){
  const t=$("q").value.trim().toLowerCase();
  const list=GAMES.filter(x=>(cat==="Todos"||x.g===cat)&&(x.n+" "+x.d).toLowerCase().includes(t));
  grid.innerHTML=list.map(x=>`<article class="card"><div class="cover${x.image?" has-image":""}" style="--h1:${x.h1};--h2:${x.h2}">${x.image?`<img class="cover-image" src="${x.image}" alt="" loading="lazy">`:""}<span class="tag">${x.g}</span><i>${x.n[0]}</i></div><div class="body"><div class="info"><span>${x.s}</span><span>·</span><span>${x.p}</span></div><h3>${x.n}</h3><p>${x.d}</p><a class="btn pri" href="${x.url}" data-n="${x.n}">⬇ Baixar APK</a></div></article>`).join("");
  empty.style.display=list.length?"none":"block";
}
$("q").addEventListener("input",render);
$("chips").addEventListener("click",e=>{const b=e.target.closest("[data-c]");if(!b)return;cat=b.dataset.c;document.querySelectorAll(".chip").forEach(c=>c.classList.toggle("on",c===b));render()});
grid.addEventListener("error",e=>{if(!e.target.matches(".cover-image"))return;e.target.parentElement.classList.remove("has-image");e.target.remove()},true);
let tm;grid.addEventListener("click",e=>{const a=e.target.closest("a[data-n]");if(!a||a.getAttribute("href")!=="#")return;e.preventDefault();const t=$("toast");t.textContent="Link de "+a.dataset.n+" ainda não configurado.";t.classList.add("show");clearTimeout(tm);tm=setTimeout(()=>t.classList.remove("show"),2400)});
render();