import { useState, useEffect } from "react";
import fs from "fs";
import path from "path";

// Burada yerli repo yolunu göstəririk
const REPO_PATH = "C:/Users/Ruslan1983/my-web3-platform";

function readRepo(dirPath, memory = {}) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    const relPath = path.relative(REPO_PATH, fullPath);

    if (stat.isDirectory()) {
      memory[relPath] = { type: "directory", count: 0 };
      readRepo(fullPath, memory);
    } else {
      memory[relPath] = { type: "file", size: stat.size };
    }
  });
  return memory;
}

export default function Security() {
  const [repoSnapshot, setRepoSnapshot] = useState({});
  const [changes, setChanges] = useState([]);

  useEffect(() => {
    // İlk snapshot
    const initial = readRepo(REPO_PATH);
    setRepoSnapshot(initial);

    // Hər 5 saniyədən bir yoxlama
    const interval = setInterval(() => {
      const current = readRepo(REPO_PATH);
      const newChanges = [];

      // Faylları müqayisə edirik
      Object.keys(current).forEach(key => {
        if (!repoSnapshot[key]) {
          newChanges.push(`Yeni əlavə edildi: ${key}`);
        } else if (current[key].size && repoSnapshot[key].size !== current[key].size) {
          newChanges.push(`Fayl dəyişdi: ${key}`);
        }
      });

      Object.keys(repoSnapshot).forEach(key => {
        if (!current[key]) {
          newChanges.push(`Silindi: ${key}`);
        }
      });

      if (newChanges.length > 0) {
        setChanges(prev => [...prev, ...newChanges]);
        setRepoSnapshot(current); // snapshot yeniləyirik
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [repoSnapshot]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", background: "#f9f9f9" }}>
      <h2>Security Monitor</h2>
      <ul>
        {changes.length === 0 ? <li>Hələ dəyişiklik yoxdur</li> :
          changes.map((c, i) => <li key={i}>{c}</li>)
        }
      </ul>
    </div>
  );
}
