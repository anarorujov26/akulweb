import * as Icons from '@mui/icons-material';

// DynamicIcon hazırda olan ikonları tək-tək import etmək əvəzinə
// Tək səfərlik istifadə imkanı yaradır

const DynamicIcon = ({ name, ...props }) => {
  const IconComponent = Icons[name];
  return IconComponent ? <IconComponent {...props} /> : null;
};

export default DynamicIcon;