import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, fx = 0, fy = 0;
    const cursor = cursorRef.current!;
    const follower = followerRef.current!;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
    };

    const animate = () => {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = fx + "px";
      follower.style.top = fy + "px";
      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    const id = requestAnimationFrame(animate);

    const onEnter = () => {
      cursor.style.transform = "translate(-50%,-50%) scale(2.5)";
      follower.style.transform = "translate(-50%,-50%) scale(1.5)";
      follower.style.borderColor = "rgba(0,212,255,0.8)";
    };
    const onLeave = () => {
      cursor.style.transform = "translate(-50%,-50%) scale(1)";
      follower.style.transform = "translate(-50%,-50%) scale(1)";
      follower.style.borderColor = "rgba(0,212,255,0.5)";
    };

    const observe = () => {
      document.querySelectorAll("a, button, .jc, .oi").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    observe();
    const observer = new MutationObserver(observe);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(id);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="custom-cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  );
};

export default CustomCursor;
