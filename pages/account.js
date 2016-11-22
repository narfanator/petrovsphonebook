import React from 'react'

import protests from '../data/protests'

import { style } from 'next/css'

import * as _ from 'lodash'

export default ({ url: {query: { id } } }) => {
  const item = _.find(protests, {id: id})

  return (
    <div className={style(styles.main)}>
      <div className={style(styles.header)}>
        <h3> NEXTHRONE - THE REVELATION OF GAME OF THRONES CHARACTERS </h3>
      </div>
      <div className={style(styles.panel)}>
        <h1 className={style(styles.heading)}>
          Protest: { item.name }
        </h1>
      </div>
    </div>
  )
}
