import React, { Component } from 'react';
const { ipcRenderer } = window.require('electron');
import { show } from 'js-snackbar';
import endpoints from '../constants/endpoints';
import { post } from '../utility/fetch.utility';
import './beer-journal.css';
import Loading from '../Loading';

// initial journal entry object
const initialJournalEntry = {
  brewery: '',
  beerName: '',
  sampleDate: '',
  sampleNotes: ''
};

class BeerJournal extends Component {
  constructor(props) {
    super(props);

    // save our journal entry
    const save = (access_token) => {
      post(endpoints.JOURNAL.default, this.state.journalEntry, { access_token })
        .then(() => {
          this.setState({ loadingActive: false, journalEntry: { ...initialJournalEntry } });
          show({ text: 'Journal Entry Saved!', backgroundColor: '#4CAF50', pos: 'bottom-right' });
        })
        .catch(error => {
          console.error(error);
          this.setState({ loadingActive: false });
          show({ text: 'Could not save Journal Entry', backgroundColor: '#F44336', pos: 'bottom-right' });
        });
    };

    // handles response from main process with access token
    ipcRenderer.on('access-token-response', (event, access_token) => {
      save(access_token);
    });
  }

  state = {
    journalEntry: { ...initialJournalEntry },
    loadingActive: false
  };

  componentDidMount() {
    // eslint-disable-next-line
    componentHandler.upgradeDom();
  }

  componentDidUpdate() {
    // eslint-disable-next-line
    componentHandler.upgradeDom();
  }

  logout() {
    // todo: implement
  }

  setJournalEntryField(field, value) {
    let new_state = { ...this.state };
    new_state['journalEntry'][field] = value;
    this.setState(new_state);
  }

  requestAccessToken() {
    this.setState({ loadingActive: true }, () => {
      ipcRenderer.send('request-access-token');
    });
  }

  // todo: our labels are not being reset properly via MDL, so using placeholder attributes
  render() {
    let { journalEntry: { brewery, beerName, sampleDate, sampleNotes }, loadingActive } = this.state;

    return (
      <div>
        <Loading active={loadingActive}/>
        <div className="layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
          <div className="drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
            <header className="drawer-header">
              <i className="avatar-icon material-icons">face</i>
              <div className="avatar-dropdown">
                <span>Hi, Beer Drinker</span>
                <div className="mdl-layout-spacer"></div>
                <button id="accbtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                  <i className="material-icons" role="presentation">arrow_drop_down</i>
                </button>
                <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="accbtn">
                  <li className="mdl-menu__item" onClick={this.logout}>
                    <i className="sidebar-user-menu material-icons">exit_to_app</i>
                    Log Out
                  </li>
                </ul>
              </div>
            </header>
            <nav className="navigation mdl-navigation mdl-color--blue-grey-800">
              <a className="mdl-navigation__link">
                <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>
                Home
              </a>
            </nav>
          </div>

          <main className="mdl-layout__content mdl-color--grey-100">
            <div className="mdl-grid content">
              <div className="cards mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
                <div className="updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop">
                  <div className="mdl-card__title mdl-card--expand mdl-color--teal-300">
                    <h2 className="mdl-card__title-text">Journal Entry</h2>
                  </div>
                  <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                    <div className="mdl-textfield mdl-js-textfield">
                      <input className="mdl-textfield__input"
                             type="text"
                             id="brewery"
                             value={brewery}
                             placeholder="Brewery"
                             onChange={(event) => this.setJournalEntryField('brewery', event.target.value)}/>
                      <label className="mdl-textfield__label" htmlFor="brewery">Brewery</label>
                    </div>

                    <br/>
                    <div className="mdl-textfield mdl-js-textfield">
                      <input className="mdl-textfield__input"
                             type="text"
                             id="beer_name"
                             value={beerName}
                             placeholder="Beer Name"
                             onChange={(event) => this.setJournalEntryField('beerName', event.target.value)}/>
                      <label className="mdl-textfield__label" htmlFor="beer_name">Beer Name</label>
                    </div>

                    <br/>
                    <div className="mdl-textfield mdl-js-textfield">
                      <input className="mdl-textfield__input"
                             type="date"
                             id="sample_date"
                             value={sampleDate}
                             placeholder="Sample Date"
                             onChange={(event) => this.setJournalEntryField('sampleDate', event.target.value)}/>
                      <label className="mdl-textfield__label" htmlFor="sample_date">Sample Date</label>
                    </div>

                    <br/>
                    <div className="mdl-textfield mdl-js-textfield">
                      <textarea className="mdl-textfield__input"
                                type="text"
                                rows="5"
                                id="sample_notes"
                                placeholder="Sample Notes"
                                value={sampleNotes}
                                onChange={(event) => this.setJournalEntryField('sampleNotes', event.target.value)}/>
                      <label className="mdl-textfield__label" htmlFor="sample_notes">Sample Notes</label>
                    </div>
                  </div>
                  <div className="mdl-card__actions mdl-card--border">
                    <a className="mdl-button mdl-js-button mdl-js-ripple-effect"
                       onClick={() => this.requestAccessToken()}>Save</a>
                  </div>
                </div>
              </div>
            </div>
          </main>

        </div>
      </div >
    );
  }
}

export default BeerJournal;
