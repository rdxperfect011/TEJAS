const chatElementRef = document.getElementById('chat-element');
        
// Setup Initial Chat History
chatElementRef.history = [
  {
    role: 'ai', 
    html: `<div style="background: linear-gradient(135deg, #0056b3, #003366); color: #ffffff; padding: 16px; border-radius: 17px 17px 17px 3px; margin: -13px -17px;">
      <div style="text-align: center; font-weight: 700; font-size: 16px; margin-bottom: 8px; letter-spacing: 0.5px;">✨ Welcome to TEJAS! ✨</div>
      <div style="text-align: center; font-size: 13.5px; line-height: 1.5; color: #e6f2ff; opacity: 0.95;">I am your virtual assistant for <strong>JKBOTE</strong>, here to help navigate services and answer your questions.</div>
      <div style="text-align: right; font-size: 11.5px; opacity: 0.85; margin-top: 8px; font-weight: 500; color: #d1e3ff;">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
    </div>`
  },
  {role: 'ai', text: 'Welcome to the official J&K Board of Technical Education (JKBOTE) portal! How can I assist you with your queries today? Try asking about "latest notifications", "admission forms", or any general questions.'},
];

// Ensure the AI label inside chat bubbles is named "TEJAS"
chatElementRef.names = {
  default: {
    style: {
      fontSize: "12px",
      fontWeight: "600",
      color: "#6b7280"
    }
  },
  ai: { 
    text: "TEJAS",
    style: {
      fontSize: "13px",
      fontWeight: "600",
      color: "#003366",
      marginBottom: "2px"
    }
  }
};

// Dribbble-style UI configuration using JKBOTE colors
chatElementRef.textInput = {
  placeholder: {text: "Start typing..."},
  styles: {
    container: {
      backgroundColor: "#f4f7fa",
      borderRadius: "24px",
      border: "1px solid transparent",
      padding: "4px 14px",
      margin: "12px"
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
        width: "36px",
        height: "36px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "6px 5px 6px 0",
        boxShadow: "0 2px 8px rgba(0, 86, 179, 0.4)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease"
      },
      hover: {
        background: "linear-gradient(135deg, #004494, #002244)",
        transform: "scale(1.05)",
        boxShadow: "0 4px 12px rgba(0, 86, 179, 0.5)"
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
        fontSize: "14px",
        lineHeight: "1.5",
        padding: "12px 16px"
      }
    },
    user: {
      bubble: {
        background: "linear-gradient(135deg, #0056b3, #003366)",
        color: "#ffffff",
        border: "none",
        borderRadius: "18px 18px 4px 18px",
        boxShadow: "0 4px 10px rgba(0, 86, 179, 0.15)"
      }
    },
    ai: {
      bubble: {
        backgroundColor: "#f4f8ff",
        color: "#1a2c4d",
        border: "1px solid #dce8fc",
        boxShadow: "0 4px 15px rgba(0, 86, 179, 0.05)",
        borderRadius: "18px 18px 18px 4px"
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

// Widget Toggle Logic
const toggleBtn = document.getElementById('chat-toggle-btn');
const widgetContainer = document.getElementById('chat-widget-container');
const tooltip = document.getElementById('chat-tooltip');
let isOpen = false;

toggleBtn.addEventListener('click', () => {
  isOpen = !isOpen;
  if (isOpen) {
    widgetContainer.classList.add('show-widget');
    toggleBtn.innerHTML = '✕';
    toggleBtn.style.fontSize = '24px';
    // Hide tooltip entirely once interacted
    if (tooltip) tooltip.style.display = 'none';
  } else {
    widgetContainer.classList.remove('show-widget');
    toggleBtn.innerHTML = '💬';
    toggleBtn.style.fontSize = '28px';
  }
});
