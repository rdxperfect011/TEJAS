const chatElementRef = document.getElementById('chat-element');
        
// Setup Initial Chat History
chatElementRef.history = [
  {
    role: 'ai', 
    html: `<div style="background: linear-gradient(135deg, #0056b3, #003366); color: #ffffff; padding: 18px; border-radius: 20px 20px 20px 4px; margin: -13px -17px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
      <div style="text-align: center; font-weight: 700; font-size: 17px; margin-bottom: 8px; letter-spacing: 0.5px; background: linear-gradient(135deg, #66b2ff, #ffffff); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">✨ Welcome to TEJAS ✨</div>
      <div style="text-align: center; font-size: 14px; line-height: 1.6; color: #e6f2ff; opacity: 0.95;">I am your virtual assistant for <strong>JKBOTE</strong>, here to help navigate services and answer your questions.</div>
      <div style="text-align: right; font-size: 10.5px; opacity: 0.6; margin-top: 10px; font-weight: 500; color: #cce0ff;">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
    </div>`
  },
  {
    role: 'ai', 
    html: `
      <div style="white-space:pre-wrap; color: #1a2c4d; font-size: 14px;">Welcome to the official J&K Board of Technical Education (JKBOTE) portal! How can I assist you with your queries today?</div>
      <div style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
        <button class="tejas-suggestion-button" style="background: white; border: 1px solid #dce8fc; border-radius: 14px; padding: 8px 12px; color: #0056b3; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 5px rgba(0,0,0,0.02); text-align: left;">Latest Notifications</button>
        <button class="tejas-suggestion-button" style="background: white; border: 1px solid #dce8fc; border-radius: 14px; padding: 8px 12px; color: #0056b3; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 5px rgba(0,0,0,0.02); text-align: left;">Examination Calendar</button>
        <button class="tejas-suggestion-button" style="background: white; border: 1px solid #dce8fc; border-radius: 14px; padding: 8px 12px; color: #0056b3; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 5px rgba(0,0,0,0.02); text-align: left;">Admission Forms</button>
      </div>
      <div style="text-align:left; font-size:10.5px; opacity:0.5; margin-top:8px; font-weight:500; color: #556b8d;">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
    `
  },
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
      backgroundColor: "#ffffff",
      borderRadius: "28px",
      border: "1px solid #dce8fc",
      padding: "8px 16px",
      margin: "12px 14px",
      boxShadow: "0 2px 8px rgba(0,86,179,0.06) inset",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease"
    },
    text: {
      fontSize: "14.5px",
      color: "#003366"
    },
    focus: {
      container: {
        border: "1px solid #99c2ff",
        boxShadow: "0 2px 10px rgba(0,86,179,0.1) inset, 0 0 0 3px rgba(102,178,255,0.15)"
      }
    }
  }
};

chatElementRef.submitButtonStyles = {
  submit: {
    container: {
      default: {
        background: "linear-gradient(135deg, #0056b3, #003366)",
        borderRadius: "50%",
        width: "36px",
        height: "36px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "8px 6px 8px 0",
        boxShadow: "0 3px 10px rgba(0, 86, 179, 0.2)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease"
      },
      hover: {
        transform: "scale(1.05)",
        boxShadow: "0 5px 14px rgba(0, 86, 179, 0.35)"
      }
    },
    svg: {
      styles: {
        default: {
          filter: "brightness(0) invert(1)",
          width: "16px",
          height: "16px",
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
        fontSize: "14px",
        lineHeight: "1.5",
        padding: "12px 16px",
        animation: "fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }
    },
    user: {
      bubble: {
        background: "linear-gradient(135deg, #0056b3 0%, #004488 100%)",
        color: "#ffffff",
        border: "none",
        borderRadius: "20px 20px 4px 20px",
        boxShadow: "0 4px 12px rgba(0, 86, 179, 0.15)"
      }
    },
    ai: {
      bubble: {
        backgroundColor: "#ffffff",
        color: "#1a2c4d",
        border: "1px solid #edf2fa",
        boxShadow: "0 3px 10px rgba(0, 26, 51, 0.04)",
        borderRadius: "20px 20px 20px 4px"
      }
    }
  },
  loading: {
    bubble: {
      backgroundColor: "#ffffff",
      border: "1px solid #edf2fa",
      boxShadow: "0 3px 10px rgba(0, 26, 51, 0.04)",
      borderRadius: "20px 20px 20px 4px",
      padding: "12px 16px",
      color: "#0056b3"
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
  background: "linear-gradient(to bottom, #fcfdff 0%, #f2f7fd 100%)"
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
  return `<div style="text-align:${alignRight ? 'right' : 'left'}; font-size:10.5px; opacity:0.5; margin-top:4px; font-weight:500;">${getCurrentTimeString()}</div>`;
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
            ts.style.cssText = 'text-align:right; font-size:10.5px; opacity:0.6; margin-top:4px; font-weight:500; color:#cce0ff;';
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
