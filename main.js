
const toggleBtn = document.getElementById('toggle-btn');
const closeBtn = document.getElementById('close-chat');
const chatContainer = document.getElementById('chatbot-container');

// Open Chat
toggleBtn.addEventListener('click', () => {
    chatContainer.classList.add('active');
    toggleBtn.style.display = 'none';
});

// Close Chat
closeBtn.addEventListener('click', () => {
    chatContainer.classList.remove('active');
    toggleBtn.style.display = 'flex';
});


/* ---------- INFINITE CONTINUOUS SCROLL ---------- */
const slider = document.querySelector('.gallery-track');
let scrollSpeed = 0.5;

slider.innerHTML += slider.innerHTML;
let scrollPos = 0;

function infiniteScroll() {
  scrollPos += scrollSpeed;
  if (scrollPos >= slider.scrollWidth / 2) {
    scrollPos = 0;
  }
  slider.style.transform = `translateX(${-scrollPos}px)`;
  requestAnimationFrame(infiniteScroll);
}
infiniteScroll();

/* ---------- DRAG SCROLL ---------- */
const container = document.querySelector('.gallery-slider');
let isDown = false;
let startX;
let scrollStart;

container.addEventListener('mousedown', e => {
  isDown = true;
  startX = e.pageX - container.offsetLeft;
  scrollStart = scrollPos;
});
container.addEventListener('mouseleave', () => isDown = false);
container.addEventListener('mouseup', () => isDown = false);
container.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  scrollPos = scrollStart - (x - startX);
});

/* ---------- PROFILE IMAGE LOGIC ---------- */
const basePic = document.querySelector('.profile-pic.base');
const hoverPic = document.querySelector('.profile-pic.hover');

function updateProfileImages(theme) {
  if (!basePic || !hoverPic) return;

  if (theme === 'dark') {
    basePic.src = basePic.dataset.dark;
    hoverPic.src = basePic.dataset.darkHover;
  } else {
    basePic.src = basePic.dataset.light;
    hoverPic.src = basePic.dataset.lightHover;
  }
}

/* ---------- DARK / LIGHT THEME ---------- */
const toggle = document.querySelector('#dark-mode-toggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  if (theme === 'dark') {
    toggle.checked = true;
    document.body.classList.add('dark-mode');
  } else {
    toggle.checked = false;
    document.body.classList.remove('dark-mode');
  }

  updateProfileImages(theme);
  localStorage.setItem('theme', theme);
}

toggle.addEventListener('change', () => {
  applyTheme(toggle.checked ? 'dark' : 'light');
});


const charCount = document.getElementById('char-count');

input.addEventListener('input', () => {
  const length = input.value.length;
  charCount.textContent = `${length}/1000`;
});


// load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  if (savedTheme === "dark") toggle.checked = true;
}

// when user switches
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});

function openModal() {
  document.getElementById("certModal").style.display = "block";
}

function closeModal() {
  document.getElementById("certModal").style.display = "none";
}
(function() {
  const track = document.getElementById('galleryTrack');
  const dotsContainer = document.getElementById('galleryDots');
  const originalImages = ["images/LAST.png","images/PROFILE PIC.png","images/picture6.jpg","images/2 (3).jpg","images/2 (2).jpg","images/LAST.png","images/picture6.jpg","images/2 (1).jpg"];
  const fallbackImg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23cccccc'/%3E%3Ctext x='50' y='55' font-size='12' text-anchor='middle' fill='%23666'%3Eimg%3C/text%3E%3C/svg%3E";
  const cloneLeft = [...originalImages], cloneRight = [...originalImages];
  const infiniteList = [...cloneLeft, ...originalImages, ...cloneRight];
  const totalItems = infiniteList.length, originalStartIndex = cloneLeft.length, originalEndIndex = originalStartIndex + originalImages.length - 1;
  let currentIndex = originalStartIndex, itemWidth = 160, gap = 16, autoInterval = null, isHovering = false, isTransitioning = false;
  function updateDimensions() { const s = document.querySelector('.gallery-item'); itemWidth = s ? s.offsetWidth : 160; }
  function buildTrack() { if(!track) return; track.innerHTML = ''; infiniteList.forEach((src,i)=>{ const div=document.createElement('div'); div.className='gallery-item'; const img=document.createElement('img'); img.src=src; img.onerror=function(){this.src=fallbackImg;}; div.appendChild(img); track.appendChild(div); }); updateDimensions(); repositionSilently(currentIndex); }
  function repositionSilently(idx) { const val = -(idx*(itemWidth+gap)); track.style.transition='none'; track.style.transform=`translateX(${val}px)`; void track.offsetHeight; track.style.transition='transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)'; currentIndex=idx; }
  function moveToIndex(newIdx, smooth=true) { if(isTransitioning && smooth) return; if(newIdx<0) newIdx=0; if(newIdx>=totalItems) newIdx=totalItems-1; const val = -(newIdx*(itemWidth+gap)); if(smooth){ isTransitioning=true; track.style.transform=`translateX(${val}px)`; const onFinish=()=>{ isTransitioning=false; track.removeEventListener('transitionend',onFinish); resetIfNeeded(); updateActiveDot(); }; track.addEventListener('transitionend',onFinish,{once:true}); } else { repositionSilently(newIdx); resetIfNeeded(); updateActiveDot(); } currentIndex=newIdx; updateActiveDot(); }
  function resetIfNeeded() { if(currentIndex<originalStartIndex){ let newIdx = originalEndIndex - (originalStartIndex-currentIndex-1); if(newIdx<originalStartIndex) newIdx=originalStartIndex; jumpSilently(newIdx); } else if(currentIndex>originalEndIndex){ let newIdx = originalStartIndex + (currentIndex-originalEndIndex-1); if(newIdx>originalEndIndex) newIdx=originalEndIndex; jumpSilently(newIdx); } }
  function jumpSilently(targetIdx){ const val = -(targetIdx*(itemWidth+gap)); track.style.transition='none'; track.style.transform=`translateX(${val}px)`; void track.offsetHeight; track.style.transition='transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)'; currentIndex=targetIdx; updateActiveDot(); }
  function nextSlide() { if(isTransitioning) return; let nextIdx=currentIndex+1; if(nextIdx>=totalItems) { const realIdx = originalStartIndex + ((currentIndex-originalStartIndex)%originalImages.length); jumpSilently(realIdx); nextIdx=realIdx+1; } if(nextIdx<totalItems) moveToIndex(nextIdx,true); else { jumpSilently(originalStartIndex); moveToIndex(originalStartIndex+1,true); } }
  function updateActiveDot() { if(!dotsContainer) return; let realIdx = ((currentIndex-originalStartIndex)%originalImages.length+originalImages.length)%originalImages.length; const dots = dotsContainer.querySelectorAll('.dot'); dots.forEach((dot,idx)=>{ if(idx===realIdx) dot.classList.add('active-dot'); else dot.classList.remove('active-dot'); }); }
  function startAutoSlide() { if(autoInterval) clearInterval(autoInterval); if(isHovering) return; autoInterval = setInterval(()=>{ if(!isHovering && !isTransitioning) nextSlide(); },2800); }
  function stopAutoSlide() { if(autoInterval){ clearInterval(autoInterval); autoInterval=null; } }
  function createDots() { if(!dotsContainer) return; dotsContainer.innerHTML=''; originalImages.forEach((_,idx)=>{ const dot=document.createElement('div'); dot.classList.add('dot'); if(idx===0) dot.classList.add('active-dot'); dot.addEventListener('click',(e)=>{ e.stopPropagation(); if(isTransitioning) return; stopAutoSlide(); let targetVirtual=originalStartIndex+idx; if(targetVirtual>=totalItems) targetVirtual=originalStartIndex+idx-originalImages.length; if(targetVirtual<0) targetVirtual=originalStartIndex+idx; moveToIndex(targetVirtual,true); startAutoSlide(); }); dotsContainer.appendChild(dot); }); }
  const wrapper = document.getElementById('carouselWrapper'); if(wrapper){ wrapper.addEventListener('mouseenter',()=>{ isHovering=true; stopAutoSlide(); }); wrapper.addEventListener('mouseleave',()=>{ isHovering=false; startAutoSlide(); }); }
  function handleResize() { if(!track) return; stopAutoSlide(); updateDimensions(); const correctedX = -(currentIndex*(itemWidth+gap)); track.style.transition='none'; track.style.transform=`translateX(${correctedX}px)`; void track.offsetHeight; track.style.transition='transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)'; startAutoSlide(); }
  buildTrack(); createDots(); startAutoSlide(); window.addEventListener('resize', handleResize);
})();

// ========== TIMELINE ==========
(function() {
  const timeline = document.getElementById('experienceTimeline');
  if (!timeline) return;
  const items = timeline.querySelectorAll('.timeline-item');
  if (items.length) items[0].classList.add('active');
  items.forEach(item => item.addEventListener('click', function() { items.forEach(i => i.classList.remove('active')); this.classList.add('active'); }));
})();

// ========== MODAL & DARK MODE ==========
const modal = document.getElementById('certModal'), modalImg = document.getElementById('certificateModalImg'), certCard = document.getElementById('certCyberCard'), closeModal = document.getElementById('closeModalBtn');
function openCert(src='images/certificate-cyber.jpg') { if(modal && modalImg) { modalImg.src=src; modal.style.display='flex'; document.body.style.overflow='hidden'; } }
function closeCert() { if(modal) { modal.style.display='none'; document.body.style.overflow=''; } }
if(certCard) certCard.addEventListener('click', (e) => { e.stopPropagation(); openCert(); });
if(closeModal) closeModal.addEventListener('click', closeCert);
if(modal) modal.addEventListener('click', (e) => { if(e.target === modal) closeCert(); });

const toggleCheckbox = document.getElementById('dark-mode-toggle'), root = document.documentElement, basePic = document.querySelector('.profile-pic.base'), hoverPic = document.querySelector('.profile-pic.hover');
function setTheme(dark) { if(dark) { root.setAttribute('data-theme','dark'); if(basePic) basePic.src='images/hovernight.png'; if(hoverPic) hoverPic.src='images/PROFILE PIC.png'; } else { root.setAttribute('data-theme','light'); if(basePic) basePic.src='images/PROFILE PIC.png'; if(hoverPic) hoverPic.src='images/hovernight.png'; } localStorage.setItem('theme', dark ? 'dark' : 'light'); }
const saved = localStorage.getItem('theme'), prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches, initDark = saved ? saved === 'dark' : prefersDark;
if(initDark) { toggleCheckbox.checked = true; setTheme(true); } else setTheme(false);
toggleCheckbox.addEventListener('change', (e) => setTheme(e.target.checked));

// ========== GEMINI CHATBOT (with fallback) ==========
const GEMINI_API_KEY = "AIzaSyBjTDbHEfOvTS5EKzVQd38oO-vRz8kU9Lw";
let conversationHistory = [];

const SYSTEM_PROMPT = `You are Kharl AI, a friendly assistant representing Kharl Nieto, a BSIT student and aspiring web developer from the Philippines. Answer questions based on Kharl's profile:
- Tech stack: HTML, CSS, JS, Tailwind, Figma, PHP, Laravel, MySQL, Git.
- Projects: E‑commerce Platform (cart), Admin Dashboard (charts), Portfolio, Apartment Tracking System (capstone).
- Certificates: Web Development Fundamentals, UI/UX Design Essentials, Cybersecurity Seminar (click to view).
- Experience: Self‑taught frontend 2024, AI‑assisted dev 2026, UI/UX 2026.
- Goals: Full‑stack (Laravel, MySQL, API integration) and improve UI/UX.
Keep responses concise, warm, and professional. Never say you are an AI model; say "I'm Kharl's AI assistant" if needed.`;

function getFallbackResponse(userMsg) {
  const lowerMsg = userMsg.toLowerCase();
  if (lowerMsg.includes('tech') || lowerMsg.includes('stack')) return "I work with HTML, CSS, JS, PHP, Laravel, MySQL and Figma! 🚀";
  if (lowerMsg.includes('project')) return "Recent projects: admin dashboard, e‑commerce UI, blog CMS, Apartment Tracking System. Check them in my portfolio!";
  if (lowerMsg.includes('certificate') || lowerMsg.includes('cert')) return "I have certificates in Web Dev fundamentals, UI/UX, and Cybersecurity Seminar. Click the certificate card to view!";
  if (lowerMsg.includes('experience') || lowerMsg.includes('journey')) return "Started coding in 2023, now focusing on frontend and full‑stack. Active in freelance & student projects. I also have an upcoming internship this 2025!";
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) return "Hey there! Ask me anything about web dev or my journey. 🙌";
  return "Interesting! I'm still learning, but feel free to ask about my tech stack, certificates, or projects! 😊";
}

async function callGemini(userMessage) {
    conversationHistory.push(`User: ${userMessage}`);
    if (conversationHistory.length > 6) conversationHistory.shift();
    const prompt = `${SYSTEM_PROMPT}\n\n${conversationHistory.join('\n')}\nKharl AI:`;
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.7, maxOutputTokens: 300 }
            })
        });
        if (!response.ok) {
            console.warn("Gemini API error, using fallback");
            return getFallbackResponse(userMessage);
        }
        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;
        conversationHistory.push(`Kharl AI: ${reply}`);
        return reply;
    } catch (err) {
        console.error("Network error, using fallback", err);
        return getFallbackResponse(userMessage);
    }
}

// Chat UI
const chatContainer = document.getElementById('chatbot-container');
const toggleBtn = document.getElementById('toggle-btn');
const closeChat = document.getElementById('close-chat');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('sendMsgBtn');
const charCountSpan = document.getElementById('char-count');

function escapeHtml(str) { return str.replace(/[&<>]/g, m => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' }[m] || m)); }
function showTyping() { const d=document.createElement('div'); d.className='message-row'; d.id='typingIndicator'; d.innerHTML=`<img src="images/PROFILE PIC.png" class="bot-img-small"><div class="bot-bubble"><i>Kharl is typing...</i></div>`; chatBody.appendChild(d); chatBody.scrollTop=chatBody.scrollHeight; }
function removeTyping() { const el=document.getElementById('typingIndicator'); if(el) el.remove(); }
function appendMessage(text, isUser=true) { const div=document.createElement('div'); div.className='message-row'; if(isUser){ div.style.justifyContent='flex-end'; div.innerHTML=`<div class="user-bubble">${escapeHtml(text)}</div>`; } else { div.innerHTML=`<img src="images/PROFILE PIC.png" class="bot-img-small"><div class="bot-bubble">${escapeHtml(text)}</div>`; } chatBody.appendChild(div); chatBody.scrollTop=chatBody.scrollHeight; }
async function sendMessage() { const msg=chatInput.value.trim(); if(!msg) return; sendBtn.disabled=true; chatInput.disabled=true; appendMessage(msg,true); chatInput.value=''; updateCharCount(); showTyping(); const reply=await callGemini(msg); removeTyping(); appendMessage(reply,false); sendBtn.disabled=false; chatInput.disabled=false; chatInput.focus(); }
function updateCharCount() { charCountSpan.innerText=`${chatInput.value.length}/1000`; }
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => { if(e.key==='Enter') sendMessage(); });
chatInput.addEventListener('input', updateCharCount);
toggleBtn.addEventListener('click', () => { chatContainer.classList.toggle('active'); });
closeChat.addEventListener('click', () => { chatContainer.classList.remove('active'); });
updateCharCount();









