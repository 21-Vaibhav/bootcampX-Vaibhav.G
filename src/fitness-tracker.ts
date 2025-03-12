type Workout = {
    type: string;
    duration: number; 
    caloriesBurned: number;
    date: Date;
  };
  
  type User = {
    id: string;
    name: string;
    age: number;
    weight: number;
    height: number;
    workouts: Workout[];
  };
  
  class FitnessTracker {
    private users: Map<string, User> = new Map();
  
    addUser(id: string, name: string, age: number, weight: number, height: number): void {
      if (this.users.has(id)) {
        throw new Error(`User with ID ${id} already exists.`);
      }
      if (!id || !name || age <= 0 || weight <= 0 || height <= 0) {
        throw new Error("Invalid user data. Please check inputs.");
      }
      this.users.set(id, { id, name, age, weight, height, workouts: [] });
    }
  
    logWorkout(userId: string, workout: Workout): void {
      const user = this.users.get(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
      }
      if (!workout.type || workout.duration <= 0 || workout.caloriesBurned < 0) {
        throw new Error("Invalid workout details.");
      }
      user.workouts.push(workout);
    }
  
    getAllWorkoutsOf(userId: string): Workout[] {
      const user = this.users.get(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
      }
      return user.workouts;
    }
  
    getAllWorkoutsByType(userId: string, type: string): Workout[] {
      const user = this.users.get(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
      }
      return user.workouts.filter(workout => workout.type === type);
    }
  
    getUsers(): User[] {
      return Array.from(this.users.values());
    }
  
    getUser(id: string): User {
      const user = this.users.get(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found.`);
      }
      return user;
    }
  
    updateUser(id: string, updatedFields: Partial<Omit<User, 'id'>>): void {
      const user = this.users.get(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found.`);
      }
      this.users.set(id, { ...user, ...updatedFields });
    }
  }
  
  const tracker = new FitnessTracker();
  tracker.addUser("1", "Vaibhav", 30, 75, 180);
  tracker.logWorkout("1", { type: "running", duration: 30, caloriesBurned: 300, date: new Date() });
  
  console.log("All users:", tracker.getUsers());
  console.log("John's workouts:", tracker.getAllWorkoutsOf("1"));

