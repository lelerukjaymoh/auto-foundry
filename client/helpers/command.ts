import { execSync } from "child_process";

export const executeCommand = (command: string) => {
  console.log("command ", command);
  const result = execSync(command, {
    stdio: "inherit",
    encoding: "utf-8",
  });

  console.log("result ", result);
};
