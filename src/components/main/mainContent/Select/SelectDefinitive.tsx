import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
interface selectDefinitiveProps {
  optionsToSelect?: { value: string; label: string }[];
  width?: string;
  height?: string;
  backGround?: string;
  className?: string;
}
const SelectDefinitive: React.FC<selectDefinitiveProps> = ({
  optionsToSelect,
  width,
  height,
  backGround,
  className,
}) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box
      sx={{
        width: 200,
        height: 500, // Personalizar altura
        "& .MuiOutlinedInput-input": {
          padding: "7px", // Controlar el padding del input
        },
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectDefinitive;
