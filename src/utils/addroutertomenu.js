import LazyLoad from "./Lazycom";

export default function addRouteToMenu(menuData) {
  let temp = [];
  menuData.forEach((menu) => {
    if (menu.ps_level !== "0") {
      const path = `${menu.ps_c}/${menu.ps_a}`;
      const elementPath = `${menu.ps_c}/${menu.ps_a}`;
      const obj = {
        path,
        element: LazyLoad(elementPath),
      };
      temp.push(obj);
    }
    if (menu.children) {
      const result = addRouteToMenu(menu.children);
      temp = temp.concat(result);
    }
  });
  return temp;
}
