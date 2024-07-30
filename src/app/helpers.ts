import { TYPE_PRIORITY } from "@prisma/client";

export const getIconByPriority = (priority: string): string => {
  switch (priority) {
    case TYPE_PRIORITY.LOW:
      return "/icons/Status_low.svg";
    case TYPE_PRIORITY.MEDIUM:
      return "/icons/Status_medium.svg";
    case TYPE_PRIORITY.HIGH:
      return "/icons/Status_high.svg";
    default:
      return "/icons/Status_low.svg";
  }
};

export const colorByStatus = (status: string): string => {
  switch (status) {
    case "TODO":
      return "#0CBE5E";
    case "ON_GOING":
      return "#FFDD0F"; 
    case "DONE":
      return "#635BFF";
    case "WAITING":
      return "#64748B"; 
    default:
      return "#0CBE5E"; 
  }
};