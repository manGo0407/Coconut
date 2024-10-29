import React, { useEffect } from 'react';

export default function OriginalMap({ setCoords }) {
  useEffect(() => {
    ymaps.ready(init);
  }, []);

  async function init() {
    const inputSearch = new ymaps.control.SearchControl({
      options: {
        // Пусть элемент управления будет
        // в виде поисковой строки.
        size: 'large',
        // Включим возможность искать
        // не только топонимы, но и организации.
        provider: 'yandex#search',
        noPopup: true,
        noSuggestPanel: true,
      },
    });
    const myMap = new ymaps.Map('map', {
      center: [55.76, 37.64],
      controls: [inputSearch],
      zoom: 11,
    });

    myMap.controls.add('zoomControl', { left: 5, top: 5 });
    myMap.controls.add('typeSelector');
    let myPlacemark; // Переменная для хранения метки

    ymaps.geolocation.get().then(function (result) {
      const userLocation = result.geoObjects.get(0).geometry.getCoordinates();
      myMap.setCenter(userLocation);
    });

    myMap.events.add('click', function (e) {
      const coords = e.get('coords');
      setCoords(coords);

      // Проверяем, есть ли уже метка на карте
      if (!myPlacemark) {
        createPlacemark(coords);
      } else {
        myPlacemark.geometry.setCoordinates(coords);
      }
    });

    function createPlacemark(coords) {
      myPlacemark = new ymaps.Placemark(coords);
      myMap.geoObjects.add(myPlacemark);

      ymaps.geocode(coords, { kind: 'house' }).then(
        function (res) {
          let nearest = res.geoObjects.get(0);
          let name = nearest.properties.get('name');
          nearest.properties.set('iconContent', name);
          nearest.options.set('preset', 'islands#redStretchyIcon');
          console.log('nearest', nearest, 'name==>', name);
        },

        function (err) {
          alert('Ошибка');
        }
      );
    }
  }

  return (
    <div className="map">
      <div
        id="map"
        style={{
          width: '480px',
          height: '300px',
          border: '2mm ridge rgba(211, 220, 50, 0.6)',
        }}
      ></div>
    </div>
  );
}
