import React from 'react'
import {render} from 'react-dom'

import installServiceWorker from './progressive'
import App from './app'

import './index.less'

const appWrapper = document.getElementById('neonate-app')

render(<App/>, appWrapper)

installServiceWorker()
