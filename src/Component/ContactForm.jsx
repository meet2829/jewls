import { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/contact", formData);
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message", error);
      alert("Failed to send message");
    }
  };

  return (
    <div className="w-full md:w-1/2 bg-[#fdf6f2] p-10 flex flex-col justify-center" data-aos="zoom-in">
      <h2 className="text-2xl font-bold mb-2">Contact Us or Visit</h2>
      <p className="text-sm text-gray-600 mb-8">
        We're here to help — whether you're reaching out online or walking through our doors.
Connect with our team for product inquiries, custom orders, or just to say hello.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name*"
            className="w-1/2 border-b border-black bg-transparent outline-none text-sm py-2"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name*"
            className="w-1/2 border-b border-black bg-transparent outline-none text-sm py-2"
            required
          />
        </div>

        <div className="flex gap-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address*"
            className="w-1/2 border-b border-black bg-transparent outline-none text-sm py-2"
            required
          />
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message*"
            className="w-1/2 border-b border-black bg-transparent outline-none text-sm py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-red-700 text-white text-xs font-semibold py-2 px-5 mt-4"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
