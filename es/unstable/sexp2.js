// TODO: Improvements
// -----------------
// * Better error messages.

// Errors
// ------
// * Unterminated string,
// * Unexpected closing delimiter,
// * Delimiter mismatch,
// * Unclosed delimiter.

export const TOKEN_TYPE_WHITESPACE = 2;
export const TOKEN_TYPE_WORD = 3;
export const TOKEN_TYPE_BRACKET_OPEN = 4;
export const TOKEN_TYPE_BRACKET_CLOSE = 5;
export const TOKEN_TYPE_STRING = 6;
export const TOKEN_TYPE_COMMENT = 7;

const STATE_UNDETERMINED = 1;
const STATE_WHITESPACE = 2;
const STATE_COMMENT = 3;
const STATE_STRING = 4;
const STATE_WORD = 5;

// Regular expression to match against whitespace characters.
//
// TODO: match against multiple whitespace characters.
// TODO: match against whitespaces characters and strings.
const REGEX_WS = /\s/;

/**
 *
 * @param {string} c
 */
function isWhitespace(c) {
  return c.match(REGEX_WS) !== null;
}

export class Token {
  /**
   *
   * @param {TOKEN_TYPE_WHITESPACE|TOKEN_TYPE_WORD|TOKEN_TYPE_BRACKET_OPEN|TOKEN_TYPE_BRACKET_CLOSE|TOKEN_TYPE_STRING|TOKEN_TYPE_COMMENT} type
   * @param {number} fromPosition
   * @param {number} toPosition
   * @param {number} fromRow
   * @param {number} toRow
   * @param {number} fromColumn
   * @param {number} toColumn
   */
  constructor(
    type,
    fromPosition,
    toPosition,
    fromRow,
    fromColumn,
    toRow,
    toColumn
  ) {
    this.type = type;

    this.fromPosition = fromPosition;
    this.toPosition = toPosition;

    this.fromRow = fromRow;
    this.fromColumn = fromColumn;

    this.toRow = toRow;
    this.toColumn = toColumn;

    this.lexeme = undefined;
  }

  /**
   *
   * @param {undefined|string} code
   *
   * @throws
   */
  getLexeme(code) {
    if (code !== undefined) {
      this.lexeme = code.substring(this.fromPosition, this.toPosition);
      return this.lexeme;
    }

    if (this.lexeme === undefined) {
      throw new Error("Lexeme undefined.");
    }

    return this.lexeme;
  }
}

/**
 *
 * @param {string} code
 * @param {boolean} includeComments
 * @param {boolean} includeWhitespace
 *
 * @throws
 */
export function tokenize(code) {
  const codeLength = code.length;

  /** @type {Token[]} */
  const tokens = [];

  let tokenType = PARSE_NODE_TYPE_WHITESPACE;
  let tokenIndex = 0;
  let tokenLength = 0;

  let state = STATE_UNDETERMINED;

  let pc = ""; // Previous character

  let rowIndex = 0;
  let columnIndex = 0;

  // Walk through loop.
  codeLoop: for (let codeIndex = 0; codeIndex < codeLength; codeIndex += 1) {
    const c = code[codeIndex]; // Current character

    // Decide and take action based off of character.
    decisionLoop: while (true) {
      if (state === STATE_UNDETERMINED) {
        if (isWhitespace(c)) {
          pc = c;

          tokenType = TOKEN_TYPE_WHITESPACE;
          tokenIndex = codeIndex;
          tokenLength = 1;

          state = STATE_WHITESPACE;

          continue codeLoop;
        } else if (c === "(") {
          pc = c;

          tokenType = TOKEN_TYPE_BRACKET_OPEN;
          tokenIndex = codeIndex;
          tokenLength = 1;

          tokens.push(code.substring(tokenIndex, tokenIndex + tokenLength));

          continue codeLoop;
        } else if (c === ")") {
          pc = c;

          tokenType = TOKEN_TYPE_BRACKET_CLOSE;
          tokenIndex = codeIndex;
          tokenLength = 1;

          tokens.push(code.substring(tokenIndex, tokenIndex + tokenLength));

          continue codeLoop;
        } else if (c === '"') {
          pc = c;

          tokenType = TOKEN_TYPE_STRING;
          tokenIndex = codeIndex;
          tokenLength = 1;

          state = STATE_STRING;

          continue codeLoop;
        } else if (c === ";") {
          pc = c;

          tokenType = TOKEN_TYPE_COMMENT;
          tokenIndex = codeIndex;
          tokenLength = 1;

          state = STATE_COMMENT;

          continue codeLoop;
        } else {
          pc = c;

          tokenType = TOKEN_TYPE_WORD;
          tokenIndex = codeIndex;
          tokenLength = 1;

          state = STATE_WORD;

          continue codeLoop;
        }
      } else if (state === STATE_WHITESPACE) {
        if (isWhitespace(c)) {
          tokenLength += 1;

          continue codeLoop;
        } else {
          state = STATE_UNDETERMINED;

          continue decisionLoop;
        }
      } else if (state === STATE_COMMENT) {
        if (c === "\n") {
          state = STATE_UNDETERMINED;

          continue decisionLoop;
        } else {
          tokenLength += 1;

          continue codeLoop;
        }
      } else if (state === STATE_STRING) {
        tokenLength += 1;

        if (c === '"' && pc !== "\\") {
          tokens.push(code.substring(tokenIndex, tokenIndex + tokenLength));
          state = STATE_UNDETERMINED;
        } else {
          pc = c;
        }

        continue codeLoop;
      } else if (state === STATE_WORD) {
        if (
          isWhitespace(c) ||
          c === "(" ||
          c === ")" ||
          c === '"' ||
          c === ";"
        ) {
          tokens.push(code.substring(tokenIndex, tokenIndex + tokenLength));

          state = STATE_UNDETERMINED;

          continue decisionLoop;
        } else {
          parseNodeLength += 1;
          continue codeLoop;
        }
      }
    }
  }

  // TODO: add more state checks

  if (state === STATE_STRING) {
    // Unterminated string.
    throw new Error("Unterminated string.");
  } else if (state === STATE_WORD) {
    tokens.push(code.substring(tokenIndex, tokenIndex + tokenLength));
  }

  return tokens;
}

export const PARSE_NODE_TYPE_TOKEN = 10;
export const PARSE_NODE_TYPE_LIST = 11;

export class ParseNode {
  /**
   *
   * @param {PARSE_NODE_TYPE_TOKEN|PARSE_NODE_TYPE_LIST} type
   * @param {Token|ParseNode[]} value
   */
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }

  addChild(child) {}

  addChildLength(child) {}
}

/**
 *
 * @param {string} code
 * @param {boolean} includeComments
 * @param {boolean} includeWhitespace
 * @param {boolean} includeListDelimiters
 *
 * @throws
 */
export function parse(
  code,
  includeComments,
  includeWhitespace,
  includeListDelimiters
) {
  const tokens = tokenize(code);

  throw new Error("Not implemented!");
}
