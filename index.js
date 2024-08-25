import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(
  cors({
    origin:
      "https://66cad65dff6a2464270f135a--calm-piroshki-8c278b.netlify.app/",
  })
);

// Helper function for validating input data
const validateData = (data) => {
  console.log("Validating data:", data);
  if (!data || !Array.isArray(data)) {
    throw new Error("Invalid input data format. Data should be an array.");
  }
  data.forEach((item) => {
    if (typeof item !== "string") {
      throw new Error("Invalid input data. Each item should be a string.");
    }
  });
};

// POST endpoint
app.post("/bfhl", (req, res, next) => {
  try {
    const { data } = req.body;
    console.log("Received data:", data);

    // Input validation
    validateData(data);

    // Separate numbers and alphabets
    const numbers = data.filter((item) => /^\d+$/.test(item));
    const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
    const lowercaseAlphabets = alphabets.filter(
      (item) => item >= "a" && item <= "z"
    );
    const highestLowercaseAlphabet =
      lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

    // Send successful response
    res.json({
      is_success: true,
      user_id: "Divyansh_vashist",
      email: "divyansh.vashist2021@vitstudent.ac.in",
      roll_number: "21BCE5457",
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
    });
  } catch (error) {
    // Forward error to the error handler middleware
    next(error);
  }
});

// GET endpoint
app.get("/bfhl", (req, res, next) => {
  try {
    // Send operation code
    res.status(200).json({ operation_code: 1 });
  } catch (error) {
    // Forward error to the error handler middleware
    next(error);
  }
});

// Middleware for handling 404 Not Found
app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    error: "Endpoint not found",
  });
});

// Global error handling middleware
app.use((err, req, res) => {
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);
  res.status(500).json({
    is_success: false,
    error: "Internal Server Error",
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
