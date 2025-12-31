import React, { useEffect } from "react";

interface ConfirmProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    content: React.ReactNode;
    onConfirm?: () => void;
}

const Confirm = ({ isOpen, setOpen, content, onConfirm }:ConfirmProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="absolute inset-0" onClick={() => setOpen(false)} />
            
            <div 
                className="bg-card text-card-foreground border border-border w-full max-w-md rounded-xl shadow-lg p-6 space-y-6 relative z-10 animate-in zoom-in-95 duration-200"
                role="dialog"
                aria-modal="true"
            >
                <div className="text-base font-medium leading-relaxed">
                    {content}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        onClick={() => setOpen(false)}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-transparent shadow-sm"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={() => {
                            if (onConfirm) onConfirm();
                            setOpen(false);
                        }}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;