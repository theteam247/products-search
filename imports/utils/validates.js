// 验证是否为空
export function validateEmpty(val) {
  if(val) {
    if(val.trim()) {
      return true;
    }
  }
  return false;
}

// 验证价格
export function validatePrice(val) {
  try{
    Number(val);
    if (val*1 > 0) {
      return true;
    }
  }
  catch(err) {
    // return false;
  }
  return false;
}
