import Tag from '@components/Tag/Tag';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('Tag', () => {
  it('renders with name prop', () => {
    render(<Tag name="React" index={0} />);

    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('cycles through color options based on index', () => {
    const { rerender } = render(<Tag name="React" index={0} />);
    const firstTag = screen.getByText('React');
    const firstClass = firstTag.className;

    // Index 1 should have different color
    rerender(<Tag name="TypeScript" index={1} />);
    const secondTag = screen.getByText('TypeScript');
    const secondClass = secondTag.className;
    expect(secondClass).not.toBe(firstClass);

    // Index 2 should have different color
    rerender(<Tag name="JavaScript" index={2} />);
    const thirdTag = screen.getByText('JavaScript');
    const thirdClass = thirdTag.className;
    expect(thirdClass).not.toBe(firstClass);
    expect(thirdClass).not.toBe(secondClass);
  });

  it('wraps around color options when index exceeds available colors', () => {
    // There are 5 color options, so index 5 should cycle back to index 0
    const { rerender } = render(<Tag name="React" index={0} />);
    const firstTag = screen.getByText('React');
    const firstClass = firstTag.className;

    rerender(<Tag name="Vue" index={5} />);
    const wrappedTag = screen.getByText('Vue');
    const wrappedClass = wrappedTag.className;
    expect(wrappedClass).toBe(firstClass);
  });

  it('applies correct color classes for each index', () => {
    const colorOptions = [
      'bg-blue-50 text-blue-200',
      'bg-warm-400 text-blue-200',
      'bg-warm-200 text-blue-200',
      'bg-green text-blue-200',
      'bg-purple text-blue-200',
    ];

    colorOptions.forEach((colorClass, index) => {
      const { container } = render(
        <Tag name={`Skill${index}`} index={index} />,
      );
      const tag = container.querySelector('span');
      expect(tag?.className).toContain(colorClass.split(' ')[0]);
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Tag name="React" index={0} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
