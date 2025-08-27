# Sager Drone Project (Front-End Task)

## Project Overview
This project is a **ReactJS** for visualizing live drones on a map.  
The front-end communicates with a provided backend via **WebSockets** and displays real-time drone data.  

**Key Features:**
- Display all drones currently in the sky on a **Mapbox map**  
- **Drone List (side panel)** showing all drones  
- Show the **flight path** of every drone from the time the page opens  
- Drones with registration numbers starting with **B** are allowed to fly (green), others are restricted  (red)  
- Display a popup with flight time and altitude  
- **Counter** shows the number of red drones only  
- **Yaw value** represented as the drone icon orientation (arrow)  
- Clicking a drone in the list moves the map to it  
- Clicking a drone on the map highlights it in the list  
- Responsive interface suitable for various devices  
- Overlay Loader to deal with long loading 

## Technical Requirements
- **Front-end only** implementation using ReactJS ,Tailwind Css 
- Connects to the backend using **WebSocket**  
- **Mapbox** used for map rendering  
- Implements **Design Patterns** Like Observer Pattern for clean code style  
- Free to use open-source React components or npm packages  
- Code is **clean and well-commented** for readability  

## Live Demo
 - https://drone-dashboard-arxf.vercel.app/ 



## Known Issues  

### Drone Path Persistence  

- **Description:**  
  Currently, drones appear correctly on the map, but their **path history is not fully implemented**.  

- **Reason:**  
  The backend generates a **new random serial ID** for each drone update (using `makeID()` on every tick).  
  As a result, the frontend cannot reliably associate new positions with previously received drones, since every update looks like a completely new drone.  

- **Impact:**  
  This prevents storing and rendering the **full trajectory (LineString)** of each drone over time.  
  Instead, only the **latest position** is shown on the map.  

- **Possible Solution (if backend changes were allowed):**  
  - Ensure each drone has a **consistent unique ID** across all updates.  
  - Use this ID in the frontend to keep track of all received coordinates and render the **full path history**.  