import { useState, useRef, useEffect } from 'react';

type MsgFrom = 'bot' | 'user';
interface Message { text: string; from: MsgFrom; }

const BOT_RESPONSES = [
  'Para soporte técnico llamá al 123-456.',
  'Todos nuestros productos tienen garantía de 2 años.',
  'Visitá nuestro catálogo para ver todos los productos.',
  'Podés contactarnos por WhatsApp o email.',
  'Hacemos envíos a todo el país.',
];

const QUICK_REPLIES = ['Garantía', 'Envíos', 'Soporte técnico', 'Precios'];

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { text: '¡Hola! Soy el asistente de ElectroTaus. ¿En qué puedo ayudarte hoy?', from: 'bot' },
  ]);
  const [input, setInput]   = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text?: string) => {
    const msg = text ?? input.trim();
    if (!msg) return;

    setMessages((prev) => [...prev, { text: msg, from: 'user' }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
      setTyping(false);
      setMessages((prev) => [...prev, { text: response, from: 'bot' }]);
    }, 1200);
  };

  return (
    <section className="section">
      <div className="container">

        {/* Título */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            Soporte al Cliente
          </h2>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text)' }}>
            Respondemos al instante. Horario: Lun–Vie 9–18 hs.
          </p>
        </div>

        {/* Chatbot */}
        <div className="chatbot">

          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-avatar">⚡</div>
            <div className="chat-header-info">
              <div className="chat-header-name">ElectroTaus Bot</div>
              <div className="chat-header-status">
                <span className="chat-status-dot" />
                En línea
              </div>
            </div>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-dim)', border: '1px solid var(--border)', padding: '0.2rem 0.55rem', borderRadius: 2 }}>
              Chat
            </span>
          </div>

          {/* Mensajes */}
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble-wrap${msg.from === 'user' ? ' user' : ''}`}>
                <div className={`chat-avatar ${msg.from}`}>
                  {msg.from === 'bot' ? '⚡' : 'Tú'}
                </div>
                <div className={`chat-bubble ${msg.from}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="chat-bubble-wrap">
                <div className="chat-avatar bot">⚡</div>
                <div className="typing-indicator">
                  <span /><span /><span />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div className="quick-replies">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                className="quick-reply"
                onClick={() => sendMessage(q)}
                disabled={typing}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Escribe tu mensaje..."
              disabled={typing}
            />
            <button
              className="btn"
              onClick={() => sendMessage()}
              disabled={typing || !input.trim()}
              style={{ opacity: typing || !input.trim() ? 0.5 : 1 }}
            >
              Enviar
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}