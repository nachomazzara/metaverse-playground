import * as React from 'react'
import './Preview.css'

class Preview extends React.PureComponent {
  render() {
    return <iframe className="preview-wrapper" sandbox="allow-scripts" src="preview.html" />
  }
}

export default Preview
