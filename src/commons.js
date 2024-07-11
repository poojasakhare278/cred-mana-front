export const formatCount = (count) => {
    let countStr = count.toString();
    
    if (countStr.length === 1) {
      countStr = '0' + countStr;
    }

    return countStr;
  };