/*
 * Copyright (c) Juniper Networks, Inc. All rights reserved.
*/
import _ from 'lodash'
import * as d3Shape from 'd3-shape'
import ConfigModel from 'config-model'
import ScalableChart from 'helpers/scale/ScalableChart'

export default class RadialBarConfigModel extends ConfigModel {
  get defaults () {
    return _.merge(super.defaults,
      {
        isSharedContainer: true,
        r: {
          color: 'steelblue',
        },
        // Padding between series in percents of bar width
        barPadding: 10,

        //scale - calculated from data domain and available plot area size
      }
    )
  }

  get angleScale () {
    return this.get('angle.scale')
  }

  get rScale () {
    return this.get('r.scale')
  }
  /**
   * @param model
   * @param width
   * @param height
   */
  calculateScales (model, width, height) {
    let config = _.extend({range: [0, 2 * Math.PI]}, this.attributes.angle)
    if (!_.has(this.attributes, 'angle.scale')) {
      _.set(this.attributes, 'angle.scale', ScalableChart.getScale(model, config))
    }
    config = _.merge({range: [0, Math.min(width / 2, height / 2)]}, this.attributes.r)
    if (!_.has(this.attributes, 'r.scale')) {
      _.set(this.attributes, 'r.scale', ScalableChart.getScale(model, config))
    }
  }

  getColor () {
    return this.get('r.color')
  }

  setColor (accessorName, color) {
    this.set('r.color', color)
  }
}
