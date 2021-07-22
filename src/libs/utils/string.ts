export function getCharLengthWords(inputString: string, maxWordCount: number){
  let charCount = 0;
  let wordCount = 0;
  let prevChar = ' ';
  for (let char of inputString) {
    if (char != ' ' && prevChar == ' ') wordCount++;
    if (wordCount > maxWordCount) break;
    charCount++;
    prevChar = char;
  }
  return charCount;
}