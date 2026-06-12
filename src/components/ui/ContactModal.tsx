import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { cn } from '../../lib/utils';
import { Button } from './Button';

type FormState = 'idle' | 'sending' | 'success' | 'error';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    try {
      await emailjs.send(
        'service_mh9p4wq',
        'template_cxamiqk',
        { from_name: name, from_email: email, message },
        '_X_pfUtSA5pcxGYW9'
      );
      await new Promise((resolve) => setTimeout(resolve, 1200)); // placeholder
      setFormState('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setFormState('error');
    }
  };

  const inputBase =
    'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-shadow';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-[var(--color-accent)]" />
                <h2 id="contact-modal-title" className="font-display text-lg font-semibold text-[var(--color-text)]">
                  Send a message
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="rounded-md p-1 text-[var(--color-muted)] hover:text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-3 py-8 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent-tint)]">
                  <Send size={20} className="text-[var(--color-accent)]" />
                </div>
                <p className="font-semibold text-[var(--color-text)]">Message sent!</p>
                <p className="text-sm text-[var(--color-muted)]">
                  {"I'll get back to you as soon as I can."}
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 text-sm text-[var(--color-accent)] underline underline-offset-4 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] rounded"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-wide">
                    Name
                  </label>
                  <input
                    ref={firstInputRef}
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputBase}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputBase}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="What's on your mind?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={cn(inputBase, 'resize-none')}
                  />
                </div>

                {formState === 'error' && (
                  <p className="text-sm text-red-500">
                    Something went wrong. Please try again.
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  disabled={formState === 'sending'}
                  className="mt-1 w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send size={15} />
                  {formState === 'sending' ? 'Sending…' : 'Send message'}
                </Button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
