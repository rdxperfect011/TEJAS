const chatElementRef = document.getElementById('chat-element');
        
// Setup Initial Chat History
chatElementRef.history = [
  {
    role: 'ai', 
    html: `<div style="background: linear-gradient(135deg, #0056b3, #003366); color: #ffffff; padding: 18px; border-radius: 20px 20px 20px 4px; margin: -13px -17px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
      <div style="text-align: center; font-weight: 700; font-size: 17px; margin-bottom: 8px; letter-spacing: 0.5px; background: linear-gradient(135deg, #66b2ff, #ffffff); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">✨ Welcome to TEJAS ✨</div>
      <div style="text-align: center; font-size: 14px; line-height: 1.6; color: #e6f2ff; opacity: 0.95;">I am your virtual assistant for <strong>JKBOTE</strong>, here to help navigate services and answer your questions.</div>
      <div style="text-align: right; font-size: 11px; opacity: 0.8; margin-top: 10px; font-weight: 500; color: #cce0ff;">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
    </div>`
  },
  {role: 'ai', html: `<span style="white-space:pre-wrap; color: #1a2c4d; font-size: 14.5px;">Welcome to the official J&K Board of Technical Education (JKBOTE) portal! How can I assist you with your queries today? Try asking about "latest notifications", "admission forms", or any general questions.</span><div style="text-align:left; font-size:11px; opacity:0.6; margin-top:6px; font-weight:500; color: #556b8d;">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>`},
];

// Ensure the AI label inside chat bubbles is named "TEJAS"
chatElementRef.names = {
  default: {
    style: {
      fontSize: "12px",
      fontWeight: "600",
      color: "#556b8d"
    }
  },
  ai: { 
    text: "TEJAS",
    style: {
      fontSize: "13px",
      fontWeight: "700",
      color: "#003366",
      marginBottom: "4px"
    }
  }
};

// Premium UI configuration with JKBOTE colors
chatElementRef.textInput = {
  placeholder: {text: "Type your message..."},
  styles: {
    container: {
      backgroundColor: "#f4f7fa",
      borderRadius: "28px",
      border: "1px solid #dce8fc",
      padding: "6px 16px",
      margin: "12px 14px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.02) inset"
    },
    text: {
      fontSize: "15px",
      color: "#003366"
    }
  }
};

chatElementRef.submitButtonStyles = {
  submit: {
    container: {
      default: {
        background: "linear-gradient(135deg, #0056b3, #003366)",
        borderRadius: "50%",
        width: "38px",
        height: "38px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "6px 5px 6px 0",
        boxShadow: "0 4px 12px rgba(0, 86, 179, 0.3)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease"
      },
      hover: {
        background: "linear-gradient(135deg, #004494, #002244)",
        transform: "scale(1.08)",
        boxShadow: "0 6px 16px rgba(0, 86, 179, 0.4)"
      }
    },
    svg: {
      styles: {
        default: {
          filter: "brightness(0) invert(1)",
          width: "18px",
          height: "18px",
          marginLeft: "-1px"
        }
      }
    }
  }
};

chatElementRef.messageStyles = {
  default: {
    shared: {
      bubble: {
        maxWidth: "85%",
        fontSize: "14.5px",
        lineHeight: "1.55",
        padding: "14px 18px"
      }
    },
    user: {
      bubble: {
        background: "linear-gradient(135deg, #0056b3, #003366)",
        color: "#ffffff",
        border: "none",
        borderRadius: "20px 20px 4px 20px",
        boxShadow: "0 6px 15px rgba(0, 86, 179, 0.2)"
      }
    },
    ai: {
      bubble: {
        backgroundColor: "#f4f8ff",
        color: "#1a2c4d",
        border: "1px solid #dce8fc",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.03)",
        borderRadius: "20px 20px 20px 4px"
      }
    }
  }
};

chatElementRef.introPanelStyle = {
  backgroundColor: "transparent",
  color: "#555",
  padding: "20px",
  textAlign: "center",
  border: "none",
  boxShadow: "none"
};

chatElementRef.chatStyle = {
  backgroundColor: "#fcfdff"
};

// Python API Handler Logic
chatElementRef.request = {
  url: '/api/chat',
  method: 'POST'
};

// Intercept outgoing request to match backend expected format
chatElementRef.requestInterceptor = (requestDetails) => {
  // Just pass through the current message without history to avoid conflicts
  return requestDetails;
};

// Helper: get current time as HH:MM string
function getCurrentTimeString() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Timestamp HTML snippet appended to every message
function makeTimestampHTML(alignRight = false) {
  return `<div style="text-align:${alignRight ? 'right' : 'left'}; font-size:11px; opacity:0.65; margin-top:5px; font-weight:500;">${getCurrentTimeString()}</div>`;
}

// Intercept response: use 'html' field so links are rendered as clickable hyperlinks
chatElementRef.responseInterceptor = (response) => {
  const timestamp = makeTimestampHTML(false);
  if (response.html) {
    return { html: response.html + timestamp };
  }
  // Fallback: convert any plain [text](url) patterns in the text field
  if (response.text) {
    const linkedText = response.text.replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#0056b3;font-weight:600;text-decoration:underline;">$1</a>'
    );
    return { html: `<span style="white-space:pre-wrap;">${linkedText}</span>` + timestamp };
  }
  return response;
};

// Use MutationObserver to inject timestamps into user message bubbles via shadow root
function setupUserTimestampObserver() {
  const tryObserve = () => {
    const shadowRoot = chatElementRef.shadowRoot;
    if (!shadowRoot) {
      setTimeout(tryObserve, 500);
      return;
    }
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          
          // Identify user message bubbles
          // The library uses .user-bubble or classes containing 'user' for user messages
          const isUserContainer = node.classList && (
            node.classList.contains('user-message-outer-container-position') ||
            Array.from(node.classList).some(c => c.includes('user'))
          );
          
          let targetBubble = null;
          if (isUserContainer) {
            targetBubble = node.querySelector('[class*="bubble"]');
          } else if (node.classList && Array.from(node.classList).some(c => c.includes('bubble'))) {
            const parent = node.closest('[class*="outer-message"]');
            if (parent && Array.from(parent.classList).some(c => c.includes('user'))) {
              targetBubble = node;
            }
          }

          // Guard against infinity loop: check if already processed
          if (targetBubble && !targetBubble.hasAttribute('data-timestamp-added')) {
            targetBubble.setAttribute('data-timestamp-added', 'true');
            const ts = document.createElement('div');
            ts.className = 'user-timestamp';
            ts.style.cssText = 'text-align:right; font-size:11px; opacity:0.75; margin-top:4px; font-weight:500; color:#cce0ff;';
            ts.textContent = getCurrentTimeString();
            targetBubble.appendChild(ts);
          }
        });
      });
    });
    
    observer.observe(shadowRoot, { childList: true, subtree: true });
  };
  tryObserve();
}
setupUserTimestampObserver();


// Widget Toggle Logic
const toggleBtn = document.getElementById('chat-toggle-btn');
const widgetContainer = document.getElementById('chat-widget-container');
const tooltip = document.getElementById('chat-tooltip');
let isOpen = false;

toggleBtn.addEventListener('click', () => {
  isOpen = !isOpen;
  const defaultIcon = document.querySelector('.default-icon');
  const closeIcon = document.querySelector('.close-icon');

  if (isOpen) {
    widgetContainer.classList.add('show-widget');
    if (defaultIcon && closeIcon) {
      defaultIcon.style.display = 'none';
      closeIcon.style.display = 'block';
    } else {
      toggleBtn.innerHTML = '✕';
    }
    // Hide tooltip entirely once interacted
    if (tooltip) tooltip.style.display = 'none';
  } else {
    widgetContainer.classList.remove('show-widget');
    if (defaultIcon && closeIcon) {
      defaultIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    } else {
      toggleBtn.innerHTML = '💬';
    }
  }
});
