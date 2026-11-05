import React, { useEffect, useRef, useState } from 'react';

import { Check, Copy } from 'lucide-react';

import { cn } from '@/lib/cn';

const CONFIRMATION_MS = 2000;

/** Inline text that copies itself on click, e.g. an email address in a sentence */
export function CopyText({ text }: { text: string }): React.JSX.Element {
  const [copied, setCopied] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }
    const timeout = window.setTimeout(() => setCopied(false), CONFIRMATION_MS);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  /** Without clipboard access, select the text so Ctrl+C still works */
  function selectText(): void {
    const selection = window.getSelection();
    if (textRef.current && selection) {
      selection.selectAllChildren(textRef.current);
    }
  }

  async function copy(): Promise<void> {
    try {
      await window.navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      selectText();
    }
  }

  const Icon = copied ? Check : Copy;

  return (
    <>
      <button
        type="button"
        onClick={() => void copy()}
        className={cn(
          // max-w-full and overflow-wrap let a long address wrap on a phone
          'inline-flex max-w-full items-center gap-1.5 rounded-sm cursor-pointer',
          'font-medium link-underline focus-ring',
        )}
      >
        <span
          ref={textRef}
          className="min-w-0 select-text [overflow-wrap:anywhere]"
        >
          {text}
        </span>
        <span className="sr-only"> (copy to clipboard)</span>
        <Icon size={16} aria-hidden="true" className="shrink-0" />
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </>
  );
}
