import { useEffect } from "react";

type DrawerProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

const Drawer = ({ isOpen, title, onClose, children }: DrawerProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Lock body scroll when drawer is open
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="drawer-overlay" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      <div
        className="drawer-scrim"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="drawer-panel">
        <header className="drawer-header">
          <h2 id="drawer-title">{title}</h2>
          <button 
            type="button" 
            className="drawer-close" 
            onClick={onClose}
            aria-label="Close drawer"
          >
            ✕
          </button>
        </header>
        <div className="drawer-body">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
