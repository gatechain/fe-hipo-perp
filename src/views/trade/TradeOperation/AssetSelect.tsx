import React, { FC } from 'react';
import { Box, MenuItem, Select, SelectChangeEvent } from '@material-ui/core'
import { styled, makeStyles } from '@material-ui/styles'
import Image from 'next/image'


const SelectItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  fontSize: '15px',
  fontWeight: 500,
  lineHeight: '20px',
  color: '#f7f7f7',
  backgroundColor: '#232334',
  borderRadius: '6px',
  padding: '1px 4px 1px 5px',
  width: '100%',
  height: '40px',
  cursor: 'pointer',
})

export interface SelectProps {
  coin: string;
  asset: String;
}
const SelectItemDiv: FC<SelectProps> = (props) => {
  return (
    <SelectItem>
      <Box display="flex" width="20px" height="20px" marginRight="8px">
        <Image width="20px" height="20px" src="/images/btc.svg" alt=""></Image>
      </Box>
      {props.coin}
      <Box component="div"
        display="inline-flex"
        bgcolor="#454258"
        borderRadius="2px"
        fontSize="10px"
        lineHeight="16px"
        color="#c3c2d4"
        padding="1px 4px 1px 5px"
        letterSpacing=".06em"
        marginLeft="6px"
      >{props.asset}</Box>
    </SelectItem>
  )
}
const useStyles = makeStyles({
  select: {
    '& .MuiSelect-outlined.MuiOutlinedInput-input.MuiInputBase-input': {
      padding: 0,
    },
  },
})

export const AssetSelect: FC = () => {
  const [age, setAge] = React.useState('');
  const classes = useStyles()
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  
  return (
    <Box display="flex" flexDirection="column" overflow="scroll" flex="1 1 auto">
      <Select
        value={age}
        className={classes.select}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            height: '40px',
            backgroundColor: '#232334',
          }}
        >
          <MenuItem value="" sx={{ height:'40px', paddingLeft:'14px', width:'100%'  }}>
            <SelectItemDiv coin="USD coin" asset="USDC"></SelectItemDiv>
          </MenuItem>
          
        </Select>
    </Box>
    
  )
};