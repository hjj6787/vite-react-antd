/** 获取菜单项 */
import IconComponent from "./iconimoprt"
export function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type
    }
  }
  export const getTreeMenu = (menuData) => {
    if (!menuData || !menuData.length) return
    const menuItems = []
    const icons = import.meta.glob('/node_modules@ant-design/icons/*')
    menuData.forEach((item) => {
        const Iconcompont=IconComponent(item.icon)
        console.log(Iconcompont);
        // 如果有子菜单
        // if (item.children && item.children.length > 0) {

        //   menuItems.push(
        //     getItem(
        //       item.name,
        //       '/' + item.path,
                
        //       getTreeMenu(item.children)
        //     )
        //   )
        // } else {
          
        // }
        if (item.path) {
            menuItems.push(
              getItem(
                item.name,
                item.path,
                
              )
            )
          }
      
    })
    return menuItems
  }