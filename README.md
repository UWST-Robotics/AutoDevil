> ## ⚠️ WARNING:
> AutoDevil is still in **early beta**. If you run into any bugs or issues, don\'t hesitate to report them in
> the [issues tab](https://github.com/UWST-Robotics/AutoDevil/issues).

# AutoDevil

A simple web-app to plot a preset path for a VEX/FIRST competitive robot. Designed and built
by [DevilBots](https://devilbots.org/) from UW-Stout.

## Features

- ✏️ Design Linear, Spline, and Holonomic paths
- ‼️ Execute custom events at each control point
- ▶️ Preview animated robot path
- 🎨 Customize field layout and robot dimensions
- 🤖 Compatible w/ VEX, FIRST, and any other 3rd-party ecosystems

## How to Use

1. Tool is publically available at [auto.devilbots.org](https://auto.devilbots.org/).
2. Customize field layout and robot dimensions in the settings dialog
3. Customize path/events to your liking
4. Paths are exported to custom path files. How you integrate these files is up to your team

## File Commands

### Path File

| Type           | Syntax                                       | Notes                     |
|----------------|----------------------------------------------|---------------------------|
| File Header    | `PATH <v>`                                   | Version 1                 
| Point          | `POINT <x> <y> <r> <enterDelta> <exitDelta>` | Inches/Degrees            
| Reverse Marker | `REVERSE`                                    | Immediately follows point 
| Event          | `EVENT <id> <params>`                        | Immediately follows point 
| File Footer    | `ENDPATH`                                    |

### Occupancy File

| Type        | Syntax          | Notes                    |
|-------------|-----------------|--------------------------|
| File Header | `OCCUPANCY <v>` | Version 1                
| Row         | `11000...10`    | 1=occupied, 0=unoccupied 
| File Footer | `ENDOCCUPANCY`  |

