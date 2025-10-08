import React, { useRef, useEffect } from 'react';
import { mount } from 'home/App'

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    console.log('Home component mounted, ref:', ref.current);

    if (ref.current) {
      // Limpar o container
      ref.current.innerHTML = '';
      
      try {
        console.log('Attempting to mount home/App');
        mount(ref.current, {
          initialPath: window.location.pathname,
          onNavigate: ({ pathname: nextPathname }) => {
            const { pathname } = window.location;
            if (pathname !== nextPathname) {
              window.history.pushState({}, '', nextPathname);
            }
          },
        });
        console.log('Home/App mounted successfully');
      } catch (error) {
        console.error('Error mounting home/App:', error);
      }
    }

    return () => {
      if (ref.current) {
        ref.current.innerHTML = '';
      }
    };
  }, []);

  return <div ref={ref} style={{ minHeight: '200px' }} />;
}
