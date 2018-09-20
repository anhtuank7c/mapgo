/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList
} from 'react-native'
import MapView, { Polyline } from 'react-native-maps'

type Coordinate = {
  latitude: number,
  longitude: number
}
type PolylineProps = {
  coordinates: Array<Coordinate>,
  color: string
}
type PolylinesProps = {
  polylines: Array<PolylineProps>
}
type PolylinesState = {
  polylines: Array<PolylineProps>
}
class Polylines extends React.PureComponent<PolylinesProps, PolylinesState> {
  static defaultProps = {
    polylines: []
  }

  constructor(props: PolylinesProps) {
    super(props)

    this.state = {
      polylines: props.polylines
    }
  }

  setPolylines(polylines: PolylinesProps = []) {
    console.log('Set whole polylines at once')
    this.setState({ polylines })
  }

  push(polyline: Array<PolylineProps>) {
    console.log('Push more polyline')
    this.setState(prev => ({ polylines: prev.polylines.concat(polyline) }))
  }

  render() {
    const { polylines } = this.state
    console.count('Polylines.js')
    return polylines.map((polyline, index) => (
      <Polyline
        key={index}
        coordinates={polyline.coordinates}
        strokeColor={polyline.color}
        strokeWidth={3}
      />
    ))
  }
}

type Props = {}
export default class App extends Component<Props> {
  mapRef = React.createRef()
  polylinesRef = React.createRef()

  async componentDidMount() {
    const response = require('./routes.json')
    const response1 = require('./routes1.json')
    const response2 = require('./routes2.json')

    const coord = []
    response.routes[0].legs[0].steps.forEach(step => {
      coord.push({
        latitude: step.start_location.lat,
        longitude: step.start_location.lng
      })
      coord.push({
        latitude: step.end_location.lat,
        longitude: step.end_location.lng
      })
    })
    const coord1 = []
    response1.routes[0].legs[0].steps.forEach(step => {
      coord1.push({
        latitude: step.start_location.lat,
        longitude: step.start_location.lng
      })
      coord1.push({
        latitude: step.end_location.lat,
        longitude: step.end_location.lng
      })
    })
    const coord2 = []
    response2.routes[0].legs[0].steps.forEach(step => {
      coord2.push({
        latitude: step.start_location.lat,
        longitude: step.start_location.lng
      })
      coord2.push({
        latitude: step.end_location.lat,
        longitude: step.end_location.lng
      })
    })
    const polylines = [
      {
        id: 1,
        color: '#ffeb3b',
        coordinates: coord
      },
      {
        id: 2,
        color: '#8bc34a',
        coordinates: coord1
      },
      {
        id: 3,
        color: '#ff9800',
        coordinates: coord2
      },

      {
        id: 4,
        color: '#f22ef7',
        coordinates: coord
      },
      {
        id: 5,
        color: '#32c33c',
        coordinates: coord1
      },
      {
        id: 6,
        color: '#8f9800',
        coordinates: coord2
      },

      {
        id: 7,
        color: '#2feb3b',
        coordinates: coord
      },
      {
        id: 8,
        color: '#19c14a',
        coordinates: coord1
      },
      {
        id: 9,
        color: '#0f9800',
        coordinates: coord2
      },

      {
        id: 10,
        color: '#77eb3b',
        coordinates: coord
      },
      {
        id: 11,
        color: '#f1c34a',
        coordinates: coord1
      },
      {
        id: 12,
        color: '#229800',
        coordinates: coord2
      },

      {
        id: 13,
        color: '#f32b3b',
        coordinates: coord
      },
      {
        id: 14,
        color: '#72c34a',
        coordinates: coord1
      },
      {
        id: 15,
        color: '#439800',
        coordinates: coord2
      },

      {
        id: 16,
        color: '#1feb3b',
        coordinates: coord
      },
      {
        id: 17,
        color: '#4bc34a',
        coordinates: coord1
      },
      {
        id: 18,
        color: '#221800',
        coordinates: coord2
      }
    ]
    let i = 0
    this.timeout = setInterval(() => {
      if (i > 17) {
        clearInterval(this.timeout)
        return
      }
      this.polylinesRef.current.push(polylines[i])
      i += 1
    }, 3000)
  }

  render() {
    console.count('App.js')
    return (
      <View style={styles.container}>
        <MapView
          ref={this.mapRef}
          style={styles.container}
          provider="google"
          region={{
            latitude: 21.0233744,
            longitude: 105.8143523,
            latitudeDelta: 0.06,
            longitudeDelta: 0.06
          }}
        >
          <Polylines ref={this.polylinesRef} />
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
