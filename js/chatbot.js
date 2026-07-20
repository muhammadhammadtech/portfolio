(() => {
  function initPing() {
    if (document.getElementById('ping-widget')) return;

    const mountWidget = () => {
      if (document.getElementById('ping-widget')) return;

      const root = document.createElement('div');
      root.id = 'ping-widget';
      root.innerHTML = `
        <button class="ping-launcher" type="button" aria-label="Open Ping AI Assistant" aria-expanded="false">
          <img src="assets/icons/ping-icon.png" alt="Ping">
          <span class="ping-online-dot" aria-hidden="true"></span>
        </button>
        <section class="ping-window" aria-label="Ping AI Assistant" aria-hidden="true">
          <header class="ping-header">
            <div class="ping-identity">
              <img src="assets/icons/ping-icon.png" alt="">
              <div><strong>Ping</strong><span>AI Assistant</span></div>
            </div>
            <button class="ping-close" type="button" aria-label="Close Ping">&times;</button>
          </header>
          <div class="ping-messages" aria-live="polite"></div>
          <form class="ping-form">
            <input class="ping-input" type="text" autocomplete="off" placeholder="Ask me anything about Muhammad's work..." aria-label="Message Ping">
            <button class="ping-send" type="submit" aria-label="Send message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
            </button>
          </form>
        </section>`;
      document.body.appendChild(root);

      wireWidget(root);
    };

    if (!document.querySelector('link[href="css/chatbot.css"]')) {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = 'css/chatbot.css';
      style.onload = mountWidget;
      style.onerror = mountWidget;
      document.head.appendChild(style);
    } else {
      mountWidget();
    }
  }

  function wireWidget(root) {
    const launcher = root.querySelector('.ping-launcher');
    const chatWindow = root.querySelector('.ping-window');
    const closeButton = root.querySelector('.ping-close');
    const messages = root.querySelector('.ping-messages');
    const form = root.querySelector('.ping-form');
    const input = root.querySelector('.ping-input');
    const sendButton = root.querySelector('.ping-send');
    let history = [];
    let isOpen = false;
    let isSending = false;

    const escapeHtml = value => value.replace(/[&<>'"]/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[character]));

    const cleanUrl = url => url
      .trim()
      .replace(/[.,!?;:'"`\]}]+$/g, '');

    const safeUrl = rawUrl => {
      const url = cleanUrl(rawUrl);
      return /^(https?:\/\/|\/)[^\s"'<>()\]]+$/.test(url) ? url : null;
    };

    const linkLabel = (url, providedLabel) => {
      if (providedLabel && !/^https?:\/\//.test(providedLabel)) return providedLabel;
      if (/linkedin\.com/i.test(url)) return 'View LinkedIn Profile';
      if (/github\.com/i.test(url)) return 'View GitHub';
      if (/^\/contact(?:\.html)?(?:[?#]|$)/i.test(url)) return 'Visit Contact Page';
      if (/^\/projects(?:\.html)?(?:[?#]|$)/i.test(url)) return 'Explore Projects';
      if (/^\/about(?:\.html)?(?:[?#]|$)/i.test(url)) return 'Read About Muhammad';
      return 'Open link';
    };

    const renderBotMessage = text => {
      const pattern = /\[([^\]]+)\]\(((?:https?:\/\/|\/)[^\s<>()\]]+)\)|((?:https?:\/\/|\/)[^\s<>()\]]+)/g;
      let html = '';
      let lastIndex = 0;
      let match;

      while ((match = pattern.exec(text)) !== null) {
        html += escapeHtml(text.slice(lastIndex, match.index));
        const url = safeUrl(match[2] || match[3]);
        if (!url) {
          html += escapeHtml(match[0]);
          lastIndex = pattern.lastIndex;
          continue;
        }
        const label = linkLabel(url, match[1]);
        const external = ' target="_blank" rel="noopener noreferrer"';
        console.debug('[Ping] Link href:', url);
        html += `<a href="${escapeHtml(url)}"${external}>${escapeHtml(label)}</a>`;
        lastIndex = pattern.lastIndex;
      }

      return html + escapeHtml(text.slice(lastIndex));
    };

    const addMessage = (text, role) => {
      const message = document.createElement('div');
      message.className = `ping-message ping-message-${role}`;
      if (role === 'bot') {
        message.innerHTML = renderBotMessage(text);
      } else {
        message.textContent = text;
      }
      messages.appendChild(message);
      messages.scrollTop = messages.scrollHeight;
      return message;
    };

    const addTyping = () => {
      const typing = document.createElement('div');
      typing.className = 'ping-message ping-message-bot ping-typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      messages.appendChild(typing);
      messages.scrollTop = messages.scrollHeight;
      return typing;
    };

    const setOpen = open => {
      isOpen = open;
      root.classList.toggle('ping-is-open', open);
      launcher.setAttribute('aria-expanded', String(open));
      launcher.setAttribute('aria-label', open ? 'Close Ping AI Assistant' : 'Open Ping AI Assistant');
      chatWindow.setAttribute('aria-hidden', String(!open));
      if (open) input.focus();
    };

    addMessage("Hi! I'm Ping. Ask me anything about Muhammad's work, skills, or projects.", 'bot');
    launcher.addEventListener('click', () => setOpen(!isOpen));
    closeButton.addEventListener('click', () => setOpen(false));

    input.addEventListener('input', () => {
      sendButton.classList.toggle('has-text', input.value.trim().length > 0);
    });

    form.addEventListener('submit', async event => {
      event.preventDefault();
      const message = input.value.trim();
      if (!message || isSending) return;

      isSending = true;
      addMessage(message, 'user');
      input.value = '';
      sendButton.classList.remove('has-text');
      sendButton.disabled = true;
      const typing = addTyping();

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, history })
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.error || 'Chat request failed.');

        typing.remove();
        addMessage(result.reply, 'bot');
        history.push({ role: 'user', text: message }, { role: 'model', text: result.reply });
        history = history.slice(-20);
      } catch (error) {
        typing.remove();
        addMessage('Something went wrong. Please try again or use the contact form.', 'bot');
      } finally {
        isSending = false;
        sendButton.disabled = false;
        input.focus();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPing);
  } else {
    initPing();
  }
})();
