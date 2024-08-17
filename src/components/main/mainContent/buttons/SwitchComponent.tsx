import React from 'react';
import { Switch as AntSwitch } from 'antd'; // Ant Design

interface SwitchComponentProps {
  initialChecked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'default' | 'small'; // Tamaño por defecto
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({ initialChecked, onChange, size = 'default' }) => {
  const [checked, setChecked] = React.useState(initialChecked);

  const handleAntChange = (checked: boolean) => {
    setChecked(checked);
    onChange(checked);
  };

  return (
    <div>
      <AntSwitch
        checked={checked}
        onChange={handleAntChange}
        size={size}
      />
    </div>
  );
};

export default SwitchComponent;
