'use client';

import { useEffect, useRef } from 'react';

interface ScriptInjectorProps {
  scripts: Array<{ body: string }> | null | undefined;
  target?: 'head' | 'body';
}

/**
 * Client component to inject scripts into DOM
 * This is necessary because dangerouslySetInnerHTML doesn't execute scripts
 * Scripts are injected into the specified target (head or body)
 */
export default function ScriptInjector({
  scripts,
  target = 'head',
}: ScriptInjectorProps) {
  const scriptsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!scripts || scripts.length === 0) return;

    const injectedScripts: HTMLScriptElement[] = [];

    // Helper function to extract JavaScript code from script tags or return as-is
    const extractScriptContent = (scriptText: string): string => {
      if (!scriptText) return '';

      // Remove leading/trailing whitespace
      const trimmed = scriptText.trim();

      // Check if script text contains HTML script tags (with or without attributes)
      // Handle multiple patterns:
      // 1. <script>...</script>
      // 2. <script type="text/javascript">...</script>
      // 3. Just JavaScript code without tags

      // First, try to match script tags
      const scriptTagPattern = /<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/gi;
      let match;
      const extracted: string[] = [];

      // Reset regex lastIndex
      scriptTagPattern.lastIndex = 0;

      while ((match = scriptTagPattern.exec(trimmed)) !== null) {
        if (match[1]) {
          extracted.push(match[1].trim());
        }
      }

      // If we found script tags, return extracted content
      if (extracted.length > 0) {
        return extracted.join('\n');
      }

      // If no script tags found, check if it's valid JavaScript
      // Remove any HTML comments or other HTML tags that might be in the string
      const cleaned = trimmed
        .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
        .replace(/<\/?[^>]+(>|$)/g, '') // Remove any remaining HTML tags
        .trim();

      // Return cleaned content (pure JavaScript)
      return cleaned || trimmed;
    };

    // Create and inject each script
    scripts.forEach((scriptObj, index) => {
      const rawScriptText = scriptObj.body;
      if (!rawScriptText) return;

      // Extract JavaScript code (remove script tags if present)
      const scriptContent = extractScriptContent(rawScriptText);

      if (!scriptContent) return;

      // Create unique ID for this script
      const scriptId = `injected-script-${index}-${Date.now()}`;

      // Skip if already injected
      if (scriptsRef.current.has(scriptId)) return;

      try {
        // Create script element
        const script = document.createElement('script');
        script.id = scriptId;
        script.textContent = scriptContent; // Use extracted content
        script.async = false; // Execute in order

        // Append to specified target
        const targetElement = target === 'head' ? document.head : document.body;
        targetElement.appendChild(script);

        // Track injected script
        scriptsRef.current.add(scriptId);
        injectedScripts.push(script);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error injecting script:', error);
      }
    });

    // Cleanup function to remove scripts on unmount
    return () => {
      injectedScripts.forEach(script => {
        if (script && script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
      scriptsRef.current.clear();
    };
  }, [scripts, target]);

  // This component doesn't render anything
  return null;
}
