from IPython.display import Image
import ee

ee.Initialize()

image = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_044034_20140318')
Map = ee.Image(image).getThumbUrl({'min': 0, 'max': 0.3})
url = "https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/" + \
    Map['mapid'] + "/tiles/{z}/{x}/{y}?token=" + Map['token']
Image(url=url)
