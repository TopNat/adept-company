export const getUniqId = (arr: any[]) => {
  const arrId: number[] = [];
  arr.map((item) => arrId.push(Number(item.id)));
  const maxId = Math.max.apply(null, arrId) + 1;
  return maxId;
};
