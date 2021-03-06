import { remote } from 'electron'

import React from 'react'
import { Toolbar, Actionbar, Button } from 'react-photonkit'
import { observer } from 'mobx-react'

@observer
class Footer extends React.Component {
  _handleCheckButton () {
    this.props.statsStore.check()
      .then(() => { this.forceUpdate() })
  }

  _handleImportButton () {
    const storage = this.props.statsStore

    storage.isLoading = true
    storage.importing = true

    remote.app.emit('import-from-hash', storage.hash)
    window.close()
  }

  render () {
    const storage = this.props.statsStore
    let rightButton = null

    if (!storage.isLoading && storage.isValid) { rightButton = <Button onClick={this._handleCheckButton.bind(this)} text="Check" ptStyle="primary" pullRight/> }

    if (!storage.isLoading && storage.wasLoadingStats) { rightButton = <Button onClick={this._handleImportButton.bind(this)} text="Import" ptStyle="primary" pullRight/> }

    return (
      <Toolbar ptType="footer">
        <Actionbar>
          <Button text="Close" ptStyle="default" onClick={window.close} />
          {rightButton}
        </Actionbar>
      </Toolbar>
    )
  }
}

export default Footer
