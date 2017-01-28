# Zombie Survival (name will be changed!)

## Goal
Our goal for the MVP was to create a 2d topdown multiplayer game through Phaser that people could join together through websockets. Players would be able to move and shoot at monsters. They would also be able to spawn monsters at pointer location by clicking.

### Working Parts
Right now, one player can move and shoot. They can also move around, shoot, and spawn monsters at mouse location. Our state management logic is set up on the backend. We also have the frontend redux and sockets implemented but have not yet tied it to the game logic.

### Not Working Parts
We have everything set up to work for multiplayer but haven't tied everything together yet through the states. While multiple people can connect, we have yet to connect the state to our frontend allowing it to store multiple players and monsters. There are also some small bugs that need to be worked out for spawning the monsters as well.

### Questions
None at the moment, but I'm sure we'll have plenty later!

### Particular Parts of the Code to look at
I would love it if you could take a look at our front end and backend state management as well as our websockets to make sure we're on the right track.

### Instructions
1. Run "npm install"
2. Run "npm run build"
3. Run "npm start"
4. Connect to http://localhost:4020/ in your browser.
5. WASD to move, UPLEFTDOWNRIGHT to shoot. Clicking with your trackpad will spawn a monster at the location.
