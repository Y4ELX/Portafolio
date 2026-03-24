import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface SpecialTextProps {
  children: string;
  speed?: number;
  delay?: number;
  className?: string;
  inView?: boolean;
  once?: boolean;
}

const RANDOM_CHARS = "01{}[]<>/$#@!";

function getRandomChar(prevChar?: string): string {
  let char = "";
  do {
    char = RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
  } while (char === prevChar);
  return char;
}

export function SpecialText({
  children,
  speed = 20,
  delay = 0,
  className = "",
  inView = false,
  once = true,
}: SpecialTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once, margin: "-100px" });
  const shouldAnimate = inView ? isInView : true;
  const [hasStarted, setHasStarted] = useState(() => !inView && delay <= 0);
  const text = children;
  const [displayText, setDisplayText] = useState<string>(" ".repeat(text.length));
  const [currentPhase, setCurrentPhase] = useState<"phase1" | "phase2">("phase1");
  const [animationStep, setAnimationStep] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const startTimeoutRef = useRef<number | null>(null);

  function clearStartTimeout() {
    if (startTimeoutRef.current === null) return;
    window.clearTimeout(startTimeoutRef.current);
    startTimeoutRef.current = null;
  }

  function startAnimation() {
    setHasStarted(true);
    setDisplayText(" ".repeat(text.length));
    setCurrentPhase("phase1");
    setAnimationStep(0);
  }

  const runPhase1 = () => {
    const maxSteps = text.length * 2;
    const currentLength = Math.min(animationStep + 1, text.length);

    const chars: string[] = [];
    for (let i = 0; i < currentLength; i += 1) {
      const prevChar = i > 0 ? chars[i - 1] : undefined;
      chars.push(getRandomChar(prevChar));
    }

    for (let i = currentLength; i < text.length; i += 1) {
      chars.push("\u00A0");
    }

    setDisplayText(chars.join(""));

    if (animationStep < maxSteps - 1) {
      setAnimationStep((prev) => prev + 1);
    } else {
      setCurrentPhase("phase2");
      setAnimationStep(0);
    }
  };

  const runPhase2 = () => {
    const revealedCount = Math.floor(animationStep / 2);
    const chars: string[] = [];

    for (let i = 0; i < revealedCount && i < text.length; i += 1) {
      chars.push(text[i]);
    }

    if (revealedCount < text.length) {
      chars.push(animationStep % 2 === 0 ? "_" : getRandomChar());
    }

    for (let i = chars.length; i < text.length; i += 1) {
      chars.push(getRandomChar());
    }

    setDisplayText(chars.join(""));

    if (animationStep < text.length * 2 - 1) {
      setAnimationStep((prev) => prev + 1);
    } else {
      setDisplayText(text);
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  useEffect(() => {
    if (shouldAnimate && !hasStarted) {
      clearStartTimeout();
      if (delay <= 0) {
        startAnimation();
        return;
      }

      startTimeoutRef.current = window.setTimeout(() => {
        startTimeoutRef.current = null;
        startAnimation();
      }, delay * 1000);
    }

    return () => clearStartTimeout();
  }, [delay, hasStarted, shouldAnimate, text]);

  useEffect(() => {
    if (!hasStarted) return;

    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      if (currentPhase === "phase1") {
        runPhase1();
      } else {
        runPhase2();
      }
    }, speed);

    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, [animationStep, currentPhase, hasStarted, speed, text]);

  useEffect(() => {
    if (hasStarted) {
      setDisplayText(" ".repeat(text.length));
      setCurrentPhase("phase1");
      setAnimationStep(0);
    }

    return () => {
      clearStartTimeout();
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, [hasStarted, text]);

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ display: "inline-flex", minHeight: "1em", whiteSpace: "pre" }}
    >
      {displayText}
    </span>
  );
}
