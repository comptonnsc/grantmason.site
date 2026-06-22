// Script for gallery lightbox
document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-image');
      const title = item.getAttribute('data-title');
      const desc = item.getAttribute('data-description');
      lightboxImage.src = imgSrc;
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  });

  // Close lightbox when clicking outside the content
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  // Phrase generator
  const phraseInput = document.getElementById('inputPhrase');
  const phraseButton = document.getElementById('generatePhrase');
  const phraseOutput = document.getElementById('phraseOutput');

  // Simple dictionary of translations
  const phraseDictionary = {
    "i'm tired": "I'm tired enough to sleep through a thunderstorm on a tin roof.",
    "i am tired": "I'm as worn out as a pair of work boots after a harvest.",
    "it's hot": "It's hotter than July asphalt after a church picnic.",
    "it is hot": "Hotter than a pepper sprout on a summer day.",
    "i'm hungry": "I'm so hungry I'd eat the north end of a southbound skunk.",
    "i am hungry": "I'm so hungry I'd make grits for a whole town.",
    "that's ridiculous": "That makes about as much sense as a screen door on a submarine.",
    "that's crazy": "That's crazier than a June bug in July.",
    "i'm cold": "I'm colder than a well digger's ankles.",
    "i am cold": "Colder than a witch's heart on Christmas." 
  };

  const defaultPhrases = [
    "He's so slow he couldn't catch a turtle in a phone booth.",
    "She's busier than a one-legged man in a butt‑kicking contest.",
    "That dog won't hunt.",
    "I'm finer than frog hair split four ways.",
    "She's as stubborn as a mule chewing on briars." 
  ];

  phraseButton.addEventListener('click', () => {
    const input = phraseInput.value.trim().toLowerCase();
    if (!input) {
      phraseOutput.textContent = 'Please enter a phrase.';
      return;
    }
    let translation = phraseDictionary[input];
    if (!translation) {
      // pick a random default phrase
      translation = defaultPhrases[Math.floor(Math.random() * defaultPhrases.length)];
    }
    phraseOutput.textContent = translation;
  });

  // Reader Assistant (simple Q&A)
  const assistantInput = document.getElementById('assistantInput');
  const assistantSend = document.getElementById('assistantSend');
  const assistantResponse = document.getElementById('assistantResponse');

  assistantSend.addEventListener('click', () => {
    const question = assistantInput.value.trim().toLowerCase();
    if (!question) {
      assistantResponse.textContent = 'Please enter a question.';
      return;
    }
    let response = '';
    // Basic keywords for Q&A
    if (question.includes('release') || question.includes('published') || question.includes('date')) {
      response = 'Seersucker & Silence is currently in final production. Release dates will be announced soon to our VIP members. Join the VIP list to be the first to know.';
    } else if (question.includes('vip')) {
      response = 'VIP members receive advance excerpts, first-edition announcements, cover reveals, and early access to future releases. You can join using the VIP form on this page.';
    } else if (question.includes('reserve') || question.includes('first edition')) {
      response = 'You can reserve your place for the first edition by filling out the reservation form. We will notify you when pre-orders become available.';
    } else if (question.includes('sample') || question.includes('chapter')) {
      response = 'A sample chapter is available on this page in the Sample section. Click the “Open Full Sample” button to read more.';
    } else if (question.includes('contact')) {
      response = 'For all inquiries, including book clubs, media, or speaking opportunities, please use the contact form or email hello@grantmason.site.';
    } else {
      response = 'Thank you for your question. For specific inquiries, please use the contact form and we will respond directly.';
    }
    assistantResponse.textContent = response;
  });

  /* Chat Widget functionality */
  const chatButton = document.getElementById('chat-button');
  const chatWidget = document.getElementById('chat-widget');
  const chatClose = document.getElementById('chat-close');
  const chatHistory = document.getElementById('chat-history');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatStarterButtons = document.querySelectorAll('.chat-starter');

  function addChatMessage(text, sender) {
    const p = document.createElement('p');
    p.className = 'message ' + sender;
    p.textContent = text;
    chatHistory.appendChild(p);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  function getAssistantResponse(question) {
    const q = question.trim().toLowerCase();
    let ans = '';
    if (!q) return '';
    if (q.includes('release') || q.includes('published') || q.includes('date')) {
      ans = 'Seersucker & Silence is currently in final production. Release dates will be announced soon to our VIP members. Join the VIP list to be the first to know.';
    } else if (q.includes('vip')) {
      ans = 'VIP members receive advance excerpts, first-edition announcements, cover reveals, and early access to future releases. You can join using the VIP form on this page.';
    } else if (q.includes('reserve') || q.includes('first edition')) {
      ans = 'You can reserve your place for the first edition by filling out the reservation form. We will notify you when pre-orders become available.';
    } else if (q.includes('sample') || q.includes('chapter')) {
      ans = 'A sample chapter is available on this page in the Sample section. Click the “Open Full Sample” button to read more.';
    } else if (q.includes('contact')) {
      ans = 'For all inquiries, including book clubs, media, or speaking opportunities, please use the contact form or email hello@grantmason.site.';
    } else if (q.includes('what is seersucker & silence') || q.includes('what is seersucker and silence')) {
      ans = 'Seersucker & Silence is a Southern memoir about family, privilege, class, identity, resilience and the costs of silence. It traces a journey from Kentucky horse country through personal collapse to reinvention in Charleston.';
    } else {
      ans = 'Thank you for your question. For specific inquiries, please use the contact form and we will respond directly.';
    }
    return ans;
  }

  function sendChat() {
    const question = chatInput.value.trim();
    if (!question) return;
    addChatMessage(question, 'user');
    const answer = getAssistantResponse(question);
    addChatMessage(answer, 'bot');
    chatInput.value = '';
  }

  chatButton.addEventListener('click', () => {
    // Toggle chat visibility. When opening for the first time, show a greeting
    const wasHidden = chatWidget.style.display === 'none' || chatWidget.style.display === '';
    chatWidget.style.display = wasHidden ? 'flex' : 'none';
    if (wasHidden && !window.chatGreeted) {
      // Display a greeting and quick instructions once on the first open
      addChatMessage("Hello! I'm the Grant Mason reader assistant. Ask me anything about the memoir, VIP membership, first edition reservations, release dates or contact options.", 'bot');
      window.chatGreeted = true;
    }
  });

  chatClose.addEventListener('click', () => {
    chatWidget.style.display = 'none';
  });

  chatSend.addEventListener('click', () => {
    sendChat();
  });

  chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendChat();
    }
  });

  chatStarterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-question');
      chatInput.value = q;
      sendChat();
    });
  });

  /* VIP Modal functionality */
  const vipModal = document.getElementById('vip-modal');
  const vipModalClose = document.getElementById('vip-modal-close');
  // Show after delay
  setTimeout(() => {
    vipModal.style.display = 'flex';
  }, 10000);
  vipModalClose.addEventListener('click', () => {
    vipModal.style.display = 'none';
  });
  vipModal.addEventListener('click', e => {
    if (e.target === vipModal) {
      vipModal.style.display = 'none';
    }
  });
});