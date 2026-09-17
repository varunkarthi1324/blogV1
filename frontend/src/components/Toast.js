import React, { useEffect } from "react";

const Toast = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return undefined;

    const timeoutId = window.setTimeout(onDismiss, 3500);
    return () => window.clearTimeout(timeoutId);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div
      className={`toast toast-${toast.type}`}
      role="status"
      aria-live="polite"
    >
      <span className="toast-icon" aria-hidden="true">
        {toast.type === "success" ? "OK" : "!"}
      </span>
      <span>{toast.message}</span>
      <button
        type="button"
        className="toast-close"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        x
      </button>
    </div>
  );
};

export default Toast;
