/**
 * Type definitions for HTML truncate functionality
 */

export interface TruncateOptions {
  keepImageTag?: boolean;
  truncateLastWord?: boolean;
  slop?: number;
  ellipsis?: boolean | string;
}
