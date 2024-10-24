const truncateString = (string = "", maxLength = 50, end = "...") =>
  string.length > maxLength ? string.substring(0, maxLength) + end : string;

export default truncateString;
