# Angular Meteo App

This Angular application visualizes weather data, offering both historical and forecasted weather information. It utilizes REST services provided by OpenMeteo and integrates a free theme using component library PrimeNG.

## Prerequisites

To get the application running, ensure you have the following installed:

* [Node.js](https://nodejs.org/) (with npm)
* [Docker](https://www.docker.com/) (for Docker Compose method)

## Installation

Clone the repository and navigate into the project directory:
## Running


### Using npm

* `npm install`
*  `ng serve` or `npm run start`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Using Docker Compose

* Ensure Docker is running on your machine.
* `docker-compose up` (builds and starts the container)
* Visit your app at [http://127.0.0.1/](http://localhost:4200).

### Features

*   **User Interface**: Utilizes PrimeNG for an enhanced user experience.
*   **Weather Charts**: Displays weather data on suitable charts.
*   **City Search**: Allows users to search for weather data for different cities.
*   **User Location**: Provides weather data based on the user's current location.
*   **Weather Condition Images**: Displays images representing current weather conditions.

## Development Progress

*   **Application Setup** - ![100%](https://progress-bar.dev/100)
    *   [x]  Angular application initialized with the latest version.
    *   [x]  Integration with OpenMeteo APIs for weather data.

*   **UI Integration** - ![100%](https://progress-bar.dev/100)
    *   [x]  Integration of a free theme using PrimeNG.

*   **Weather Data Visualization** - ![100%](https://progress-bar.dev/100)
    *   [x]  Implement features to visualize historical and forecast weather data.

*   **Error Handling and User Experience** - ![100%](https://progress-bar.dev/100)
      *   [x]  Robust error handling and enhanced user experience.
