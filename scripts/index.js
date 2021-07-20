import { Commands, World } from 'Minecraft';
World.events.beforeChat.subscribe((evd) => {
    evd.canceled = true;
    Commands.run(`say ${evd.message}`);
    Commands.run(`say [Example Script] ${evd.sender.name} sent a message`);
});
