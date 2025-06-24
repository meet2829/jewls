const Employee = require("../model/user");
const Contact = require("../model/contact");

exports.register = async (req, res) => {
  try {
    const newUser = await Employee.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: "Registration failed", error: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Employee.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.Contact=async(req,res)=>{

    try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: "Error saving contact", error: err });
  }

};