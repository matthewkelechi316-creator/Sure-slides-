const $=id=>document.getElementById(id);
let slides=[{title:"SUNDAY SERVICE",body:"A time of worship, fellowship and the Word.",theme:"worship"},{title:"PRAISE & WORSHIP",body:"Let everything that has breath praise the Lord.",theme:"midnight"}];
let current=0;
function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)}
function renderList(){ $("slideList").innerHTML="";slides.forEach((s,i)=>{const b=document.createElement("button");b.className="slide-item"+(i===current?" active":"");b.textContent=(i+1)+". "+s.title;b.onclick=()=>{saveCurrent();current=i;loadCurrent()};$("slideList").appendChild(b)})}
function saveCurrent(){if(!slides[current])return;slides[current]={title:$("titleInput").value,body:$("bodyInput").value,theme:document.querySelector(".swatch.selected").dataset.theme}}
function loadCurrent(){const s=slides[current];$("titleInput").value=s.title;$("bodyInput").value=s.body;setTheme(s.theme);updatePreview();$("presentationTitle").textContent="Sunday Service";renderList()}
function setTheme(theme){document.querySelectorAll(".swatch").forEach(b=>b.classList.toggle("selected",b.dataset.theme===theme));$("canvas").className="slide-canvas theme-"+theme}
function updatePreview(){const title=$("titleInput").value||"YOUR TITLE";const body=$("bodyInput").value;$("previewTitle").innerHTML=title.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>");$("previewBody").textContent=body;$("miniTitle").textContent=title.replace(/\n/g," ");$("miniBody").textContent=body;if(window.sureSlides)window.sureSlides.sendSlide({title:$("titleInput").value,body,theme:document.querySelector(".swatch.selected").dataset.theme})}
$("titleInput").addEventListener("input",updatePreview);$("bodyInput").addEventListener("input",updatePreview);
document.querySelectorAll(".swatch").forEach(b=>b.onclick=()=>{setTheme(b.dataset.theme);saveCurrent()});
$("addSlide").onclick=()=>{saveCurrent();slides.push({title:"NEW SLIDE",body:"Type your message here.",theme:"worship"});current=slides.length-1;loadCurrent();toast("New slide added")};
$("saveBtn").onclick=()=>{saveCurrent();localStorage.setItem("sureslides-project",JSON.stringify(slides));renderList();toast("Presentation saved on this computer")};
$("renameBtn").onclick=()=>{const n=prompt("Presentation name:",$("presentationTitle").textContent);if(n){$("presentationTitle").textContent=n;toast("Presentation renamed")}};
function insertSlide(title,body){saveCurrent();slides.push({title,body,theme:"midnight"});current=slides.length-1;loadCurrent();toast("Slide added")}
$("songsNav").onclick=$("songQuick").onclick=()=>insertSlide("SONG / HYMN","Type your song lyrics here.");
$("bibleNav").onclick=$("verseQuick").onclick=()=>insertSlide("BIBLE READING","Enter a Bible verse or passage here.");
$("annNav").onclick=$("announceQuick").onclick=()=>insertSlide("ANNOUNCEMENT","Enter your church announcement here.");
$("presentBtn").onclick=async()=>{saveCurrent();if(window.sureSlides){await window.sureSlides.startOutputs();window.sureSlides.sendSlide(slides[current]);toast("Full-screen and transparent output windows opened");}else{toast("Desktop output requires the Windows app");}};
const saved=localStorage.getItem("sureslides-project");if(saved){try{slides=JSON.parse(saved)}catch(e){}}
loadCurrent();