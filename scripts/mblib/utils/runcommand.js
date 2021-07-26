import { Commands } from "Minecraft";
export function runCommand(command) {
    try {
        return { result: Commands.run(command), error: false };
    }
    catch (err) {
        return { result: err, error: true };
    }
}
export function runCommands(commands) {
    for (let command of commands) {
        try {
            runCommand(command);
        }
        catch (err) { }
    }
}
