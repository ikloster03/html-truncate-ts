/**
 * Helper functions for HTML truncation
 */

import { TruncateOptions } from './truncate.types';
import {
  EXCLUDE_TAGS,
  IMAGE_TAG_REGEX,
  WORD_BREAK_REGEX,
} from './truncate.const';

/**
 * Remove image tag
 *
 * @private
 * @method removeImageTag
 * @param {String} string not-yet-processed string
 * @return {String} string without image tags
 */
export const removeImageTag = (string: string): string => {
  const match = IMAGE_TAG_REGEX.exec(string);
  let index: number, len: number;

  if (!match) {
    return string;
  }

  index = match.index;
  len = match[0].length;

  return string.substring(0, index) + string.substring(index + len);
};

/**
 * Dump all close tags and append to truncated content while reaching upperbound
 *
 * @private
 * @method dumpCloseTag
 * @param {String[]} tags a list of tags which should be closed
 * @return {String} well-formatted html
 */
export const dumpCloseTag = (tags: string[]): string => {
  let html = '';

  tags.reverse().forEach((tag: string) => {
    // dump non-excluded tags only
    if (-1 === EXCLUDE_TAGS.indexOf(tag)) {
      html += '</' + tag + '>';
    }
  });

  return html;
};

/**
 * Process tag string to get pure tag name
 *
 * @private
 * @method getTag
 * @param {String} string original html
 * @return {String} tag name
 */
export const getTag = (string: string): string => {
  let tail = string.indexOf(' ');

  // TODO:
  // we have to figure out how to handle non-well-formatted HTML case
  if (-1 === tail) {
    tail = string.indexOf('>');
    if (-1 === tail) {
      throw new Error('HTML tag is not well-formed : ' + string);
    }
  }

  return string.substring(1, tail);
};

/**
 * Get the end position for String#substring()
 *
 * If options.truncateLastWord is FALSE, we try to the end position up to
 * options.slop characters to avoid breaking in the middle of a word.
 *
 * @private
 * @method _getEndPosition
 * @param {String} string original html
 * @param {Number} maxLength
 * @param {Number} total
 * @param {Number} tailPos (optional) provided to avoid extending the slop into trailing HTML tag
 * @return {Number} maxLength
 */
export const getEndPosition = (
  string: string,
  maxLength: number,
  total: number,
  tailPos?: number,
  options?: TruncateOptions
): number => {
  const DEFAULT_SLOP = 10 > maxLength ? maxLength : 10;
  const { truncateLastWord, slop } = options || {};

  const defaultPos = maxLength - total;
  const isShort = defaultPos < (slop || DEFAULT_SLOP);
  const slopPos = isShort ? defaultPos : (slop || DEFAULT_SLOP) - 1;
  const startSlice = isShort ? 0 : defaultPos - (slop || DEFAULT_SLOP);
  const endSlice = tailPos || defaultPos + (slop || DEFAULT_SLOP);

  let position = defaultPos,
    substr: string,
    result: RegExpExecArray | null;

  if (!truncateLastWord) {
    substr = string.slice(startSlice, endSlice);

    if (tailPos && substr.length <= tailPos) {
      position = substr.length;
    } else {
      while ((result = WORD_BREAK_REGEX.exec(substr)) !== null) {
        // a natural break position before the hard break position
        if (result.index < slopPos) {
          position = defaultPos - (slopPos - result.index);
          // keep seeking closer to the hard break position
          // unless a natural break is at position 0
          if (result.index === 0 && defaultPos <= 1) break;
        }
        // a natural break position exactly at the hard break position
        else if (result.index === slopPos) {
          position = defaultPos;
          break; // seek no more
        }
        // a natural break position after the hard break position
        else {
          position = defaultPos + (result.index - slopPos);
          break; // seek no more
        }
      }
    }
    if (string.charAt(position - 1).match(/\s$/)) position--;
  }
  return position;
};
