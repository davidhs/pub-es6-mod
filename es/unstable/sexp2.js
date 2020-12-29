// TODO: Improvements
// -----------------
// * Better error messages.

// Errors
// ------
// * Unterminated string,
// * Unexpected closing delimiter,
// * Delimiter mismatch,
// * Unclosed delimiter.


export const TOKEN_TYPE_WHITESPACE    =  2;
export const TOKEN_TYPE_WORD          =  3;
export const TOKEN_TYPE_BRACKET_OPEN  =  4;
export const TOKEN_TYPE_BRACKET_CLOSE =  5;
export const TOKEN_TYPE_STRING        =  6;
export const TOKEN_TYPE_COMMENT       =  7;

const STATE_UNDETERMINED = 1;
const STATE_WHITESPACE   = 2;
const STATE_COMMENT      = 3;
const STATE_STRING       = 4;
const STATE_WORD         = 5;

const REGEX_WS = /\s/;

/**
 * 
 * @param {string} c
 */
function isWhitespace(c) {
  return c.match(REGEX_WS) !== null;
}


/**
 * 
 * @param {string} code 
 * @param {boolean} includeComments 
 * @param {boolean} includeWhitespace 
 * 
 * @throws
 */
export function parse(code) {
  //////////////
  // Tokenize //
  //////////////

  const codeLength = code.length;

  /** @type {string[]} */
  const tokens = [];

  let tokenType   = PARSE_NODE_TYPE_WHITESPACE;
  let tokenIndex  = 0;
  let tokenLength = 0;

  let state = STATE_UNDETERMINED;

  let pc = ""; // Previous character

  let rowIndex = 0;
  let columnIndex = 0;

  codeLoop: for (let codeIndex = 0; codeIndex < codeLength; codeIndex += 1) {
    const c = code[codeIndex]; // Current character

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
        } else if (c === "\"") {
          pc = c;

          tokenType = TOKEN_TYPE_STRING
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

        if (c === "\"" && pc !== "\\") {
          tokens.push(code.substring(tokenIndex, tokenIndex + tokenLength));
          state = STATE_UNDETERMINED;
        } else {
          pc = c;
        }

        continue codeLoop;
      } else if (state === STATE_WORD) {
        if (isWhitespace(c) || c === "(" || c === ")" || c === "\"" || c === ";") {
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
    throw new Error("Unterminated string.");
  } else if (state === STATE_WORD) {
    tokens.push(code.substring(tokenIndex, tokenIndex + tokenLength));
  }

  ///////////
  // Parse //
  ///////////

  console.info(tokens);

  throw new Error("Not implemented!");
}

