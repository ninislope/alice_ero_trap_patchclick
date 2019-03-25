const fs = require("fs");
const asar = require("asar");

const appAsar = "alice_ero_trap-win32-x64/resources/app.asar";
const appAsar2 = appAsar + "2";
const appDir = "alice_ero_trap-win32-x64/resources/app.asar.content";
const smartJs = appDir + "/js/smart.js";

asar.extractAll(appAsar, appDir);

let smartJsContent = fs.readFileSync(smartJs, "utf8");
smartJsContent = smartJsContent.replace("\"ontouchend\" in window", "false");
fs.writeFileSync(smartJs, smartJsContent);

asar.createPackage(appDir, appAsar2).then(() => {
    fs.renameSync(appAsar2, appAsar);
});
