![usa flag](https://power.larc.nasa.gov/api/website/header/us-flag-small.png)

An official
website of the United States government

Here's how
you know

Here's how
you know

![dot gov](https://power.larc.nasa.gov/api/website/header/icon-dot-gov.svg)

**Official websites use**
**.gov**

A
**.gov** website belongs to
an official government
organization in the United States.


![http icon](https://power.larc.nasa.gov/api/website/header/icon-https.svg)

**Secure .gov websites use**
**HTTPS**

A
**lock** (
LockLocked
padlock icon
) or **https://** means
you've safely connected to
the .gov website. Share sensitive
information only on official,
secure websites.


[![NASA Logo](https://power.larc.nasa.gov/api/website/header/nasa-logo.svg)](https://www.nasa.gov/ "Go to NASA Homepage")[**NASA POWER**  **NASA  Prediction Of Worldwide Energy  Resources**](https://power.larc.nasa.gov/ "POWER homepage")

☰

Access

Access Data

Access POWER's free, low-latency, high-accuracy, community-specific datasets offered in customizable units and formats.

[Data Access Viewer](https://power.larc.nasa.gov/data-access-viewer/ "Data Access Viewer")

[PaRameter Uncertainty ViEwer](https://power.larc.nasa.gov/parameter-uncertainty-viewer/ "PaRameter Uncertainty ViEwer")

[Application Programming Interface](https://power.larc.nasa.gov/api/pages/ "Application Programming Interface")

[Direct Datastore Access](https://registry.opendata.aws/nasa-power/ "Direct Datastore Access")

[Geospatial Data Services](https://nasa.maps.arcgis.com/home/group.html?id=4b75def515df430980faebca6a007465#overview "Geospatial Data Services")

![Global map tinted in blue overlaid with a gridded network of illuminated points.](https://power.larc.nasa.gov/api/website/header/preview-dav.jpg)![Lines of code with green check marks.](https://power.larc.nasa.gov/api/website/header/preview-pruve.jpg)![Map of the United States outlined in blue against a dark background with various illuminated points within.](https://power.larc.nasa.gov/api/website/header/preview-dda.jpg)![Graphic illustration of a blue and grey cloud lit with a gridded network of illuminated points throughout.](https://power.larc.nasa.gov/api/website/header/preview-api.jpg)![Illuminated blue location markers on a dark blue background.](https://power.larc.nasa.gov/api/website/header/preview-gis.jpg)

Engage

Engage with POWER

Learn about how POWER data and services are used and join us in POWERing our future of energy, sustainable
infrastructure, and agroclimatology.

[Communities](https://power.larc.nasa.gov/docs/methodology/communities/ "Communities")

[Impact Stories](https://power.larc.nasa.gov/articles/ "Impact Stories")

[Global Community Summit](https://power.larc.nasa.gov/global-community-summit/ "Global Community Summit")

Learn

Learn About POWER

Learn about POWER’s data methodology, view tutorials, and explore the parameter dictionary.

[Documentation](https://power.larc.nasa.gov/docs/ "Documentation")

[Methodology](https://power.larc.nasa.gov/docs/methodology/ "Methodology")

[Frequent Questions](https://power.larc.nasa.gov/docs/faqs/ "Frequent Questions")

[Training and Tutorials](https://power.larc.nasa.gov/docs/tutorials/ "Training and Tutorials")

[Parameter Dictionary](https://power.larc.nasa.gov/parameters/ "Parameter Dictionary")

[Dashboards](https://power.larc.nasa.gov/dashboard/ "Dashboards")

About

About POWER

NASA POWER provides solar and meteorological data from satellite observations and models to help worldwide users respond
to challenges and societal needs.

[Team Members](https://power.larc.nasa.gov/docs/team/ "Team Members")

[Team Publications](https://power.larc.nasa.gov/docs/references/publications/ "Team Publications")

[Acknowledgements](https://power.larc.nasa.gov/docs/acknowledgements/ "Acknowledgements")

Contact

Search Content

## We would like to hear from you!

✕

Email:

If you would like us to follow up, please enter an email.

0/160

Subscribe to POWER’s email announcements.


Subject:

✕

I have an issue accessing POWER data

I have an issue downloading POWER data

I would like to learn more about the POWER project


I have feedback for your website

I would like to partner with the POWER project

Sign Up for Updates


0/160

Details:

0/500

Submit


#### Success!

The feedback has been logged for report.

✕

#### Error!

An error has occurred!

✕

[Skip to content](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/#climatology-api)

# Climatology API [¶](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/\#climatology-api "Permanent link")

The Climatology microservice API returns time series analysis-ready data responses for solar and meteorological data to be used directly by applications.

## Formats [¶](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/\#formats "Permanent link")

| Formats | Available | Notes |
| --- | --- | --- |
| NetCDF | Yes |  |
| ASCII | Yes |  |
| ICASA | No |  |
| JSON | Yes |  |
| CSV | Yes |  |

## Limits [¶](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/\#limits "Permanent link")

Parameters

- A maximum of 20 parameters can currently be requested in one submission for a single point. Regional requests are limited to one parameter.
- These limits do not apply if more parameters are needed by the application to construct on the fly parameters or if a combination of parameters are selected that return multiple parameters with the same name.

Wind Elevation and Custom Surface

1. This parameter is only available under the "Point" spatial option.
2. Wind Elevation values in Meters are required to be between 10m and 300m.
3. If you provide a correct wind surface alias, please include a surface elevation with the request.

For a list of wind surface aliases, please use this [System API Request](https://power.larc.nasa.gov/api/pages/?urls.primaryName=Manager). For more information please reference the [Manager Documentation](https://power.larc.nasa.gov/docs/services/api/system/manager/).

Site Elevation

If you wish to pass your own site elevation (in meters), you will receive a corrected atmospheric pressure value upon adjustment to the elevation you provided.

1. This parameter is only available under the "Point" spatial option.
2. Site Elevation `site-elevation` values are in Meters.

## Request Structure [¶](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/\#request-structure "Permanent link")

- The request arguments can be in any order after the question mark.
- A single parameter or a list of parameters can be selected with one of the following list separators: ',' or '%2C'.

### Examples [¶](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/\#examples "Permanent link")

To help construct and test your API requests, please use the API Pages for the [POWER Climatology API](https://power.larc.nasa.gov/api/pages/?urls.primaryName=Climatology) and [POWER Manager API](https://power.larc.nasa.gov/api/pages/?urls.primaryName=Manager).

#### Custom Climatology [¶](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/\#custom-climatology "Permanent link")

To request a custom climatology, just include `start` and `end`URI components like `start=2016&end=2017`.

[Simple](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/#__tabbed_1_1)[ASCII](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/#__tabbed_1_2)[CSV](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/#__tabbed_1_3)

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>/api/temporal/monthly/climatology/point?parameters=T2M,T2M_MAX&community=SB&longitude=0&latitude=0&format=JSON&start=2016&end=2017<br>``` |

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>/api/temporal/monthly/climatology/point?parameters=T2M,T2M_MAX&community=SB&longitude=0&latitude=0&format=ASCII&start=2016&end=2017<br>``` |

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>/api/temporal/monthly/climatology/point?parameters=T2M,T2M_MAX&community=SB&longitude=0&latitude=0&format=CSV&start=2016&end=2017<br>``` |

#### Point [¶](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/\#point "Permanent link")

[Simple](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/#__tabbed_2_1)[Complex](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/#__tabbed_2_2)[Site Elevation](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/#__tabbed_2_3)[Wind Elevation](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/#__tabbed_2_4)[Wind Surface](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/#__tabbed_2_5)[Arbitrary Tilt](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/#__tabbed_2_6)[All Operations](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/#__tabbed_2_7)

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>/api/temporal/climatology/point?parameters=T2M&community=SB&longitude=0&latitude=0&format=JSON<br>``` |

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>/api/temporal/climatology/point?parameters=T2M,PS,WS10M&community=AG&longitude=0&latitude=0&format=CSV<br>``` |

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>/api/temporal/climatology/point?parameters=T2M&community=SB&longitude=0&latitude=0&format=JSON&site-elevation=50<br>``` |

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>/api/temporal/climatology/point?parameters=T2M&community=AG&longitude=0&latitude=0&format=ASCII&wind-elevation=50<br>``` |

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>/api/temporal/climatology/point?parameters=T2M&community=AG&longitude=0&latitude=0&format=ASCII&wind-surface=SeaIce&wind-elevation=50<br>``` |

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>/api/temporal/climatology/point?parameters=SI_EF_TILTED_SURFACE&community=AG&longitude=0&latitude=0&format=ASCII<br>``` |

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>/api/temporal/climatology/point?parameters=T2M,PS,WS10M,SI_EF_TILTED_SURFACE&community=AG&longitude=0&latitude=0&format=ASCII&wind-surface=SeaIce&wind-elevation=50&site-elevation=50<br>``` |

#### Regional [¶](https://power.larc.nasa.gov/docs/services/api/temporal/climatology/\#regional "Permanent link")

Below are examples for returning a climatology for a region on a 0.5 x 0.5 degree grid.

|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>``` | ````<br>```bash<br>/api/temporal/climatology/regional?latitude-min=50&latitude-max=55&longitude-min=50&longitude-max=55&parameters=T2M&community=SB&format=CSV<br>```<br>```` |