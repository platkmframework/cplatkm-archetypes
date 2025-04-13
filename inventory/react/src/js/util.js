export const converToLabel = (text) => {
    return text
      .replace(/[^a-zA-Z0-9]+/g, " ") 
      .trim() 
      .replace(/\b\w/g, (l) => l.toUpperCase()); 
  };