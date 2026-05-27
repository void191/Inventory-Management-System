import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

function Dropdown({ label, options, value, onChange, placeholder = 'Select option' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const rootRef = useRef(null);
  const closeTimerRef = useRef(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value],
  );

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        closeDropdown();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeDropdown();
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, [isOpen]);

  const openDropdown = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    setIsClosing(false);
    setIsOpen(true);
  };

  const closeDropdown = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 120);
  };

  return (
    <div className="dropdown-field">
      {label && <span className="eyebrow">{label}</span>}
      <div className="dropdown" ref={rootRef}>
        <button
          type="button"
          className={`dropdown__trigger ${isOpen && !isClosing ? 'is-open' : ''}`}
          onClick={() => {
            if (isOpen && !isClosing) {
              closeDropdown();
            } else {
              openDropdown();
            }
          }}
          aria-haspopup="listbox"
          aria-expanded={isOpen && !isClosing}
        >
          <span>{selectedOption?.label ?? placeholder}</span>
          <ChevronDown size={16} className="dropdown__chevron" />
        </button>

        {(isOpen || isClosing) && (
          <div className={`dropdown__panel ${isClosing ? 'is-closing' : 'is-open'}`} role="listbox">
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                className={`dropdown__option ${option.value === value ? 'is-selected' : ''}`}
                style={{ animationDelay: `${index * 20}ms` }}
                onClick={() => {
                  onChange(option.value);
                  closeDropdown();
                }}
              >
                <span>{option.label}</span>
                {option.value === value && <Check size={14} />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
