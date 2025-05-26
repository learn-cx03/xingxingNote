// Index/index.jsx
import React from 'react'
import { Button } from 'zarm'
import s from './style.module.less'

export default function Index() {
  return <div className={s.index}> 
    Index
    <Button theme="primary">primary</Button>'
    <span>2212</span>
  </div>
}


