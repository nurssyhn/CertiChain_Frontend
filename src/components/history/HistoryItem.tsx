import { ListItem, ListItemProps } from "@mantine/core";
import classes from "./History.module.css";

export default function HistoryItem({ children, ...rest }: ListItemProps) {
  return <ListItem className={classes.link} {...rest}>{children}</ListItem>;
}
