import { useEffect } from 'react';
// import ymaps from 'yandex-maps';

export default function OriginalMap({ coords, size }) {
  console.log('eto coords', coords);
  useEffect(() => {
    ymaps.ready(init);
  }, []);

  async function init() {
    const myMap = new ymaps.Map('map', {
      center: [coords[1], coords[0]],
      controls: [],
      zoom: 8,
    });

    const myPlacemark = await createPlacemark([coords[1], coords[0]]);
    myMap.geoObjects.add(myPlacemark);
    await getAddress([coords[1], coords[0]], myPlacemark);
  }

  async function getAddress(coordinates, myPlacemark) {
    try {
      const res = await ymaps.geocode(coordinates);
      const firstGeoObject = await res.geoObjects.get(0);
      const address = await firstGeoObject.getAddressLine();
      myPlacemark.properties.set('balloonContentBody', address);
    } catch (error) {
      console.error('Ошибка при получении адреса:', error);
      alert('Ошибка при получении адреса');
    }
  }

  async function createPlacemark(coords) {
    const res = await ymaps.geocode(coords);
    const firstGeoObject = await res.geoObjects.get(0);
    return new ymaps.Placemark(coords, {
      balloonContentBody: firstGeoObject,
      hintContent: 'Хинт метки',
    });
  }

  return (
    <div className="map">
      <div
        id="map"
        style={
          size
            ? size
            : {
                width: '600px',
                height: '400px',
                border: '2mm ridge rgba(211, 220, 50, 0.6)',
              }
        }
      ></div>
    </div>
  );
}
