// Constants
export const EMPTY_OBJECT = {};
export const EMPTY_STRING = '';
export const DEFAULT_TRUNCATE_SYMBOL = '...';
export const EXCLUDE_TAGS = ['img', 'br']; // non-closed tags

// Regular expressions for parsing HTML tags
export const KEY_VALUE_REGEX = '([\\w|-]+\\s*=\\s*"[^"]*"\\s*)*';
export const IS_CLOSE_REGEX = '\\s*\\/?\\s*';
export const CLOSE_REGEX = '\\s*\\/\\s*';
export const SELF_CLOSE_REGEX = new RegExp(
  '<\\/?\\w+\\s*' + KEY_VALUE_REGEX + CLOSE_REGEX + '>'
);
export const HTML_TAG_REGEX = new RegExp(
  '<\\/?\\w+\\s*' + KEY_VALUE_REGEX + IS_CLOSE_REGEX + '>'
);
export const URL_REGEX =
  /(((ftp|https?):\/\/)[-\w@:%_+.~#?,&//=]+)|((mailto:)?[_.\w-]+@([\w][\w-]+\.)+[a-zA-Z]{2,3})/g; // Simple regexp
export const IMAGE_TAG_REGEX = new RegExp(
  '<img\\s*' + KEY_VALUE_REGEX + IS_CLOSE_REGEX + '>'
);
export const WORD_BREAK_REGEX = new RegExp('\\W+', 'g');
