export const normalizePhone = (phone: string): string => {
  if (phone.startsWith("0")) {
    return "62" + phone.slice(1);
  }

  if (phone.startsWith("8")) {
    return "62" + phone;
  }
  
  return phone;
};

export const maskPhone = (phone: string, visibleEnd = 2): string => {
  return (
    phone.slice(0, -visibleEnd).replace(/./g, "•") + phone.slice(-visibleEnd)
  );
};
