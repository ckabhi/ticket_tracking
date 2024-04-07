import { useEffect, useState, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodoList } from "../../../redux/action/todos/todos.action";
import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
  IconButton,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const Dashboard = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state: any) => state?.todo?.todoList);

  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchTodoList(1, 10));
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allIds = todoList.map((itm: any) => itm._id);
      setCheckedItems(allIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleToggleItem = (id: string) => {
    const currentIndex = checkedItems.indexOf(id);
    const newChecked = [...checkedItems];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setSelectAll(newChecked.length == todoList.length);
    setCheckedItems(newChecked);
  };

  const handleDeleteSelected = () => {
    // Handle deletion of selected items
  };

  const getRowColor = (index: number) => {
    return index % 2 === 0 ? "#ffffff" : "#f9f9f9"; // Alternating white and light gray background colors
  };

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: (theme) => theme.palette.primary.main,
          marginBottom: (theme) => theme.spacing(2),
        }}
      >
        My Container Heading
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <Checkbox checked={selectAll} onChange={handleSelectAll} />
          </ListItemIcon>
          <ListItemText primary="Select All" />
          <IconButton onClick={handleDeleteSelected}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
        {todoList &&
          todoList.map((item: any, index: number) => {
            return (
              <ListItem
                key={index.toString()}
                style={{ backgroundColor: getRowColor(index) }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checkedItems.includes(item._id)}
                    onChange={() => handleToggleItem(item._id)}
                  />
                </ListItemIcon>
                <ListItemText primary={item.title} />
                <IconButton>
                  <ExpandMoreIcon />
                </IconButton>
              </ListItem>
            );
          })}
      </List>
    </Container>
  );
};

export default Dashboard;
