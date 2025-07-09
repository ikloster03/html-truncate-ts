import { TruncateOptions } from './truncate.types';
import {
  removeImageTag,
  dumpCloseTag,
  getTag,
  getEndPosition,
} from './truncate.helpers';
import {
  EMPTY_OBJECT,
  EMPTY_STRING,
  DEFAULT_TRUNCATE_SYMBOL,
  HTML_TAG_REGEX,
  URL_REGEX,
  SELF_CLOSE_REGEX,
} from './truncate.const';

/**
 * Truncate HTML string and keep tag safe.
 *
 * @method truncate
 * @param {String} string string needs to be truncated
 * @param {Number} maxLength length of truncated string
 * @param {Object} options (optional)
 * @param {Boolean} [options.keepImageTag] flag to specify if keep image tag, false by default
 * @param {Boolean} [options.truncateLastWord] truncates last word, true by default
 * @param {Number} [options.slop] tolerance when options.truncateLastWord is false before we give up and just truncate at the maxLength position, 10 by default (but not greater than maxLength)
 * @param {Boolean|String} [options.ellipsis] omission symbol for truncated string, '...' by default
 * @return {String} truncated string
 */
export const truncate = (
  string: string,
  maxLength: number,
  options?: TruncateOptions
): string => {
  // Constants
  const DEFAULT_SLOP = 10 > maxLength ? maxLength : 10;
  const items: string[] = []; // stack for saving tags

  // Variables
  let total = 0; // record how many characters we traced so far
  let content = EMPTY_STRING; // truncated text storage
  let matches: RegExpExecArray | null;
  let result: string;
  let index: number;
  let tag: string;
  let selfClose: RegExpExecArray | null;

  options = options || EMPTY_OBJECT;
  options.ellipsis =
    undefined !== options.ellipsis ? options.ellipsis : DEFAULT_TRUNCATE_SYMBOL;
  options.truncateLastWord =
    undefined !== options.truncateLastWord ? options.truncateLastWord : true;
  options.slop = undefined !== options.slop ? options.slop : DEFAULT_SLOP;

  while ((matches = HTML_TAG_REGEX.exec(string))) {
    result = matches[0];
    index = matches.index;

    if (total + index > maxLength) {
      // exceed given `maxLength`, dump everything to clear stack
      content += string.substring(
        0,
        getEndPosition(string, maxLength, total, index, options)
      );
      break;
    } else {
      total += index;
      content += string.substring(0, index);
    }

    if ('/' === result[1]) {
      // move out open tag
      items.pop();
      selfClose = null;
    } else {
      selfClose = SELF_CLOSE_REGEX.exec(result);
      if (!selfClose) {
        tag = getTag(result);
        items.push(tag);
      }
    }

    if (selfClose) {
      content += selfClose[0];
    } else {
      content += result;
    }
    string = string.substring(index + result.length);
  }

  // No HTML tags found, process URLs
  if (total >= maxLength) {
    // Already reached max length
  } else {
    matches = URL_REGEX.exec(string);
    if (!matches || matches.index >= maxLength) {
      content += string.substring(
        0,
        getEndPosition(string, maxLength, total, undefined, options)
      );
    } else {
      while (matches) {
        result = matches[0];
        index = matches.index;
        content += string.substring(0, index + result.length - total);
        string = string.substring(index + result.length);
        matches = URL_REGEX.exec(string);
      }
    }
  }

  if (string.length > maxLength - total && options.ellipsis) {
    content += options.ellipsis;
  }
  content += dumpCloseTag(items);

  if (!options.keepImageTag) {
    content = removeImageTag(content);
  }

  return content;
};
