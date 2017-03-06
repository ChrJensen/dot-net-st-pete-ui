import React, { Component } from 'react';
const { ipcRenderer } = window.require('electron');
import { hashHistory } from 'react-router';
import { show } from 'js-snackbar';
import endpoints from '../constants/endpoints';
import { get, post } from '../utility/fetch.utility';
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
  state = {
    journalEntry: { ...initialJournalEntry },
    loadingActive: false,
    journalEntries: []
  };

  componentDidMount() {
    // eslint-disable-next-line
    componentHandler.upgradeDom();

    // request the users access_token
    const access_token = ipcRenderer.sendSync('request-access-token');

    // get all journal entries
    get(endpoints.JOURNAL.default, { access_token })
      .then(response => {
        this.setState({ journalEntries: response, access_token });
      });
  }

  logout() {
    ipcRenderer.send('request-logout');
    hashHistory.push('/');
  }

  selectEntry(index) {
    const selectedJournalEntry = { ...this.state.journalEntries[index] };
    selectedJournalEntry.sampleDate = '';
    this.setState({ journalEntry: selectedJournalEntry }, () => {
      // quick workaround to properly set the date in the html5 date picker input
      document.getElementById('sample_date').valueAsDate = new Date(this.state.journalEntries[index].sampleDate);
    });
  }

  setJournalEntryField(field, value) {
    let new_state = { ...this.state };
    new_state['journalEntry'][field] = value;
    this.setState(new_state);
  }

  save() {
    this.setState({ loadingActive: true });

    post(endpoints.JOURNAL.default, this.state.journalEntry, { access_token: this.state.access_token })
      .then(() => {
        let journalEntries = [...this.state.journalEntries, this.state.journalEntry];
        this.setState({ loadingActive: false, journalEntry: { ...initialJournalEntry }, journalEntries });
        show({ text: 'Journal Entry Saved!', backgroundColor: '#4CAF50', pos: 'bottom-right' });
      })
      .catch(error => {
        console.error(error);
        this.setState({ loadingActive: false });
        show({ text: 'Could not save Journal Entry', backgroundColor: '#F44336', pos: 'bottom-right' });
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
              {this.state.journalEntries.map((je, index) => {
                {
                  /* todo: update to use id for key - api returns full object id right now */
                }
                return (
                  <a key={`beer_${index}`}
                     className="mdl-navigation__link"
                     onClick={() => this.selectEntry(index)}>
                    <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">local_drink</i>
                    {je.beerName} @ {je.brewery}
                    <br/>
                    {new Date(je.sampleDate).toLocaleDateString()}
                  </a>
                );
              })}
            </nav>
          </div>

          <main className="mdl-layout__content mdl-color--grey-100">
            <div className="mdl-grid content">
              <div className="cards mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
                <div className="updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop">
                  <div className="mdl-card__title mdl-card--expand mdl-color--teal-300">
                    <h2 className="mdl-card__title-text">Journal Entry</h2>
                    <div className="mdl-layout-spacer"></div>

                    <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored"
                            onClick={() => this.setState({ journalEntry: initialJournalEntry })}>
                      <i className="material-icons">add</i>
                    </button>

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
                       onClick={() => this.save()}>Save</a>
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
