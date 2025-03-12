import { v4 as uuidv4 } from "uuid";

class Reminder {
  id: string;
  title: string;
  description: string;
  completed: boolean;

  constructor(title: string, description: string) {
    this.id = uuidv4(); // Generate a unique ID
    this.title = title;
    this.description = description;
    this.completed = false; // Default status
  }
}

export default Reminder;
