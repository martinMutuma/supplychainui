const Footer = () => {
  const year: number = new Date().getFullYear();
  return (
    <>
      <footer className="text-center text-capitalize">
        copyright &copy; {year}
      </footer>
    </>
  );
};

export default Footer;
