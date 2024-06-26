import React, { useState, useEffect } from 'react';
import LoadingLogo from "./LoadingLogo";

export default function withLoadingDelay(WrappedComponent) {

  return function WithLoadingDelay(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); // 1 second delay

      return () => clearTimeout(timer); // Clean up on component unmount
    }, []);

    if (loading) {
      return <LoadingLogo websiteName="MyWebsite.com" />;
    }

    return <WrappedComponent {...props} />;
  };
}

