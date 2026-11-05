import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';

import { buttonTypes, tokenOutputs } from '@/pages/snippets.generated';

import { HighlightedCode } from './Article';

describe('HighlightedCode', () => {
  it('keeps the exact text, line breaks and indentation', () => {
    const { container } = render(
      <pre>
        <code>
          <HighlightedCode
            lines={[
              [
                ['type', '#f00'],
                [' A = {', '#fff'],
              ],
              [
                ['  a', '#0f0'],
                [': 1;', '#fff'],
              ],
              [['}', '#fff']],
            ]}
          />
        </code>
      </pre>,
    );

    expect(container.querySelector('code')?.textContent).toBe(
      'type A = {\n  a: 1;\n}',
    );
  });

  it('colours each token', () => {
    const { container } = render(
      <HighlightedCode lines={[[['const', '#ff7b72']]]} />,
    );

    expect(container.querySelector('span')).toHaveStyle({ color: '#ff7b72' });
  });

  it('holds the real snippets from FitMySpace', () => {
    const text = (lines: typeof buttonTypes): string =>
      lines.map((line) => line.map(([part]) => part).join('')).join('\n');

    expect(text(buttonTypes)).toContain("'aria-label': string;");
    expect(text(tokenOutputs)).toContain('--ds-color-sage-700: #335f3f;');
  });
});
