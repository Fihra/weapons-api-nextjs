'use client';

import styles from "./page.module.css";
import { useState } from 'react';

interface AppProps {
  count: number;
}

export default function Home() {
  const [count, setCount] = useState<AppProps>({
    count: 0
  });

  const showText = (someText: string) => {
      return someText;
  }

  return (
    <div className={styles.page}>
      <h1> Hello</h1>
      <p>{showText("Counter")}: {count.count}</p>
      <button onClick={() => setCount({count: count.count + 1})}>Click Me</button>
    </div>
  );
}
