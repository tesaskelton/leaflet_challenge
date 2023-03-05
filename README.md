# Module 15 challenge- Visualizing Data with Leaflet


## Background from Bootcampspot
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.
The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

The map can be accessed at: 

## Methods Used
* Data Visualization

## Technologies
* JavaScript
* Leaflet
* HTML, CSS

## Tasks Performed

1. Imported the GeoJSON data for all earthquakes within the past week from the USGS website: 
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

2. Created a map using Leaflet with the latitude and longitude from the data.

   * Multiple base maps were created to allow user interaction. Base maps created include satellites, greyscale and outdoors

   * Earthquakes overlay map was created using the data imported.
   
   * The size of the marker was determined by the magnitude of the earthquake, while the color was determined by the depth. 

   * Popups were bound to each event that provide details on location, longitude, latititude and depth

   * A legend was created to provide context of the map based on depth

### Satellite Image
![Satellite Image](Images/Satellite.PNG)

### Grayscale Image
![Grayscale Image](Images/GrayscalePopup.PNG)

### Outdoors Image
![Outdoors Image](Images/OutdoorsTectonic.PNG)


