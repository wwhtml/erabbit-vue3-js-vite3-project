import request from "@/utils/request";
export const findBrand = (limit) => {
  return request("/home/brand", "get", { limit });
};

/**
 * 获取广告图
 * @returns Promise
 */
export const findBanner = () => {
  return request("/home/banner", "get");
};

//新鲜好物
export const findNew = () => {
  return request("home/new", "get");
};
//人气推荐
export const findHot = () => {
  return request("home/hot", "get");
};
//商品区域
export const findGoods = () => {
  return request("home/goods", "get");
};
//最新专题
export const findSpecial = () => {
  return request("home/special", "get");
};
