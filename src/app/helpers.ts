enum TYPE_PRIORITY {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
  }
  
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
