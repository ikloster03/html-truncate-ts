import { truncate } from './truncate';

describe('truncate', () => {
  test('should truncate simple text', () => {
    const result = truncate('Hello world', 5);
    expect(result).toBe('Hello...');
  });

  test('should preserve HTML tags', () => {
    const html = '<p>Hello <strong>world</strong></p>';
    const result = truncate(html, 10);
    expect(result).toContain('<p>');
    expect(result).toContain('</p>');
  });

  test('should handle keepImageTag option', () => {
    const html = '<p>Hello <img src="test.jpg" alt="test"> world</p>';
    const resultWithImage = truncate(html, 50, { keepImageTag: true });
    const resultWithoutImage = truncate(html, 50, { keepImageTag: false });

    expect(resultWithImage).toContain('<img');
    expect(resultWithoutImage).not.toContain('<img');
  });

  test('should handle custom ellipsis', () => {
    const result = truncate('Hello world', 5, { ellipsis: '---' });
    expect(result).toBe('Hello---');
  });

  test('should handle no ellipsis', () => {
    const result = truncate('Hello world', 5, { ellipsis: false });
    expect(result).toBe('Hello');
  });

  test('should handle truncateLastWord option', () => {
    const result1 = truncate('Hello world test', 10, {
      truncateLastWord: true,
    });
    const result2 = truncate('Hello world test', 10, {
      truncateLastWord: false,
    });

    expect(result1).toBe('Hello worl...');
    expect(result2).toBe('Hello world...');
  });

  test('should return original string if shorter than maxLength', () => {
    const text = 'Short';
    const result = truncate(text, 10);
    expect(result).toBe(text);
  });

  test('should handle empty string', () => {
    const result = truncate('', 10);
    expect(result).toBe('');
  });

  test('should handle complex HTML', () => {
    const html =
      '<div><p>This is a <strong>complex</strong> HTML <em>example</em> with multiple tags</p></div>';
    const result = truncate(html, 30);
    expect(result).toContain('<div>');
    expect(result).toContain('</div>');
    expect(result).toContain('<p>');
    expect(result).toContain('</p>');
  });
});
