import ReminderDatabase from "./ReminderDatabase";

const db = new ReminderDatabase();

// Sample operations
const reminder1 = db.createReminder("Buy groceries", "Milk, Bread, Eggs");
const reminder2 = db.createReminder("Meeting", "Project review at 3 PM");

console.log("All Reminders:", db.getAllReminders());
console.log("Does reminder exist?", db.exists(reminder1.id));
console.log("Get Specific Reminder:", db.getReminder(reminder2.id));

db.updateReminder(reminder1.id, undefined, undefined, true);
console.log("Updated Reminders:", db.getAllReminders());

db.removeReminder(reminder2.id);
console.log("After Deletion:", db.getAllReminders());
