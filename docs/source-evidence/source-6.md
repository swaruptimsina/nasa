[Version 3](https://eonet.gsfc.nasa.gov/docs/v3) is the latest version of the API. [Version 2.1](https://eonet.gsfc.nasa.gov/docs/v2.1) is deprecated and tagged for removal but is still currently available.


To see what’s changed, please view the [changelog](https://eonet.gsfc.nasa.gov/docs/changelog). There are also a [few how-tos](https://eonet.gsfc.nasa.gov/how-to-guide). Below are descriptions of the [data model fields](https://eonet.gsfc.nasa.gov/docs/v3#fields) and the [API](https://eonet.gsfc.nasa.gov/docs/v3#api) itself. Please note that all metadata contained within EONET is subject to our [disclaimer.](https://eonet.gsfc.nasa.gov/what-is-eonet#disclaimer)

## Fields

### Events

The Event object is returned within the [Events API.](https://eonet.gsfc.nasa.gov/docs/v3#eventsAPI)

| Name | Description |
| --- | --- |
| id | Unique id for this event. |
| title | The title of the event. |
| description | Optional longer description of the event. Most likely only a sentence or two. |
| link | The full link to the API endpoint for this specific event. |
| closed | An event is deemed “closed” when it has ended. The closed field will include a date/time when the event has ended. Depending upon the nature of the event, the closed value may or may not accurately represent the absolute ending of the event. If the event is open, this will show “null”. |
| categories | One or more [categories](https://eonet.gsfc.nasa.gov/api/v3/categories) assigned to the event. |
| sources | One or more [sources](https://eonet.gsfc.nasa.gov/api/v3/sources) that refer to more information about the event. |
| geometry | One or more event geometries are the pairing of a specific date/time with a location. The date/time will most likely be 00:00Z unless the source provided a particular time. The geometry will be a [GeoJSON](http://geojson.org/) object of either type “Point” or “Polygon.” |
| magnitudeValue/Unit/Description | Information regarding the event magnitude, if available, is displayed here. |

### Events (GeoJSON)

The Event object is returned within the [Events API.](https://eonet.gsfc.nasa.gov/docs/v3#eventsAPI-geojson)

| Name | Description |
| --- | --- |
| type | The type of data object. |
| properties | Properties for the data object outside the GeoJSON standard. This can include “id,” “title,” “description,” “link,” open/closed status, “date,” “magnitudeValue,” “magnitudeUnit,” “magnitudeDescription,” “categories,” and “sources.” |
| id | Unique id for this event. |
| title | The title of the event. |
| description | Optional longer description of the event. Most likely only a sentence or two. |
| link | The full link to the API endpoint for this specific event. |
| closed | An event is deemed “closed” when it has ended. The closed field will include a date/time when the event has ended. Depending upon the nature of the event, the closed value may or may not accurately represent the absolute ending of the event. If the event is open, this will show “null”. |
| magnitudeValue/Unit/Description | Information regarding the event magnitude, if available, is displayed here. |
| categories | One or more [categories](https://eonet.gsfc.nasa.gov/api/v3/categories) assigned to the event. |
| geometryDates | In the event that the Feature is a line string, this will be an array of the dates that correspond with the array of coordinates in the geometry field. |
| sources | One or more [sources](https://eonet.gsfc.nasa.gov/api/v3/sources) that refer to more information about the event. |
| geometry | One or more event geometries are the pairing of a specific date/time with a location. The date/time will most likely be 00:00Z unless the source provided a particular time. The geometry will be a [GeoJSON](http://geojson.org/) object of either type “Point” or “Polygon.” |

### Categories

Categories are the types of events by which individual events are cataloged. Categories can be used to filter the output of the [Categories API](https://eonet.gsfc.nasa.gov/docs/v3#categoriesAPI) and the [Layers API](https://eonet.gsfc.nasa.gov/docs/v3#layersAPI). The acceptable categories can be accessed via the [categories JSON.](https://eonet.gsfc.nasa.gov/api/v3/categories)

| Name | Description |
| --- | --- |
| id | Unique id for this category (integer). |
| title | The title of the category. |
| description | Longer description of the category, addressing the scope. Most likely only a sentence or two. |
| link | The full link to the API endpoint for this specific category, which is the same as the [Categories API](https://eonet.gsfc.nasa.gov/docs/v3#categoriesAPI) endpoint filtered to return only events from this category. |
| layers | A service endpoint that points to the [Layers API](https://eonet.gsfc.nasa.gov/docs/v3#layersAPI) endpoint filtered to return only layers from this category. |

### Sources

A Source is a reference to further information about the event. These references are usually the source from which the event was first curated, although there can be multiple sources per event. Source(s) can be used to filter the output of the [Events API.](https://eonet.gsfc.nasa.gov/docs/v3#eventsAPI) The acceptable sources can be accessed via the [sources JSON.](https://eonet.gsfc.nasa.gov/api/v3/sources)

| Name | Description |
| --- | --- |
| id | Unique id for this type. |
| title | The title of this source. |
| source | The homepage URL for the source. |
| link | The full link to the API endpoint for this specific source, which is the same as the [Events API](https://eonet.gsfc.nasa.gov/docs/v3#eventsAPI) endpoint only filtered to return only events from this source. |

### Layers

A Layer is a reference to a specific web service (e.g., WMS, WMTS) that can be used to produce imagery of a particular NASA data parameter. Layers are mapped to categories within EONET to provide a category-specific list of layers (e.g., the ‘Volcanoes’ category is mapped to layers that can provide imagery in true color, SO2, aerosols, etc.). Web services come in a variety of flavors, so it is not possible to include all of the necessary metadata here that is required to construct a properly-formulated request (URL). The full list of layers can be accessed via the [layers JSON.](https://eonet.gsfc.nasa.gov/api/v3/layers)

| Name | Description |
| --- | --- |
| name | The name of the layer as specified by the source web service found at _serviceUrl_. |
| serviceUrl | The base URL of the web service. |
| serviceTypeId | A string to indicate the type (WMS, WMTS, etc.) and version (1.0.0, 1.3.0, etc.) of the web<br> service found at _serviceUrl_. |
| parameters | Zero or more URL parameters that are pertinent to the construction of a properly-formatted request to the web service found at _serviceUrl_. |

## API

### Events

| Parameter | Value(s) | Description | Examples |
| --- | --- | --- | --- |
| [https://eonet.gsfc.nasa.gov/api/v3/events](https://eonet.gsfc.nasa.gov/api/v3/events) |
| source | [Source ID](https://eonet.gsfc.nasa.gov/docs/v3#sourceFields) | Filter the returned events by the [Source.](https://eonet.gsfc.nasa.gov/docs/v3#sourceFields) Multiple sources can be included in the parameter: comma separated, operates as a boolean OR. | [https://eonet.gsfc.nasa.gov/api/v3/events?source=InciWeb](https://eonet.gsfc.nasa.gov/api/v3/events?source=InciWeb)<br>[https://eonet.gsfc.nasa.gov/api/v3/events?source=InciWeb,EO](https://eonet.gsfc.nasa.gov/api/v3/events?source=InciWeb,EO) |
| category | [Category ID](https://eonet.gsfc.nasa.gov/docs/v3#sourceFields) | Filter the returned events by the [category.](https://eonet.gsfc.nasa.gov/docs/v3#sourceFields) Multiple sources can be included in the parameter: comma separated, operates as a boolean OR. | [https://eonet.gsfc.nasa.gov/api/v3/events?category=severeStorms](https://eonet.gsfc.nasa.gov/api/v3/events?category=severeStorms)<br>[https://eonet.gsfc.nasa.gov/api/v3/events?category=severeStorms,wildfires](https://eonet.gsfc.nasa.gov/api/v3/events?category=severeStorms,wildfires) |
| status | open \| closed \| all | Events that have ended are assigned a closed date and the existence of that date will<br> allow you to filter for only-open or only-closed events. Omitting the status parameter will<br> return only the currently open events (default). Using “all“ will list open and <br> closed values. | [https://eonet.gsfc.nasa.gov/api/v3/events?status=open](https://eonet.gsfc.nasa.gov/api/v3/events?status=open) |
| limit | # | Limits the number of events returned | [https://eonet.gsfc.nasa.gov/api/v3/events?limit=5](https://eonet.gsfc.nasa.gov/api/v3/events?limit=5) |
| days | # | Limit the number of prior days (including today) from which events will be returned. | [https://eonet.gsfc.nasa.gov/api/v3/events?days=20](https://eonet.gsfc.nasa.gov/api/v3/events?days=20) |
| start<br>end | YYYY-MM-DD<br>YYYY-MM-DD | Select a range of dates for the events to fall between (inclusive) in a YYYY-MM-DD format. | [https://eonet.gsfc.nasa.gov/api/v3/events?start=2019-01-01&end=2019-01-31](https://eonet.gsfc.nasa.gov/api/v3/events?start=2019-01-01&end=2019-01-31) |
| magID<br>magMin<br>magMax | [Magnitude ID](https://eonet.gsfc.nasa.gov/api/v3/magnitudes)<br>#.##<br>#.## | Select a ceiling, floor, or range of magnitude values for the events to fall between (inclusive). | [https://eonet.gsfc.nasa.gov/api/v3/events?magID=mag\_kts&magMin=1.50&magMax=20](https://eonet.gsfc.nasa.gov/api/v3/events?magID=mag_kts&magMin=1.50&magMax=20) |
| bbox | min lon, max lat,<br>max lon, min lat | Query using a bounding box for all events with datapoints that fall within. This uses two pairs of coordinates: <br> the upper left hand corner (lon,lat) followed by the lower right hand corner (lon,lat). | [https://eonet.gsfc.nasa.gov/api/v3/events?bbox=-129.02,50.73,-58.71,12.89](https://eonet.gsfc.nasa.gov/api/v3/events?bbox=-129.02,50.73,-58.71,12.89) |

**Example:** [https://eonet.gsfc.nasa.gov/api/v3/events?limit=5&days=20&source=InciWeb&status=open](https://eonet.gsfc.nasa.gov/api/v3/events?limit=5&days=20&source=InciWeb&status=open)

Return the most recent 5 events within the past 20 days that have an InciWeb source and are open (still active events).



### Events (GeoJSON)

| Parameter | Value(s) | Description | Examples |
| --- | --- | --- | --- |
| [https://eonet.gsfc.nasa.gov/api/v3/events/geojson](https://eonet.gsfc.nasa.gov/api/v3/events/geojson) |
| source | [Source ID](https://eonet.gsfc.nasa.gov/docs/v3#sourceFields) | Filter the returned events by the [Source.](https://eonet.gsfc.nasa.gov/docs/v3#sourceFields) Multiple sources can be included in the parameter: comma separated, operates as a boolean OR. | [https://eonet.gsfc.nasa.gov/api/v3/events/geojson?source=InciWeb](https://eonet.gsfc.nasa.gov/api/v3/events/geojson?source=InciWeb)<br>[https://eonet.gsfc.nasa.gov/api/v3/events/geojson?source=InciWeb,EO](https://eonet.gsfc.nasa.gov/api/v3/events/geojson?source=InciWeb,EO) |
| category | [Category ID](https://eonet.gsfc.nasa.gov/docs/v3#sourceFields) | Filter the returned events by the [category.](https://eonet.gsfc.nasa.gov/docs/v3#sourceFields) Multiple sources can be included in the parameter: comma separated, operates as a boolean OR. | [https://eonet.gsfc.nasa.gov/api/v3/events/geojson?category=severeStorms](https://eonet.gsfc.nasa.gov/api/v3/events/geojson?category=severeStorms)<br>[https://eonet.gsfc.nasa.gov/api/v3/events/geojson?category=severeStorms,wildfires](https://eonet.gsfc.nasa.gov/api/v3/events/geojson?category=severeStorms,wildfires) |
| status | open \| closed \| all | Events that have ended are assigned a closed date and the existence of that date will allow you to filter for only-open or only-closed events. Omitting the status parameter will return only the currently open events (default). Using “all“ will list open and closed values. | [https://eonet.gsfc.nasa.gov/api/v3/events/geojson?status=open](https://eonet.gsfc.nasa.gov/api/v3/events/geojson?status=open) |
| limit | # | Limits the number of events returned | [https://eonet.gsfc.nasa.gov/api/v3/events/geojson?limit=5](https://eonet.gsfc.nasa.gov/api/v3/events/geojson?limit=5) |
| days | # | Limit the number of prior days (including today) from which events will be returned. | [https://eonet.gsfc.nasa.gov/api/v3/events/geojson?days=20](https://eonet.gsfc.nasa.gov/api/v3/events/geojson?days=20) |
| start<br>end | YYYY-MM-DD<br>YYYY-MM-DD | Select a range of dates for the events to fall between (inclusive) in a YYYY-MM-DD format. | [https://eonet.gsfc.nasa.gov/api/v3/events/geojson?start=2019-01-01&end=2019-01-31](https://eonet.gsfc.nasa.gov/api/v3/events/geojson?start=2019-01-01&end=2019-01-31) |
| magID<br>magMin<br>magMax | [Magnitude ID](https://eonet.gsfc.nasa.gov/api/v3/magnitudes)<br>#.##<br>#.## | Select a ceiling, floor, or range of magnitude values for the events to fall between (inclusive). | [https://eonet.gsfc.nasa.gov/api/v3/events/geojson?magID=mag\_kts&magMin=1.50&magMax=20](https://eonet.gsfc.nasa.gov/api/v3/events/geojson?magID=mag_kts&magMin=1.50&magMax=20) |
| bbox | min lon, max lat,<br>max lon, min lat | Query using a bounding box for all events with datapoints that fall within. This uses two pairs of coordinates: the upper left hand corner (lon,lat) followed by the lower right hand corner (lon,lat). | [https://eonet.gsfc.nasa.gov/api/v3/events/geojson?bbox=-129.02,50.73,-58.71,12.89](https://eonet.gsfc.nasa.gov/api/v3/events/geojson?bbox=-129.02,50.73,-58.71,12.89) |

**Example:** [https://eonet.gsfc.nasa.gov/api/v3/events/geojson?limit=5&days=20&source=InciWeb&status=open](https://eonet.gsfc.nasa.gov/api/v3/events/geojson?limit=5&days=20&source=InciWeb&status=open)

Return the most recent 5 events within the past 20 days that have an InciWeb source and are open (still active events).



### Categories

| Parameter | Value(s) | Description | Examples |
| --- | --- | --- | --- |
| [https://eonet.gsfc.nasa.gov/api/v3/categories](https://eonet.gsfc.nasa.gov/api/v3/categories) |
|  | [Category ID](https://eonet.gsfc.nasa.gov/docs/v3#categoryFields) | Filter the events by the [Category](https://eonet.gsfc.nasa.gov/docs/v3#categoryFields). | [https://eonet.gsfc.nasa.gov/api/v3/categories/wildfires](https://eonet.gsfc.nasa.gov/api/v3/categories/wildfires)<br>[https://eonet.gsfc.nasa.gov/api/v3/categories/landslides](https://eonet.gsfc.nasa.gov/api/v3/categories/landslides) |
| source | [Source ID](https://eonet.gsfc.nasa.gov/docs/v3#sourceFields) | Filter the topically-constrained events by the [Source.](https://eonet.gsfc.nasa.gov/docs/v3#sourceFields) Multiple sources can be included in the parameter: comma separated, operates as a boolean OR. | [https://eonet.gsfc.nasa.gov/api/v3/categories/wildfires?source=InciWeb](https://eonet.gsfc.nasa.gov/api/v3/categories/wildfires?source=InciWeb)<br>[https://eonet.gsfc.nasa.gov/api/v3/categories/landslides?source=InciWeb,EO](https://eonet.gsfc.nasa.gov/api/v3/categories/landslides?source=InciWeb,EO) |
| status | open \| closed | Events that have ended are assigned a closed date and the existence of that date will allow you to filter for only-open or only-closed events. Omitting the status parameter will return only the currently open events. | [https://eonet.gsfc.nasa.gov/api/v3/categories/wildfires?status=open](https://eonet.gsfc.nasa.gov/api/v3/categories/wildfires?status=open) |
| limit | # | Limits the number of events returned | [https://eonet.gsfc.nasa.gov/api/v3/categories/wildfires?limit=5](https://eonet.gsfc.nasa.gov/api/v3/categories/wildfires?limit=5) |
| days | # | Limit the number of prior days (including today) from which events will be returned. | [https://eonet.gsfc.nasa.gov/api/v3/categories/wildfires?days=20](https://eonet.gsfc.nasa.gov/api/v3/categories/wildfires?days=20) |
| start<br>end | YYYY-MM-DD<br>YYYY-MM-DD | Select a range of dates for the events to fall between (inclusive) in a YYYY-MM-DD format. | [https://eonet.gsfc.nasa.gov/api/v3/categories/wildfires?start=2019-01-01&end=2019-01-31](https://eonet.gsfc.nasa.gov/api/v3/categories/wildfires?start=2019-01-01&end=2019-01-31) |

### Layers

| Parameter | Value(s) | Description | Examples |
| --- | --- | --- | --- |
| [https://eonet.gsfc.nasa.gov/api/v3/layers](https://eonet.gsfc.nasa.gov/api/v3/layers) |
|  | [Category ID](https://eonet.gsfc.nasa.gov/docs/v3#categoryFields) | Filter the layers by the [Category](https://eonet.gsfc.nasa.gov/docs/v3#categoryFields). | [https://eonet.gsfc.nasa.gov/api/v3/layers/wildfires](https://eonet.gsfc.nasa.gov/api/v3/layers/wildfires)<br>[https://eonet.gsfc.nasa.gov/api/v3/layers/landslides](https://eonet.gsfc.nasa.gov/api/v3/layers/landslides) |