import React from 'react';
import '/src/css/footer.css'; // optional for styling

const Footer = () => {
  return (
    <div className="footer">
      <p>© 2026 My YouTube Clone. All rights reserved.</p>
      <p>
        Check the project on{' '}
        <a 
          href="https://github.com/yaccir/youtubeclone" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
    </div>
  );
}

export default Footer;
