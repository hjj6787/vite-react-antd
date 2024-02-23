import { useState, useEffect } from 'react';
import dynamic from 'react-dynamic-import';

const DynamicIcon = ({ iconName }) => {
  const [Icon, setIcon] = useState(null);

  useEffect(() => {
    const importIcon =  (iconName) => {
      const modules = import.meta.glob('../../node_modules@ant-design/icons/*/*.js');
        const component = modules[`../../node_modules@ant-design/icons/${iconName}.js`]
        // () =>import(`../../node_modules@ant-design/icons/${iconName}`);
        // @ant-design/icons/${iconName}
      return component;
    };

    importIcon(iconName).then((Icon) => {
      setIcon(() => Icon.default);
    });
  }, [iconName]);

  return Icon ? <Icon /> : null;
};

export default DynamicIcon;
