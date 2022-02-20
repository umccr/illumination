import * as shell from "shelljs";

// Copy public
shell.cp("-R", "src/public", "dist/public");
