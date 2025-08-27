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

