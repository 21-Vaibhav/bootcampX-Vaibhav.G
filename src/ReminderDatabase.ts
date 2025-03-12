import Reminder from "./Reminder";

class ReminderDatabase {
  private reminders: Reminder[] = [];

  createReminder(title: string, description: string): Reminder {
    const newReminder = new Reminder(title, description);
    this.reminders.push(newReminder);
    return newReminder;
  }

  exists(id: string): boolean {
    return this.reminders.some((reminder) => reminder.id === id);
  }

  getAllReminders(): Reminder[] {
    return this.reminders;
  }

  getReminder(id: string): Reminder | null {
    return this.reminders.find((reminder) => reminder.id === id) || null;
  }

  removeReminder(id: string): boolean {
    const index = this.reminders.findIndex((reminder) => reminder.id === id);
    if (index !== -1) {
      this.reminders.splice(index, 1);
      return true;
    }
    return false;
  }

  updateReminder(id: string, title?: string, description?: string, completed?: boolean): boolean {
    const reminder = this.getReminder(id);
    if (reminder) {
      if (title !== undefined) reminder.title = title;
      if (description !== undefined) reminder.description = description;
      if (completed !== undefined) reminder.completed = completed;
      return true;
    }
    return false;
  }
}

export default ReminderDatabase;
