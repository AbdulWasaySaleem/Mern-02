import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
    <div className="container mx-auto text-center">
      <p>&copy; 2023 Your Company. All rights reserved.</p>
      <div className="mt-2">
        <Link to="/about" className="text-gray-400 hover:text-white mx-2">About</Link>
        <Link to="/contact" className="text-gray-400 hover:text-white mx-2">Contact</Link>
        <Link to="/policy" className="text-gray-400 hover:text-white mx-2">Privacy Policy</Link>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
