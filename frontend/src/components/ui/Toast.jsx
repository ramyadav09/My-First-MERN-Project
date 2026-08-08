import { useState, useCallback, createContext, useContext, ReactNode } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";

const ToastContext = createContext(null);

const toastIcons = {
  success: <FaCheckCircle className="text-green-400" />,
  error: <FaExclamationCircle className="text-red-400" />,
  warning: <FaExclamationTriangle className="text-yellow-400" />,
  info: <FaInfoCircle className="text-blue-400" />,
};

const toastStyles = {
  success: "border-green-500/30 bg-green-500/10",
  error: "border-red-500/30 bg-red-500/10",
  warning: "border-yellow-500/30 bg-yellow-500/10",
  info: "border-blue-500/30 bg-blue-500/10",
};

const Toast = ({ toast, onClose }) => {
  return (
    <div
      className={`
        flex items-start gap-3 p-4 backdrop-blur-xl border rounded-xl shadow-2xl
        animate-slide-in ${toastStyles[toast.type]}
        ${toast.removing ? "animate-fade-out" : ""}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex-shrink-0 mt-0.5">{toastIcons[toast.type]}</div>
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="text-white font-semibold text-sm">{toast.title}</p>
        )}
        {toast.message && (
          <p className="text-white/80 text-sm mt-0.5">{toast.message}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Dismiss"
      >
        <FaTimes className="w-4 h-4" />
      </button>
    </div>
  );
};

const ToastContainer = ({ position = "top-right", maxToasts = 5 }) => {
  const { toasts, removeToast } = useContext(ToastContext);

  if (!toasts.length) return null;

  const positions = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  const visibleToasts = toasts.slice(-maxToasts);

  return (
    <div
      className={`
        fixed z-[100] flex flex-col gap-2 pointer-events-none
        ${positions[position]}
      `}
      aria-live="polite"
      aria-atomic="true"
    >
      {visibleToasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full max-w-sm">
          <Toast toast={toast} onClose={() => removeToast(toast.id)} />
        </div>
      ))}
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: "info",
      title: "",
      message: "",
      duration: 5000,
      ...toast,
    };
    setToasts((prev) => [...prev, newToast]);

    if (newToast.duration > 0) {
      setTimeout(() => removeToast(id), newToast.duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, removing: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 200);
  }, []);

  const toast = useCallback(
    (message, options = {}) => {
      return addToast({ message, ...options });
    },
    [addToast]
  );

  toast.success = (message, options) => addToast({ type: "success", message, ...options });
  toast.error = (message, options) => addToast({ type: "error", message, ...options });
  toast.warning = (message, options) => addToast({ type: "warning", message, ...options });
  toast.info = (message, options) => addToast({ type: "info", message, ...options });

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, toast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context.toast;
};

export default Toast;