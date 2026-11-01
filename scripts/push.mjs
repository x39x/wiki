import { execSync } from "child_process";

// add commit push
const now = new Date();
const MSG = `TIME: ${now.toISOString()}`;

try {
    //  git add & git commit
    execSync(`git add --all`, { stdio: "inherit" });
    execSync(`git commit -m "${MSG}"`, { stdio: "inherit" });

    // push
    execSync(`git push`, { stdio: "inherit" });
    console.log("\x1b[32mSuccess!\x1b[0m");
} catch (error) {
    if (error.message.includes("nothing to commit")) {
        console.log("\x1b[31mNothing changed\x1b[0m");
    } else {
        console.error("\x1b[31mError:\x1b[0m", error.message);
    }
}
