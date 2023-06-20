import { execSync } from "child_process";

export const executeCommand = (command: string) => {
  const result = execSync(command, {
    stdio: "inherit",
  });

  console.log("result ", result);
};
