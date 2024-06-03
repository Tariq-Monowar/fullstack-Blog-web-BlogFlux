import { formatDistanceToNow } from "date-fns";
const timeAgo = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
export default timeAgo;
