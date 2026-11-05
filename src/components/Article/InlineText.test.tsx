import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';

import { InlineText } from './Article';

describe('InlineText', () => {
  it('renders backticked spans as code and keeps the rest as text', () => {
    const { container } = render(
      <p>
        <InlineText text="Keep `var()` and `var()` references" />
      </p>,
    );

    const codes = container.querySelectorAll('code');
    expect(codes).toHaveLength(2);
    expect(codes[0]).toHaveTextContent('var()');
    expect(container).toHaveTextContent('Keep var() and var() references');
  });

  it('leaves text without backticks unchanged', () => {
    const { container } = render(<InlineText text="Plain text" />);

    expect(container.querySelector('code')).toBeNull();
    expect(container).toHaveTextContent('Plain text');
  });
});
