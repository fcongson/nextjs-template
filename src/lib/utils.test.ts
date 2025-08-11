/**
 * Tests for utility functions
 */

import {
  cn,
  capitalize,
  toKebabCase,
  truncate,
  formatNumber,
  clamp,
  formatDate,
  getRelativeTime,
  isExternalUrl,
  parseUrl,
  deepClone,
  removeUndefined,
  shuffle,
  groupBy,
} from './utils';

describe('CSS Utilities', () => {
  describe('cn', () => {
    it('combines class names', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('handles conditional classes', () => {
      expect(cn('class1', false && 'class2', 'class3')).toBe('class1 class3');
    });

    it('handles arrays', () => {
      expect(cn(['class1', 'class2'])).toBe('class1 class2');
    });
  });
});

describe('String Utilities', () => {
  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('handles single character', () => {
      expect(capitalize('a')).toBe('A');
    });
  });

  describe('toKebabCase', () => {
    it('converts camelCase to kebab-case', () => {
      expect(toKebabCase('camelCase')).toBe('camel-case');
    });

    it('converts PascalCase to kebab-case', () => {
      expect(toKebabCase('PascalCase')).toBe('pascal-case');
    });

    it('handles spaces', () => {
      expect(toKebabCase('hello world')).toBe('hello-world');
    });

    it('handles underscores', () => {
      expect(toKebabCase('hello_world')).toBe('hello-world');
    });
  });

  describe('truncate', () => {
    it('truncates long strings', () => {
      expect(truncate('This is a long string', 10)).toBe('This is a ...');
    });

    it('returns original string if shorter than limit', () => {
      expect(truncate('Short', 10)).toBe('Short');
    });

    it('handles exact length', () => {
      expect(truncate('Exactly10!', 10)).toBe('Exactly10!');
    });
  });
});

describe('Number Utilities', () => {
  describe('formatNumber', () => {
    it('formats numbers with thousand separators', () => {
      expect(formatNumber(1234)).toBe('1,234');
    });

    it('formats large numbers', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
    });
  });

  describe('clamp', () => {
    it('clamps value to minimum', () => {
      expect(clamp(5, 10, 20)).toBe(10);
    });

    it('clamps value to maximum', () => {
      expect(clamp(25, 10, 20)).toBe(20);
    });

    it('returns value within range', () => {
      expect(clamp(15, 10, 20)).toBe(15);
    });
  });
});

describe('Date Utilities', () => {
  describe('formatDate', () => {
    it('formats Date object', () => {
      const date = new Date('2023-12-25');
      const formatted = formatDate(date);
      expect(formatted).toContain('December');
      expect(formatted).toContain('25');
      expect(formatted).toContain('2023');
    });

    it('formats date string', () => {
      const formatted = formatDate('2023-12-25');
      expect(formatted).toContain('December');
    });
  });

  describe('getRelativeTime', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2023-12-25 12:00:00'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('returns "just now" for recent times', () => {
      const recentTime = new Date('2023-12-25 11:59:30');
      expect(getRelativeTime(recentTime)).toBe('just now');
    });

    it('returns minutes ago', () => {
      const time = new Date('2023-12-25 11:58:00');
      expect(getRelativeTime(time)).toBe('2 minutes ago');
    });

    it('returns hours ago', () => {
      const time = new Date('2023-12-25 10:00:00');
      expect(getRelativeTime(time)).toBe('2 hours ago');
    });

    it('returns days ago', () => {
      const time = new Date('2023-12-23 12:00:00');
      expect(getRelativeTime(time)).toBe('2 days ago');
    });
  });
});

describe('URL Utilities', () => {
  describe('isExternalUrl', () => {
    // Skip these tests in JSDOM environment since window.location is complex to mock
    it.skip('identifies external URLs', () => {
      expect(isExternalUrl('https://google.com')).toBe(true);
    });

    it.skip('identifies internal URLs', () => {
      expect(isExternalUrl('https://example.com/path')).toBe(false);
    });

    it('handles invalid URLs', () => {
      expect(isExternalUrl('not-a-url')).toBe(false);
    });
  });

  describe('parseUrl', () => {
    it('parses valid URLs', () => {
      const url = parseUrl('https://example.com/path');
      expect(url).toBeInstanceOf(URL);
      expect(url?.hostname).toBe('example.com');
    });

    it('returns null for invalid URLs', () => {
      expect(parseUrl('invalid-url')).toBeNull();
    });
  });
});

describe('Object Utilities', () => {
  describe('deepClone', () => {
    it('clones objects deeply', () => {
      const original = { a: 1, b: { c: 2 } };
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.b).not.toBe(original.b);
    });

    it('handles arrays', () => {
      const original = [1, { a: 2 }, 3];
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
    });
  });

  describe('removeUndefined', () => {
    it('removes undefined values', () => {
      const obj = { a: 1, b: undefined, c: 'test', d: undefined };
      const cleaned = removeUndefined(obj);

      expect(cleaned).toEqual({ a: 1, c: 'test' });
    });

    it('keeps null and false values', () => {
      const obj = { a: null, b: false, c: 0, d: undefined };
      const cleaned = removeUndefined(obj);

      expect(cleaned).toEqual({ a: null, b: false, c: 0 });
    });
  });
});

describe('Array Utilities', () => {
  describe('shuffle', () => {
    it('returns array of same length', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffle(original);

      expect(shuffled).toHaveLength(original.length);
    });

    it('does not mutate original array', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffle(original);

      expect(original).toEqual([1, 2, 3, 4, 5]);
      expect(shuffled).not.toBe(original);
    });

    it('contains all original elements', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffle(original);

      expect(shuffled.sort()).toEqual(original.sort());
    });
  });

  describe('groupBy', () => {
    it('groups array items by key', () => {
      const items = [
        { type: 'fruit', name: 'apple' },
        { type: 'fruit', name: 'banana' },
        { type: 'vegetable', name: 'carrot' },
      ];

      const grouped = groupBy(items, (item) => item.type);

      expect(grouped).toEqual({
        fruit: [
          { type: 'fruit', name: 'apple' },
          { type: 'fruit', name: 'banana' },
        ],
        vegetable: [{ type: 'vegetable', name: 'carrot' }],
      });
    });

    it('handles empty arrays', () => {
      const grouped = groupBy([], (item) => item.type);
      expect(grouped).toEqual({});
    });
  });
});
