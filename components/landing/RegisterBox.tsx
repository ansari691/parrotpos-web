import React, { useState } from 'react';
import RegisterBox1 from './RegisterBox1';
import RegisterBox2 from './RegisterBox2';
import RegisterBox3 from './RegisterBox3';
import RegisterBox4 from './RegisterBox4';

const RegisterBox = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentPageContent = (currentPage: number) => {
    switch (currentPage) {
      case 1:
        return <RegisterBox1 {...{ currentPage, setCurrentPage }} />;
      case 2:
        return <RegisterBox2 {...{ currentPage, setCurrentPage }} />;
      case 3:
        return <RegisterBox3 {...{ currentPage, setCurrentPage }} />;
      case 4:
        return <RegisterBox4 {...{ currentPage, setCurrentPage }} />;
      default:
        return null;
    }
  };

  return currentPageContent(currentPage);
};

export default RegisterBox;
