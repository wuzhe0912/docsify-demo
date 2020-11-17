# 串接 Google Maps API

> 記錄串接 Google Maps API 的做法(2020/10)

## 透過瀏覽器 API 取得當前經緯度位置
- navigator.geolocation.getCurrentPosition() 方法
```
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log('經度', position.coords.longitude);
          console.log('緯度', position.coords.latitude);
        },
        (error) => {
          console.log(error.message);
        });
      } else {
        console.log('你的瀏覽器版本，目前不支援獲取 Google Maps 經緯度');
      }
    },
  },
```

## 透過經緯度，尋找街道位置
- 需啟用以下兩隻 Google Maps API
  - Places API
  - Geolocation API

```
  methods: {
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // latitude 緯度
          // longitude 經度
          this.getAddressForm(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.log(error.message)
        })
      } else {
        console.log('你的瀏覽器版本，目前不支援獲取 Google Maps 經緯度')
      }
    },

    getAddressForm (val, subVal) {
      const apiKey = 'Your_API_Key'
      const latlng = `${val},${subVal}`
      this.axios
        .get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            latlng: latlng,
            language: 'zh-TW',
            key: apiKey
          }
        })
        .then((response) => {
          if (response.data.error_message) {
            console.log(1, response.data.error_message)
          } else {
            this.address = response.data.results[0].formatted_address
            console.log(2, response.data.results[0].formatted_address)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
```

## 自動搜尋地址關鍵字

> autocomplete 語法可以在 input 自動搜尋關鍵字

- index.html 引入

```
<script src="https://maps.googleapis.com/maps/api/js?libraries=places&key=Your_api_key&language=zh-TW"></script>
```

- 頁面調用

```
  mounted () {
    const google = window.google
    /* eslint-disable no-new */
    new google.maps.places.Autocomplete(
      // 綁在 template 上對應的 input
      document.getElementById('autocomplete')
    )
  },
```

- 加入座標地址，可以就近搜尋對應國家或位置

```
  mounted () {
    const google = window.google
    /* eslint-disable no-new */
    new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(25.105497, 121.597366)
        )
      }
    )
  },
```

## 建立地圖物件，畫到頁面上
- Create a map object

```
  data () {
    return {
      googleMaps: window.google
    }
  }
```
```
  showUserLocationOnTheMap (val, subVal) {
    const mapMarker = new this.googleMaps.maps.Map(
      document.querySelector('.map-wrap'), {
        zoom: 15,
        center: new this.googleMaps.maps.LatLng(val, subVal),
        mapTypeId: this.googleMaps.maps.MapTypeId.ROADMAP
      }
    )
  }
```

- 添加地圖位址 Mark 標記

```
  showUserLocationOnTheMap (val, subVal) {
    const mapMarker = new this.googleMaps.maps.Map(
      document.querySelector('.map-wrap'), {
        zoom: 15,
        center: new this.googleMaps.maps.LatLng(val, subVal),
        mapTypeId: this.googleMaps.maps.MapTypeId.ROADMAP
      }
    )
    new this.googleMaps.maps.Marker({
      position: new this.googleMaps.maps.LatLng(val, subVal),
      map: mapMarker
    })
  }
```

## CORS

> 為使 google maps 服務可以正常跨域，須添加以下網址在前方

```
https://cors-anywhere.herokuapp.com/
```