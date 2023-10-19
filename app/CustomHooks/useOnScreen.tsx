import React from 'react';

export default function useOnScreen(ref: React.RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = React.useState(false);

  const callbackFunction = (entries: any) => {
    const [entry] = entries;
    setIntersecting(entry.isIntersecting);
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction);
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  // const observer = React.useMemo(
  //   () =>
  //     new IntersectionObserver(([entry]) =>
  //       setIntersecting(entry.isIntersecting)
  //     ),
  //   []
  // );

  // React.useEffect(() => {
  //   observer.observe(ref.current!);
  //   return () => observer.disconnect();
  // }, [observer, ref]);

  return isIntersecting;
}
