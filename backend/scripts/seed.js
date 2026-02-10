// scripts/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Todo } from "../model/DB.js";

dotenv.config();

const dummyTodos = [
  {
    name: "Morning Routine",
    content: "Meditate for 10 minutes, then drink water",
    date: new Date("2024-12-10T08:00:00Z"),
  },
  {
    name: "Work Tasks",
    content: "Finish API documentation and fix bug #123",
    date: new Date("2024-12-10T10:30:00Z"),
  },
  {
    name: "Grocery Shopping",
    content: "Milk, eggs, bread, fruits, and vegetables",
    date: new Date("2024-12-10T18:00:00Z"),
  },
  {
    name: "Learn Node.js",
    content: "Study Express middleware and MongoDB aggregation",
    date: new Date("2024-12-11T14:00:00Z"),
  },
  {
    name: "Gym Session",
    content: "Leg day workout - squats, lunges, and calf raises",
    date: new Date("2024-12-11T19:00:00Z"),
  },
  {
    name: "Book Reading",
    content: "Read Chapter 5 of 'Clean Code'",
    date: new Date("2024-12-12T20:00:00Z"),
  },
  {
    name: "Project Planning",
    content: "Plan next week's sprint and assign tasks",
    date: new Date("2024-12-13T09:00:00Z"),
  },
  {
    name: "Call Parents",
    content: "Weekly check-in call with family",
    date: new Date("2024-12-13T20:00:00Z"),
  },
  {
    name: "Code Review",
    content: "Review PR #45 from junior developer",
    date: new Date("2024-12-14T11:00:00Z"),
  },
  {
    name: "Weekend Relaxation",
    content: "Watch movie and order pizza",
    date: new Date("2024-12-14T19:00:00Z"),
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Todo.deleteMany({});
    console.log("🗑️  Cleared existing todos");

    // Insert dummy data
    const result = await Todo.insertMany(dummyTodos);
    console.log(`✅ Seeded ${result.length} todos`);

    // Show sample data
    console.log("\n📋 Sample Todos:");
    result.slice(0, 3).forEach((todo) => {
      console.log(`  • ${todo.name}: ${todo.content}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();
