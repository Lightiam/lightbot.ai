import * as React from "react"
import { Toast, ToastTitle, ToastDescription, ToastProvider, ToastViewport } from "./toast"

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = React.useState<(ToastProps & { id: string })[]>([])

  const toast = React.useCallback((props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prevToasts) => [...prevToasts, { ...props, id }])

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
    }, props.duration ?? 3000)
  }, [])

  const Toaster: React.FC = React.memo(() => {
    return React.createElement(ToastProvider, null,
      toasts.map((t) => 
        React.createElement(Toast, { key: t.id, variant: t.variant },
          t.title && React.createElement(ToastTitle, null, t.title),
          t.description && React.createElement(ToastDescription, null, t.description)
        )
      ),
      React.createElement(ToastViewport)
    )
  })
  Toaster.displayName = "Toaster"

  return {
    toast,
    Toaster
  }
}
