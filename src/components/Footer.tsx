const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Mohanad Zidane. All rights reserved.</p>
          <p>Built with passion for data</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
