import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const ListItem = (props) => {
  return (
    <ListItemButton onClick={props.callback}>
      <ListItemIcon>
        { <props.icon/>}
      </ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItemButton>
  )
};

export default ListItem ;
