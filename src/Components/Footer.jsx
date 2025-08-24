const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <p className="mb-0">© {new Date().getFullYear()} Fast and Ready Food Delivery</p>
        <p className="mb-0">All rights reserved.</p>
      </div>
    </footer>
  );
}
export default Footer;