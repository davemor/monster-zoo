How to make Monster Zoo
=======================

Endpoints
---------
/api/monsters           - GET a list of all the current monsters
/api/monsters/:id       - GET a specific monster
/api/monsters/:id/food  - GET some food for a specific monster 

Model
-----
monster

- id
- kind
- isHungry
- imagePath

Steps
-----
1. start with the server premade
2. create-react-app inside ./client folder
3. configure the development server to direct non-client stuff to node
    - add the loading text
4. turn the default app into a class component that can get and display the monster ids
5. create a MonsterCard class that can take in the monster id as a prop and display it
    - fetch the monster state from the server
    - display the monster state
    - add the styles
    - add the loading text
6. Add the MonsterGrid
7. Add the feed button and modify the styles so if it's hungry it changes