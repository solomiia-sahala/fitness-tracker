import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutocompleteInput({options, inputLabel, handleOptionSelect, formName}) {
  return (
    <Autocomplete
      id="option-select"
      sx={{ width: 300 }}
      options={options}
      autoHighlight
      getOptionLabel={(option) => option.label}
      onChange={(e, newValue) => handleOptionSelect(formName, newValue.label)}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {option.icon && option.icon} {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={inputLabel}
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
}