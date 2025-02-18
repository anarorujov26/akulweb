import React from 'react';
import { 
  Grid, 
  Typography, 
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Paper,
  Alert
} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const EntityRegions = ({ regions, fields }) => {
  const renderField = (field) => {
    if (field.show !== 1) {
      return null;
    }

    const commonProps = {
      fullWidth: true,
      required: field.isRequired === 1,
      size: "small",
      sx: {
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#ffffff',
          height: '40px',
          '&:hover fieldset': {
            borderColor: '#e0e0e0',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1976d2',
            borderWidth: '1px',
          }
        },
        '& .MuiInputLabel-root': {
          color: '#666666',
          transform: 'translate(14px, 8px) scale(1)',
          '&.Mui-focused, &.MuiFormLabel-filled': {
            transform: 'translate(14px, -9px) scale(0.75)',
          }
        },
        mb: 1.5
      }
    };

    switch(field.dataType.toLowerCase()) {
      case 'string':
        return (
          <TextField
            {...commonProps}
            label={field.title}
            variant="outlined"
          />
        );
      
      case 'bigint':
        if (field.isRef === 1) {
          return (
            <FormControl {...commonProps}>
              <InputLabel 
                sx={{ 
                  color: '#666666',
                  '&.Mui-focused': {
                    color: '#1976d2'
                  }
                }}
              >
                {field.title}
              </InputLabel>
              <Select
                label={field.title}
                value=""
                sx={{
                  backgroundColor: '#ffffff',
                  height: '40px'
                }}
              >
                <MenuItem value="">Seçin</MenuItem>
              </Select>
              <FormHelperText>Referans dəyər seçin</FormHelperText>
            </FormControl>
          );
        }
        return (
          <TextField
            {...commonProps}
            label={field.title}
            variant="outlined"
            type="number"
          />
        );

      case 'moment':
      case 'date':
        return (
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label={field.title}
              slotProps={{
                textField: {
                  ...commonProps
                }
              }}
            />
          </LocalizationProvider>
        );

      case 'price':
        return (
          <TextField
            {...commonProps}
            label={field.title}
            variant="outlined"
            type="number"
            InputProps={{
              endAdornment: '₼',
            }}
          />
        );

      default:
        return (
          <TextField
            {...commonProps}
            label={field.title}
            variant="outlined"
          />
        );
    }
  };

  const rows = [];
  for (let i = 0; i < regions.length; i += 2) {
    rows.push(regions.slice(i, i + 2));
  }

  return (
    <Box 
      sx={{ 
        p: 2,
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Paper 
        elevation={0}
        sx={{ 
          width: '95%',
          maxWidth: '1200px',
          p: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)'
        }}
      >
        {rows.map((row, rowIndex) => (
          <Grid container spacing={2.5} key={rowIndex} sx={{ mb: 2.5 }}>
            {row.map((region) => {
              const visibleFields = fields[region.regionFieldsId].filter(field => field.show === 1);
              if (visibleFields.length === 0) {
                return null;
              }
              return (
                <Grid item xs={12} md={6} key={region.regionId}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 2.5,
                      height: '100%',
                      backgroundColor: '#ffffff',
                      border: '1px solid #edf2f7',
                      borderRadius: '12px',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: '#e2e8f0',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
                        backgroundColor: '#ffffff'
                      }
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 2.5,
                        color: '#334155',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        letterSpacing: '0.3px',
                        textTransform: 'uppercase',
                        position: 'relative',
                        display: 'inline-block',
                        paddingBottom: '8px',
                        '&:after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          height: '2px',
                          background: 'linear-gradient(90deg, #1976d2 0%, #90caf9 100%)',
                          borderRadius: '1px',
                          transition: 'width 0.3s ease'
                        }
                      }}
                    >
                      {region.regionName}
                    </Typography>
                    
                    <Grid container spacing={1.5}>
                      {visibleFields.map((field) => (
                        <Grid item xs={12} key={field.id}>
                          {renderField(field)}
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        ))}
      </Paper>
    </Box>
  );
};

export default EntityRegions; 